#!/usr/bin/env python3
"""Generate sitemap.xml from known site URLs with strict validation."""

from __future__ import annotations

import os
import sys
import xml.etree.ElementTree as ET
from datetime import date
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP_PATH = os.path.join(ROOT, "sitemap.xml")
BASE = "https://taleeb-shahbaz.vercel.app"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", NS)

# Preserve existing URLs, priorities, and changefreq values.
ENTRIES = [
    ("index.html", f"{BASE}/", "weekly", "1.0"),
    ("about.html", f"{BASE}/about.html", "monthly", "0.9"),
    ("services.html", f"{BASE}/services.html", "monthly", "0.9"),
    ("projects.html", f"{BASE}/projects.html", "monthly", "0.9"),
    ("contact.html", f"{BASE}/contact.html", "monthly", "0.9"),
    ("blog/index.html", f"{BASE}/blog/", "weekly", "0.9"),
    (
        "blog/benefits-custom-website-development.html",
        f"{BASE}/blog/benefits-custom-website-development.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/how-ai-changing-web-development.html",
        f"{BASE}/blog/how-ai-changing-web-development.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/lead-generation-website-tips.html",
        f"{BASE}/blog/lead-generation-website-tips.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/react-vs-nextjs.html",
        f"{BASE}/blog/react-vs-nextjs.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/saas-development-guide.html",
        f"{BASE}/blog/saas-development-guide.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/seo-best-practices-business-websites.html",
        f"{BASE}/blog/seo-best-practices-business-websites.html",
        "monthly",
        "0.8",
    ),
    (
        "blog/why-every-business-needs-modern-website.html",
        f"{BASE}/blog/why-every-business-needs-modern-website.html",
        "monthly",
        "0.8",
    ),
    (
        "geo/ai-website-developer-switzerland.html",
        f"{BASE}/geo/ai-website-developer-switzerland.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/react-developer-germany.html",
        f"{BASE}/geo/react-developer-germany.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/saas-developer-australia.html",
        f"{BASE}/geo/saas-developer-australia.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/seo-website-developer-pakistan.html",
        f"{BASE}/geo/seo-website-developer-pakistan.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/software-developer-canada.html",
        f"{BASE}/geo/software-developer-canada.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/web-developer-netherlands.html",
        f"{BASE}/geo/web-developer-netherlands.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/web-developer-saudi-arabia.html",
        f"{BASE}/geo/web-developer-saudi-arabia.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/web-developer-uae.html",
        f"{BASE}/geo/web-developer-uae.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/web-developer-usa.html",
        f"{BASE}/geo/web-developer-usa.html",
        "monthly",
        "0.85",
    ),
    (
        "geo/website-developer-uk.html",
        f"{BASE}/geo/website-developer-uk.html",
        "monthly",
        "0.85",
    ),
]


def is_valid_https_url(url: str) -> bool:
    parsed = urlparse(url.strip())
    return parsed.scheme == "https" and bool(parsed.netloc) and bool(parsed.path or url.endswith("/"))


def lastmod_for(relative_path: str) -> str:
    file_path = os.path.join(ROOT, relative_path)
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"Missing page for sitemap entry: {relative_path}")
    return date.fromtimestamp(os.path.getmtime(file_path)).isoformat()


def build_urlset() -> ET.Element:
    urlset = ET.Element(f"{{{NS}}}urlset")
    seen: set[str] = set()

    for relative_path, loc, changefreq, priority in ENTRIES:
        loc = (loc or "").strip()
        changefreq = (changefreq or "").strip()
        priority = (priority or "").strip()

        if not loc:
            print(f"Skipped empty <loc> for {relative_path}", file=sys.stderr)
            continue
        if not is_valid_https_url(loc):
            print(f"Skipped invalid URL: {loc!r}", file=sys.stderr)
            continue
        if loc in seen:
            print(f"Skipped duplicate URL: {loc}", file=sys.stderr)
            continue
        if not changefreq or not priority:
            print(f"Skipped incomplete entry: {loc}", file=sys.stderr)
            continue

        seen.add(loc)
        lastmod = lastmod_for(relative_path)

        url_el = ET.SubElement(urlset, f"{{{NS}}}url")
        ET.SubElement(url_el, f"{{{NS}}}loc").text = loc
        ET.SubElement(url_el, f"{{{NS}}}lastmod").text = lastmod
        ET.SubElement(url_el, f"{{{NS}}}changefreq").text = changefreq
        ET.SubElement(url_el, f"{{{NS}}}priority").text = priority

    if not list(urlset):
        raise RuntimeError("Sitemap generation produced zero valid URLs")

    return urlset


def write_sitemap(urlset: ET.Element) -> None:
    tree = ET.ElementTree(urlset)
    if hasattr(ET, "indent"):
        ET.indent(tree, space="  ")

    with open(SITEMAP_PATH, "wb") as fh:
        fh.write(b'<?xml version="1.0" encoding="UTF-8"?>\n')
        tree.write(fh, encoding="utf-8", xml_declaration=False)


def validate_sitemap() -> None:
    tree = ET.parse(SITEMAP_PATH)
    root = tree.getroot()
    if root.tag != f"{{{NS}}}urlset":
        raise ValueError("Root element must be urlset")

    urls: list[str] = []
    for url_el in root.findall(f"{{{NS}}}url"):
        loc_el = url_el.find(f"{{{NS}}}loc")
        loc = (loc_el.text or "").strip() if loc_el is not None else ""
        if not loc:
            raise ValueError("Found <url> with empty or missing <loc>")
        for tag in ("lastmod", "changefreq", "priority"):
            child = url_el.find(f"{{{NS}}}{tag}")
            if child is None or not (child.text or "").strip():
                raise ValueError(f"Missing {tag} for {loc}")
        if not is_valid_https_url(loc):
            raise ValueError(f"Non-HTTPS or invalid URL: {loc}")
        if loc in urls:
            raise ValueError(f"Duplicate URL: {loc}")
        urls.append(loc)


def main() -> None:
    urlset = build_urlset()
    write_sitemap(urlset)
    validate_sitemap()
    count = len(list(urlset))
    print(f"Wrote {SITEMAP_PATH} with {count} URLs")


if __name__ == "__main__":
    main()
