#!/usr/bin/env python3
"""Resize and compress portfolio WebP images for display dimensions."""

from __future__ import annotations

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def save_webp(img: Image.Image, path: str, quality: int = 82) -> None:
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
    img.save(path, "WEBP", quality=quality, method=6)


def crop_resize(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    src_ratio = img.width / img.height
    tgt_ratio = target_w / target_h
    if src_ratio > tgt_ratio:
        new_h = img.height
        new_w = int(new_h * tgt_ratio)
        left = (img.width - new_w) // 2
        img = img.crop((left, 0, left + new_w, new_h))
    else:
        new_w = img.width
        new_h = int(new_w / tgt_ratio)
        top = (img.height - new_h) // 2
        img = img.crop((0, top, new_w, top + new_h))
    return img.resize((target_w, target_h), Image.Resampling.LANCZOS)


def optimize_hero() -> None:
    path = os.path.join(ROOT, "assets/home/taleeb.webp")
    hero = Image.open(path)
    hero = hero.resize((760, round(760 * hero.height / hero.width)), Image.Resampling.LANCZOS)
    save_webp(hero, path, 80)
    save_webp(
        hero.resize((480, round(480 * hero.height / hero.width)), Image.Resampling.LANCZOS),
        os.path.join(ROOT, "assets/home/taleeb-480.webp"),
        80,
    )


def optimize_og() -> None:
    path = os.path.join(ROOT, "assets/home/og-image.webp")
    save_webp(Image.open(path), path, 82)


def optimize_projects() -> None:
    for name in ("azul", "peace", "port-folio", "weather"):
        path = os.path.join(ROOT, f"assets/projects/{name}.webp")
        img = crop_resize(Image.open(path), 1200, 800)
        save_webp(img, path, 82)
        save_webp(img.resize((600, 400), Image.Resampling.LANCZOS), f"{ROOT}/assets/projects/{name}-600.webp", 82)


def main() -> None:
    optimize_hero()
    optimize_og()
    optimize_projects()
    print("Optimized hero, OG, and project WebP assets.")


if __name__ == "__main__":
    main()
