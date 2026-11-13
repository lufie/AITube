#!/usr/bin/env python3
"""Render AITube brand icons, webmanifest, and 1200x630 editorial Open Graph PNGs."""
from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "web" / "public"
OG_DIR = PUBLIC / "og"
OG_CONCEPTS = OG_DIR / "concepts"

BG_PAPER = (250, 248, 243)       # #FAF8F3
BG_PANEL = (242, 239, 231)       # #F2EFE7
INK = (21, 23, 26)               # #15171A
MUTED = (82, 88, 96)             # #525860
RULE = (216, 211, 199)           # #D8D3C7
TEAL = (27, 94, 107)             # #1B5E6B Prussian Mineral Teal
AMBER = (184, 93, 25)            # #B85D19 Signal Amber

FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#FAF8F3" stroke="#15171A" stroke-width="2.5"/>
  <path d="M18 49L32 14L46 49" stroke="#15171A" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 38C21 38 25 27 33 27C40 27 44 33 51 22" stroke="#1B5E6B" stroke-width="4" stroke-linecap="round"/>
  <circle cx="46" cy="25" r="4.5" fill="#B85D19"/>
</svg>
"""


def load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for p in candidates:
        fp = Path(p)
        if fp.exists():
            try:
                return ImageFont.truetype(str(fp), size=size)
            except Exception:
                continue
    return ImageFont.load_default()


CJK_BOLD = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]
CJK_REG = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
MONO_FONT = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def draw_icon(size: int, out_path: Path) -> None:
    scale = size * 2
    img = Image.new("RGBA", (scale, scale), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(scale * 0.04)
    rad = int(scale * 0.19)
    d.rounded_rectangle([pad, pad, scale - pad, scale - pad], radius=rad, fill=BG_PAPER, outline=INK, width=max(3, scale // 24))
    # Architectural A legs with crisp flat apex
    d.polygon(
        [
            (int(scale * 0.23), int(scale * 0.78)),
            (int(scale * 0.46), int(scale * 0.19)),
            (int(scale * 0.54), int(scale * 0.19)),
            (int(scale * 0.77), int(scale * 0.78)),
            (int(scale * 0.68), int(scale * 0.78)),
            (int(scale * 0.50), int(scale * 0.30)),
            (int(scale * 0.32), int(scale * 0.78)),
        ],
        fill=INK,
    )
    # Trend wave crossbar
    wave_pts = [
        (int(scale * 0.20), int(scale * 0.60)),
        (int(scale * 0.36), int(scale * 0.58)),
        (int(scale * 0.48), int(scale * 0.43)),
        (int(scale * 0.63), int(scale * 0.45)),
        (int(scale * 0.80), int(scale * 0.34)),
    ]
    d.line(wave_pts, fill=TEAL, width=max(5, scale // 15), joint="curve")
    # Signal Amber inflection dot
    cx, cy = int(scale * 0.73), int(scale * 0.39)
    r = max(5, scale // 14)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=AMBER)
    final = img.resize((size, size), Image.Resampling.LANCZOS)
    final.save(out_path, format="PNG", optimize=True)


def wrap_smart(text: str, max_units: int) -> list[str]:
    out: list[str] = []
    cur = ""
    units = 0.0
    i = 0
    while i < len(text):
        if ord(text[i]) < 128 and text[i].isalnum():
            j = i
            while j < len(text) and ord(text[j]) < 128 and (text[j].isalnum() or text[j] in "-_."):
                j += 1
            word = text[i:j]
            w_u = len(word) * 0.56
            if units + w_u > max_units and cur.strip():
                out.append(cur.strip())
                cur = word
                units = w_u
            else:
                cur += word
                units += w_u
            i = j
        else:
            ch = text[i]
            ch_u = 1.0 if ord(ch) > 127 else 0.5
            cur += ch
            units += ch_u
            if units >= max_units and cur.strip():
                out.append(cur.strip())
                cur = ""
                units = 0.0
            i += 1
    if cur.strip():
        out.append(cur.strip())
    return out


def render_og_card(
    kicker: str,
    title: str,
    subtitle: str,
    badge_right: str,
    series: list[int],
    inflect_idx: int,
    out_path: Path,
) -> None:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG_PAPER)
    d = ImageDraw.Draw(img)

    # Outer editorial hairline frame
    d.rectangle([28, 28, W - 28, H - 28], outline=RULE, width=2)
    d.line([28, 102, W - 28, 102], fill=RULE, width=2)
    d.line([28, H - 96, W - 28, H - 96], fill=RULE, width=2)

    f_mono = load_font(MONO_FONT, 20)
    f_kicker = load_font(MONO_FONT, 19)
    f_title = load_font(CJK_BOLD, 44)
    f_sub = load_font(CJK_REG, 24)
    f_small = load_font(CJK_REG, 20)

    # Masthead bar
    d.ellipse([60, 56, 78, 74], fill=TEAL)
    d.ellipse([84, 60, 96, 72], fill=AMBER)
    d.text((112, 52), "AITUBE · CONCEPT TREND & VIDEO INDEX", fill=INK, font=f_mono)
    d.text((W - 340, 52), badge_right, fill=TEAL, font=f_mono)

    # Left column text
    d.text((64, 138), kicker, fill=AMBER, font=f_kicker)

    lines = wrap_smart(title, 14)[:3]
    y = 182
    for ln in lines:
        d.text((64, y), ln, fill=INK, font=f_title)
        y += 60

    sub_lines = wrap_smart(subtitle, 24)[:2]
    y += 14
    for sl in sub_lines:
        d.text((64, y), sl, fill=MUTED, font=f_sub)
        y += 36

    # Right sparkline panel
    px0, py0, px1, py1 = 760, 148, 1136, 488
    d.rounded_rectangle([px0, py0, px1, py1], radius=10, fill=BG_PANEL, outline=RULE, width=2)
    d.text((px0 + 24, py0 + 20), "CONCEPT MOMENTUM (22H2–26Q3)", fill=MUTED, font=load_font(MONO_FONT, 15))

    gx0, gy0, gx1, gy1 = px0 + 28, py0 + 72, px1 - 28, py1 - 44
    for gy in [gy0, (gy0 + gy1) // 2, gy1]:
        d.line([gx0, gy, gx1, gy], fill=RULE, width=1)

    pts = []
    for idx, val in enumerate(series):
        x = gx0 + int((gx1 - gx0) * idx / max(1, len(series) - 1))
        y_pt = gy1 - int((gy1 - gy0) * max(5, min(100, val)) / 100)
        pts.append((x, y_pt))

    d.line(pts, fill=TEAL, width=5)
    for idx, (x, y_pt) in enumerate(pts):
        if idx == inflect_idx:
            d.ellipse([x - 8, y_pt - 8, x + 8, y_pt + 8], fill=AMBER, outline=BG_PAPER, width=2)
        else:
            d.ellipse([x - 4, y_pt - 4, x + 4, y_pt + 4], fill=TEAL)

    d.text((px0 + 28, py1 - 30), "2022", fill=MUTED, font=load_font(MONO_FONT, 15))
    d.text((px1 - 74, py1 - 30), "2026", fill=TEAL, font=load_font(MONO_FONT, 15))

    # Footer bar
    d.text((64, H - 64), "280 Verified Cuts · 22 Concept Trajectories · Zero Hype", fill=MUTED, font=f_small)
    d.text((W - 290, H - 64), "aitube.dev", fill=INK, font=f_mono)

    img.save(out_path, format="PNG", optimize=True)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    OG_CONCEPTS.mkdir(parents=True, exist_ok=True)

    (PUBLIC / "favicon.svg").write_text(FAVICON_SVG, "utf-8")
    draw_icon(192, PUBLIC / "icon-192.png")
    draw_icon(512, PUBLIC / "icon-512.png")
    draw_icon(180, PUBLIC / "apple-touch-icon.png")

    manifest = {
        "name": "AITube — AI Concept Trend & Video Slice Index",
        "short_name": "AITube",
        "start_url": "/zh/",
        "display": "standalone",
        "background_color": "#FAF8F3",
        "theme_color": "#1B5E6B",
        "icons": [
            {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (PUBLIC / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", "utf-8")

    default_wave = [18, 28, 36, 48, 56, 68, 79, 88, 94, 98]
    core_cards = [
        ("home-zh.png", "CONCEPT TIMELINE × CURATED CUTS", "AITube · 用概念演进脉络读懂 AI", "22 个核心概念趋势坐标 · 280 支核验高信噪比视频切片", "ZH / 2026 EDITION"),
        ("home-en.png", "CONCEPT TIMELINE × CURATED CUTS", "AITube · Map AI by Concept Evolution", "22 concept trajectories & 280 verified implementation slices.", "EN / 2026 EDITION"),
        ("timeline-zh.png", "SIGNATURE PERSPECTIVE · 2017–2026", "AI 概念趋势时间线索引", "从 Transformer 到 Context Engineering、MCP 与 Agent Skills", "5 ERAS · 22 CONCEPTS"),
        ("timeline-en.png", "SIGNATURE PERSPECTIVE · 2017–2026", "AI Concept Trend Timeline Index", "From Self-Attention to RLVR, MCP, Context & Agent Skills.", "5 ERAS · 22 CONCEPTS"),
        ("directory-zh.png", "FACETED SCREENING GALLERY", "AI 实战切片多维检索库", "按概念纪元、技术层、核心任务与工具栈精准直达关键分钟", "280 VERIFIED CUTS"),
        ("directory-en.png", "FACETED SCREENING GALLERY", "Multi-Faceted AI Video Directory", "Filter 280 verified cuts by era, layer, task, and stack.", "280 VERIFIED CUTS"),
        ("roadmap-zh.png", "4-STAGE CURRICULUM", "从底层直觉到生产级智能体学习路线", "52 支旗舰主干切片串联起的系统进阶路径", "STAGE 00 → 03"),
        ("roadmap-en.png", "4-STAGE CURRICULUM", "From Model Intuition to Production Agents", "52 flagship spine cuts sequenced across 4 engineering stages.", "STAGE 00 → 03"),
        ("vault-zh.png", "OPEN BLUEPRINTS", "开源智能体规范与评测蓝图箱", "即拿即用的 AGENTS.md、SKILL.md、混合检索与二元裁判模板", "5 OPEN SPECS"),
        ("vault-en.png", "OPEN BLUEPRINTS", "Open Agent Harness & Eval Vault", "Drop-in AGENTS.md, SKILL.md, Hybrid RAG & LLM Judge specs.", "5 OPEN SPECS"),
    ]
    for fname, kicker, title, sub, badge in core_cards:
        render_og_card(kicker, title, sub, badge, default_wave, 6, OG_DIR / fname)

    concepts_doc = json.loads((ROOT / "content" / "concepts.json").read_text("utf-8"))
    for c in concepts_doc["concepts"]:
        kicker = f"{c['originQuarter']} → {c['inflectionQuarter']} · {c['lifecycle'].upper()}"
        title = f"{c['zh']['shortName']} · {c['en']['shortName']}"
        sub = c["zh"]["oneLiner"]
        badge = f"CONCEPT #{c['order']:02d}"
        render_og_card(
            kicker,
            title,
            sub,
            badge,
            c["trendSeries"],
            c["inflectionIndex"],
            OG_CONCEPTS / f"{c['slug']}.png",
        )

    print(f"[render_assets] Rendered icons + {len(core_cards)} core OG + {len(concepts_doc['concepts'])} concept OG cards.")


if __name__ == "__main__":
    main()
