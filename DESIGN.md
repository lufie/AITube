# DESIGN.md — Editorial Screening Gallery · AITube Sister Monograph System

AITube inherits 100% of Growthtube's **Editorial Field Manual & Darkroom Screening Gallery** skeleton while establishing its own sister-volume identity through **Prussian Mineral Teal** ink, **Signal Amber** trend pulses, and chronological **Concept Wave** cartography.

---

## 1. Visual Principles

1. **Warm Paper & Archival Ink — Never Neon AI Clichés**:
   - Explicitly **forbidden**: purple-on-dark gradients, glowing neon outlines, sci-fi particle grids, headline biscuit pills with pulsing dots, CSS gradient keyword text, and multi-row rounded pill walls.
   - Light mode (`Warm Archival Cotton`): `#FAF8F3` canvas, `#F2EEE5` subtle wash, `#FFFFFF` elevated surfaces, `#161819` deep charcoal-slate ink, `1px` hairline borders (`rgba(22, 24, 25, 0.10)`).
   - Dark mode (`Warm Mineral Nocturne`): `#111416` canvas, `#171B1E` subtle wash, `#1D2226` surface, `#ECEAE4` warm bone text, `1px` hairline borders (`rgba(236, 234, 228, 0.10)`).
2. **Sister Publishing House Accent System**:
   - **Primary Editorial Accent (`--accent-primary`) — Prussian Mineral Teal**:
     - Light: `#1B5E6B` (hover `#134650`, soft wash `rgba(27, 94, 107, 0.08)`)
     - Dark: `#52ADC0` (hover `#6EC1D2`, soft wash `rgba(82, 173, 192, 0.14)`)
   - **Trend Signal Accent (`--accent-signal`) — Ochre / Signal Amber** (reserved strictly for `Surging / 爆发期` concept inflections, active playheads, and paradigm shift highlights):
     - Light: `#B85D19` (soft wash `rgba(184, 93, 25, 0.09)`)
     - Dark: `#E59246` (soft wash `rgba(229, 146, 70, 0.14)`)
   - **Mainstream / Verified Sage (`--status-done`)**:
     - Light: `#2A6847` · Dark: `#57B080`
3. **Typography & Hierarchy**:
   - **Display & Editorial Headings (`--font-serif`)**: `"Newsreader Variable"`, paired with `"Songti SC"`, `"Noto Serif CJK SC"`, Georgia, serif. Tight tracking (`-0.025em` EN, `-0.01em` ZH), sculptural contrast.
   - **Body & Controls (`--font-sans`)**: `"Inter Variable"`, `-apple-system`, `"PingFang SC"`, `"Noto Sans CJK SC"`, sans-serif.
   - **Timestamps, Quarters, Sparkline Scales & Copyable Prompts (`--font-mono`)**: `"JetBrains Mono Variable"`, monospace (`font-variant-numeric: tabular-nums`).
4. **16:9 Darkroom Waveform Screening Cards & Stage**:
   - Every video/digest node renders inside a unified `16:9` darkroom plate tinted subtly by its era/stage, featuring a 32-bar proportional waveform highlighting the exact `[startSec, endSec]` slice, progressive YouTube thumbnail fade-in (zero broken-image icons when offline), duration badge, and desktop hover **3-Step Quick-Peek**.
5. **Chronological Concept Timeline Cartography (`/timeline/` & `/concepts/[slug]/`)**:
   - Left sticky Era Rail (`2017–2022` → `2023` → `2024` → `2025` → `2026`).
   - Inline **10-Point SVG Trend Trajectory Sparkline** per concept with inflection-quarter dot.
   - **Lifecycle Typography Marks**: `🔥 爆发期 Surging`, `🏛️ 主流基建 Mainstream`, `📐 奠基常青 Foundational`, `🔄 范式演进 Evolved`.
   - **Lineage Connectors**: Clean hairline links showing `前序概念 From → 当前概念 → 演进后继 Into` without cluttered node-graph spaghetti.
   - **Low Text Density**: Enforce crisp 1-line subtitles, `line-clamp` card summaries, and native `<details>` accordions for full archives and FAQs.
