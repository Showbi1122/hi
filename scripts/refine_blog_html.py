#!/usr/bin/env python3
"""Safe editorial refinement for blog HTML files (not Python sources)."""

import glob
import os
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "blog")

REPLACEMENTS = [
    (r"\s—\s", ", "),
    (r"\s–\s", ", "),
    (r"--", ", "),
    (r"<strong>([^<]+)</strong>", r"\1"),
    (r"\bWhether you are\b", "If you're"),
    (r"\bWhether you need\b", "If you need"),
    (r"\bWhether you run\b", "If you run"),
    (r"\bIn today's digital world\b", "Online"),
    (r"\bIt's important to note that\b", ""),
    (r"\bLet's dive in\b", ""),
    (r"\bAt the end of the day\b", "Ultimately"),
    (r"\bWhen it comes to\b", "For"),
    (r"\bIn conclusion\b", "To wrap up"),
    (r"\bSimply put\b", ""),
    (r"\bGame-changing\b", "meaningful"),
    (r"\bHere is what\b", "What"),
    (r"\bHere is the\b", "The"),
    (r"\bHere is how\b", "How"),
    (r"\bThis is where\b", "This matters"),
    (r"\bThis is why\b", "That's why"),
    (r"real estate agency in Dubai, or a", "consultancy in Dubai, or a"),
    (r"real estate landing page", "consultancy landing page"),
    (r"automotive services, and professional", "education, and professional"),
    (r"education, automotive services, and", "education and"),
    (r"they were not sure", "they weren't sure"),
    (r"\bdo not\b", "don't"),
    (r"\bdid not\b", "didn't"),
    (r"\bcannot\b", "can't"),
    (r"\bwill not\b", "won't"),
    (r"\bI am\b", "I'm"),
    (r"\bthat is\b", "that's"),
    (r"\bit is\b", "it's"),
    (r"\byou are\b", "you're"),
    (r", ,", ","),
    (r"\.\s*,", "."),
]


def refine_html(html: str) -> str:
    # Nav: ensure Home link
    if ">Home</a></li>" not in html and "nav-links" in html:
        html = html.replace(
            '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html#about">',
            '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html">Home</a></li>\n      <li><a href="../index.html#about">',
        )

    # Convert mistakes-list to prose paragraphs (once per file)
    def mistakes_repl(m):
        items = re.findall(r"<li>(.*?)</li>", m.group(1), re.DOTALL)
        if len(items) < 4:
            return m.group(0)
        out = []
        for item in items:
            item = item.strip()
            if ": " in item[:60]:
                label, rest = item.split(": ", 1)
                out.append(f'<p><em>{label}.</em> {rest}</p>')
            else:
                out.append(f"<p>{item}</p>")
        return "\n      ".join(out)

    html = re.sub(
        r'<ul class="mistakes-list">(.*?)</ul>',
        mistakes_repl,
        html,
        count=1,
        flags=re.DOTALL,
    )

    for pat, repl in REPLACEMENTS:
        html = re.sub(pat, repl, html)

    html = re.sub(r"  +", " ", html)
    html = re.sub(r",\s*\.", ".", html)
    return html


def main():
    for path in sorted(glob.glob(os.path.join(BLOG_DIR, "*.html"))):
        with open(path, encoding="utf-8") as f:
            html = f.read()

        if path.endswith("index.html"):
            if ">Home</a></li>" not in html:
                html = html.replace(
                    '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html#about">',
                    '<ul class="nav-links" id="nav-links">\n      <li><a href="../index.html">Home</a></li>\n      <li><a href="../index.html#about">',
                )
            html = re.sub(
                r"Malik Taleeb Shahbaz</a> — Web Developer",
                "Malik Taleeb Shahbaz</a> · Web Developer",
                html,
            )
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"Updated {os.path.basename(path)}")
            continue

        refined = refine_html(html)
        with open(path, "w", encoding="utf-8") as f:
            f.write(refined)
        print(f"Refined {os.path.basename(path)}")


if __name__ == "__main__":
    main()
