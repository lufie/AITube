---
trigger: always_on
description: Mandatory SOP whenever conducting keyword research, Google Trends analysis, AI search (GEO/AEO/AIO) research, or taxonomy/concept expansion.
---

# Rule 02 — Google Keyword Trends & AI Search (GEO / AIO / AI Mode) Research SOP

Whenever analyzing search demand, proposing new AI concepts (`content/concepts.json`), adding directory facets (`content/taxonomy.json`), or optimizing for SEO / Generative Engine Optimization (GEO), follow [`research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`](../../research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md):

1. **Zero Fabricated Absolute Volumes — Anchor-Normalized Relative Index Only**:
   - Never cite or guess absolute monthly search volumes (commercial tools diverge by up to `9×`).
   - Always include a shared **Anchor Keyword (`Anchor = 100`)** across every `pytrends` 5-keyword batch (`scripts/research/collect_google_trends_anchor.py`) and evaluate **Share Gain vs. Anchor** (`last_12m / first_12m` relative to the anchor).

2. **Strip Crawler Inflation & Micro-Geo Noise**:
   - Always run the everyday control batch (`weather`, `recipe`, `calculator`, `translate`) to separate genuine demand growth from 2025–2026 AI/SEO rank-tracker bot inflation.
   - Exclude tiny-sample proxy outlier regions (e.g., `St. Helena`) when interpreting geographic concentration.

3. **3-Surface Autocomplete Triangulation & EN/ZH Vocabulary Gap Rule**:
   - Gather live query completions from **Google Web (`en` + `zh-CN`)**, **YouTube (`ds=yt`, `en` + `zh-CN`)**, and **Baidu (`zh`)**, saving untouched raw JSON outputs into `research/datasets/`.
   - Never mechanically translate titles or facet labels between English and Chinese: pair English `vs` architectural comparison phrasing and plain commercial terms (e.g., `AI SEO & GEO`, `agentic rag vs rag`) with authentic Chinese phrasing (`GEO优化`, `是什么 / 原理 / 实战教程`).

4. **AI Search (AIO / AI Mode / LLM Citation) Structural Alignment**:
   - Target conversational, context-rich queries (`3×` longer in Google AI Mode; `what / how / which` comparisons) via `Before → After` paradigm cards, `searchQuestions` (`FAQPage` JSON-LD), concrete copyable parameters (`.at-op-chip`), `/llms.txt` + `/llms-full.txt`, and hard anti-thin-content thresholds (`>= 5` nodes per Concept Hub, `>= 3` nodes per Topic Hub).
