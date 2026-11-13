# AGENTS.md — AITube Engineering & Compliance Charter

> **Positioning**: AITube is the AI-paradigm sister publication to Growthtube — a bilingual (`zh` / `en`), zero-server-cost, static editorial screening library and **chronological AI concept trend index**.

---

## 1. Non-Negotiable Compliance & Cost Guardrails

1. **100% Free & Unmodified Third-Party Video Playback**:
   - All YouTube nodes use a clean click-to-play darkroom screening poster (`ScreeningStage.astro`). Upon click, the poster DOM is **100% removed** and replaced by an unobstructed, unmodified `https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&start={startSec}&end={endSec}&rel=0` iframe. Never overlay custom controls, watermarks, or paywalls over embedded players, and never download/re-host third-party video streams.
   - All Bilibili nodes link cleanly via official timestamp deep-links (`https://www.bilibili.com/video/{bvid}/?t={startSec}`) with creator attribution.
   - All first-party research/engineering digests (`article-digest`) attribute original authors/labs (Anthropic, OpenAI, DeepSeek, Stanford, Lilian Weng, Simon Willison, Hamel Husain, etc.) and link prominently to the primary source.
2. **$0 Runtime Server Cost & Zero Secret Exposure**:
   - Pure static site generation (`Astro` static output in `web/dist/`), deployable directly to Cloudflare Workers Static Assets / Cloudflare Pages.
   - Natural-language direct-answer search and multi-dimensional facet + timeline filtering run 100% client-side against decoupled static JSON corpora (`/search-corpus-zh.json`, `/search-corpus-en.json`) with `<50ms` latency and zero paid API calls.
3. **Zero Fabricated Video IDs or Out-of-Bounds Timestamps**:
   - Every YouTube `videoId` in `content/nodes.json` must be publicly embeddable (`HTTP 200` via YouTube official `oEmbed`), with `0 <= startSec < endSec <= totalDurationSec`.
   - Every build runs `node scripts/validate-content.mjs` and `node scripts/verify-dist.mjs` before completion.

---

## 2. Core Architectural Pillars

1. **Single Source of Truth (`content/*.json`)**:
   - `content/concepts.json`: Chronological AI Concept Nodes (`2017–2022` → `2026`), capturing emergence quarter, inflection quarter, normalized trend curve, YoY momentum, lifecycle status (`surging` / `mainstream` / `foundational` / `evolved`), before/after paradigm shift, and upstream/downstream lineage (`from` → `into`).
   - `content/taxonomy.json`: Flat 2-level orthogonal facets (`domains` × `tasks` × `stacks`) + bilingual search synonym map.
   - `content/stages.json`: 4-stage Zero-to-Production AI Learning Roadmap (`Stage 00` → `Stage 03`).
   - `content/nodes.json`: Bilingual curated cuts (`isSpine: true` flagship spine + full oEmbed-verified practitioner & Shorts library).
   - `content/vault.json`: Open-source AI engineering blueprints (`AGENTS.md`, `SKILL.md`, Eval Rubrics, Hybrid RAG, Multimodal Storyboard Specs).
2. **Bilingual Parity & SEO / GEO First**:
   - Symmetric `/zh/...` and `/en/...` routes across Home, Concept Timeline (`/timeline/`), Concept Hubs (`/concepts/[slug]/`), Faceted Directory (`/directory/`), Topic Hubs (`/topics/[dimension]/[slug]/`, generated only when `>= 3` nodes exist), Learning Roadmap (`/roadmap/`), Screening Rooms (`/nodes/[slug]/`), and Vault (`/vault/`).
   - Every page ships exactly one `<h1>`, canonical URL, `hreflang` (`en`, `zh-Hans`, `x-default`), custom `1200×630` OG card, `@graph` JSON-LD (`DefinedTerm`, `HowTo`, `ItemList`, `FAQPage`, `BreadcrumbList`), `/sitemap.xml`, `/robots.txt` welcoming AI search crawlers, `/llms.txt`, and `/llms-full.txt`.

---

## 3. Standard Commands

```bash
# 1. Validate content schema, concept lineage, and timestamp bounds
node scripts/validate-content.mjs

# 2. Regenerate Markdown media catalog
python3 scripts/gen_media_catalog.py

# 3. Render brand icons and Open Graph cards
uv run --with pillow scripts/brand/render_assets.py

# 4. Typecheck, build static pages, and run zero-dead-link & SEO/GEO gatekeeper
npm --prefix web run build
```
