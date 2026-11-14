---
trigger: always_on
description: Mandatory SOP whenever discovering, selecting, slicing, tagging, or modifying video/article nodes in AITube.
---

# Rule 01 — Video Discovery, Quality Gate, Slicing & Master Ledger Sync

Whenever a task involves finding new videos, expanding coverage for an AI concept, editing `content/nodes.json`, or updating `database/`, follow [`database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](../../database/VIDEO_SOURCING_AND_INGESTION_SPEC.md) without exception:

1. **Demand-First Discovery (Never Generic Scraping)**:
   - Anchor every video search to real user queries and paradigm comparisons documented in `research/` (e.g., `prompt engineering vs context engineering`, `mcp vs claude skills`, `deepseek r1 rlvr`, `comfyui consistent character workflow`).
   - One node solves **one atomic engineering or conceptual question**. Never reuse the same `{platform}:{videoId}` across multiple nodes.

2. **Source Authority & Anti-Hype Blocklist**:
   - **Select from Tier 1–3**: Primary AI labs (`Anthropic`, `OpenAI`, `DeepSeek`, `Google DeepMind`), university courses & visual pioneers (`Stanford CS336/CS25`, `3Blue1Brown`, `Andrej Karpathy`, `Welch Labs`, `StatQuest`, `跟李沐学AI`, `李宏毅`), and proven practitioners (`AI Engineer`, `Latent Space`, `Hamel Husain`, `Simon Willison`, `Umar Jamil`, `Y Combinator`, `AssemblyAI`, `Unsloth`).
   - **Hard Reject**: Get-rich-quick / "make \$10k with AI" clickbait, crypto/Web3 AI tokens, course mills (`Simplilearn`, `Edureka`, `Great Learning`), pure news-reading reaction videos, and unverified or non-embeddable uploads.

3. **Machine Verification & Timestamp Slicing**:
   - **YouTube**: Must pass `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={videoId}&format=json` (`HTTP 200`) and verify real `totalDurationSec` with integer `0 <= startSec < endSec <= totalDurationSec`.
   - **Bilibili**: Must pass `https://api.bilibili.com/x/web-interface/view?bvid={bvid}` (`code === 0`).
   - **Slice Window**: Skip intros, housekeeping, and sponsor reads. Isolate the exact `3–22 min` mechanism/demo core (`1–3 min` for `isShort: true`).

4. **Plain-Human Copy & Complete 7-Dimension Tagging**:
   - Provide natural, jargon-free `zh` and `en` copy (`title`, `subtitle`, `whyWatch`, **exact 3 `steps`** with inline backtick operators, `versionPatch` for 2026 context, `checklist`, `tools`, and `2–3` authentic `searchQuestions`).
   - Tag every node across all 7 dimensions: `primaryConcept`, `conceptIds`, `conceptRole` (`origin` | `practice` | `frontier`), `stageId` (`stage-0`..`stage-3`), `vaultId`, `isSpine`, and `facets` (`domains`, `tasks`, `stacks`, `difficulty`, `openness`).

5. **Mandatory Sync & Gatekeeper Execution**:
   - Always run `python3 scripts/sync_master_ledger.py` followed by `node scripts/validate-content.mjs` so `database/MASTER_VIDEO_LEDGER.md`, `database/master_video_ledger.csv`, and `database/master_video_ledger.json` remain 100% synchronized with `content/nodes.json`.
