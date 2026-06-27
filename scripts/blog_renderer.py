#!/usr/bin/env python3
"""Render long-form blog articles with full SEO schema."""

import json
from datetime import date

from favicon_tags import favicon_head

BASE = "https://taleeb-shahbaz.vercel.app"
TODAY = date.today().isoformat()
WHATSAPP = "https://wa.link/ydmrc4"
LINKEDIN = "https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342"


def render_faq_html(faqs):
    items = ""
    for q, a in faqs:
        items += f"""
        <details class="faq-item">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>"""
    return f"""
    <section class="article-section faq-section reveal" id="faq">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">{items}
      </div>
    </section>"""


def render_page(article):
    slug = article["slug"]
    url = f"{BASE}/blog/{slug}.html"
    title = article["seo_title"]
    desc = article["meta_description"]
    social = article.get("social_description", desc)
    headline = article["headline"]
    reading_time = article.get("reading_time", "12 min read")
    word_count = article.get("word_count", 2800)

    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in article["faqs"]
        ],
    }

    blog_schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": headline,
        "description": desc,
        "author": {"@type": "Person", "name": "Malik Taleeb Shahbaz", "url": BASE, "jobTitle": "Full Stack Web Developer"},
        "publisher": {"@type": "Person", "name": "Malik Taleeb Shahbaz"},
        "datePublished": article.get("date_published", "2025-06-01"),
        "dateModified": TODAY,
        "mainEntityOfPage": url,
        "image": f"{BASE}/assets/home/og-image.webp",
        "wordCount": word_count,
        "keywords": article.get("keywords", ""),
        "articleSection": article.get("tag", "Web Development"),
    }

    bc_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{BASE}/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": f"{BASE}/blog/"},
            {"@type": "ListItem", "position": 3, "name": headline, "item": url},
        ],
    }

    keywords_meta = ""
    if article.get("keywords"):
        keywords_meta = f'  <meta name="keywords" content="{article["keywords"]}" />\n'

    body = article["body_html"]
    faq_html = render_faq_html(article["faqs"])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />
  <meta name="author" content="Malik Taleeb Shahbaz" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="{url}" />
{keywords_meta}  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet"></noscript>
  <meta name="theme-color" content="#050508">
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Malik Taleeb Shahbaz · Web Developer" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{social}" />
  <meta property="og:image" content="{BASE}/assets/home/og-image.webp" />
  <meta property="og:image:alt" content="{article.get('image_alt', headline)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{social}" />
  <meta name="twitter:image" content="{BASE}/assets/home/og-image.webp" />
{favicon_head("../")}
  <link rel="stylesheet" href="../assets/style.css">
  <link rel="stylesheet" href="../assets/content.css">
  <script type="application/ld+json">
{json.dumps(bc_schema, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(blog_schema, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(faq_schema, indent=2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="navbar" id="navbar" aria-label="Main navigation">
    <a href="../index.html" class="nav-logo"><span>MTS</span> · Developer</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
    <ul class="nav-links" id="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about.html">About</a></li>
      <li><a href="../services.html">Services</a></li>
      <li><a href="../projects.html">Projects</a></li>
      <li><a href="./">Blog</a></li>
      <li><a href="../index.html#process">Process</a></li>
      <li><a href="../contact.html" class="nav-cta">Hire Me</a></li>
    </ul>
  </nav>

  <article class="content-page longform-article" id="main-content">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">Home</a> <span aria-hidden="true">/</span>
      <a href="./">Blog</a> <span aria-hidden="true">/</span>
      <span aria-current="page">{headline}</span>
    </nav>

    <header class="content-hero reveal">
      <span class="section-label">{article.get("tag", "Web Development")}</span>
      <h1>{headline}</h1>
      <p class="reading-time">{reading_time} · By Malik Taleeb Shahbaz · Updated {TODAY}</p>
      <p class="lead">{article.get("lead", desc)}</p>
    </header>

    {body}

    {faq_html}

    <footer class="article-conclusion reveal">
      <h2>Need Help Building Your Website?</h2>
      <p>{article.get("cta_text", "If this raised questions about your project, message me. I'll give you a straight answer on scope, timeline, and cost. No pressure.")}</p>
      <p><a href="../contact.html" class="btn btn-primary">Start a Conversation</a> &nbsp; <a href="{WHATSAPP}" class="btn btn-glass" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
    </footer>
  </article>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="../services.html#service-custom-website">Custom Website Development</a></li>
          <li><a href="../services.html#service-saas">SaaS Development</a></li>
          <li><a href="../services.html#service-seo">SEO Website Development</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Related Articles</h4>
        <ul>
          {article.get("related_links", "")}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="{LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="{WHATSAPP}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href="../projects.html">Portfolio</a></li>
        </ul>
      </div>
    </div>
    <p>&copy; 2026 <a href="../index.html">Malik Taleeb Shahbaz</a> · Web Developer &amp; Software Engineer.</p>
  </footer>

  <a href="{WHATSAPP}" class="sticky-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script src="../assets/main.js" defer></script>
</body>
</html>"""
