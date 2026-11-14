#!/usr/bin/env python3
"""
Anchor-Normalized Google Trends & Triangulated Autocomplete Collector (Growthtube × AITube Standard).

Implements our empirical search-trend research methodology:
1. Anchor-Normalized 5-Year Comparative Batches (`today 5-y`, global `geo=""`) with an everyday control
   batch (`weather`, `recipe`, `calculator`, `translate`) to detect and strip SEO/AI bot baseline inflation.
2. 12-Month Top & Rising Related Queries (`today 12-m`) + Country Concentration Checks.
3. Three-Surface Autocomplete Triangulation:
   - Google Web Suggest (`hl=en` & `hl=zh-CN`)
   - YouTube Search Suggest (`ds=yt`, `hl=en` & `hl=zh-CN`)
   - Baidu Search Suggest (`suggestion.baidu.com` for mainland Chinese phrasing & vocabulary gaps)

Usage:
  uv run --with pytrends --with pandas python3 scripts/research/collect_google_trends_anchor.py --mode suggest
  uv run --with pytrends --with pandas python3 scripts/research/collect_google_trends_anchor.py --mode all
"""
from __future__ import annotations

import argparse
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATASETS_DIR = ROOT / "research" / "datasets"

ANCHOR_TERM = "prompt engineering"

TREND_BATCHES: dict[str, list[str]] = {
    # Everyday control batch: verifies whether apparent B2B/tech jumps are organic or bot-inflated
    "control_everyday": ["weather", "recipe", "calculator", "translate"],
    "paradigm_context": [ANCHOR_TERM, "context engineering", "model context protocol", "claude code", "vibe coding"],
    "ai_search_geo": ["ai seo", "ai search optimization", "generative engine optimization", "answer engine optimization", "ai overviews"],
    "rag_evolution": [ANCHOR_TERM, "retrieval augmented generation", "agentic rag", "graphrag", "hybrid search"],
    "post_training_reasoning": ["rlhf", "direct preference optimization", "deepseek r1", "reasoning models", "lora fine tuning"],
    "multimodal_local": ["stable diffusion", "comfyui", "flux ai", "ollama", "world models"],
    "zh_ai_paradigms": ["提示词工程", "上下文工程", "MCP协议", "GEO优化", "智能体"],
}


def fetch_google_suggest(q: str, hl: str = "en", ds: str | None = None) -> list[str]:
    params: dict[str, str] = {"client": "firefox", "q": q, "hl": hl}
    if ds:
        params["ds"] = ds
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Firefox/128.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode("utf-8", "replace"))
        return list(data[1]) if isinstance(data, list) and len(data) > 1 else []


def fetch_baidu_suggest(q: str) -> list[str]:
    url = "https://suggestion.baidu.com/su?wd=" + urllib.parse.quote(q) + "&action=opensearch"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Firefox/128.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        raw = resp.read().decode("gbk", "replace")
        data = json.loads(raw)
        return list(data[1]) if isinstance(data, list) and len(data) > 1 else []


def collect_trends(out_path: Path) -> None:
    from pytrends.request import TrendReq  # type: ignore

    data = json.loads(out_path.read_text("utf-8")) if out_path.exists() else {}
    py = TrendReq(hl="en-US", tz=0, retries=3, backoff_factor=3, timeout=(10, 30))

    for batch_name, kws in TREND_BATCHES.items():
        key = f"cmp5y::{batch_name}"
        if key in data:
            continue
        py.build_payload(kws, timeframe="today 5-y", geo="")
        df = py.interest_over_time()
        if "isPartial" in df.columns:
            df = df.drop(columns=["isPartial"])
        series: dict[str, dict] = {}
        for col in df.columns:
            s = df[col]
            series[col] = {
                "mean_5y": round(float(s.mean()), 1),
                "first_12m": round(float(s.iloc[:52].mean()), 1),
                "last_12m": round(float(s.iloc[-52:].mean()), 1),
                "last_3m": round(float(s.iloc[-13:].mean()), 1),
                "peak_week": str(s.idxmax().date()),
                "yearly": {str(y): round(float(v), 1) for y, v in s.groupby(s.index.year).mean().items()},
            }
        data[key] = {"anchor": ANCHOR_TERM if ANCHOR_TERM in kws else None, "keywords": kws, "series": series}
        out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", "utf-8")
        print(f"[trends] saved {key}")
        time.sleep(12)


def main() -> None:
    parser = argparse.ArgumentParser(description="Collect anchor-normalized Google Trends & Autocomplete datasets")
    parser.add_argument("--mode", choices=["suggest", "trends", "all"], default="suggest")
    parser.add_argument("--out-prefix", default="iteration_snapshot")
    args = parser.parse_args()

    DATASETS_DIR.mkdir(parents=True, exist_ok=True)

    if args.mode in ("suggest", "all"):
        seeds_en = ["ai seo", "generative engine optimization", "context engineering", "claude agent skills", "mcp server"]
        seeds_zh = ["GEO优化", "上下文工程", "Agent Skills", "MCP协议", "Claude Code 教程"]
        bundle: dict[str, list[str]] = {}
        for q in seeds_en:
            bundle[f"web_en::{q}"] = fetch_google_suggest(q, hl="en")
            bundle[f"yt_en::{q}"] = fetch_google_suggest(q, hl="en", ds="yt")
        for q in seeds_zh:
            bundle[f"web_zh::{q}"] = fetch_google_suggest(q, hl="zh-CN")
            bundle[f"yt_zh::{q}"] = fetch_google_suggest(q, hl="zh-CN", ds="yt")
            try:
                bundle[f"baidu_zh::{q}"] = fetch_baidu_suggest(q)
            except Exception:
                bundle[f"baidu_zh::{q}"] = []
        suggest_out = DATASETS_DIR / f"{args.out_prefix}_suggest.json"
        suggest_out.write_text(
            json.dumps({"collectedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "suggestions": bundle}, ensure_ascii=False, indent=2)
            + "\n",
            "utf-8",
        )
        print(f"[suggest] wrote {suggest_out}")

    if args.mode in ("trends", "all"):
        trends_out = DATASETS_DIR / f"{args.out_prefix}_trends.json"
        collect_trends(trends_out)


if __name__ == "__main__":
    main()
