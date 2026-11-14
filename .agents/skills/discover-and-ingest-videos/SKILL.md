---
name: discover-and-ingest-videos
description: Discover, verify (oEmbed HTTP 200), slice timestamps, tag across 7 dimensions, and ingest new AI videos into content/nodes.json and database/ master ledgers.
---

# Skill: Discover & Ingest Verified Videos into AITube

Use this skill whenever asked to find new AI videos, add nodes for a new or existing AI concept, refresh outdated tutorials, or expand `content/nodes.json`.

## Step-by-Step Workflow

1. **Read the Canonical Specification**:
   - Open and review [`database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](../../../database/VIDEO_SOURCING_AND_INGESTION_SPEC.md).
   - Check [`database/master_video_ledger.json`](../../../database/master_video_ledger.json) to inspect current concept/facet counts and ensure zero duplicate `slug` or `{platform}:{videoId}`.

2. **Search Using Authentic Queries & Authority Whitelist**:
   - Pull real bilingual search phrases from `research/datasets/aitube_google_yt_suggest_104.json` (or run `scripts/research/collect_ai_trends.py` for new topics).
   - Search YouTube (`scripts/harvest/harvest_ai_youtube.py` or targeted queries) prioritizing **Tier 1** (`3Blue1Brown`, `Andrej Karpathy`, `Anthropic`, `OpenAI`, `DeepSeek`, `Stanford`, `Google DeepMind`, `Welch Labs`, `Hamel Husain`, `Simon Willison`, `跟李沐学AI`, `李宏毅`) and **Tier 2** (`AI Engineer`, `Latent Space`, `Umar Jamil`, `Y Combinator`, `AssemblyAI`, `Unsloth`).
   - Strictly filter out get-rich-quick clickbait, crypto tokens, course mills (`Simplilearn`, `Edureka`), and reaction channels.

3. **Run Machine Verification & Slice Precision Check**:
   - Verify YouTube embeddability via `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={videoId}&format=json` (`HTTP 200`) and fetch exact `totalDurationSec`.
   - Verify Bilibili `bvid` via `https://api.bilibili.com/x/web-interface/view?bvid={bvid}` (`code === 0`).
   - Choose integer `[startSec, endSec]` (`0 <= startSec < endSec <= totalDurationSec`) skipping intros/sponsors to isolate the `3–22 min` core mechanism or demo (`1–3 min` for Shorts).

4. **Author Plain-Human Bilingual Copy & 7-Dimension Tags**:
   - Add the node entry to `content/nodes.json` with:
     - `primaryConcept`, `conceptIds`, `conceptRole` (`origin` | `practice` | `frontier`), `stageId`, `vaultId`, `isSpine`
     - `facets`: non-empty `domains`, `tasks`, `stacks`, plus `difficulty` and `openness`
     - Plain-human `zh` and `en` objects: `title`, `subtitle`, `whyWatch`, **3 `steps`** (wrap commands/params in backticks), `versionPatch` (2026 context), `checklist` (`>= 2`), `tools` (`>= 1`), and `searchQuestions` (`2–3` real queries).

5. **Synchronize Master Database & Verify Build**:
   ```bash
   python3 scripts/sync_master_ledger.py
   node scripts/validate-content.mjs
   npm --prefix web run build
   ```
