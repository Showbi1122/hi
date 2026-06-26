#!/usr/bin/env python3
"""Rebuild blog_content/*.py from published blog HTML files."""

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "blog")
OUT_DIR = os.path.join(ROOT, "scripts", "blog_content")

SLUG_TO_MODULE = {
    "why-every-business-needs-modern-website": "modern_website",
    "react-vs-nextjs": "react_vs_nextjs",
    "benefits-custom-website-development": "custom_website_benefits",
    "how-ai-changing-web-development": "ai_web_development",
    "seo-best-practices-business-websites": "seo_best_practices",
    "saas-development-guide": "saas_development_guide",
    "lead-generation-website-tips": "lead_generation_tips",
}

META = {
    "why-every-business-needs-modern-website": {
        "tag": "Business Growth",
        "reading_time": "14 min read",
        "word_count": 3450,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="benefits-custom-website-development.html">Custom vs template websites</a></li>
          <li><a href="seo-best-practices-business-websites.html">SEO best practices guide</a></li>
          <li><a href="lead-generation-website-tips.html">Lead generation website tips</a></li>""",
    },
    "react-vs-nextjs": {
        "tag": "Technology",
        "reading_time": "14 min read",
        "word_count": 3410,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="saas-development-guide.html">SaaS development guide</a></li>
          <li><a href="seo-best-practices-business-websites.html">SEO best practices</a></li>
          <li><a href="benefits-custom-website-development.html">Custom website benefits</a></li>""",
    },
    "benefits-custom-website-development": {
        "tag": "Web Development",
        "reading_time": "13 min read",
        "word_count": 2841,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="why-every-business-needs-modern-website.html">Modern business website guide</a></li>
          <li><a href="lead-generation-website-tips.html">Lead generation tips</a></li>
          <li><a href="../index.html#projects">Portfolio projects</a></li>""",
    },
    "how-ai-changing-web-development": {
        "tag": "AI & Automation",
        "reading_time": "13 min read",
        "word_count": 2815,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="seo-best-practices-business-websites.html">SEO best practices</a></li>
          <li><a href="../index.html#service-ai">AI website development</a></li>
          <li><a href="saas-development-guide.html">SaaS development guide</a></li>""",
    },
    "seo-best-practices-business-websites": {
        "tag": "SEO",
        "reading_time": "13 min read",
        "word_count": 2810,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="../index.html#service-seo">SEO website development</a></li>
          <li><a href="../geo/seo-website-developer-pakistan.html">SEO developer Pakistan</a></li>
          <li><a href="react-vs-nextjs.html">React vs Next.js</a></li>""",
    },
    "saas-development-guide": {
        "tag": "SaaS",
        "reading_time": "15 min read",
        "word_count": 3006,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="../index.html#service-saas">SaaS development services</a></li>
          <li><a href="../geo/saas-developer-australia.html">SaaS developer Australia</a></li>
          <li><a href="react-vs-nextjs.html">React vs Next.js</a></li>""",
    },
    "lead-generation-website-tips": {
        "tag": "Marketing",
        "reading_time": "13 min read",
        "word_count": 2800,
        "date_published": "2025-06-01",
        "related_links": """
          <li><a href="../index.html#service-landing">Landing page development</a></li>
          <li><a href="benefits-custom-website-development.html">Custom website benefits</a></li>
          <li><a href="../index.html#projects">Portfolio</a></li>""",
    },
}


def extract(html, pattern, flags=0):
    m = re.search(pattern, html, flags)
    return m.group(1).strip() if m else ""


def rebuild_py(slug, html):
    mod = SLUG_TO_MODULE[slug]
    title = extract(html, r"<title>([^<]+)</title>")
    seo_title = title.replace(" | Malik Taleeb Shahbaz", "")
    meta_desc = extract(html, r'<meta name="description" content="([^"]+)"')
    social = extract(html, r'<meta property="og:description" content="([^"]+)"')
    headline = extract(html, r"<h1>([^<]+)</h1>")
    lead = extract(html, r'<p class="lead">([^<]+)</p>')
    keywords = extract(html, r'<meta name="keywords" content="([^"]+)"')
    image_alt = extract(html, r'<meta property="og:image:alt" content="([^"]+)"')

    # Body: from first aside.quick-answer through end of content-body div
    body = extract(
        html,
        r"(<aside class=\"quick-answer.*?</div>\s*</div>\s*)",
        re.DOTALL,
    )
    if not body:
        body = extract(html, r"(<aside class=\"quick-answer.*?<div class=\"content-body\">.*?</div>\s*)", re.DOTALL)

    # Better extraction: quick-answer through closing content-body before faq
    m = re.search(
        r"(<aside class=\"quick-answer.*?</div>\s*</div>\s*<nav class=\"toc.*?</nav>\s*<div class=\"content-body\">.*?</div>)",
        html,
        re.DOTALL,
    )
    if m:
        body = m.group(1)
    else:
        m2 = re.search(
            r"(<aside class=\"quick-answer.*?)(<section class=\"article-section faq-section)",
            html,
            re.DOTALL,
        )
        body = m2.group(1).rstrip() if m2 else ""

    # FAQs from schema JSON
    faqs = []
    schema_m = re.search(
        r'<script type="application/ld\+json">\s*(\{[^<]*"@type": "FAQPage".*?\})\s*</script>',
        html,
        re.DOTALL,
    )
    if schema_m:
        data = json.loads(schema_m.group(1))
        for item in data.get("mainEntity", []):
            faqs.append((item["name"], item["acceptedAnswer"]["text"]))

    cta_m = re.search(
        r'<footer class="article-conclusion.*?<p>([^<]+)</p>',
        html,
        re.DOTALL,
    )
    cta_text = cta_m.group(1).strip() if cta_m else ""

    extra = META[slug]
    faq_lines = ",\n        ".join(
        f'(\n            "{q.replace(chr(34), chr(92)+chr(34))}",\n            "{a.replace(chr(34), chr(92)+chr(34))}",\n        )'
        for q, a in faqs
    )

    content = f'''"""Long-form blog article: {headline}."""

ARTICLE = {{
    "slug": "{slug}",
    "seo_title": {json.dumps(seo_title)},
    "meta_description": {json.dumps(meta_desc)},
    "social_description": {json.dumps(social)},
    "headline": {json.dumps(headline)},
    "tag": {json.dumps(extra["tag"])},
    "lead": {json.dumps(lead)},
    "reading_time": {json.dumps(extra["reading_time"])},
    "word_count": {extra["word_count"]},
    "keywords": {json.dumps(keywords)},
    "image_alt": {json.dumps(image_alt)},
    "date_published": {json.dumps(extra["date_published"])},
    "related_links": """{extra["related_links"]}""",
    "cta_text": {json.dumps(cta_text)},
    "body_html": """
{body}
""",
    "faqs": [
        {faq_lines}
    ],
}}
'''
    out = os.path.join(OUT_DIR, f"{mod}.py")
    with open(out, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Rebuilt {out}")


def main():
    for slug in SLUG_TO_MODULE:
        path = os.path.join(BLOG_DIR, f"{slug}.html")
        with open(path, encoding="utf-8") as f:
            html = f.read()
        rebuild_py(slug, html)


if __name__ == "__main__":
    main()
