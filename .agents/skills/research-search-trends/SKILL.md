---
name: research-search-trends
description: Conduct empirical Google Trends (anchor-normalized with bot-inflation control batches), Google/YouTube/Baidu autocomplete triangulation, and AI Search (GEO/AIO/AI Mode) keyword research.
---

# Skill: Empirical Google Keyword & AI Search (GEO) Trend Research

Use this skill whenever evaluating search demand for new AI paradigms, auditing vocabulary gaps between English and Chinese users, or planning new Concept Hubs / Topic Hubs.

## Step-by-Step Workflow

1. **Read the Research Specification & Prior Baselines**:
   - Review [`research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`](../../../research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md).
   - Consult existing baselines in [`research/GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md`](../../../research/GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md) and [`research/AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md`](../../../research/AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md).

2. **Build Dual-Track Seed Matrix**:
   - Draft seeds across 4 angles in both English and Chinese:
     1. Canonical technical terms (`context engineering`, `上下文工程`)
     2. Plain-human goal / problem phrases (`why ai forgets long chat`, `大模型聊久了变笨`)
     3. Architectural `vs` comparisons (`mcp vs agent skills`, `rag vs fine tuning`)
     4. Concrete tool / workflow actions (`claude code worktree`, `comfyui flux锁脸`)

3. **Execute Live 3-Surface Suggest & Anchor-Normalized Trends Collection**:
   - Run autocomplete triangulation (`Google Web` + `YouTube ds=yt` + `Baidu`) and `pytrends` 5-year series with a fixed shared anchor (`--anchor "prompt engineering"`) plus the mandatory everyday control batch (`weather`, `recipe`, `calculator`, `translate`):
     ```bash
     python3 scripts/research/collect_ai_trends.py
     uv run --with pytrends python3 scripts/research/collect_google_trends_anchor.py --anchor "prompt engineering"
     ```
   - Save raw, unmodified JSON outputs under `research/datasets/`.

4. **De-Noise & Synthesize into Taxonomy / Content**:
   - Compute `ShareGain vs Anchor` rather than citing raw multi-year multiples or third-party monthly volume guesses.
   - Document EN vs. ZH **Vocabulary Gaps** and update synonyms in `content/taxonomy.json`.
   - Enforce hub thresholds before creating new routes: `>= 5` verified nodes for a Concept Hub (`content/concepts.json`) and `>= 3` verified nodes for a Topic Hub (`content/taxonomy.json`).
