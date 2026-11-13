# AITube — AI Concept Trend Timeline × High-Signal Video Slice Index

**AITube** is a bilingual (`简体中文` & `English`) static editorial screening gallery and concept evolution index for modern AI (`2017–2026`). Built as a sister publication to **Growthtube**, AITube pairs an archival editorial aesthetic with a signature **Concept Trend Timeline Index (`概念趋势时间线索引视角`)**.

---

## Core Architecture & Perspectives

1. **Concept Trend Timeline Index (`/[lang]/timeline/`)**
   - Chronological 5-Era progression (`2017–2022` Foundational Era → `2025 H2–2026` Context, Skills & Agentic Engineering).
   - **22 Canonical AI Concepts** with `originQuarter → inflectionQuarter`, 10-point empirical momentum sparklines (`22H2–26Q3`), lifecycle status (`▲ Surging`, `● Mainstream`, `◆ Foundational`, `↻ Evolved`), `Before → After` paradigm shifts, upstream/downstream lineage DAG links, and 3 representative cuts (`Origin`, `Practice`, `Frontier`).
2. **Concept Hubs (`/[lang]/concepts/[slug]/`)**
   - Dedicated bilingual hubs for all 22 concepts (`DefinedTerm` + `CollectionPage` + `FAQPage` JSON-LD).
3. **Multi-Faceted Video Directory (`/[lang]/directory/`)**
   - Cross-filter **280 verified implementation slices** across `Concept Era × AI Layer × Core Task × Stack`, lifecycle badges, and natural-language engineering questions.
4. **4-Stage Learning Roadmap (`/[lang]/roadmap/`)**
   - Sequences **52 Flagship Spine Cuts** from `Stage 00` Model Intuition to `Stage 03` Production Agents, `SKILL.md` Bundles & Eval Flywheels.
5. **Single-Video Screening Room (`/[lang]/nodes/[slug]/`)**
   - `16:9` darkroom poster that removes DOM overlays 100% on play to mount unobstructed `youtube-nocookie.com/embed/...` players, proportional `SliceTimeline` timestamp seek controls, 3-step SOP with 1-click copyable `.at-op-chip` inline operators, `2026 Version Patch`, and persistent read tracking.
6. **Open Blueprint Vault (`/[lang]/vault/`) & LLM Discovery (`/llms.txt`, `/llms-full.txt`)**
   - Zero-email copyable specs (`AGENTS.md`, `SKILL.md`, Binary LLM Judge Rubric, Contextual Hybrid RAG, Keyframe Multimodal Storyboard).

---

## Repository Structure

```text
AITube/
├── AGENTS.md                 # Repository harness & build verification rules
├── DESIGN.md                 # Editorial Screening Gallery design tokens (Prussian Mineral Teal + Signal Amber)
├── PRODUCT.md                # Audience, editorial standards & anti-hype policy
├── content/                  # Single source of truth JSON databases
│   ├── concepts.json         # 5 Eras + 22 AI concepts with trendSeries & lineage
│   ├── nodes.json            # 280 verified cuts (52 spine + 228 oEmbed-verified pool cuts)
│   ├── taxonomy.json         # 3 orthogonal dimensions (20 topic facets) + synonyms
│   ├── stages.json           # 4 progressive curriculum stages
│   └── vault.json            # 5 open-source engineering blueprints
├── docs/
│   ├── CONCEPT_TRENDS_AND_TAXONOMY.md
│   ├── TIMELINE_AND_DIRECTORY_ARCHITECTURE.md
│   └── CURATED_MEDIA_CATALOG.md
├── scripts/
│   ├── research/             # Live Google & YouTube autocomplete evidence collector
│   ├── harvest/              # YouTube oEmbed harvester & 280-node dataset builder
│   ├── brand/                # Pillow brand icon & 32 editorial Open Graph PNG renderer
│   ├── validate-content.mjs  # Schema, slice window & taxonomy gate
│   └── verify-dist.mjs       # Static HTML h1, canonical, OG file, JSON-LD & broken-link gate
└── web/                      # Astro 5 static site (Vanilla CSS, zero Tailwind, Cloudflare Pages ready)
```

---

## Local Development & Deterministic Verification

```bash
# 1. Install frontend dependencies
npm --prefix web install

# 2. Validate content schemas, run Astro typecheck, build static dist, and audit all 650+ HTML pages
npm --prefix web run build

# 3. Regenerate brand icons & Open Graph cards (optional)
uv run --with pillow python3 scripts/brand/render_assets.py
```
