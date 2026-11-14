# DESIGN.md — Calm Apple Liquid Glass × Editorial Screening Gallery

AITube combines **Apple TV+ / Google Education's calm editorial restraint** with **macOS / visionOS Liquid Glass optical depth**, anchored in **Prussian Mineral Teal** ink, **Signal Amber** trend pulses, and chronological **Concept Wave** cartography.

---

## 1. Visual & Optical Principles

1. **Warm Optical Canvas & Liquid Glass Surfaces — Zero Neon AI Clichés**:
   - Explicitly **forbidden**: purple-on-dark gradients, glowing neon outlines, sci-fi particle grids, headline biscuit pills with pulsing dots, and cluttered multi-badge card walls.
   - **Light Mode (`Warm Optical Daylight`)**: `#F5F5F7` / `#FAF8F3` ambient canvas, `rgba(255, 255, 255, 0.72)` translucent glass surfaces with specular top inner-rim highlights and `backdrop-filter: blur(22px) saturate(175%)`.
   - **Dark Mode (`Obsidian Nocturne`)**: `#0B0D10` / `#111416` deep cinema canvas, `rgba(26, 31, 38, 0.68)` dark mineral glass surfaces, `#ECEAE4` warm bone text.
2. **Sister Publishing House Accent System**:
   - **Primary Editorial Accent (`--accent-primary`) — Prussian Mineral Teal**:
     - Light: `#1B5E6B` · Dark: `#52ADC0`
   - **Trend Signal Accent (`--accent-signal`) — Signal Amber** (reserved strictly for `Surging / 爆发期` concept inflections, active playheads, and paradigm shift highlights):
     - Light: `#B85D19` · Dark: `#E59246`
   - **Mainstream / Verified Sage (`--status-done`)**:
     - Light: `#2A6847` · Dark: `#57B080`
3. **Typography & Plain-Human Hierarchy**:
   - **Display & Editorial Headings (`--font-serif`)**: `"Newsreader Variable"`, `"Songti SC"`, `"Noto Serif CJK SC"`, serif.
   - **Body & Controls (`--font-sans`)**: `"Inter Variable"`, `-apple-system`, `"PingFang SC"`, `"Noto Sans CJK SC"`, sans-serif.
   - **Timestamps, Quarters & Copyable Operators (`--font-mono`)**: `"JetBrains Mono Variable"`, monospace (`font-variant-numeric: tabular-nums`).
4. **Scroll Navigation Ergonomics (Unified Frosted Canopy & Frameless Spine)**:
   - **Unified Frosted Top Canopy (`--canopy-fill`, `--blur-canopy`)**: Sticky sub-bars dock flush beneath the `60px` header (`top: var(--nav-h)`), creating one continuous frosted optical plane from `y = 0` downward so scrolling cards never peek awkwardly through raw transparent gaps between floating bars.
   - **Frameless Left Era Spine**: Sticky left timeline rails use a zero-boxvertical `1.5px` hairline spine with glowing active markers (`border: 0; background: transparent; box-shadow: none`) rather than heavy card boxes.
5. **16:9 Darkroom Screening Stage & Performance**:
   - Every video card renders inside a calm `16:9` darkroom frame showing only essential user signals (slice window badge, creator, plain-human title, and concise 1-line summary).
   - `backdrop-filter` is budgeted strictly to floating navigation chrome, spotlight modals, and HUD overlays (`--blur-chrome`, `--blur-modal`), keeping scrolling card grids 60fps butter-smooth via GPU-composited transforms and `content-visibility: auto`.
