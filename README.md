# AITube — AI Concept Trend Timeline × High-Signal Video Slice Index

> **Live Production Site (GitHub Pages)**:
> - **简体中文首页**: [https://lufie.github.io/AITube/zh/](https://lufie.github.io/AITube/zh/)
> - **AI 概念趋势时间线与血缘泳道图谱 (`2017–2026`)**: [https://lufie.github.io/AITube/zh/timeline/](https://lufie.github.io/AITube/zh/timeline/)
> - **多维实战视频切片检索库 (`280` 支)**: [https://lufie.github.io/AITube/zh/directory/](https://lufie.github.io/AITube/zh/directory/)
> - **English Edition**: [https://lufie.github.io/AITube/en/](https://lufie.github.io/AITube/en/)

**AITube** is a bilingual (`简体中文` & `English`), zero-server-cost editorial screening gallery and chronological AI concept evolution index (`2017–2026`). Built as the AI-paradigm sister publication to **Growthtube**, AITube combines timestamp-sliced primary talks with a **Concept Trend Timeline & Causal Lineage Horizon Map**, backed by a ground-truth **Master Video & Tagging Database (`database/`)** and an empirical **Google & AI Search Research Archive (`research/`)**.

---

## Repository Directory Structure

```text
AITube/
├── AGENTS.md                        # Engineering, video sourcing, research & compliance charter
├── README.md                        # Project overview, directory map & standard commands
├── .agent/rules/                    # Always-on modular workspace rules
│   ├── 01-video-discovery-and-ingestion.md
│   ├── 02-search-trends-and-keyword-research.md
│   └── 03-ui-copy-and-compliance.md
├── .agents/skills/                  # Step-by-step operational skills for agents
│   ├── discover-and-ingest-videos/SKILL.md
│   └── research-search-trends/SKILL.md
├── content/                         # Runtime Single Source of Truth (JSON)
│   ├── concepts.json                # 5 Eras × 22 AI concepts (trendSeries, lifecycle, lineage)
│   ├── nodes.json                   # 280 verified slices (52 spine + 228 practitioner/Shorts/digests)
│   ├── taxonomy.json                # 3 orthogonal dimensions (20 topic facets) + bilingual synonyms
│   ├── stages.json                  # 4 progressive zero-to-production roadmap stages
│   └── vault.json                   # 5 copyable open-source engineering blueprints
├── database/                        # Ground-Truth Video URL & Multi-Dimensional Tagging Database
│   ├── README.md                    # Database architecture & 36-column field dictionary
│   ├── VIDEO_SOURCING_AND_INGESTION_SPEC.md  # Video search SOP, Tier 1–3 whitelist & tagging spec
│   ├── MASTER_VIDEO_LEDGER.md       # Human-readable ledger with timestamped watch links & tag stats
│   ├── master_video_ledger.csv      # UTF-8-BOM spreadsheet (Excel / Feishu / Notion ready)
│   ├── master_video_ledger.json     # Structured flat JSON ledger (enforced 1:1 with nodes.json)
│   └── raw_verified_youtube_pool.json        # Raw oEmbed-verified YouTube candidate pool
├── research/                        # AI Search (GEO/AIO) & Google Keyword Trends Archive
│   ├── README.md                    # Research index & reproduction commands
│   ├── GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md # Anchor Trends, bot de-noising & 3-surface Suggest SOP
│   ├── GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md # Empirical AI SEO/GEO/AIO & Trends report
│   ├── AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md # 2023→2026 AI concept shift & taxonomy report
│   └── datasets/                    # Raw empirical JSON datasets (540+ Suggest queries + 5y Trends)
│       ├── aitube_google_yt_suggest_104.json
│       ├── growthtube_google_trends_5y.json
│       ├── growthtube_google_yt_suggest_367.json
│       └── growthtube_baidu_suggest_69.json
├── docs/                            # Product, Design & Information Architecture Specs
│   ├── PRODUCT.md
│   ├── DESIGN.md
│   └── ARCHITECTURE.md
├── scripts/                         # Automation, Sync, Harvest, Research & Gatekeepers
│   ├── sync_master_ledger.py        # Generates database/{MASTER_VIDEO_LEDGER.md, .csv, .json}
│   ├── validate-content.mjs         # Validates schemas, slice windows & 1:1 database parity
│   ├── verify-dist.mjs              # Audits all 656 static HTML pages (H1, OG, JSON-LD, links)
│   ├── harvest/                     # YouTube oEmbed harvester, node builder & seed_data/
│   ├── research/                    # Live Google Trends anchor & Google/YT/Baidu Suggest collectors
│   └── brand/                       # Brand icon & 1200×630 Open Graph card renderer
└── web/                             # Astro 5 static frontend (Apple Liquid Glass, Vanilla CSS)
```

---

## Standard Workflow & Commands

```bash
# 1. Install frontend dependencies
npm --prefix web install

# 2. Sync ground-truth video URL & tagging ledger (.md / .csv / .json) after editing content/*.json
python3 scripts/sync_master_ledger.py

# 3. Validate content schemas, timestamp bounds & 1:1 master ledger parity
node scripts/validate-content.mjs

# 4. Build & verify all 656 static HTML pages (root '/' or GitHub Pages '/AITube')
npm --prefix web run build
SITE_URL=https://lufie.github.io BASE_PATH=/AITube npm --prefix web run build
```

Automated production deployment to **GitHub Pages** runs on pushes to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
