#!/usr/bin/env python3
"""Humanize blog content: strip excessive bold, fix stiff phrasing."""

import re
import os
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "scripts", "blog_content")

# Remove <strong>label:</strong> in list items → plain "Label:"
LI_STRONG = re.compile(r"<li><strong>([^<]+)</strong>\s*")

# Standalone keyword bold in paragraphs
P_STRONG_KW = re.compile(r"<strong>([^<]{3,60})</strong>")

REPLACEMENTS = [
    (r"\bWhether you are\b", "If you're"),
    (r"\bWhether you run\b", "If you run"),
    (r"\bWhether you need\b", "If you need"),
    (r"\byou are\b", "you're"),
    (r"\bYou are\b", "You're"),
    (r"\bthat is\b", "that's"),
    (r"\bThat is\b", "That's"),
    (r"\bit is\b", "it's"),
    (r"\bIt is\b", "It's"),
    (r"\bdo not\b", "don't"),
    (r"\bDo not\b", "Don't"),
    (r"\bcannot\b", "can't"),
    (r"\bCannot\b", "Can't"),
    (r"\bwill not\b", "won't"),
    (r"\bWill not\b", "Won't"),
    (r"\bI am\b", "I'm"),
    (r"\bI will\b", "I'll"),
    (r"\bwe will\b", "we'll"),
    (r"\bWe will\b", "We'll"),
    (r" — and that is where", " — and that's where"),
    (r"Here is how", "Here's how"),
    (r"Here is what", "Here's what"),
    (r"Here is the", "Here's the"),
]


def humanize_text(text: str) -> str:
    text = LI_STRONG.sub(r"<li>\1 ", text)
    # Remove bold wrappers in paragraphs (keep text)
    def unwrap_strong(m):
        inner = m.group(1)
        # Keep bold only for acronyms like LCP if needed - actually remove all
        return inner

    # Only unwrap in <p> tags to be safer
    def unwrap_in_p(match):
        p_content = match.group(0)
        p_content = re.sub(r"<strong>([^<]+)</strong>", r"\1", p_content)
        return p_content

    text = re.sub(r"<p>[^<]*(?:<[^p][^>]*>[^<]*)*</p>", unwrap_in_p, text, flags=re.DOTALL)
    # Also unwrap in blockquotes and dd
    text = re.sub(r"<blockquote([^>]*)>(.*?)</blockquote>", lambda m: f"<blockquote{m.group(1)}>{re.sub(r'<strong>([^<]+)</strong>', r'\\1', m.group(2))}</blockquote>", text, flags=re.DOTALL)

    for pat, repl in REPLACEMENTS:
        text = re.sub(pat, repl, text)

    # Fix double contractions from over-replacement
    text = text.replace("you're're", "you're")
    text = text.replace("it's's", "it's")
    text = text.replace("that's's", "that's")

    return text


def humanize_lead_fields(data: str) -> str:
    for pat, repl in REPLACEMENTS:
        data = re.sub(pat, repl, data)
    return data


def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split body_html
    m = re.search(r'("body_html":\s*)"""(.*?)"""', content, re.DOTALL)
    if m:
        body = humanize_text(m.group(2))
        content = content[: m.start(2)] + body + content[m.end(2) :]

    for field in ("lead", "cta_text", "social_description"):
        fm = re.search(rf'("{field}":\s*)"(.*?)"', content, re.DOTALL)
        if fm:
            val = humanize_lead_fields(fm.group(2))
            content = content[: fm.start(2)] + val + content[fm.end(2) :]

    # Humanize FAQ answers in tuples - trickier, apply replacements globally on faqs section
    content = humanize_lead_fields(content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Humanized {path}")


def main():
    for path in glob.glob(os.path.join(CONTENT_DIR, "*.py")):
        process_file(path)


if __name__ == "__main__":
    main()
