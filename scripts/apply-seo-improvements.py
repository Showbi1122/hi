#!/usr/bin/env python3
"""Apply SEO improvements: homepage links, geo schema, blog index head/footer."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://taleeb-shahbaz.vercel.app"

GEO_SERVICE_AREAS = {
    "web-developer-usa.html": ("United States", "Web Development Services in the United States"),
    "software-developer-canada.html": ("Canada", "Software Development Services in Canada"),
    "saas-developer-australia.html": ("Australia", "SaaS Development Services in Australia"),
    "website-developer-uk.html": ("United Kingdom", "Website Development Services in the United Kingdom"),
    "react-developer-germany.html": ("Germany", "React Development Services in Germany"),
    "ai-website-developer-switzerland.html": ("Switzerland", "AI Website Development Services in Switzerland"),
    "web-developer-netherlands.html": ("Netherlands", "Web Development Services in the Netherlands"),
    "web-developer-uae.html": ("United Arab Emirates", "Web Development Services in the UAE"),
    "web-developer-saudi-arabia.html": ("Saudi Arabia", "Web Development Services in Saudi Arabia"),
    "seo-website-developer-pakistan.html": ("Pakistan", "SEO Website Development Services in Pakistan"),
}

BLOG_ARTICLES = [
    {
        "name": "Why Every Business Needs a Modern Website in 2026 (Complete Guide)",
        "url": f"{BASE}/blog/why-every-business-needs-modern-website.html",
    },
    {
        "name": "React vs Next.js for Business Websites: Which Should You Choose? (2026 Guide)",
        "url": f"{BASE}/blog/react-vs-nextjs.html",
    },
    {
        "name": "7 Benefits of Custom Website Development vs Templates (2026 Guide)",
        "url": f"{BASE}/blog/benefits-custom-website-development.html",
    },
    {
        "name": "How AI Is Changing Web Development in 2026",
        "url": f"{BASE}/blog/how-ai-changing-web-development.html",
    },
    {
        "name": "SEO Best Practices for Business Websites in 2026: What Actually Moves the Needle",
        "url": f"{BASE}/blog/seo-best-practices-business-websites.html",
    },
    {
        "name": "SaaS Development Guide for Non-Technical Founders (2026 Step-by-Step)",
        "url": f"{BASE}/blog/saas-development-guide.html",
    },
    {
        "name": "Lead Generation Website Tips That Convert in 2026 (Step-by-Step Guide)",
        "url": f"{BASE}/blog/lead-generation-website-tips.html",
    },
]

BLOG_FOOTER = """<footer class="site-footer">
<h2 class="footer-section-title">Site links and resources</h2>
<div class="footer-grid">
<div class="footer-col">
<h3>Pages</h3>
<ul>
<li><a href="/">Home</a></li>
<li><a href="../about.html">About</a></li>
<li><a href="../projects.html">Projects</a></li>
<li><a href="../services.html">Services</a></li>
<li><a href="../contact.html">Contact</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Services</h3>
<ul>
<li><a href="../services.html#service-custom-website">Custom Websites</a></li>
<li><a href="../services.html#service-saas">SaaS Development</a></li>
<li><a href="../services.html#service-frontend">React &amp; Next.js</a></li>
<li><a href="../services.html#service-seo">SEO Websites</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Blog</h3>
<ul>
<li><a href="why-every-business-needs-modern-website.html">Modern Website Guide</a></li>
<li><a href="react-vs-nextjs.html">React vs Next.js</a></li>
<li><a href="./">All Articles</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Connect</h3>
<ul>
<li><a href="../contact.html">Contact</a></li>
<li><a href="https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
<li><a href="https://wa.link/ydmrc4" rel="noopener noreferrer" target="_blank">WhatsApp</a></li>
</ul>
</div>
</div>
<p>© 2026 <a href="/">Malik Taleeb Shahbaz</a> · Web Developer, Full Stack Software Engineer &amp; SaaS Developer. All rights reserved.</p>
</footer>"""


def normalize_home_links(text: str) -> str:
    replacements = [
        ('href="../index.html#process"', 'href="/#process"'),
        ('href="index.html#process"', 'href="/#process"'),
        ('href="../index.html"', 'href="/"'),
        ('href="index.html"', 'href="/"'),
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    return text


def geo_webpage_service_schema(canonical: str, title: str, description: str, country: str, service_name: str) -> str:
    page_id = f"{canonical}#webpage"
    service_id = f"{canonical}#service"
    graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": page_id,
                "url": canonical,
                "name": title,
                "description": description,
                "inLanguage": "en",
                "isPartOf": {"@id": f"{BASE}/#website"},
            },
            {
                "@type": "Service",
                "@id": service_id,
                "name": service_name,
                "description": description,
                "url": canonical,
                "provider": {
                    "@type": "Person",
                    "name": "Malik Taleeb Shahbaz",
                    "url": f"{BASE}/",
                },
                "areaServed": {"@type": "Country", "name": country},
                "serviceType": "Web Development",
            },
        ],
    }
    return f'<script type="application/ld+json">\n{json.dumps(graph, indent=2)}\n  </script>'


def patch_geo_page(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if f"{path.name}#webpage" in text:
        text = normalize_home_links(text)
        path.write_text(text, encoding="utf-8")
        return

    canonical_match = re.search(r'rel="canonical"\s+href="([^"]+)"', text) or re.search(
        r'href="([^"]+)"\s+rel="canonical"', text
    )
    title_match = re.search(r"<title>(.*?)</title>", text, re.S)
    desc_match = re.search(r'name="description"\s+content="([^"]*)"', text) or re.search(
        r'content="([^"]*)"\s+name="description"', text
    )
    if not canonical_match or not title_match or not desc_match:
        raise ValueError(f"Missing meta in {path}")

    canonical = canonical_match.group(1)
    title = re.sub(r"\s+", " ", title_match.group(1).strip())
    description = desc_match.group(1)
    country, service_name = GEO_SERVICE_AREAS[path.name]

    text = re.sub(
        r'<meta content="en_US" property="og:locale">\s*',
        '<meta content="en_US" property="og:locale"/>\n',
        text,
    )
    text = text.replace("</meta></head>", "</head>")
    schema_block = geo_webpage_service_schema(canonical, title, description, country, service_name)
    text = text.replace("</head>", schema_block + "\n</head>", 1)
    text = normalize_home_links(text)
    path.write_text(text, encoding="utf-8")


def blog_index_head_block() -> str:
    title = "Blog | Web Development, SEO &amp; SaaS Guides | Malik Taleeb Shahbaz"
    description = (
        "In-depth guides on modern websites, SaaS development, React, Next.js, SEO, "
        "AI web development, and lead generation. Written by full stack developer Malik Taleeb Shahbaz."
    )
    canonical = f"{BASE}/blog/"
    og_image = f"{BASE}/assets/home/og-image.webp"

    item_list = {
        "@type": "ItemList",
        "@id": f"{canonical}#itemlist",
        "name": "Web Development & SEO Blog Articles",
        "numberOfItems": len(BLOG_ARTICLES),
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i,
                "name": item["name"],
                "url": item["url"],
            }
            for i, item in enumerate(BLOG_ARTICLES, 1)
        ],
    }
    collection = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": f"{canonical}#webpage",
                "url": canonical,
                "name": "Web Development & SEO Blog",
                "description": description,
                "inLanguage": "en",
                "isPartOf": {"@id": f"{BASE}/#website"},
                "mainEntity": {"@id": f"{canonical}#itemlist"},
            },
            item_list,
        ],
    }
    schema = json.dumps(collection, indent=2)

    return f"""  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <meta name="author" content="Malik Taleeb Shahbaz" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="{canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Malik Taleeb Shahbaz, Web Developer" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{og_image}" />
  <meta property="og:image:secure_url" content="{og_image}" />
  <meta property="og:image:type" content="image/webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{og_image}" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <meta name="theme-color" content="#050508">
  <link rel="icon" href="../favicon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <link rel="icon" type="image/webp" sizes="32x32" href="../favicon-32x32.webp" />
  <link rel="icon" type="image/webp" sizes="16x16" href="../favicon-16x16.webp" />
  <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.webp" />
  <link rel="manifest" href="../site.webmanifest" />
  <link rel="stylesheet" href="../assets/style.min.css">
  <link rel="stylesheet" href="../assets/content.css">
  <script type="application/ld+json">
{schema}
  </script>"""


def patch_blog_index() -> None:
    path = ROOT / "blog" / "index.html"
    body = path.read_text(encoding="utf-8")
    body = re.sub(r"<head>.*?</head>", f"<head>\n{blog_index_head_block()}\n</head>", body, count=1, flags=re.S)
    body = re.sub(
        r'<footer class="site-footer">.*?</footer>',
        BLOG_FOOTER,
        body,
        count=1,
        flags=re.S,
    )
    body = normalize_home_links(body)
    path.write_text(body, encoding="utf-8")


def patch_index_searchaction() -> None:
    path = ROOT / "index.html"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r',\s*"potentialAction":\s*\{\s*"@type":\s*"SearchAction",\s*"target":\s*"[^"]+",\s*"query-input":\s*"required name=search_term_string"\s*\}',
        "",
        text,
        count=1,
    )
    text = normalize_home_links(text)
    path.write_text(text, encoding="utf-8")


def patch_all_html() -> None:
    for path in ROOT.rglob("*.html"):
        if path.name == "index.html" and path.parent == ROOT:
            continue
        if path.parent.name == "blog" and path.name == "index.html":
            continue
        if path.parent.name == "geo":
            continue
        text = path.read_text(encoding="utf-8")
        updated = normalize_home_links(text)
        if updated != text:
            path.write_text(updated, encoding="utf-8")


def main() -> None:
    patch_index_searchaction()
    for geo_file in GEO_SERVICE_AREAS:
        patch_geo_page(ROOT / "geo" / geo_file)
    patch_blog_index()
    patch_all_html()
    print("SEO improvements applied.")


if __name__ == "__main__":
    main()
