#!/usr/bin/env python3
"""Safe site-wide editorial cleanup — text nodes only, preserves HTML structure."""

from __future__ import annotations

import glob
import os
import re
import sys

try:
    from bs4 import BeautifulSoup, Comment, NavigableString
except ImportError:
    print("BeautifulSoup required: pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SKIP_PARENT_TAGS = {"script", "style", "code", "pre"}

REPLACEMENTS = [
    (r"\s—\s", ", "),
    (r"\s–\s", ", "),
    (r"\*\*([^*]+)\*\*", r"\1"),
    (r"<strong>([^<]+)</strong>", r"\1"),
    (r"<b>([^<]+)</b>", r"\1"),
    (r"<u>([^<]+)</u>", r"\1"),
    (r"Malik Taleeb Shahbaz — Web Developer", "Malik Taleeb Shahbaz · Web Developer"),
    (r"\bWhether you are\b", "If you're"),
    (r"\bWhether you need\b", "If you need"),
    (r"\bIn today's digital world\b", "Online"),
    (r"\bAt the end of the day\b", "Ultimately"),
    (r"\bWhen it comes to\b", "For"),
    (r"\bIn conclusion\b", "To wrap up"),
    (r"\bFurthermore\b", "Also"),
    (r"\bMoreover\b", "Also"),
    (r"\bHere is what\b", "What"),
    (r"\bHere is how\b", "How"),
    (r"\bThis is where\b", "This matters"),
    (r"automotive services, and professional", "and professional"),
    (r"education, automotive services, and", "education and"),
    (r"\bdo not\b", "don't"),
    (r"\bdid not\b", "didn't"),
    (r"\bcannot\b", "can't"),
    (r"\bwill not\b", "won't"),
    (r"\bI am\b", "I'm"),
    (r"\bthat is\b", "that's"),
    (r"\bit is\b", "it's"),
    (r"\byou are\b", "you're"),
    (r", ,", ","),
]

KEEP_STRONG = re.compile(r"data-count")


def refine_string(s: str, in_attribute: bool = False) -> str:
    if not s or not s.strip():
        return s
    # Never strip strong tags with data-count (metrics)
    if KEEP_STRONG.search(s):
        return s
    for pat, repl in REPLACEMENTS:
        s = re.sub(pat, repl, s)
    # double hyphen in prose only (not URLs/CSS vars)
    if not in_attribute:
        s = re.sub(r"(?<![\w/:])--(?![\w/])", ", ", s)
    s = re.sub(r"you're're", "you're", s)
    s = re.sub(r"it's's", "it's", s)
    return s


def refine_soup(soup: BeautifulSoup) -> None:
    # Attributes (alt, title, content, etc.)
    for tag in soup.find_all(True):
        if tag.name in SKIP_PARENT_TAGS:
            continue
        for attr, val in list(tag.attrs.items()):
            if isinstance(val, list):
                tag.attrs[attr] = [refine_string(v, True) if isinstance(v, str) else v for v in val]
            elif isinstance(val, str):
                tag.attrs[attr] = refine_string(val, True)

    for node in soup.descendants:
        if isinstance(node, Comment):
            continue
        if isinstance(node, NavigableString):
            parent = node.parent
            if parent and getattr(parent, "name", None) in SKIP_PARENT_TAGS:
                continue
            if parent and parent.name == "strong" and parent.has_attr("data-count"):
                continue
            new = refine_string(str(node))
            if new != str(node):
                node.replace_with(new)


def ensure_home_nav(html: str) -> str:
    if ">Home</a></li>" in html:
        return html
    html = html.replace(
        '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html#about">',
        '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html">Home</a></li>\n      <li><a href="../index.html#about">',
    )
    html = html.replace(
        '<ul class="nav-links" id="nav-links">\n      <li><a href="#about">',
        '<ul class="nav-links" id="nav-links">\n      <li><a href="index.html">Home</a></li>\n      <li><a href="#about">',
    )
    return html


def process_html(path: str) -> bool:
    with open(path, encoding="utf-8") as f:
        original = f.read()
    html = ensure_home_nav(original)
    soup = BeautifulSoup(html, "html.parser")
    refine_soup(soup)
    # Clean em dashes inside JSON-LD blocks
    for script in soup.find_all("script", type="application/ld+json"):
        if script.string:
            script.string.replace_with(script.string.replace(" — ", ", ").replace("—", ", "))
    refined = str(soup)
    if not refined.startswith("<!DOCTYPE"):
        refined = "<!DOCTYPE html>\n" + refined
    if refined != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(refined)
        return True
    return False


def scan_artifacts(text: str) -> dict[str, int]:
    return {
        "**": len(re.findall(r"\*\*", text)),
        "em_dash": text.count("—"),
        "double_hyphen": len(re.findall(r"(?<![\w/:])--(?![\w/])", text)),
        "strong_no_metric": len(
            re.findall(r"<strong(?![^>]*data-count)[^>]*>", text)
        ),
    }


def main() -> int:
    html_files = sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True))
    modified = 0
    for path in html_files:
        if process_html(path):
            modified += 1
            print(f"Refined: {os.path.relpath(path, ROOT)}")

    totals = {k: 0 for k in ("**", "em_dash", "double_hyphen", "strong_no_metric")}
    for path in html_files:
        with open(path, encoding="utf-8") as f:
            counts = scan_artifacts(f.read())
        for k, v in counts.items():
            totals[k] += v

    print("\n--- Site cleanup report ---")
    print(f"Files scanned: {len(html_files)}")
    print(f"Files modified: {modified}")
    print("Remaining artifacts in HTML:")
    for k, v in totals.items():
        print(f"  {k}: {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
