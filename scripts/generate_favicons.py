#!/usr/bin/env python3
"""Generate premium favicon assets for the portfolio."""

from __future__ import annotations

import os
import struct

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BG = (5, 5, 8)
BG_MID = (10, 10, 16)
GOLD_TOP = (232, 213, 163)
GOLD_BOTTOM = (201, 168, 76)
GOLD_BORDER = (201, 168, 76, 90)
VIOLET_ACCENT = (124, 58, 237, 180)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_color(c1: tuple[int, ...], c2: tuple[int, ...], t: float) -> tuple[int, ...]:
    return tuple(int(lerp(c1[i], c2[i], t)) for i in range(len(c1)))


def rounded_rect(
    draw: ImageDraw.ImageDraw,
    box: tuple[float, float, float, float],
    radius: float,
    fill,
    outline=None,
    width: int = 1,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_monogram(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = size * 0.08
    radius = size * 0.22

    # Background with subtle vertical gradient
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    for y in range(size):
        t = y / max(size - 1, 1)
        color = lerp_color(BG_MID, BG, t)
        bg_draw.line([(0, y), (size, y)], fill=color + (255,))
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((pad, pad, size - pad, size - pad), radius=radius, fill=255)
    img = Image.composite(bg, img, mask)

    draw = ImageDraw.Draw(img)
    inset = pad + size * 0.02
    rounded_rect(
        draw,
        (inset, inset, size - inset, size - inset),
        radius=radius * 0.85,
        fill=None,
        outline=GOLD_BORDER,
        width=max(1, int(size * 0.025)),
    )

    # Classic "M" silhouette (reads clearly at 16px)
    s = size / 32.0
    m_poly = [
        (8 * s, 22.5 * s),
        (8 * s, 9 * s),
        (10.5 * s, 9 * s),
        (16 * s, 16 * s),
        (21.5 * s, 9 * s),
        (24 * s, 9 * s),
        (24 * s, 22.5 * s),
        (21.5 * s, 22.5 * s),
        (21.5 * s, 14 * s),
        (16 * s, 19.8 * s),
        (10.5 * s, 14 * s),
        (10.5 * s, 22.5 * s),
    ]

    letter_mask = Image.new("L", (size, size), 0)
    letter_draw = ImageDraw.Draw(letter_mask)
    letter_draw.polygon(m_poly, fill=255)

    gold = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    for y in range(size):
        t = y / max(size - 1, 1)
        row_color = lerp_color(GOLD_TOP, GOLD_BOTTOM, t * 0.85 + 0.05) + (255,)
        ImageDraw.Draw(gold).line([(0, y), (size, y)], fill=row_color)

    img = Image.composite(gold, img, letter_mask)

    # Violet accent dot (visible on larger icons only)
    if size >= 64:
        draw = ImageDraw.Draw(img)
        dot_r = max(1, int(size * 0.028))
        dot_x = size * 0.73
        dot_y = size * 0.74
        draw.ellipse((dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r), fill=VIOLET_ACCENT)

    return img


def write_svg(path: str) -> None:
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="MTS">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a10"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8d5a3"/>
      <stop offset="100%" stop-color="#c9a84c"/>
    </linearGradient>
  </defs>
  <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="url(#bg)" stroke="#c9a84c" stroke-opacity="0.35" stroke-width="0.75"/>
  <polygon fill="url(#gold)" points="8,22.5 8,9 10.5,9 10.5,17.2 16,11.2 21.5,17.2 21.5,9 24,9 24,22.5 21.5,22.5 21.5,14.5 16,19.8 10.5,14.5 10.5,22.5"/>
  <circle cx="23.5" cy="23.5" r="0.9" fill="#7c3aed" fill-opacity="0.75"/>
</svg>
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)


def write_ico(path: str, images: list[Image.Image]) -> None:
    """Write a multi-size ICO without external dependencies."""
    entries = []
    for img in images:
        rgba = img.convert("RGBA")
        w, h = rgba.size
        bmp = rgba.tobytes("raw", "BGRA")
        and_mask = b"\x00" * (w * h // 8)
        image_data = bmp + and_mask
        entries.append((w, h, image_data))

    offset = 6 + 16 * len(entries)
    parts = [struct.pack("<HHH", 0, 1, len(entries))]
    for w, h, data in entries:
        parts.append(struct.pack("<BBBBHHII", w, h, 0, 0, 1, 32, len(data), offset))
        offset += len(data)
    for _, _, data in entries:
        parts.append(data)

    with open(path, "wb") as f:
        f.write(b"".join(parts))


def main() -> None:
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    rendered: dict[int, Image.Image] = {}
    for name, px in sizes.items():
        rendered[px] = draw_monogram(px)
        out = os.path.join(ROOT, name)
        rendered[px].save(out, format="PNG", optimize=True)
        print(f"Wrote {out}")

    write_svg(os.path.join(ROOT, "favicon.svg"))
    print(f"Wrote {os.path.join(ROOT, 'favicon.svg')}")

    ico_sizes = [rendered[s] for s in (16, 32, 48) if s in rendered]
    if 48 not in rendered:
        rendered[48] = draw_monogram(48)
        ico_sizes = [rendered[16], rendered[32], rendered[48]]
    write_ico(os.path.join(ROOT, "favicon.ico"), ico_sizes)
    print(f"Wrote {os.path.join(ROOT, 'favicon.ico')}")


if __name__ == "__main__":
    main()
