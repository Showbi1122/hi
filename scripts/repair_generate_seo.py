#!/usr/bin/env python3
"""Repair generate-seo-pages.py after collapsed-newline corruption."""

import os
import re

PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "scripts", "generate-seo-pages.py")

with open(PATH, encoding="utf-8") as f:
    text = f.read()

text = text.replace("abspath(file)", "abspath(__file__)")
text = text.replace('name == "main"', '__name__ == "__main__"')

if text.count("\n") < 30:
    text = text.replace("#!/usr/bin/env python3", "#!/usr/bin/env python3\n")
    text = re.sub(
        r'"""Generate geo landing pages and blog posts for SEO\."""',
        '"""Generate geo landing pages and blog posts for SEO."""\n',
        text,
        count=1,
    )
    breaks = [
        "import json",
        "import os",
        "import sys",
        "from datetime import date",
        "sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))",
        "from favicon_tags import favicon_head",
        "BASE = ",
        "ROOT = ",
        "TODAY = ",
        "WHATSAPP = ",
        "LINKEDIN = ",
        "def og_block",
        "def breadcrumb_schema",
        "def page_shell",
        "GEO_PAGES = [",
        "BLOG_POSTS = [",
        "def render_geo_page",
        "def render_blog_post",
        "def main():",
        'if __name__ == "__main__":',
    ]
    for token in breaks:
        text = text.replace(" " + token, "\n" + token)
    text = text.replace(") def ", ")\n\ndef ")
    text = text.replace(") return ", ")\n    return ")
    text = text.replace("] def ", "]\n\ndef ")
    text = text.replace("] BLOG_POSTS", "]\n\nBLOG_POSTS")
    text = text.replace("] def render_blog", "]\n\ndef render_blog")

with open(PATH, "w", encoding="utf-8") as f:
    f.write(text)
print("Repaired", PATH, "lines:", text.count("\n"))
