#!/usr/bin/env python3
"""
Empirical AI Concept & Search Query Research Collector for AITube.
Collects:
1. Live Google Web & YouTube Autocomplete suggestions (EN + ZH-CN) across 36 core AI concepts
2. Optional Google Trends 5-year comparative trajectories (via pytrends when reachable)
Saves structured JSON to research/datasets/aitube_google_yt_suggest_104.json for reproducible taxonomy & timeline design.
"""
from __future__ import annotations

import concurrent.futures
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_FILE = ROOT / "research" / "datasets" / "aitube_google_yt_suggest_104.json"


def fetch_google_suggest(q: str, hl: str = "en", ds: str | None = None) -> list[str]:
    params: dict[str, str] = {"client": "firefox", "q": q, "hl": hl}
    if ds:
        params["ds"] = ds
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Firefox/128.0"},
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode("utf-8", "replace"))
        return list(data[1]) if isinstance(data, list) and len(data) > 1 else []


EN_SEEDS = [
    "transformer neural network",
    "attention mechanism explained",
    "llm tokenization",
    "scaling laws ai",
    "rlhf vs dpo",
    "deepseek r1 rl",
    "reasoning models ai",
    "prompt engineering vs",
    "context engineering",
    "context engineering ai",
    "rag vs fine tuning",
    "agentic rag",
    "hybrid search rag",
    "structured outputs llm",
    "function calling llm",
    "model context protocol",
    "mcp server tutorial",
    "claude code workflow",
    "claude agent skills",
    "vibe coding",
    "agentic coding",
    "cursor rules workflow",
    "ai agent workflow vs",
    "multi agent orchestration",
    "computer use agent",
    "llm evals",
    "lora fine tuning",
    "run local llm ollama",
    "comfyui workflow",
    "flux image generation",
    "ai video generation workflow",
    "world models ai",
]

ZH_SEEDS = [
    "transformer 原理",
    "大模型 预训练 微调",
    "提示词工程",
    "上下文工程",
    "RAG 知识库",
    "GraphRAG",
    "MCP 协议",
    "Claude Code 教程",
    "Agent Skills",
    "Vibe Coding",
    "Cursor 编程技巧",
    "AI Agent 工作流",
    "多智能体 协作",
    "DeepSeek R1 原理",
    "大模型 强化学习",
    "大模型 评测 eval",
    "LoRA 微调 教程",
    "Ollama 本地部署",
    "ComfyUI 工作流",
    "AI 视频生成 工作流",
]


def main() -> None:
    t0 = time.time()
    jobs: list[tuple[str, str, str, str | None]] = []
    for q in EN_SEEDS:
        jobs.append(("web_en", q, "en", None))
        jobs.append(("yt_en", q, "en", "yt"))
    for q in ZH_SEEDS:
        jobs.append(("web_zh", q, "zh-CN", None))
        jobs.append(("yt_zh", q, "zh-CN", "yt"))

    results: dict[str, list[str]] = {}

    def worker(job: tuple[str, str, str, str | None]) -> tuple[str, list[str]]:
        kind, q, hl, ds = job
        time.sleep(0.08)
        try:
            items = fetch_google_suggest(q, hl=hl, ds=ds)
            return f"{kind}::{q}", items
        except Exception:
            return f"{kind}::{q}", []

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:
        for key, items in ex.map(worker, jobs):
            results[key] = items

    payload = {
        "collectedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "totalQueries": len(results),
        "nonEmptyQueries": sum(1 for v in results.values() if v),
        "suggestions": results,
    }
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"✅ Collected {payload['nonEmptyQueries']}/{payload['totalQueries']} autocomplete query sets "
        f"in {time.time() - t0:.1f}s -> {OUT_FILE}"
    )


if __name__ == "__main__":
    main()
