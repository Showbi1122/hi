#!/usr/bin/env python3
"""Restore full SEO homepage from transcript patches + editorial cleanup."""

from __future__ import annotations

import json
import os
import re
import sys

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("pip install beautifulsoup4", file=sys.stderr)
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")
TRANSCRIPT = (
    "/home/hermit-123/.cursor/projects/home-hermit-123-Documents-Portfolio/"
    "agent-transcripts/b5617c08-59f2-4fee-8cd5-81cdf10124ef/"
    "b5617c08-59f2-4fee-8cd5-81cdf10124ef.jsonl"
)
CHUNKS = "/tmp/index_chunks"


def load_transcript_patches() -> list[tuple[str, str]]:
    patches: list[tuple[str, str]] = []
    for line in open(TRANSCRIPT, encoding="utf-8"):
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        for part in obj.get("message", {}).get("content", []):
            if part.get("type") != "tool_use" or part.get("name") != "StrReplace":
                continue
            inp = part.get("input", {})
            if not inp.get("path", "").endswith("index.html"):
                continue
            old, new = inp.get("old_string", ""), inp.get("new_string", "")
            if old:
                patches.append((old, new))
    return patches


def apply_patches(html: str, patches: list[tuple[str, str]]) -> tuple[str, int]:
    applied = 0
    for old, new in patches:
        if old in html:
            html = html.replace(old, new, 1)
            applied += 1
    return html, applied


def load_chunk(name: str) -> str:
    path = os.path.join(CHUNKS, name)
    with open(path, encoding="utf-8") as f:
        return f.read()


def replace_between(html: str, start_marker: str, end_marker: str, replacement: str) -> str:
    i = html.find(start_marker)
    j = html.find(end_marker, i + len(start_marker))
    if i == -1 or j == -1:
        return html
    return html[:i] + replacement + html[j:]


def replace_section_block(html: str, section_id: str, replacement: str) -> str:
    pattern = rf'(<section[^>]*id="{section_id}"[^>]*>)(.*?)(</section>)'
    m = re.search(pattern, html, re.DOTALL)
    if not m:
        return html
    rep = replacement.strip()
    if not rep.startswith("<section"):
        rep = m.group(1) + rep + m.group(3)
    return html[: m.start()] + rep + html[m.end() :]


def insert_after_section(html: str, after_id: str, new_content: str) -> str:
    pattern = rf'(<section[^>]*id="{after_id}"[^>]*>.*?</section>)'
    m = re.search(pattern, html, re.DOTALL)
    if not m:
        return html
    pos = m.end()
    return html[:pos] + "\n" + new_content.strip() + html[pos:]


def force_major_sections(html: str) -> str:
    """Surgical inserts when patch replay misses due to formatting drift."""

    if 'id="services"' not in html and os.path.exists(f"{CHUNKS}/patch_13_13555.html"):
        chunk = load_chunk("patch_13_13555.html")
        # Replace lone about section with full about+services+tech+industries block
        html = replace_section_block(html, "about", chunk)

    if 'id="locations"' not in html and os.path.exists(f"{CHUNKS}/patch_18_6724.html"):
        chunk = load_chunk("patch_18_6724.html")
        html = replace_section_block(html, "faq", chunk)

    if 'class="footer-grid"' not in html and os.path.exists(f"{CHUNKS}/patch_21_2041.html"):
        chunk = load_chunk("patch_21_2041.html")
        html = re.sub(
            r"<footer class=\"site-footer\">.*?</footer>",
            chunk.strip(),
            html,
            count=1,
            flags=re.DOTALL,
        )

    if '"@type": "BreadcrumbList"' not in html and os.path.exists(f"{CHUNKS}/patch_08_7821.html"):
        chunk = load_chunk("patch_08_7821.html")
        html = re.sub(
            r"<!-- Schema\.org structured data -->.*?</script>",
            chunk.strip(),
            html,
            count=1,
            flags=re.DOTALL,
        )

    return html


