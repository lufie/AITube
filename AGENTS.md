# AGENTS.md — AITube Engineering, Content Sourcing, Research & Compliance Charter

> **Positioning**: AITube is the AI-paradigm sister publication to Growthtube — a bilingual (`zh` / `en`), zero-server-cost, static editorial screening library and **chronological AI concept trend index (`2017–2026`)**.

---

## 1. Repository Directory Architecture

Keep the root directory strictly clean. Every file belongs to a dedicated layer:

- `content/` — **Runtime Single Source of Truth (`*.json`)**: `concepts.json` (5 eras × 22 AI concepts), `nodes.json` (280 verified slices), `taxonomy.json` (3 orthogonal dimensions × 20 facets + synonyms), `stages.json` (4 roadmap stages), `vault.json` (5 open engineering blueprints).
- `database/` — **Ground-Truth Video URL & Tagging Master Ledger**:
  - `VIDEO_SOURCING_AND_INGESTION_SPEC.md`: Mandatory SOP for discovering, vetting, slicing, writing copy, and tagging videos.
  - `MASTER_VIDEO_LEDGER.md` / `master_video_ledger.csv` (`UTF-8-BOM`) / `master_video_ledger.json`: Auto-synced 280-row master database tracking every watch URL, timestamped slice URL (`?t=...`), embed URL, slice bounds, and all 7 tag dimensions.
  - `raw_verified_youtube_pool.json`: Raw oEmbed-verified YouTube candidate pool.
- `research/` — **AI Search Trends & Google Keyword Research Archive**:
  - `GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`: Repeatable Google Trends + AI Search (`AI SEO / GEO / AEO / AIO / AI Mode`) + 3-surface Autocomplete research SOP.
  - `GROWTHTUBE_AI_SEARCH_AND_GOOGLE_TRENDS_REPORT.md` & `AITUBE_CONCEPT_TRENDS_AND_TAXONOMY.md`: Empirical baseline reports.
  - `datasets/*.json`: Raw Google Trends 5y series, control batches, and Google/YouTube/Baidu autocomplete evidence (`540+` seed queries).
- `docs/` — **Product, Visual Design & IA Specs**: `PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`.
- `scripts/` — **Sync, Validation, Harvest, Research & Asset Pipelines**: `sync_master_ledger.py`, `validate-content.mjs`, `verify-dist.mjs`, `harvest/`, `research/`, `brand/`.
- `web/` — **Astro 5 Static Frontend**: Pure static HTML/CSS/JS output (`web/dist/`), Apple Liquid Glass calm visual system.
- `.agent/rules/` & `.agents/skills/` — Modular agent rules and step-by-step operational skills.

---

## 2. Non-Negotiable Compliance & Cost Guardrails

1. **100% Free & Unmodified Third-Party Video Playback**:
   - All YouTube nodes use a clean click-to-play darkroom screening poster (`ScreeningStage.astro`). Upon click, the poster DOM is **100% removed** and replaced by an unobstructed, unmodified `https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&start={startSec}&end={endSec}&rel=0` iframe. Never overlay custom controls, watermarks, or paywalls over embedded players, and never download/re-host third-party video streams.
   - All Bilibili nodes link cleanly via official timestamp deep-links (`https://www.bilibili.com/video/{bvid}/?t={startSec}`) with creator attribution.
   - All first-party research/engineering digests (`article-digest`) attribute original authors/labs (`Anthropic`, `OpenAI`, `DeepSeek`, `Stanford`, `Lilian Weng`, `Simon Willison`, `Hamel Husain`, etc.) and link prominently to the primary source.
2. **\$0 Runtime Server Cost & Zero Secret Exposure**:
   - Pure static site generation (`Astro` static output in `web/dist/`), deployable directly to GitHub Pages / Cloudflare Pages / Workers Static Assets.
   - Natural-language direct-answer search and multi-dimensional facet + timeline filtering run 100% client-side against decoupled static JSON corpora (`/search-corpus-zh.json`, `/search-corpus-en.json`) with `<50ms` latency and zero paid API calls.

---

## 3. Mandatory Video Discovery, Slicing & Ledger Sync Rules

Whenever searching for, adding, replacing, or editing any video node, **you MUST follow [`database/VIDEO_SOURCING_AND_INGESTION_SPEC.md`](database/VIDEO_SOURCING_AND_INGESTION_SPEC.md)** and [`.agent/rules/01-video-discovery-and-ingestion.md`](.agent/rules/01-video-discovery-and-ingestion.md):

