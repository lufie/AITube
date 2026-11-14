---
trigger: always_on
description: Enforces plain-human bilingual copywriting, Apple Liquid Glass visual ergonomics, unobstructed playback compliance, and static build verification.
---

# Rule 03 — Plain-Human Copy, Liquid Glass UI Ergonomics & Playback Compliance

1. **Plain-Human Bilingual Copy ("讲人话")**:
   - Write for four clear reader lenses (`beginner` 零基础小白, `applied` 直接应用派, `career` 从业转行进阶, `frontier` 2026 前沿追踪).
   - Lead with the concrete human problem or outcome before introducing acronyms. Explain technical mechanisms using crisp, everyday mental models rather than academic jargon walls.

2. **Calm Apple Liquid Glass & Scroll Navigation Ergonomics**:
   - Preserve warm archival tones (`#F5F5F7` / `#FAF8F3` light, `#0B0D10` / `#111416` dark) with **Prussian Mineral Teal (`#1B5E6B` / `#52ADC0`)** and **Signal Amber (`#B85D19` / `#E59246`)**. Never introduce purple/neon AI clichés.
   - Maintain the unified top frosted canopy (`--canopy-fill`, `--blur-canopy`) so floating capsules never create raw transparent content-peek gaps when scrolling, and keep sticky left rails frameless (borderless vertical hairline spine, never heavy boxed sidebars).

3. **Unobstructed Playback & Build Gate**:
   - Clicking play on `ScreeningStage.astro` must 100% remove the poster overlay and mount a clean `youtube-nocookie.com/embed/...` iframe.
   - Before concluding any code or content change, run `npm --prefix web run build` (`validate-content.mjs` + `astro check` + `astro build` + `verify-dist.mjs`).