def normalize_structure(html: str) -> str:
    html = re.sub(r"</meta>\s*</meta>\s*</meta>\s*</head>", "</head>", html)
    if 'class="skip-link"' not in html:
        html = html.replace(
            "<body>",
            '<body>\n  <a href="#main-content" class="skip-link">Skip to main content</a>',
            1,
        )
    else:
        html = re.sub(
            r'(<a class="skip-link" href="#main-content">Skip to main content</a>\s*)+',
            '<a class="skip-link" href="#main-content">Skip to main content</a>\n',
            html,
            count=1,
        )
    html = html.replace("<main>", '<main id="main-content">')
    if 'android-chrome-192x192' not in html:
        html = html.replace(
            '<link href="/site.webmanifest" rel="manifest"/>',
            '<link href="/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png"/>\n'
            '<link href="/android-chrome-512x512.png" rel="icon" sizes="512x512" type="image/png"/>\n'
            '<link href="/site.webmanifest" rel="manifest"/>',
        )
    if "assets/content.css" not in html:
        html = html.replace(
            '<link href="assets/style.css" rel="stylesheet"/>',
            '<link href="assets/style.css" rel="stylesheet"/>\n<link href="assets/content.css" rel="stylesheet"/>',
            1,
        )
    # Nav: Services link
    if 'href="#services"' not in html:
        html = html.replace(
            '<li><a href="#about">About</a></li>',
            '<li><a href="#about">About</a></li>\n<li><a href="#services">Services</a></li>',
            1,
        )
    html = html.replace(
        '<script src="assets/main.js"></script>',
        '<script src="assets/main.js" defer></script>',
    )
    return html


def remove_banned_terms(html: str) -> str:
    rules = [
        (r"real estate,?\s*", ""),
        (r"Real Estate\s*", ""),
        (r"automotive services?,?\s*and\s*", ""),
        (r"Automotive / Education Services", "Education"),
        (r"Automotive &amp; Services", "Professional Services"),
        (r"🚗", "💼"),
        (r"cybersecurity companies?", "professional firms"),
        (r"Cybersecurity", "Healthcare"),
        (r"🔒", "🏥"),
        (r"Education &amp; cybersecurity", "Education"),
        (r"trust-focused cybersecurity company websites", "enrollment-focused school websites"),
        (r"Real estate agents?,?\s*and\s*", ""),
        (r"Real estate websites.*?detail-content\">.*?</details>\s*", "", re.DOTALL),
        (r'"Real Estate Websites"', ""),
        (r'"Real Estate Website Development",\s*', ""),
        (r"Real estate &amp; GCC", "GCC &amp; Gulf region"),
    ]
    for rule in rules:
        if len(rule) == 3:
            pat, repl, flags = rule
            html = re.sub(pat, repl, html, flags=flags)
        else:
            pat, repl = rule
            html = re.sub(pat, repl, html, flags=re.IGNORECASE)
    return html


def main() -> int:
    os.makedirs(CHUNKS, exist_ok=True)

    # Export large chunks from transcript if missing
    if not os.path.exists(f"{CHUNKS}/patch_13_13555.html"):
        patches = load_transcript_patches()
        n = 0
        for line in open(TRANSCRIPT, encoding="utf-8"):
            obj = json.loads(line)
            for part in obj.get("message", {}).get("content", []):
                if part.get("type") != "tool_use" or part.get("name") != "StrReplace":
                    continue
                inp = part.get("input", {})
                if not inp.get("path", "").endswith("index.html"):
                    continue
                n += 1
                ns = inp.get("new_string", "")
                if len(ns) > 500:
                    with open(f"{CHUNKS}/patch_{n:02d}_{len(ns)}.html", "w", encoding="utf-8") as f:
                        f.write(ns)

    with open(INDEX, encoding="utf-8") as f:
        html = f.read()

    patches = load_transcript_patches()
    total_applied = 0
    for _ in range(8):
        html, n = apply_patches(html, patches)
        total_applied += n
        if n == 0:
            break

    html = force_major_sections(html)
    html = normalize_structure(html)

    # Second pass after structural fixes
    for _ in range(4):
        html, n = apply_patches(html, patches)
        total_applied += n
        if n == 0:
            break

    html = remove_banned_terms(html)

    with open(INDEX, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Patched index.html: {html.count(chr(10))} lines, {len(html)} chars, {total_applied} replacements")

    # Editorial cleanup
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import refine_site

    refine_site.process_html(INDEX)

    with open(INDEX, encoding="utf-8") as f:
        final = f.read()

    required = [
        "id=\"hero\"",
        "id=\"about\"",
        "id=\"services\"",
        "id=\"technologies\"",
        "id=\"industries\"",
        "id=\"projects\"",
        "id=\"locations\"",
        "id=\"blog-preview\"",
        "id=\"faq\"",
        "cta-banner",
        "site-footer",
        "BreadcrumbList",
        "FAQPage",
    ]
    missing = [s for s in required if s not in final]
    if missing:
        print("WARNING missing sections:", missing, file=sys.stderr)
        return 1

    print("Homepage restore complete — all SEO sections present.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
