#!/usr/bin/env python3
"""
Synchronize AITube's Ground-Truth Master Video & Tagging Ledger (`database/`).

Reads single-source-of-truth files in `content/*.json` and outputs:
  1. `database/master_video_ledger.json` — Structured flat JSON ledger (280 records + summary stats)
  2. `database/master_video_ledger.csv`  — UTF-8-BOM spreadsheet for Excel / Feishu / Notion / Google Sheets
  3. `database/MASTER_VIDEO_LEDGER.md`   — Human-readable Markdown ledger with clickable timestamped URLs & tag matrices

Usage:
  python3 scripts/sync_master_ledger.py
"""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"
DB_DIR = ROOT / "database"
SITE_BASE = "https://lufie.github.io/AITube"

# Mirrors `CONCEPT_AUDIENCE` in `web/src/lib/personas.ts`
CONCEPT_AUDIENCE: dict[str, str] = {
    # Beginner (零基础扫盲)
    "transformer-attention": "beginner",
    "tokenization-embeddings": "beginner",
    "prompt-cot": "beginner",
    "rag-grounding": "beginner",
    "structured-tool-calling": "beginner",
    # Applied (直接拿来用)
    "diffusion-controllable-image": "applied",
    "long-context-multimodal": "applied",
    "comfyui-video-audio": "applied",
    "vibe-coding": "applied",
    "computer-use-browser-agents": "applied",
    "hybrid-agentic-rag": "applied",
    # Career (从业工程核心)
    "scaling-pretraining": "career",
    "rlhf-post-training": "career",
    "lora-local-open-weights": "career",
    "agent-workflows-graphs": "career",
    "llm-evals-observability": "career",
    # Frontier (2026 前沿风向)
    "mcp-protocol": "frontier",
    "rlvr-reasoning-models": "frontier",
    "context-engineering": "frontier",
    "agentic-coding-cli": "frontier",
    "agent-skills-subagents": "frontier",
    "world-models-embodied-multimodal": "frontier",
}

PERSONA_LABELS: dict[str, str] = {
    "beginner": "beginner · 零基础扫盲",
    "applied": "applied · 直接应用派",
    "career": "career · 工程从业进阶",
    "frontier": "frontier · 2026前沿追踪",
}


