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

- [DESIGN.md](DESIGN.md) — Editorial Screening Gallery tokens, Prussian Mineral Teal & Signal Amber palette, Concept-Wave `A` mark.
- [AGENTS.md](AGENTS.md) — Compliance rules, zero-cost static architecture, build & verification commands.
- [docs/CONCEPT_TRENDS_AND_TAXONOMY.md](docs/CONCEPT_TRENDS_AND_TAXONOMY.md) — Empirical bilingual AI search behavior, vocabulary gaps, and 22-concept lifecycle taxonomy.
- [docs/TIMELINE_AND_DIRECTORY_ARCHITECTURE.md](docs/TIMELINE_AND_DIRECTORY_ARCHITECTURE.md) — Three-perspective IA, schema design, and programmatic SEO/GEO hub rules.
- [docs/CURATED_MEDIA_CATALOG.md](docs/CURATED_MEDIA_CATALOG.md) — Full auto-generated ledger of all verified YouTube cuts, Bilibili deep-links, and primary research digests.
