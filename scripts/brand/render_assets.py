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

BG_PAPER = (255, 255, 255)       # #FFFFFF Pure Gallery White
BG_PANEL = (245, 245, 247)       # #F5F5F7 Apple Soft Surface
INK = (29, 29, 31)               # #1D1D1F Primary Ink
MUTED = (110, 110, 115)          # #6E6E73 Secondary Muted Ink
RULE = (232, 232, 237)           # #E8E8ED Subtle Hairline
BLUE = (0, 102, 204)             # #0066CC Apple/Google Primary Blue
SIGNAL = (217, 80, 0)            # #D95000 Warm Inflection Orange

FAVICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#1D1D1F"/>
  <polygon points="25 19 46 32 25 45 25 19" fill="#FFFFFF"/>
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
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def draw_icon(size: int, out_path: Path) -> None:
    scale = size * 2
    img = Image.new("RGBA", (scale, scale), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(scale * 0.04)
    rad = int(scale * 0.25)
    d.rounded_rectangle([pad, pad, scale - pad, scale - pad], radius=rad, fill=INK)
    d.polygon(
        [
            (int(scale * 0.39), int(scale * 0.30)),
            (int(scale * 0.72), int(scale * 0.50)),
            (int(scale * 0.39), int(scale * 0.70)),
        ],
        fill=BG_PAPER,
    )
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

    f_brand = load_font(CJK_BOLD, 24)
    f_kicker = load_font(CJK_BOLD, 19)
    f_title = load_font(CJK_BOLD, 46)
    f_sub = load_font(CJK_REG, 24)
    f_small = load_font(CJK_REG, 20)

    # Minimal clean top bar
    d.rounded_rectangle([64, 52, 100, 88], radius=9, fill=INK)
    d.polygon([(78, 62), (92, 70), (78, 78)], fill=BG_PAPER)
    d.text((114, 55), "AITube", fill=INK, font=f_brand)
    d.text((W - 280, 58), badge_right, fill=MUTED, font=f_small)

    # Left column text
    d.text((64, 148), kicker, fill=BLUE, font=f_kicker)

    lines = wrap_smart(title, 14)[:3]
    y = 192
    for ln in lines:
        d.text((64, y), ln, fill=INK, font=f_title)
        y += 62

    sub_lines = wrap_smart(subtitle, 24)[:2]
    y += 14
    for sl in sub_lines:
        d.text((64, y), sl, fill=MUTED, font=f_sub)
        y += 36

    # Right soft rounded sparkline card (frameless Apple #F5F5F7 surface)
    px0, py0, px1, py1 = 756, 148, 1136, 488
    d.rounded_rectangle([px0, py0, px1, py1], radius=24, fill=BG_PANEL)
    d.text((px0 + 28, py0 + 26), "2022 – 2026 热度趋势", fill=MUTED, font=load_font(CJK_REG, 18))

    gx0, gy0, gx1, gy1 = px0 + 32, py0 + 82, px1 - 32, py1 - 52
    for gy in [gy0, (gy0 + gy1) // 2, gy1]:
        d.line([gx0, gy, gx1, gy], fill=RULE, width=1)

    pts = []
    for idx, val in enumerate(series):
        x = gx0 + int((gx1 - gx0) * idx / max(1, len(series) - 1))
        y_pt = gy1 - int((gy1 - gy0) * max(5, min(100, val)) / 100)
        pts.append((x, y_pt))

    d.line(pts, fill=BLUE, width=5)
    for idx, (x, y_pt) in enumerate(pts):
        if idx == inflect_idx:
            d.ellipse([x - 8, y_pt - 8, x + 8, y_pt + 8], fill=SIGNAL, outline=BG_PANEL, width=2)

    d.text((px0 + 32, py1 - 34), "2022", fill=MUTED, font=load_font(MONO_FONT, 15))
    d.text((px1 - 74, py1 - 34), "2026", fill=BLUE, font=load_font(MONO_FONT, 15))

    # Clean bottom caption
    d.line([64, H - 92, W - 64, H - 92], fill=RULE, width=1)
    d.text((64, H - 62), "280 支精选精华片段 · 22 个核心概念演进 · 零废话", fill=MUTED, font=f_small)
    d.text((W - 180, H - 62), "aitube.dev", fill=INK, font=f_small)

    img.save(out_path, format="PNG", optimize=True)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    OG_CONCEPTS.mkdir(parents=True, exist_ok=True)

    (PUBLIC / "favicon.svg").write_text(FAVICON_SVG, "utf-8")
    draw_icon(192, PUBLIC / "icon-192.png")
    draw_icon(512, PUBLIC / "icon-512.png")
    draw_icon(180, PUBLIC / "apple-touch-icon.png")

    manifest = {
        "name": "AITube — 看懂 AI，只看最值得看的那几分钟",
        "short_name": "AITube",
        "start_url": "./zh/",
        "display": "standalone",
        "background_color": "#FFFFFF",
        "theme_color": "#FFFFFF",
        "icons": [
            {"src": "./icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "./icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (PUBLIC / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", "utf-8")

    default_wave = [18, 28, 36, 48, 56, 68, 79, 88, 94, 98]
    core_cards = [
        ("home-zh.png", "PLAIN LANGUAGE × HAND-PICKED HIGHLIGHTS", "AITube · 用大白话讲透 AI 怎么工作、怎么用好", "22 个核心概念来龙去脉 · 280 支已跳过片头废话的精选视频片段", "ZH / 2026 EDITION"),
        ("home-en.png", "PLAIN ENGLISH × HAND-PICKED HIGHLIGHTS", "AITube · AI Explained in Plain Language", "22 core AI topics & 280 fluff-free video highlights.", "EN / 2026 EDITION"),
        ("timeline-zh.png", "2017 → 2026 TIMELINE", "一张图看懂 AI 22 个核心词是怎么火起来的", "从注意力机制到 MCP 万能插头、信息整理术与 SKILL.md 技能包", "5 STAGES · 22 TOPICS"),
        ("timeline-en.png", "2017 → 2026 TIMELINE", "How 22 Core AI Ideas Connected (2017–2026)", "From Self-Attention to MCP, Context Engineering & SKILL.md.", "5 STAGES · 22 TOPICS"),
        ("directory-zh.png", "VIDEO HIGHLIGHTS LIBRARY", "精选 AI 视频库：点开直达最干货的几分钟", "按你想解决的事（科普、写代码、喂资料、做视频）一键挑好片", "280 HIGHLIGHTS"),
        ("directory-en.png", "VIDEO HIGHLIGHTS LIBRARY", "AI Video Library: Skip Straight to the Best Part", "Filter 280 hand-picked highlights by practical goal or tool.", "280 HIGHLIGHTS"),
        ("roadmap-zh.png", "4-STAGE STEP-BY-STEP PATH", "分步学习单：从零基础小白到做出靠谱应用", "不用从头硬啃，每个台阶先看最关键的 3 支视频就够了", "STAGE 00 → 03"),
        ("roadmap-en.png", "4-STAGE STEP-BY-STEP PATH", "4 Clear Steps: From Zero to Reliable AI Apps", "52 essential highlights organized into 4 bite-sized stages.", "STAGE 00 → 03"),
        ("vault-zh.png", "READY-TO-USE TEMPLATES", "现成模板箱：别人踩完坑总结好的模板直接抄", "不用注册一键复制：AGENTS.md、SKILL.md、自动批改与双路搜索模板", "5 TEMPLATES"),
        ("vault-en.png", "READY-TO-USE TEMPLATES", "Ready-to-Use AI Templates: Copy & Paste", "Zero-signup AGENTS.md, SKILL.md, Hybrid Search & Eval prompts.", "5 TEMPLATES"),
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
