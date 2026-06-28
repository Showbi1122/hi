#!/usr/bin/env python3
"""Verify SEO improvements."""

import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://taleeb-shahbaz.vercel.app"
errors = []

# 1. No index.html in hrefs
for f in ROOT.rglob("*.html"):
    if "index.html" in f.read_text():
        errors.append(f"Still contains index.html: {f}")

# 2. No SearchAction
if "SearchAction" in (ROOT / "index.html").read_text():
    errors.append("SearchAction still in index.html")

# 3. JSON-LD valid
for f in ROOT.rglob("*.html"):
    for i, block in enumerate(re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', f.read_text(), re.S)):
        try:
            json.loads(block)
        except json.JSONDecodeError as e:
            errors.append(f"Invalid JSON-LD in {f} block {i+1}: {e}")

# 4. Blog index OG
blog = (ROOT / "blog" / "index.html").read_text()
for tag in ["og:title", "og:description", "og:url", "og:image", "twitter:card", "CollectionPage", "ItemList"]:
    if tag not in blog:
        errors.append(f"blog/index.html missing {tag}")

# 5. Geo WebPage schema
for f in (ROOT / "geo").glob("*.html"):
    t = f.read_text()
    if "#webpage" not in t or '"@type": "Service"' not in t:
        errors.append(f"Geo missing WebPage/Service schema: {f.name}")

# 6. Sitemap
tree = ET.parse(ROOT / "sitemap.xml")
locs = [e.text.strip() for e in tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
for loc in locs:
    path = loc.replace(BASE + "/", "").strip("/")
    if not path:
        p = ROOT / "index.html"
    elif path.endswith("/"):
        p = ROOT / path / "index.html"
    else:
        p = ROOT / path
    if not p.exists():
        errors.append(f"Sitemap URL missing file: {loc} -> {p}")

# 7. robots.txt
robots = (ROOT / "robots.txt").read_text()
if "sitemap.xml" not in robots.lower():
    errors.append("robots.txt missing sitemap")

# 8. vercel redirect
vercel = json.loads((ROOT / "vercel.json").read_text())
if not any(r.get("source") == "/index.html" and r.get("permanent") for r in vercel.get("redirects", [])):
    errors.append("vercel.json missing 301 /index.html redirect")

# 9. Broken internal links
for f in ROOT.rglob("*.html"):
    for href in re.findall(r'href="([^"]+)"', f.read_text()):
        if href.startswith("#") or href.startswith("http") or href.startswith("mailto"):
            continue
        base = href.split("#")[0]
        if not base:
            continue
        if base.startswith("/"):
            p = ROOT / base.lstrip("/")
            if str(p).endswith("/") or not str(p).endswith(".html"):
                if base == "/":
                    continue
                p = ROOT / base.lstrip("/")
                if p.is_dir():
                    p = p / "index.html"
        else:
            p = (f.parent / base).resolve()
            try:
                p = ROOT / p.relative_to(ROOT.resolve())
            except ValueError:
                continue
        if not p.exists():
            errors.append(f"Broken link in {f}: {href}")

if errors:
    print("FAILED:")
    for e in errors:
        print(" -", e)
    raise SystemExit(1)

print("ALL CHECKS PASSED")
print(f"- HTML files: {len(list(ROOT.rglob('*.html')))}")
print(f"- Sitemap URLs: {len(locs)}")
print("- No index.html internal links")
print("- No SearchAction schema")
print("- All JSON-LD valid")
print("- Blog index SEO complete")
print("- All geo pages have WebPage + Service schema")
print("- Sitemap + robots.txt valid")
print("- Vercel 301 redirect configured")
