#!/usr/bin/env python3
"""Build all long-form blog HTML pages from content modules."""

import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "blog")
CONTENT_DIR = os.path.join(ROOT, "scripts", "blog_content")

sys.path.insert(0, os.path.join(ROOT, "scripts"))

from blog_renderer import render_page
from favicon_tags import favicon_head

MODULES = [
    "modern_website",
    "react_vs_nextjs",
    "custom_website_benefits",
    "ai_web_development",
    "seo_best_practices",
    "saas_development_guide",
    "lead_generation_tips",
]


def main():
    os.makedirs(BLOG_DIR, exist_ok=True)
    articles = []

    for mod_name in MODULES:
        mod_path = os.path.join(CONTENT_DIR, f"{mod_name}.py")
        if not os.path.exists(mod_path):
            print(f"MISSING: {mod_path}")
            continue

        import importlib.util
        spec = importlib.util.spec_from_file_location(mod_name, mod_path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        article = mod.ARTICLE
        articles.append(article)

        out = os.path.join(BLOG_DIR, f"{article['slug']}.html")
        with open(out, "w", encoding="utf-8") as f:
            f.write(render_page(article))
        wc = article.get("word_count", "?")
        print(f"Built {out} ({wc} words)")

    # Blog index
    cards = ""
    for a in articles:
        cards += f"""
      <a href="{a['slug']}.html" class="blog-card reveal">
        <div class="blog-card-body">
          <span class="blog-tag">{a.get('tag', 'Web Development')}</span>
          <h3>{a['headline']}</h3>
          <p>{a.get('card_description', a['meta_description'])}</p>
          <span class="read-more">{a.get('reading_time', '12 min read')} · Read article</span>
        </div>
      </a>"""

    index_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog | Web Development, SEO &amp; SaaS Guides | Malik Taleeb Shahbaz</title>
  <meta name="description" content="In-depth guides on modern websites, SaaS development, React, Next.js, SEO, AI web development, and lead generation. Written by full stack developer Malik Taleeb Shahbaz." />
  <meta name="author" content="Malik Taleeb Shahbaz" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://taleeb-shahbaz.vercel.app/blog/" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <meta name="theme-color" content="#050508">
{favicon_head("../")}
  <link rel="stylesheet" href="../assets/style.css">
  <link rel="stylesheet" href="../assets/content.css">
</head>
<body>
  <nav class="navbar" id="navbar" aria-label="Main navigation">
    <a href="../index.html" class="nav-logo"><span>MTS</span> · Developer</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
    <ul class="nav-links" id="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../index.html#about">About</a></li>
      <li><a href="../index.html#services">Services</a></li>
      <li><a href="../index.html#projects">Projects</a></li>
      <li><a href="./">Blog</a></li>
      <li><a href="../index.html#contact" class="nav-cta">Hire Me</a></li>
    </ul>
  </nav>
  <article class="content-page">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">Home</a> <span aria-hidden="true">/</span>
      <span aria-current="page">Blog</span>
    </nav>
    <header class="content-hero reveal">
      <span class="section-label">Insights</span>
      <h1>Web Development &amp; SEO Blog</h1>
      <p class="lead">Long-form guides from actual project work: websites, SaaS, SEO, React, and the questions clients ask before we start building.</p>
    </header>
    <div class="blog-grid reveal">{cards}
    </div>
  </article>
  <footer class="site-footer">
    <p>&copy; 2025 <a href="../index.html">Malik Taleeb Shahbaz</a> · Web Developer &amp; Software Engineer.</p>
  </footer>
  <script src="../assets/main.js" defer></script>
</body>
</html>"""

    with open(os.path.join(BLOG_DIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(index_html)
    print("Built blog/index.html")


if __name__ == "__main__":
    main()
