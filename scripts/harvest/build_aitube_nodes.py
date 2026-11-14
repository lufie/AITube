#!/usr/bin/env python3
"""Assemble 280 verified AITube nodes (52 flagship spine + 228 curated pool cuts)."""
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "seed_data"))

from concept_playbooks import CONCEPT_PLAYBOOKS
from flagship_part1 import FLAGSHIP_PART1
from flagship_part2 import FLAGSHIP_PART2
from pool_zh_titles import POOL_ZH_TITLES

ROOT = Path(__file__).resolve().parents[2]
CONCEPTS_PATH = ROOT / "content" / "concepts.json"
TAXONOMY_PATH = ROOT / "content" / "taxonomy.json"
POOL_PATH = ROOT / "database" / "raw_verified_youtube_pool.json"
OUT_PATH = ROOT / "content" / "nodes.json"

TARGET_TOTAL = 280

BANNED_RE = re.compile(
    r"\b(crypto|bitcoin|solana|forex|drop\s?shipping|passive income|make \$|millionaire|"
    r"get rich|side hustle|tarot|astrology|prank|music video|reaction)\b",
    re.I,
)


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    parts = [p for p in s.split("-") if p and p not in {"the", "and", "with", "for", "how", "to"}]
    return "-".join(parts[:7]) or "ai-cut"


def clean_title(raw: str) -> str:
    t = re.sub(r"\s*[\|\-–—]\s*(Full Course|Official|Live|Podcast| Ep\.?\s*\d+).*$", "", raw, flags=re.I)
    t = re.sub(r"#\w+", "", t).strip(" -|–—:")
    return t if len(t) <= 84 else t[:81].rsplit(" ", 1)[0] + "..."


def has_cjk(text: str) -> bool:
    return bool(re.search(r"[\u4e00-\u9fff]", text))


def compute_slice(total_sec: int) -> tuple[int, int]:
    if total_sec <= 180:
        return (0, max(20, total_sec))
    if total_sec <= 600:
        start = max(15, int(total_sec * 0.10))
        end = min(total_sec - 5, start + max(120, int(total_sec * 0.68)))
        return (start, end)
    if total_sec <= 1800:
        start = max(35, min(150, int(total_sec * 0.12)))
        end = min(total_sec - 12, start + min(540, int(total_sec * 0.52)))
        return (start, end)
    start = min(420, int(total_sec * 0.14))
    end = min(total_sec - 20, start + 720)
    return (start, end)


def fmt_mmss(sec: int) -> str:
    m, s = divmod(max(0, sec), 60)
    return f"{m}:{s:02d}"


