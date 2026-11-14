# PRODUCT.md — AITube Product Architecture & Editorial Logic

## 1. Core Thesis

AI learners, engineers, product builders, and creators do not suffer from a shortage of AI videos — they suffer from **two compounding forms of noise**:
1. **Temporal & Hype Noise**: Hour-long podcasts, clickbait "AI news" roundups, and outdated tutorials where a 2023 prompt trick or rigid chain has already been superseded by a 2025–2026 paradigm (`Prompt Engineering → Context Engineering`, `Ad-hoc Tool JSON → MCP + Agent Skills`, `Autocomplete → Agentic CLI Harnesses`, `RLHF → RLVR Test-Time Reasoning`).
2. **Timestamp Noise**: Even in primary talks by Andrej Karpathy, Anthropic Engineering, 3Blue1Brown, Stanford CS336, or Hamel Husain, the decisive architectural diagram or workflow demo often lives in a **6-to-14 minute window** inside a 60–180 minute recording.

**AITube** solves both problems simultaneously by combining Growthtube's **timestamp-sliced actionable SOP library** with a first-class **Concept Trend Timeline Index (`概念趋势时间线索引视角`)**.

---

## 2. Three Coexisting Navigation Perspectives

| Perspective | Route | User Question Answered | Core Mechanism |
| :--- | :--- | :--- | :--- |
| **① Concept Trend Timeline (`概念趋势时间线`)** | `/[lang]/timeline/` & `/[lang]/concepts/[slug]/` | *"When did this AI concept emerge, is it surging or already superseded in 2026, and what did it evolve from/into?"* | 22 canonical AI concepts mapped across 5 eras (`2017–2022` → `2026`), each with emergence/inflection quarters, 10-point trend sparklines, lifecycle status, before/after paradigm notes, lineage links, and ordered *Origin → Practice → Frontier* cuts. |
| **② Multi-Dimensional Directory & NL Ask (`多维实战索引`)** | `/[lang]/directory/` & `/[lang]/topics/[dim]/[slug]/` | *"I have a specific engineering or workflow problem right now — show me the exact 8 minutes and steps."* | Sticky 2-level faceted sidebar (`Domain × Task × Stack` + `Concept Era`) with zero-dead-end live counts, segmented lifecycle/source filters, natural-language direct-answer search (`⌘K`), and lazy pagination across 250+ verified cuts. |
| **③ Zero-to-Production Roadmap (`从零构建学习路线`)** | `/[lang]/roadmap/` | *"I want a structured curriculum from foundational intuition to production agents and multimodal workflows."* | 4 sequential stages (`00 底层直觉` → `01 上下文与多模态` → `02 RAG、MCP 与自主编程` → `03 生产级 Agent、Skills 与评测`) curating the 52 flagship spine cuts with persistent checklist progress. |

Plus **`/[lang]/vault/` (`实战蓝图箱`)**: Open-source, inspectable engineering templates (`AGENTS.md`/`CLAUDE.md` harness, `SKILL.md` progressive skill pack, LLM Judge Eval rubric, Hybrid Agentic RAG checklist, ComfyUI & Video storyboard spec).

---

## 3. Canonical Documentation Index

- [`docs/DESIGN.md`](DESIGN.md) — Calm Apple Liquid Glass & Editorial Screening Gallery visual system.
- [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) — Three-perspective IA, schema design, and programmatic SEO/GEO hub rules.
- [`../AGENTS.md`](../AGENTS.md) — Compliance charter, video sourcing & research rules, and build commands.
- [`../database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](../database/VIDEO_SOURCING_AND_INGESTION_SPEC.md) — Video discovery, 3-tier source whitelist, slicing, and 7-dimension tagging SOP.
- [`../database/MASTER_VIDEO_LEDGER.md`](../database/MASTER_VIDEO_LEDGER.md) — Full auto-synced ground-truth ledger of all 280 verified video URLs, slice windows, and tags (`.md` / `.csv` / `.json`).
- [`../research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`](../research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md) — Google Trends anchor methodology, bot-inflation filtering, and AI Search (`AI SEO / GEO / AIO`) research SOP.
- [`../research/GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md`](../research/GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md) & [`../research/AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md`](../research/AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md) — Empirical keyword & concept trend reports.
