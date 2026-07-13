#!/usr/bin/env python3
"""Export blog Python modules to MDX files for Next.js."""

from __future__ import annotations

import importlib.util
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONTENT_DIR = os.path.join(ROOT, "scripts", "blog_content")
OUT_DIR = os.path.join(ROOT, "content", "blog")

MODULES = [
    "modern_website",
    "react_vs_nextjs",
    "custom_website_benefits",
    "ai_web_development",
    "seo_best_practices",
    "saas_development_guide",
    "lead_generation_tips",
]

SLUG_MAP = {
    "modern_website": "why-every-business-needs-modern-website",
    "react_vs_nextjs": "react-vs-nextjs",
    "custom_website_benefits": "benefits-custom-website-development",
    "ai_web_development": "how-ai-changing-web-development",
    "seo_best_practices": "seo-best-practices-business-websites",
    "saas_development_guide": "saas-development-guide",
    "lead_generation_tips": "lead-generation-website-tips",
}


def fix_links(html: str) -> str:
    html = html.replace("../services.html", "/services")
    html = html.replace("../contact.html", "/contact")
    html = html.replace("../projects.html", "/projects")
    html = html.replace("../about.html", "/about")
    html = html.replace("../services.html#", "/services#")
    html = html.replace('href="/"', 'href="/"')
    html = html.replace("../geo/", "/geo/")
    html = re.sub(r'href="([^"]+)\.html"', r'href="/blog/\1"', html)
    html = re.sub(r'href="blog/([^"]+)"', r'href="/blog/\1"', html)
    html = re.sub(r'href="([^"/][^"]*\.html)"', lambda m: f'href="/{m.group(1)}"', html)
    html = re.sub(r'href="/([^"]+)\.html"', r'href="/\1"', html)
    html = re.sub(r'href="/services\.html#', r'href="/services#', html)
    return html


def parse_related(links_html: str) -> list[dict[str, str]]:
    items = []
    for match in re.finditer(r'<a href="([^"]+)">([^<]+)</a>', links_html):
        href = match.group(1)
        href = href.replace("../services.html", "/services")
        href = href.replace("../contact.html", "/contact")
        href = href.replace("../projects.html", "/projects")
        href = href.replace("../about.html", "/about")
        href = href.replace('href="/"', "/")
        if href.endswith(".html"):
            name = href.split("/")[-1].replace(".html", "")
            if href.startswith("../") or "/" not in href.strip("./"):
                href = f"/blog/{name}" if "blog" not in href else f"/{name}"
            else:
                href = href.replace(".html", "")
        if not href.startswith("/"):
            href = f"/{href}"
        items.append({"href": href, "label": match.group(2)})
    return items


def yaml_escape(s: str) -> str:
    return s.replace('"', '\\"')


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for mod_name in MODULES:
        mod_path = os.path.join(CONTENT_DIR, f"{mod_name}.py")
        spec = importlib.util.spec_from_file_location(mod_name, mod_path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        article = mod.ARTICLE
        slug = article["slug"]
        body = fix_links(article["body_html"].strip())
        related = parse_related(article.get("related_links", ""))
        related_yaml = "\n".join(
            f'  - href: "{r["href"]}"\n    label: "{yaml_escape(r["label"])}"' for r in related
        )
        faqs_yaml = "\n".join(
            f'  - question: "{yaml_escape(q)}"\n    answer: "{yaml_escape(a)}"'
            for q, a in article["faqs"]
        )
        frontmatter = f"""---
slug: "{slug}"
seoTitle: "{yaml_escape(article['seo_title'])}"
metaDescription: "{yaml_escape(article['meta_description'])}"
socialDescription: "{yaml_escape(article.get('social_description', article['meta_description']))}"
headline: "{yaml_escape(article['headline'])}"
tag: "{yaml_escape(article.get('tag', 'Web Development'))}"
cardDescription: "{yaml_escape(article.get('card_description', article['meta_description']))}"
lead: "{yaml_escape(article.get('lead', article['meta_description']))}"
readingTime: "{yaml_escape(article.get('reading_time', '12 min read'))}"
wordCount: {article.get('word_count', 2800)}
keywords: "{yaml_escape(article.get('keywords', ''))}"
imageAlt: "{yaml_escape(article.get('image_alt', article['headline']))}"
datePublished: "{article.get('date_published', '2025-06-01')}"
ctaText: "{yaml_escape(article.get('cta_text', ''))}"
relatedArticles:
{related_yaml}
faqs:
{faqs_yaml}
---

"""
        out_path = os.path.join(OUT_DIR, f"{slug}.mdx")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(frontmatter + body)
        print(f"Exported {out_path}")


if __name__ == "__main__":
    main()