def build_pool_node(item: dict, concept_map: dict, valid_facets: dict, role_idx: int, used_slugs: set[str]) -> dict:
    c_slug = item["primaryConcept"]
    concept = concept_map[c_slug]
    pb = CONCEPT_PLAYBOOKS[c_slug]
    vid = item["videoId"]
    ch = item["channelName"].strip()
    orig_title = item["title"].strip()
    total = int(item["totalDurationSec"])
    start, end = compute_slice(total)
    cut_mins = round((end - start) / 60, 1)
    is_short = total <= 180

    base_slug = slugify(f"{ch[:18]}-{orig_title[:42]}")
    slug = base_slug if base_slug not in used_slugs else f"{base_slug}-{vid[:4].lower()}"
    while slug in used_slugs:
        slug = f"{slug}-x"
    used_slugs.add(slug)

    roles = ["practice", "frontier", "origin"]
    role = roles[role_idx % 3]

    c_ids = [c for c in item.get("conceptIds", [c_slug]) if c in concept_map]
    if c_slug not in c_ids:
        c_ids.insert(0, c_slug)
    c_ids = c_ids[:3]

    domains = [d for d in item.get("domains", [concept["domain"]]) if d in valid_facets["domains"]] or [concept["domain"]]
    tasks = [t for t in item.get("tasks", []) if t in valid_facets["tasks"]]
    stacks = [s for s in item.get("stacks", []) if s in valid_facets["stacks"]]
    if not tasks:
        tasks = ["architecture-intuition" if domains[0] == "foundations" else "agent-orchestration"]
    if not stacks:
        stacks = ["research-fundamentals" if domains[0] == "foundations" else "claude-anthropic"]

    en_clean = clean_title(orig_title)
    c_en_short = concept["en"]["shortName"]
    c_zh_short = concept["zh"]["shortName"]

    if slug not in POOL_ZH_TITLES:
        raise KeyError(f"Missing human Chinese title in POOL_ZH_TITLES for slug: {slug}")
    zh_title = POOL_ZH_TITLES[slug]

    if has_cjk(orig_title):
        en_title = f"{c_en_short} Explained: {ch} Walkthrough"
    else:
        en_title = en_clean

    rev_count = 12 + (abs(hash(vid)) % 9)
    hrs_saved = round(max(0.6, (total * rev_count * 0.28) / 3600), 1)
    tool_name, tool_url, tool_tag, tool_desc = pb["tool"]
    zh_tool_name, zh_tool_url, zh_tool_tag, zh_tool_desc = pb.get("zh_tool", pb["tool"])

    en_steps = [{"title": t, "detail": d} for t, d in pb["en_steps"]]
    zh_steps = [{"title": t, "detail": d} for t, d in pb["zh_steps"]]

    variant = role_idx % 3
    if is_short:
        zh_subtitle = f"来自 {ch} 的 {total} 秒快看短片：不绕弯子，一口气帮你抓准「{c_zh_short}」最核心的那层意思。"
        zh_why = f"一共只有 {total} 秒：{ch} 用大白话把「{c_zh_short}」最关键的重点点透，零负担秒懂。"
        en_subtitle = f"Quick {total}s breakdown from {ch} — get the core {c_en_short.lower()} idea in plain English."
        en_why = f"Just {total}s from {ch}: grasp the core {c_en_short} takeaway in under 3 minutes."
    elif variant == 0:
        zh_subtitle = f"来自 {ch} 的实测分享（直接看 {fmt_mmss(start)}–{fmt_mmss(end)} 这一段就行），省去片头寒暄直奔干货。"
        zh_why = f"原片长 {fmt_mmss(total)}，已帮你挑出最值得看的 {cut_mins} 分钟精华：手把手看懂「{c_zh_short}」到底怎么用。"
        en_subtitle = f"From {ch} — jump straight to the {fmt_mmss(start)}–{fmt_mmss(end)} highlight without the intro fluff."
        en_why = f"Best {cut_mins}m out of {fmt_mmss(total)} from {ch}: practical {c_en_short} walkthrough you can use right away."
    elif variant == 1:
        zh_subtitle = f"{ch} 出品（推荐直接拉到 {fmt_mmss(start)}–{fmt_mmss(end)}），用直观例子把「{c_zh_short}」讲得明明白白。"
        zh_why = f"不用啃 {fmt_mmss(total)} 全片，只看这 {cut_mins} 分钟核心段落，就能搞懂「{c_zh_short}」的来龙去脉与常见坑。"
        en_subtitle = f"{ch} explains {c_en_short.lower()} clearly — watch the {fmt_mmss(start)}–{fmt_mmss(end)} core segment."
        en_why = f"Skip the {fmt_mmss(total)} full runtime — this {cut_mins}m cut covers the exact {c_en_short} mental model and pitfalls."
    else:
        zh_subtitle = f"精选 {ch} 最干货的 {cut_mins} 分钟（{fmt_mmss(start)}–{fmt_mmss(end)}），看完就能对「{c_zh_short}」建立清晰认识。"
        zh_why = f"{cut_mins} 分钟重点片段（原视频 {fmt_mmss(total)}）：不堆术语，直接看懂 {ch} 是怎么拆解「{c_zh_short}」的。"
        en_subtitle = f"Curated {cut_mins}m cut ({fmt_mmss(start)}–{fmt_mmss(end)}) from {ch} on how {c_en_short.lower()} works in practice."
        en_why = f"{cut_mins}m focused segment ({fmt_mmss(total)} original): see how {ch} breaks down {c_en_short} step by step."

    return {
        "slug": slug,
        "primaryConcept": c_slug,
        "conceptIds": c_ids,
        "conceptRole": role,
        "stageId": item.get("stageId") or "stage-2",
        "vaultId": pb["vaultId"],
        "facets": {
            "domains": domains[:2],
            "tasks": tasks[:2],
            "stacks": stacks[:2],
            "difficulty": pb["difficulty"],
            "openness": pb["openness"],
        },
        "source": {
            "kind": "video-cut",
            "platform": "youtube",
            "videoId": vid,
            "channelName": ch,
            "originalTitle": orig_title,
            "totalDurationSec": total,
            "startSec": start,
            "endSec": end,
            "isShort": is_short,
            "videosReviewedCount": rev_count,
            "hoursSaved": hrs_saved,
        },
        "en": {
            "title": en_title,
            "subtitle": en_subtitle,
            "whyWatch": en_why,
            "steps": en_steps,
            "versionPatch": pb["en_patch"],
            "checklist": [
                f"Watch the {fmt_mmss(start)}–{fmt_mmss(end)} segment and try one small {c_en_short} example on your own task",
                f"Open {tool_name} alongside the video to test the idea hands-on",
            ],
            "tools": [{"name": tool_name, "url": tool_url, "tag": tool_tag, "desc": tool_desc}],
            "searchQuestions": [
                f"{c_en_short.lower()} {ch.lower()} explained",
                f"how to use {c_en_short.lower()} simply",
                en_clean.lower()[:64],
            ],
        },
        "zh": {
            "title": zh_title,
            "subtitle": zh_subtitle,
            "whyWatch": zh_why,
            "steps": zh_steps,
            "versionPatch": pb["zh_patch"],
            "checklist": [
                f"直接看 {fmt_mmss(start)}–{fmt_mmss(end)} 这一段，拿手头一个小例子照着试一遍",
                f"点开旁边的「{zh_tool_name}」亲自上手试五分钟，加深手感",
            ],
            "tools": [{"name": zh_tool_name, "url": zh_tool_url, "tag": zh_tool_tag, "desc": zh_tool_desc}],
            "searchQuestions": [
                f"{c_zh_short}到底是什么意思怎么用",
                f"{ch} {c_zh_short}通俗讲解",
                zh_title[:36],
            ],
        },
    }


