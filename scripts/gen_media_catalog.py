#!/usr/bin/env python3
"""Generate docs/CURATED_MEDIA_CATALOG.md summarizing all 22 concepts and 280 verified cuts."""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fmt_mmss(sec: int) -> str:
    m, s = divmod(max(0, sec), 60)
    return f"{m}:{s:02d}"


def main() -> None:
    concepts_doc = json.loads((ROOT / "content/concepts.json").read_text("utf-8"))
    nodes = json.loads((ROOT / "content/nodes.json").read_text("utf-8"))
    out_path = ROOT / "docs/CURATED_MEDIA_CATALOG.md"

    yt_count = sum(1 for n in nodes if n["source"]["platform"] == "youtube")
    bili_count = sum(1 for n in nodes if n["source"]["platform"] == "bilibili")
    web_count = sum(1 for n in nodes if n["source"]["platform"] == "web")
    spine_count = sum(1 for n in nodes if n.get("isSpine"))
    total_saved = round(sum(float(n["source"].get("hoursSaved", 0)) for n in nodes), 1)

    by_primary = Counter(n["primaryConcept"] for n in nodes)

    lines = [
        "# AITube Curated Media & Concept Trend Catalog",
        "",
        f"- **Total Verified Nodes**: `{len(nodes)}` (`{spine_count}` Flagship Spine Cuts + `{len(nodes) - spine_count}` Curated Pool Cuts)",
        f"- **Source Mix**: `{yt_count}` YouTube (`oEmbed HTTP 200`) · `{bili_count}` Bilibili (`API code=0`) · `{web_count}` Primary Technical Monographs",
        f"- **Concept Trend Index**: `{len(concepts_doc['concepts'])}` Concepts across `{len(concepts_doc['eras'])}` Chronological Eras (`2017–2026`)",
        f"- **Cumulative Research Hours Saved**: `{total_saved}h`",
        "",
        "## 1. Concept Trend Index Summary (22 Concepts)",
        "",
        "| # | Concept | Era | Origin → Inflection | Lifecycle | Primary Cuts |",
        "|---:|---|---|---|---|---:|",
    ]

    for c in concepts_doc["concepts"]:
        lines.append(
            f"| {c['order']} | **{c['zh']['shortName']}** / {c['en']['shortName']} (`{c['slug']}`) | `{c['eraId']}` | `{c['originQuarter']} → {c['inflectionQuarter']}` | `{c['lifecycle']}` | {by_primary[c['slug']]} |"
        )

    lines.extend([
        "",
        "## 2. Flagship Spine Cuts (Nodes 01–52)",
        "",
        "| # | Slug | Concept | Platform | Creator | Window | ZH Title |",
        "|---:|---|---|---|---|---|---|",
    ])

    for n in [x for x in nodes if x.get("isSpine")]:
        s = n["source"]
        win = f"{fmt_mmss(s['startSec'])}–{fmt_mmss(s['endSec'])}" if s["kind"] == "video-cut" else f"{s['readingMinutes']}m read"
        lines.append(
            f"| {n['order']} | `{n['slug']}` | `{n['primaryConcept']}` | `{s['platform']}` | {s['channelName']} | `{win}` | {n['zh']['title']} |"
        )

    lines.extend([
        "",
        "## 3. Verified YouTube Expansion Cuts (Nodes 53–280)",
        "",
        "| # | Slug | Concept | Video ID | Creator | Slice | Original Title |",
        "|---:|---|---|---|---|---|---|",
    ])

    for n in [x for x in nodes if not x.get("isSpine")]:
        s = n["source"]
        win = f"{fmt_mmss(s['startSec'])}–{fmt_mmss(s['endSec'])} / {fmt_mmss(s['totalDurationSec'])}"
        safe_title = s["originalTitle"].replace("|", "\\|")
        lines.append(
            f"| {n['order']} | `{n['slug']}` | `{n['primaryConcept']}` | `{s['videoId']}` | {s['channelName']} | `{win}` | {safe_title} |"
        )

    out_path.write_text("\n".join(lines) + "\n", "utf-8")
    print(f"[gen_media_catalog] Wrote {out_path} ({len(lines)} lines)")


if __name__ == "__main__":
    main()