1. **Search-First & 3-Tier Authority Gate**:
   - Start from real bilingual user queries in `research/` rather than vague generic keywords.
   - Prioritize **Tier 1** primary labs & canonical educators (`3Blue1Brown`, `Andrej Karpathy`, `Anthropic`, `OpenAI`, `DeepSeek`, `Stanford`, `Google DeepMind`, `Welch Labs`, `Hamel Husain`, `Simon Willison`, `跟李沐学AI`, `李宏毅`) and **Tier 2** verified engineering practitioners (`AI Engineer`, `Latent Space`, `Umar Jamil`, `Y Combinator`, `StatQuest`, `AssemblyAI`, `Unsloth`, etc.).
   - **Zero-Tolerance Blocklist**: Reject get-rich-quick/passive-income clickbait, crypto tokens, course mills (`Simplilearn`, `Edureka`, etc.), drama/reaction channels, and affiliate-only SaaS promos.
2. **Machine-Verified Embeddability & Exact Timestamp Bounds**:
   - Every YouTube `videoId` MUST return `HTTP 200` from `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={videoId}&format=json` and have verified integer `totalDurationSec` satisfying `0 <= startSec < endSec <= totalDurationSec`.
   - Every Bilibili `bvid` MUST return `code === 0` via `api.bilibili.com/x/web-interface/view`.
   - Strip sponsor reads and intros; isolate the decisive `3–22 min` window (`1–3 min` for Shorts). Never duplicate `{platform}:{videoId}` across nodes.
3. **Plain-Human Bilingual Copy & Complete 7-Dimension Tagging**:
   - Write jargon-free, plain-human `zh` and `en` titles/subtitles ("讲人话"), exactly **3 actionable SOP steps** (with inline backticks for copyable `.at-op-chip` commands/parameters), a `2026 Version Patch`, `>= 2` checklist items, `>= 1` tool link, and `2–3` real `searchQuestions`.
   - Populate all required tags: `primaryConcept`, `conceptIds`, `conceptRole` (`origin`/`practice`/`frontier`), `stageId`, `vaultId`, and `facets.{domains,tasks,stacks,difficulty,openness}`.
4. **Mandatory Master Ledger Synchronization**:
   - After ANY edit to `content/*.json`, immediately run `python3 scripts/sync_master_ledger.py` so `database/MASTER_VIDEO_LEDGER.md`, `database/master_video_ledger.csv`, and `database/master_video_ledger.json` stay in **100% 1:1 parity** (`scripts/validate-content.mjs` fails the build if out of sync).

---

## 4. Mandatory Search Trends & Keyword Research Rules

Whenever researching new AI concepts, evaluating search demand, or planning new Topic/Concept Hubs, **you MUST follow [`research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md`](research/GOOGLE_AND_AI_SEARCH_RESEARCH_SPEC.md)** and [`.agent/rules/02-search-trends-and-keyword-research.md`](.agent/rules/02-search-trends-and-keyword-research.md):

1. **Zero Fabricated Search Volumes**: Never invent or cite unverified monthly search volume numbers; use **Anchor-Normalized Google Trends Relative Index (`Anchor = 100`)** and **Share Gain vs. Anchor** (`scripts/research/collect_google_trends_anchor.py`).
2. **Bot-Inflation De-Noising**: Always compare against an everyday control batch (`weather`, `recipe`, `calculator`, `translate`) to strip out 2025–2026 AI/SEO crawler baseline inflation, and ignore micro-population geo outliers (`St. Helena`).
3. **3-Surface Triangulation & EN/ZH Dual-Track Naming**: Collect live suggestions across `Google Web` + `YouTube (ds=yt)` + `Baidu`, respect EN/ZH vocabulary gaps (never mechanically translate labels), archive raw JSON outputs in `research/datasets/`, and enforce `>= 5` verified nodes per Concept Hub and `>= 3` verified nodes per Topic Hub.

---

## 5. Bilingual Parity, UI Calmness & Standard Commands

- Symmetric `/zh/...` and `/en/...` routes across Home, Concept Timeline (`/timeline/`), Concept Hubs (`/concepts/[slug]/`), Faceted Directory (`/directory/`), Topic Hubs (`/topics/[dimension]/[slug]/`), Learning Roadmap (`/roadmap/`), Screening Rooms (`/nodes/[slug]/`), and Vault (`/vault/`).
- Every page ships exactly one `<h1>`, canonical URL, `hreflang` (`en`, `zh-Hans`, `x-default`), custom `1200×630` OG card, `@graph` JSON-LD (`DefinedTerm`, `HowTo`, `ItemList`, `FAQPage`, `BreadcrumbList`), `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/llms-full.txt`.

```bash
# 1. Sync ground-truth video URL & tagging ledger (.md / .csv / .json) from content/*.json
python3 scripts/sync_master_ledger.py

# 2. Validate content schemas, slice bounds, taxonomy minimums & 1:1 ledger parity
node scripts/validate-content.mjs

# 3. Render brand icons and Open Graph cards (when brand/concepts change)
uv run --with pillow python3 scripts/brand/render_assets.py

# 4. Typecheck, build static pages, and run zero-dead-link & SEO/GEO gatekeeper
npm --prefix web run build
```