def fmt_mmss(sec: int | None) -> str:
    if sec is None:
        return "-"
    m, s = divmod(int(sec), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h:d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def build_urls(source: dict) -> tuple[str, str, str, str]:
    """Return (source_id, canonical_watch_url, slice_watch_url, embed_url)."""
    kind = source["kind"]
    platform = source.get("platform", "web")

    if kind == "video-cut" and platform == "youtube":
        vid = source["videoId"]
        start = int(source["startSec"])
        end = int(source["endSec"])
        watch_url = f"https://www.youtube.com/watch?v={vid}"
        slice_url = f"https://www.youtube.com/watch?v={vid}&t={start}s" if start > 0 else watch_url
        embed_url = (
            f"https://www.youtube-nocookie.com/embed/{vid}"
            f"?autoplay=1&start={start}&end={end}&rel=0"
        )
        return vid, watch_url, slice_url, embed_url

    if kind == "video-cut" and platform == "bilibili":
        bvid = source["videoId"]
        start = int(source["startSec"])
        watch_url = f"https://www.bilibili.com/video/{bvid}/"
        slice_url = f"https://www.bilibili.com/video/{bvid}/?t={start}" if start > 0 else watch_url
        return bvid, watch_url, slice_url, ""

    article_url = source.get("articleUrl", "")
    return article_url, article_url, article_url, ""


def escape_md(text: str) -> str:
    return text.replace("|", "\\|").replace("\n", " ").strip()


def main() -> None:
    DB_DIR.mkdir(parents=True, exist_ok=True)

    concepts_doc = json.loads((CONTENT_DIR / "concepts.json").read_text(encoding="utf-8"))
    taxonomy_doc = json.loads((CONTENT_DIR / "taxonomy.json").read_text(encoding="utf-8"))
    stages_doc = json.loads((CONTENT_DIR / "stages.json").read_text(encoding="utf-8"))
    nodes_doc = json.loads((CONTENT_DIR / "nodes.json").read_text(encoding="utf-8"))

    concept_map = {c["slug"]: c for c in concepts_doc["concepts"]}
    stage_map = {s["id"]: s for s in stages_doc}

    records: list[dict] = []
    concept_primary_counts: Counter = Counter()
    concept_all_counts: Counter = Counter()
    facet_counts: Counter = Counter()
    persona_counts: Counter = Counter()
    platform_counts: Counter = Counter()

    sorted_nodes = sorted(nodes_doc, key=lambda n: (int(n.get("order", 9999)), n["slug"]))

    for idx, node in enumerate(sorted_nodes, start=1):
        slug = node["slug"]
        primary_concept = node["primaryConcept"]
        concept_obj = concept_map[primary_concept]
        era_id = concept_obj["eraId"]
        lifecycle = concept_obj["lifecycle"]
        persona = CONCEPT_AUDIENCE.get(primary_concept, "applied")

        src = node["source"]
        kind = src["kind"]
        platform = src.get("platform", "web")
        source_id, watch_url, slice_url, embed_url = build_urls(src)

        start_sec = src.get("startSec")
        end_sec = src.get("endSec")
        total_sec = src.get("totalDurationSec")
        is_short = bool(src.get("isShort", False))
        reading_min = src.get("readingMinutes")

        if kind == "video-cut":
            slice_dur = int(end_sec) - int(start_sec)
            slice_label = f"{fmt_mmss(start_sec)}–{fmt_mmss(end_sec)} ({round(slice_dur / 60, 1)}m / {fmt_mmss(total_sec)})"
        else:
            slice_dur = None
            slice_label = f"Article Digest ({reading_min}m read)"

        facets = node.get("facets", {})
        domains = facets.get("domains", [])
        tasks = facets.get("tasks", [])
        stacks = facets.get("stacks", [])

        concept_primary_counts[primary_concept] += 1
        for cid in node.get("conceptIds", []):
            concept_all_counts[cid] += 1
        for d in domains:
            facet_counts[f"domain:{d}"] += 1
        for t in tasks:
            facet_counts[f"task:{t}"] += 1
        for st in stacks:
            facet_counts[f"stack:{st}"] += 1
        persona_counts[persona] += 1
        platform_counts[f"{platform}{':short' if is_short else ''}"] += 1

        rec = {
            "index": idx,
            "order": node.get("order", idx),
            "slug": slug,
            "isSpine": bool(node.get("isSpine", False)),
            "kind": kind,
            "platform": platform,
            "isShort": is_short,
            "sourceId": source_id,
            "channelName": src.get("channelName", ""),
            "originalTitle": src.get("originalTitle", ""),
            "watchUrl": watch_url,
            "sliceWatchUrl": slice_url,
            "embedUrl": embed_url,
            "startSec": start_sec,
            "endSec": end_sec,
            "sliceDurationSec": slice_dur,
            "totalDurationSec": total_sec,
            "readingMinutes": reading_min,
            "sliceLabel": slice_label,
            "eraId": era_id,
            "primaryConcept": primary_concept,
            "conceptIds": node.get("conceptIds", []),
            "conceptRole": node.get("conceptRole", ""),
            "lifecycle": lifecycle,
            "audiencePersona": persona,
            "stageId": node.get("stageId", ""),
            "vaultId": node.get("vaultId", ""),
            "domains": domains,
            "tasks": tasks,
            "stacks": stacks,
            "difficulty": facets.get("difficulty", ""),
            "openness": facets.get("openness", ""),
            "zhTitle": node["zh"]["title"],
            "enTitle": node["en"]["title"],
            "zhSearchQuestions": node["zh"].get("searchQuestions", []),
            "enSearchQuestions": node["en"].get("searchQuestions", []),
            "siteZhUrl": f"{SITE_BASE}/zh/nodes/{slug}/",
            "siteEnUrl": f"{SITE_BASE}/en/nodes/{slug}/",
        }
        records.append(rec)

    summary = {
        "schemaVersion": "1.0.0",
        "totalNodes": len(records),
        "spineNodes": sum(1 for r in records if r["isSpine"]),
        "youtubeLongCuts": platform_counts["youtube"],
        "youtubeShortsCuts": platform_counts["youtube:short"],
        "bilibiliCuts": platform_counts["bilibili"],
        "articleDigests": platform_counts["web"],
        "personaCounts": dict(persona_counts),
        "conceptPrimaryCounts": dict(concept_primary_counts),
        "conceptAllCounts": dict(concept_all_counts),
        "facetCounts": dict(facet_counts),
    }

    # 1. Write JSON
    json_path = DB_DIR / "master_video_ledger.json"
    json_path.write_text(
        json.dumps({"summary": summary, "records": records}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    # 2. Write UTF-8-BOM CSV
    csv_path = DB_DIR / "master_video_ledger.csv"
    csv_columns = [
        "index",
        "slug",
        "isSpine",
        "platform",
        "kind",
        "isShort",
        "sourceId",
        "channelName",
        "originalTitle",
        "sliceWatchUrl",
        "watchUrl",
        "embedUrl",
        "startSec",
        "endSec",
        "sliceDurationSec",
        "totalDurationSec",
        "sliceLabel",
        "eraId",
        "primaryConcept",
        "conceptIds",
        "conceptRole",
        "lifecycle",
        "audiencePersona",
        "stageId",
        "vaultId",
        "domains",
        "tasks",
        "stacks",
        "difficulty",
        "openness",
        "zhTitle",
        "enTitle",
        "zhSearchQuestions",
        "enSearchQuestions",
        "siteZhUrl",
        "siteEnUrl",
    ]
    with csv_path.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=csv_columns)
        writer.writeheader()
        for r in records:
            row = {}
            for col in csv_columns:
                val = r.get(col)
                if isinstance(val, list):
                    row[col] = " | ".join(str(x) for x in val)
                elif val is None:
                    row[col] = ""
                else:
                    row[col] = val
            writer.writerow(row)

    # 3. Write Markdown Master Ledger
    md_lines: list[str] = [
        "# AITube 视频地址与多维打标签底稿总表（Master Video & Tagging Ledger）",
        "",
        "> **单点事实源说明**：本底稿数据库由 [`scripts/sync_master_ledger.py`](../scripts/sync_master_ledger.py) 从 [`content/*.json`](../content/) 自动同步生成，并由 [`scripts/validate-content.mjs`](../scripts/validate-content.mjs) 在每次构建时做 **1:1 完整性强校验**。",
        "> - **表格版下载 / 导入飞书与 Notion**：[`database/master_video_ledger.csv`](master_video_ledger.csv)（UTF-8-BOM 编码，Excel 直开不乱码）",
        "> - **程序化查询底稿**：[`database/master_video_ledger.json`](master_video_ledger.json)",
        "> - **已核验原始候选池**：[`database/raw_verified_youtube_pool.json`](raw_verified_youtube_pool.json)",
        "> - **视频查找、切片与引入规范**：[`database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](VIDEO_SOURCING_AND_INGESTION_SPEC.md)",
        "",
        "---",
        "",
        "## 1. 底稿数据库总览（Summary Metrics）",
        "",
        "| 统计项 | 数量 | 说明 |",
        "| :--- | ---: | :--- |",
        f"| **全库已收录节点总数** | **{summary['totalNodes']}** | 全部具备中英双语标题、3 步 SOP、2026 版本补丁与真实搜索问句 |",
        f"| **主干必修精选（`isSpine: true`）** | **{summary['spineNodes']}** | 串联 4 阶学习路线图（`Stage 00 → Stage 03`）的核心必看切片 |",
        f"| **YouTube 深度长视频切片** | **{summary['youtubeLongCuts']}** | 全部通过官方 `oEmbed HTTP 200` 可嵌入核验，带精确 `[startSec, endSec]` |",
        f"| **YouTube Shorts 战术短切片** | **{summary['youtubeShortsCuts']}** | 1–3 分钟高密度实操演示 |",
        f"| **Bilibili 中文一手精读深链** | **{summary['bilibiliCuts']}** | 官方 `?t={{startSec}}` 跳秒深链（李沐、李宏毅等一手讲义） |",
        f"| **一线实验室工程长文精粹** | **{summary['articleDigests']}** | Anthropic、OpenAI、DeepSeek 等一手技术报告结构化拆解 |",
        "",
        "---",
        "",
        "## 2. 四类人群视角 × 22 个 AI 概念节点打标分布",
        "",
        "### 2.1 四类读者定位分布（`audiencePersona`）",
        "",
        "| 人群标签 ID | 适用读者说明 | 主归属节点数 |",
        "| :--- | :--- | ---: |",
    ]

    for pid in ("beginner", "applied", "career", "frontier"):
        md_lines.append(f"| `{pid}` | {PERSONA_LABELS[pid]} | **{persona_counts[pid]}** |")

    md_lines.extend(
        [
            "",
            "### 2.2 二十二个核心 AI 概念节点覆盖度（`primaryConcept` / `conceptIds`）",
            "",
            "| 纪元 (`eraId`) | 概念 Slug (`primaryConcept`) | 中文名称 | 趋势状态 (`lifecycle`) | 人群归属 | 主归属数 | 关联总覆盖 |",
            "| :--- | :--- | :--- | :--- | :--- | ---: | ---: |",
        ]
    )

    for c in concepts_doc["concepts"]:
        cslug = c["slug"]
        md_lines.append(
            f"| `{c['eraId']}` | `{cslug}` | {escape_md(c['zh']['shortName'])} | `{c['lifecycle']}` | "
            f"`{CONCEPT_AUDIENCE.get(cslug, 'applied')}` | {concept_primary_counts[cslug]} | **{concept_all_counts[cslug]}** |"
        )

    md_lines.extend(
        [
            "",
            "### 2.3 二十个正交检索分面覆盖度（`domains × tasks × stacks`）",
            "",
            "| 分面维度 | 标签 Slug | 中文名称 | 英文名称 | 打标节点数 |",
            "| :--- | :--- | :--- | :--- | ---: |",
        ]
    )

    for dim in taxonomy_doc["dimensions"]:
        dkey = dim["key"]
        for item in dim["items"]:
            islug = item["slug"]
            cnt = facet_counts[f"{dkey}:{islug}"]
            md_lines.append(
                f"| `{dkey}` | `{islug}` | {escape_md(item['zh']['name'])} | {escape_md(item['en']['name'])} | **{cnt}** |"
            )

    md_lines.extend(
        [
            "",
            "---",
            "",
            "## 3. 全量 280 条视频原始链接、跳秒时间窗与多维标签总表",
            "",
            "| # | Slug / 站内页 | 主干 | 平台与跳秒直达原链 (`sliceWatchUrl`) | 切片时间窗 | 创作者 / 频道 | 中文白话标题 | 主概念 (`primaryConcept`) & 角色 | 阶段 / 人群 | 三维标签 (`domain` · `task` · `stack`) |",
            "| ---: | :--- | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |",
        ]
    )

    for r in records:
        spine_mark = "★" if r["isSpine"] else "·"
        plat_badge = (
            "YT-Short"
            if r["isShort"]
            else ("YouTube" if r["platform"] == "youtube" else ("Bilibili" if r["platform"] == "bilibili" else "Digest"))
        )
        link_cell = f"[{plat_badge} · `{escape_md(r['sourceId'][:18])}`]({r['sliceWatchUrl']})"
        site_cell = f"[`{r['slug']}`]({r['siteZhUrl']})"
        concept_cell = f"`{r['primaryConcept']}` ({r['conceptRole']} · {r['lifecycle']})"
        stage_cell = f"`{r['stageId']}` · `{r['audiencePersona']}`"
        facet_cell = (
            f"D:`{','.join(r['domains'])}` "
            f"T:`{','.join(r['tasks'])}` "
            f"S:`{','.join(r['stacks'])}`"
        )
        md_lines.append(
            f"| {r['index']} | {site_cell} | {spine_mark} | {link_cell} | `{r['sliceLabel']}` | "
            f"{escape_md(r['channelName'])} | {escape_md(r['zhTitle'])} | {concept_cell} | {stage_cell} | {facet_cell} |"
        )

    md_lines.append("")
    (DB_DIR / "MASTER_VIDEO_LEDGER.md").write_text("\n".join(md_lines), encoding="utf-8")

    print(
        f"[sync_master_ledger] Synced {len(records)} nodes "
        f"({summary['spineNodes']} spine, {summary['youtubeLongCuts']} YT long, "
        f"{summary['youtubeShortsCuts']} YT shorts, {summary['bilibiliCuts']} Bilibili, "
        f"{summary['articleDigests']} digests) -> database/{{MASTER_VIDEO_LEDGER.md, master_video_ledger.csv, master_video_ledger.json}}"
    )


if __name__ == "__main__":
    main()