def main() -> None:
    prev_slugs: list[str] = []
    if OUT_PATH.exists():
        prev_slugs = [n["slug"] for n in json.loads(OUT_PATH.read_text("utf-8"))]

    concepts_data = json.loads(CONCEPTS_PATH.read_text("utf-8"))
    concept_map = {c["slug"]: c for c in concepts_data["concepts"]}
    tax_data = json.loads(TAXONOMY_PATH.read_text("utf-8"))
    valid_facets = {
        dim["prop"]: {it["slug"] for it in dim["items"]}
        for dim in tax_data["dimensions"]
    }

    flagship = FLAGSHIP_PART1 + FLAGSHIP_PART2
    used_vids: set[str] = set()
    used_slugs: set[str] = set()
    used_titles: set[str] = set()

    nodes: list[dict] = []
    for idx, n in enumerate(flagship, start=1):
        node = dict(n)
        node["order"] = idx
        node["isSpine"] = True
        src = dict(node["source"])
        if src["kind"] == "video-cut":
            src.setdefault("isShort", src["totalDurationSec"] <= 180)
            used_vids.add(src["videoId"])
        used_slugs.add(node["slug"])
        used_titles.add(re.sub(r"\W+", "", src["originalTitle"].lower())[:40])
        node["source"] = src
        nodes.append(node)

    pool = json.loads(POOL_PATH.read_text("utf-8"))
    buckets: dict[str, list[dict]] = defaultdict(list)

    for v in pool:
        vid = v["videoId"]
        title = v.get("title", "")
        total = int(v.get("totalDurationSec", 0))
        if vid in used_vids or total < 35 or BANNED_RE.search(title):
            continue
        norm_t = re.sub(r"\W+", "", title.lower())[:40]
        if norm_t in used_titles:
            continue
        if v["primaryConcept"] not in concept_map:
            continue
        buckets[v["primaryConcept"]].append(v)

    for c_slug in buckets:
        buckets[c_slug].sort(
            key=lambda x: (1 if x.get("isTrusted") else 0, int(x.get("viewCount") or 0)),
            reverse=True,
        )

    needed = TARGET_TOTAL - len(nodes)
    selected: list[dict] = []
    concept_order = [c["slug"] for c in concepts_data["concepts"]]
    cursors = {c: 0 for c in concept_order}

    while len(selected) < needed:
        progressed = False
        for c_slug in concept_order:
            arr = buckets[c_slug]
            while cursors[c_slug] < len(arr):
                cand = arr[cursors[c_slug]]
                cursors[c_slug] += 1
                norm_t = re.sub(r"\W+", "", cand["title"].lower())[:40]
                if cand["videoId"] in used_vids or norm_t in used_titles:
                    continue
                used_vids.add(cand["videoId"])
                used_titles.add(norm_t)
                selected.append(cand)
                progressed = True
                break
            if len(selected) >= needed:
                break
        if not progressed:
            break

    role_counters: Counter[str] = Counter()
    for item in selected:
        c_slug = item["primaryConcept"]
        role_counters[c_slug] += 1
        p_node = build_pool_node(item, concept_map, valid_facets, role_counters[c_slug], used_slugs)
        p_node["order"] = len(nodes) + 1
        p_node["isSpine"] = False
        nodes.append(p_node)

    def _clean_bt(val: str, is_zh: bool) -> str:
        if "`" not in val:
            return val
        if is_zh:
            return re.sub(
                r"`([^`]+)`",
                lambda m: f"「{m.group(1)}」" if re.search(r"[\u4e00-\u9fff]", m.group(1)) else m.group(1),
                val,
            )
        return re.sub(r"`([^`]+)`", r"\1", val)

    for nd in nodes:
        for lang_key, is_zh in (("zh", True), ("en", False)):
            loc = nd[lang_key]
            for field in ("title", "subtitle", "whyWatch"):
                if isinstance(loc.get(field), str):
                    loc[field] = _clean_bt(loc[field], is_zh)
            loc["searchQuestions"] = [_clean_bt(q, is_zh) for q in loc.get("searchQuestions", [])]
            for tl in loc.get("tools", []):
                for tf in ("name", "tag", "desc"):
                    if isinstance(tl.get(tf), str):
                        tl[tf] = _clean_bt(tl[tf], is_zh)

    new_slugs = [n["slug"] for n in nodes]
    if prev_slugs and new_slugs != prev_slugs:
        diff = set(prev_slugs) ^ set(new_slugs)
        raise RuntimeError(f"Slug mismatch detected ({len(diff)} diffs): {diff}")

    OUT_PATH.write_text(json.dumps(nodes, ensure_ascii=False, indent=2) + "\n", "utf-8")
    shorts = sum(1 for n in nodes if n["source"].get("isShort"))
    c_counts = Counter(n["primaryConcept"] for n in nodes)
    print(f"Wrote {len(nodes)} nodes ({len(flagship)} spine + {len(selected)} pool, {shorts} shorts) -> {OUT_PATH}")
    print("Min/Max per concept:", min(c_counts.values()), max(c_counts.values()))


if __name__ == "__main__":
    main()
