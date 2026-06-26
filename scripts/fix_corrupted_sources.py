#!/usr/bin/env python3
"""Restore newlines and __dunder__ names broken by overly aggressive text cleanup."""

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FIXES = [
    (r"\babspath\(file\)", "abspath(__file__)"),
    (r"\bname == \"main\"", '__name__ == "__main__"'),
    (r"<!, ", "<!-- "),
    (r" , >", " -->"),
    (r"__KEEP_STRONG_(\d+)__", r'<strong data-count="\1">PLACEHOLDER</strong>'),
    (r"KEEP_STRONG_(\d+)__", r'<strong data-count="\1">PLACEHOLDER</strong>'),
]


def restore_python_newlines(text: str) -> str:
    text = text.replace("\r\n", "\n")
    if "\n" in text.strip() and text.count("\n") > 20:
        return text
    # Collapsed single-line Python: re-break at statement boundaries
    text = text.replace("#!/usr/bin/env python3", "#!/usr/bin/env python3\n")
    text = re.sub(r'"""([^"]+)"""', lambda m: '"""' + m.group(1) + '"""\n', text, count=1)
    for token in (
        "import json",
        "import os",
        "import sys",
        "import glob",
        "import re",
        "from datetime import date",
        "sys.path.insert(0",
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
    ):
        text = text.replace(token, "\n" + token)
    text = re.sub(r"  }, {", "  },\n  {", text)
    text = re.sub(r"  }, ]", "  },\n]", text)
    text = re.sub(r"\) def ", ")\n\ndef ", text)
    text = re.sub(r"\) return ", ")\n    return ", text)
    return text


def fix_file(path: str) -> bool:
    with open(path, encoding="utf-8") as f:
        original = f.read()
    text = original
    for pat, repl in FIXES:
        text = re.sub(pat, repl, text)
    if path.endswith(".py"):
        text = restore_python_newlines(text)
    if text != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        return True
    return False


def main():
    targets = [
        os.path.join(ROOT, "scripts", "generate-seo-pages.py"),
    ]
    for path in targets:
        if os.path.exists(path) and fix_file(path):
            print(f"Fixed {path}")


if __name__ == "__main__":
    main()
