#!/usr/bin/env python3
"""Generate geo landing pages for SEO."""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from favicon_tags import favicon_head

BASE = "https://taleeb-shahbaz.vercel.app"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WHATSAPP = "https://wa.link/ydmrc4"
LINKEDIN = "https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342"

GEO_PAGES = [
    {
        "file": "web-developer-usa.html",
        "title": "Web Developer in USA | Hire Malik Taleeb Shahbaz",
        "description": "Hire an experienced web developer for US businesses. Custom websites, React apps, SaaS development, and SEO-optimized sites for startups and enterprises across the United States.",
        "h1": "Web Developer for United States Businesses",
        "label": "USA · Remote Development",
        "lead": "I work with US startups, agencies, and small businesses on sites and web apps that load fast and convert. Calls happen in your time zone; updates land in Slack or Loom when you're offline.",
        "sections": [
            (
                "Why US companies hire me",
                "American clients need developers who deliver on deadline, communicate in plain English, and understand how US customers browse and buy online. I build mobile-first, ADA-conscious interfaces, integrate analytics and CRM tools common in the US market, and optimize for Google Core Web Vitals.",
            ),
            (
                "Services for US clients",
                "Custom business websites, landing pages for paid ads, React and Next.js frontends, SaaS dashboards, lead-generation funnels, and SEO-ready marketing sites. I work with founders in New York, California, Texas, Florida, and nationwide.",
            ),
            (
                "Technologies",
                "JavaScript, TypeScript, React, Next.js, Node.js, HTML5, CSS3, Firebase, REST APIs, and performance-focused static sites deployed on Vercel or your preferred US hosting.",
            ),
            (
                "How we work together",
                "We start with a discovery call, agree on scope and timeline, then build in iterations with Loom or Slack updates. Launch includes analytics, working forms, and handoff docs. Fixed price or milestones, whatever fits your procurement process.",
            ),
        ],
        "faq": [
            (
                "Do you work with US time zones?",
                "Yes. I schedule calls around EST, CST, MST, and PST and provide async updates so projects keep moving while you sleep.",
            ),
            (
                "Can you build a site for Google Ads landing pages?",
                "Absolutely. I specialize in fast landing pages with clear CTAs, trust signals, and conversion tracking for US ad campaigns.",
            ),
        ],
    },
    {
        "file": "software-developer-canada.html",
        "title": "Software Developer in Canada | Custom Web & SaaS Solutions",
        "description": "Software developer serving Canadian businesses. Full stack web development, SaaS products, and bilingual-ready websites for companies across Canada.",
        "h1": "Software Developer for Canadian Companies",
        "label": "Canada · Remote Partnership",
        "lead": "Toronto startup or Vancouver trades business, same problem: you need software that works and a site that doesn't embarrass you in front of clients.",
        "sections": [
            (
                "Understanding the Canadian market",
                "Canadian buyers expect fast, accessible, privacy-aware digital experiences. I build sites that load quickly on mobile networks, support English content with room for French expansion, and follow modern privacy best practices.",
            ),
            (
                "What I build",
                "Business websites, client portals, booking systems, SaaS MVPs, e-commerce storefronts, and internal tools using JavaScript, React, and Node.js stacks.",
            ),
            (
                "Industries served",
                "Professional services, education, healthcare marketing, and local trades across Ontario, British Columbia, Alberta, and Quebec.",
            ),
            (
                "Delivery process",
                "Requirements call, rough prototype, build in sprints, staging review, then production. I stay around for the first week after launch if something breaks.",
            ),
        ],
        "faq": [
            (
                "Do you invoice in CAD?",
                "Project quotes can be discussed in USD or CAD-equivalent based on your preference.",
            ),
            (
                "Can you optimize for Canadian search?",
                "Yes, local SEO structure, Google Business Profile integration, and geo-targeted landing pages.",
            ),
        ],
    },
    {
        "file": "saas-developer-australia.html",
        "title": "SaaS Developer in Australia | Web Apps & Product Development",
        "description": "SaaS developer for Australian startups and scale-ups. Build MVPs, dashboards, subscription apps, and modern web products with React, Node.js, and cloud backends.",
        "h1": "SaaS Developer for Australian Startups",
        "label": "Australia · Product Development",
        "lead": "Australian founders usually need an MVP before the next raise, not a six-month agency timeline. I build SaaS prototypes, dashboards, and subscription-ready apps at a pace that matches how you actually work.",
        "sections": [
            (
                "SaaS development expertise",
                "I design and build multi-tenant web applications, user authentication flows, billing-ready architectures, admin panels, and API integrations, the foundation every Australian SaaS needs before seed funding or beta launch.",
            ),
            (
                "Tech stack",
                "React, Next.js, Node.js, JavaScript/TypeScript, Firebase or custom REST backends, Stripe-ready checkout flows, and responsive UI built for desktop-first B2B users.",
            ),
            (
                "From idea to launch",
                "First week: user stories and wireframes. Weeks two through four: core features and auth. Weeks five and six: polish, testing, deploy. After that we iterate based on what beta users actually do.",
            ),
            (
                "Why remote works for AU",
                "Async collaboration fits Australian business hours. Daily progress updates and shared Notion boards keep Sydney, Melbourne, and Brisbane teams aligned.",
            ),
        ],
        "faq": [
            (
                "Can you build an MVP for investor demos?",
                "Yes. I focus on the 3–5 features that prove product-market fit with production-quality code.",
            ),
            (
                "Do you handle subscription billing?",
                "I integrate Stripe and prepare architecture for recurring billing; full PCI compliance depends on your payment setup.",
            ),
        ],
    },
    {
        "file": "website-developer-uk.html",
        "title": "Website Developer in UK | Business & Marketing Websites",
        "description": "Website developer for UK businesses. Custom WordPress-alternative sites, marketing websites, and lead generation pages optimized for British search and mobile users.",
        "h1": "Website Developer for UK Businesses",
        "label": "United Kingdom",
        "lead": "UK SMEs and consultancies need sites that look credible on a phone during a commute and don't fall apart under GDPR scrutiny. That's the bar I build to.",
        "sections": [
            (
                "UK-focused web development",
                "British customers judge credibility in seconds. I deliver clean typography, fast hosting, cookie-consent-ready layouts, and content structures that rank for local and national UK searches.",
            ),
            (
                "Services",
                "Company websites, portfolio sites, landing pages, brochure sites, and marketing campaign microsites for London, Manchester, Birmingham, Edinburgh, and beyond.",
            ),
            (
                "SEO for UK search",
                "Technical SEO, schema markup, Core Web Vitals, internal linking, and content architecture targeting UK long-tail keywords.",
            ),
            (
                "Technologies",
                "Semantic HTML, modern CSS, JavaScript, React where interactivity demands it, and static or Jamstack deployment for speed and security.",
            ),
        ],
        "faq": [
            (
                "Are sites GDPR compliant?",
                "I implement privacy-friendly forms, consent banners, and minimal data collection patterns; legal review of your policy is recommended.",
            ),
            (
                "Can you match UK brand guidelines?",
                "Yes, I work from your brand book, fonts, and tone of voice.",
            ),
        ],
    },
    {
        "file": "react-developer-germany.html",
        "title": "React Developer in Germany | Frontend & Full Stack Development",
        "description": "React developer for German companies. Component-driven UIs, Next.js apps, TypeScript, and performant frontends for engineering-focused European clients.",
        "h1": "React Developer for German Engineering Teams",
        "label": "Germany · Frontend Excellence",
        "lead": "German teams care about code quality, documentation, and performance numbers, not slide decks. I ship React and Next.js work your engineers can extend without calling me for every typo.",
        "sections": [
            (
                "React development services",
                "Single-page applications, Next.js SSR/SSG sites, design-system components, dashboard UIs, and API-connected frontends with TypeScript for type safety.",
            ),
            (
                "Engineering standards",
                "ESLint-configured repos, Git workflows, component tests where needed, Lighthouse scores above 90, and WCAG-oriented markup.",
            ),
            (
                "Collaboration with DACH teams",
                "English communication, detailed technical specs, and overlap with CET business hours for standups and reviews.",
            ),
            (
                "Full stack capability",
                "When projects need backend work, I pair React frontends with Node.js APIs, Firebase, or headless CMS integrations.",
            ),
        ],
        "faq": [
            (
                "Do you use Next.js or Create React App?",
                "I recommend Next.js for SEO-critical and production apps; plain React for embedded widgets or SPAs.",
            ),
            (
                "Can you join an existing codebase?",
                "Yes, I onboard via code review and follow your team's conventions.",
            ),
        ],
    },
    {
        "file": "ai-website-developer-switzerland.html",
        "title": "AI Website Developer in Switzerland | Smart Automation & Web Apps",
        "description": "AI website developer for Swiss businesses. Intelligent contact flows, automation integrations, and modern websites for finance, hospitality, and tech companies in Switzerland.",
        "h1": "AI Website Developer for Swiss Businesses",
        "label": "Switzerland · AI-Enhanced Web",
        "lead": "Swiss clients want sites that feel premium and handle data carefully. I add AI chat and automation where it saves real time, not because it's on a trend list.",
        "sections": [
            (
                "AI-powered web experiences",
                "Intelligent FAQ bots, lead-qualification chat flows, automated email routing, AI-assisted content sections, and integrations with OpenAI or custom APIs, always with human oversight and data privacy in mind.",
            ),
            (
                "Premium design for Swiss markets",
                "Minimal layouts, precise spacing, multilingual-ready structure (DE/FR/IT/EN), and performance tuned for discerning users in Zürich, Geneva, and Basel.",
            ),
            (
                "Use cases",
                "Private banking marketing sites, luxury hospitality, medtech landing pages, and B2B SaaS with AI-assisted onboarding.",
            ),
            (
                "Security mindset",
                "HTTPS everywhere, environment-based secrets, no unnecessary data storage, and Swiss-aligned privacy practices.",
            ),
        ],
        "faq": [
            (
                "Can you add an AI chatbot to my site?",
                "Yes, embedded assistants trained on your FAQ and services, with escalation to human contact.",
            ),
            (
                "Do you support multilingual sites?",
                "I structure sites for easy translation and can implement language switchers.",
            ),
        ],
    },
    {
        "file": "seo-website-developer-pakistan.html",
        "title": "SEO Website Developer in Pakistan | Rank on Google & AI Search",
        "description": "SEO website developer in Pakistan. Malik Taleeb Shahbaz builds fast, schema-rich websites that rank on Google, Bing, and AI search engines for local and global clients.",
        "h1": "SEO Website Developer Based in Pakistan",
        "label": "Pakistan · Global Delivery",
        "lead": "I'm based in Pakistan and most of my clients aren't. I build fast, schema-heavy sites at rates that make sense for startups, and I overlap with Gulf and European hours when you need a call.",
        "sections": [
            (
                "Why hire a Pakistani SEO developer",
                "You get skilled full stack development at competitive rates, English fluency, overlap with Gulf and European time zones, and deep focus on organic growth, not just pretty pixels.",
            ),
            (
                "SEO services included",
                "Keyword research support, meta optimization, JSON-LD schema, sitemap/robots setup, internal linking, image alt text, FAQ schema, and content structured for Google and AI answer engines.",
            ),
            (
                "Local and export businesses",
                "I build for Pakistani exporters, IT companies, and freelancers targeting US, UK, and GCC markets from Pakistan.",
            ),
            (
                "Technologies",
                "HTML5, JavaScript, React, Next.js, Vue.js, Firebase, and performance tooling, deployed on Vercel with global CDN.",
            ),
        ],
        "faq": [
            (
                "Can you rank my site on Google Pakistan?",
                "I implement technical SEO foundations; rankings also depend on content, backlinks, and competition.",
            ),
            (
                "Do you work with international clients?",
                "Yes, most of my clients are in the US, UK, UAE, and Australia.",
            ),
        ],
    },
    {
        "file": "web-developer-uae.html",
        "title": "Web Developer in UAE | Dubai & Abu Dhabi Business Websites",
        "description": "Web developer for UAE businesses. Business websites, lead generation sites, and web apps for Dubai, Abu Dhabi, and GCC companies.",
        "h1": "Web Developer for UAE & GCC Businesses",
        "label": "UAE · Gulf Region",
        "lead": "Dubai consultancy, Abu Dhabi hospitality, Gulf e-commerce: mobile-first, WhatsApp-ready, and polished enough that regional buyers don't bounce in three seconds.",
        "sections": [
            (
                "Gulf market expertise",
                "RTL-ready layouts when needed, WhatsApp-first contact flows, fast mobile performance for on-the-go users, and design language that conveys trust and luxury.",
            ),
            (
                "Popular projects",
                "Business consultancy pages, restaurant and hospitality sites, corporate profiles for free-zone companies, and lead-generation landing pages.",
            ),
            (
                "Lead generation focus",
                "Every UAE business site I build prioritizes clear CTAs, WhatsApp integration, multilingual options, and tracking for Meta and Google ads.",
            ),
            (
                "Delivery",
                "Remote collaboration with video calls aligned to Gulf Standard Time, milestone payments, and launch support.",
            ),
        ],
        "faq": [
            (
                "Can you integrate WhatsApp Business?",
                "Yes. Click-to-chat, floating buttons, and pre-filled message templates.",
            ),
        ],
    },
    {
        "file": "web-developer-saudi-arabia.html",
        "title": "Web Developer in Saudi Arabia | Vision 2030 Digital Solutions",
        "description": "Web developer for Saudi Arabian businesses. Modern websites and web apps for Riyadh, Jeddah, and KSA companies embracing digital transformation.",
        "h1": "Web Developer for Saudi Arabian Companies",
        "label": "Saudi Arabia · KSA",
        "lead": "Brands selling into Saudi Arabia need credible Arabic-friendly sites and fast mobile performance. I build remotely, aligned to Arabia Standard Time, with RTL support when you need it.",
        "sections": [
            (
                "Digital growth in KSA",
                "Saudi buyers research online before they commit. I build corporate sites, service landing pages, and web apps that load quickly on mobile and look credible to local and expat audiences.",
            ),
            (
                "Services",
                "Corporate websites, government contractor profiles, education portals, healthcare marketing sites, and e-commerce storefronts.",
            ),
            (
                "Technical approach",
                "Mobile-first responsive design, optional Arabic RTL support, schema markup, fast CDN delivery, and secure HTTPS hosting.",
            ),
            (
                "Working across time zones",
                "I align communication with Arabia Standard Time and provide bilingual content structure when required.",
            ),
        ],
        "faq": [
            (
                "Can you support Arabic language?",
                "I implement RTL layouts and work with your Arabic copy or translation provider.",
            ),
            (
                "Do you serve Riyadh and Jeddah businesses?",
                "Yes, remotely for companies across the Kingdom.",
            ),
        ],
    },
    {
        "file": "web-developer-netherlands.html",
        "title": "Web Developer in Netherlands | Dutch & EU Business Websites",
        "description": "Web developer for Dutch and EU companies. Clean, accessible websites and SaaS interfaces for Amsterdam, Rotterdam, and Netherlands startups.",
        "h1": "Web Developer for Netherlands & Benelux",
        "label": "Netherlands · EU Market",
        "lead": "Dutch startups want direct communication and clean code. I build marketing sites and React apps for Amsterdam and Rotterdam teams without the agency layer in between.",
        "sections": [
            (
                "Netherlands web standards",
                "Accessible (WCAG-minded) interfaces, GDPR-ready forms, fast loading on European networks, and English/Dutch content flexibility.",
            ),
            (
                "What I deliver",
                "Startup marketing sites, B2B SaaS landing pages, portfolio sites for agencies, and custom CRM-style internal tools.",
            ),
            (
                "Stack",
                "React, Next.js, TypeScript, Node.js, semantic HTML, and EU-friendly hosting options.",
            ),
            (
                "Collaboration",
                "Slack, GitHub, and weekly video syncs in CET-friendly hours.",
            ),
        ],
        "faq": [
            (
                "Do you work with Amsterdam startups?",
                "Yes, especially early-stage teams needing an MVP or marketing site quickly.",
            ),
            (
                "Is GDPR handled?",
                "Privacy-by-design forms and cookie patterns; legal text is your responsibility.",
            ),
        ],
    },
]


def og_block(title, description, url, image=f"{BASE}/assets/home/og-image.webp"):
    return f"""  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Malik Taleeb Shahbaz · Web Developer" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{image}" />"""


def breadcrumb_schema(items):
    elements = []
    for i, (name, url) in enumerate(items, 1):
        elements.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": url,
        })
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": elements,
    }, indent=2)


def page_shell(title, description, canonical, breadcrumb_items, schema_extra, body_html):
    bc_html = ""
    for i, (name, url) in enumerate(breadcrumb_items):
        if i > 0:
            bc_html += ' <span aria-hidden="true">/</span> '
        if url:
            bc_html += f'<a href="{url}">{name}</a>'
        else:
            bc_html += f'<span aria-current="page">{name}</span>'

    if "/geo/" in canonical:
        depth = "../"
    else:
        depth = ""

    nav_home = f"{depth}index.html"
    nav_services = f"{nav_home}#services"
    nav_blog = f"{depth}blog/"
    nav_contact = f"{nav_home}#contact"

    schema_bc = breadcrumb_schema([
        (n, u or canonical) for n, u in breadcrumb_items if u is not None
    ])

    schema_extra_block = ""
    if schema_extra:
        schema_extra_block = f"""  <script type="application/ld+json">
{schema_extra}
  </script>
"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <meta name="author" content="Malik Taleeb Shahbaz" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="{canonical}" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet"></noscript>
  <meta name="theme-color" content="#050508">
{og_block(title, description, canonical)}
{favicon_head(depth)}
  <link rel="stylesheet" href="{depth}assets/style.css">
  <link rel="stylesheet" href="{depth}assets/content.css">
  <script type="application/ld+json">
{schema_bc}
  </script>
{schema_extra_block}</head>
<body>
  <nav class="navbar" id="navbar" aria-label="Main navigation">
    <a href="{nav_home}" class="nav-logo"><span>MTS</span> · Developer</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
    <ul class="nav-links" id="nav-links">
      <li><a href="{nav_home}">Home</a></li>
      <li><a href="{nav_home}#about">About</a></li>
      <li><a href="{nav_services}">Services</a></li>
      <li><a href="{nav_home}#projects">Projects</a></li>
      <li><a href="{nav_blog}">Blog</a></li>
      <li><a href="{nav_contact}" class="nav-cta">Hire Me</a></li>
    </ul>
  </nav>
  <article class="content-page">
    <nav class="breadcrumb" aria-label="Breadcrumb">{bc_html}</nav>
    {body_html}
    <div class="content-cta">
      <a href="{WHATSAPP}" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Get a Free Quote</a>
      <p style="margin-top:16px;color:var(--muted);font-size:0.88rem">Or <a href="{LINKEDIN}" target="_blank" rel="noopener noreferrer">message on LinkedIn</a></p>
    </div>
  </article>
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="{nav_home}#services">Custom Website Development</a></li>
          <li><a href="{nav_home}#services">SaaS Development</a></li>
          <li><a href="{nav_home}#services">AI Website Development</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Locations</h4>
        <ul>
          <li><a href="{depth}geo/web-developer-usa.html">Web Developer USA</a></li>
          <li><a href="{depth}geo/website-developer-uk.html">Website Developer UK</a></li>
          <li><a href="{depth}geo/seo-website-developer-pakistan.html">SEO Developer Pakistan</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Blog</h4>
        <ul>
          <li><a href="{depth}blog/why-every-business-needs-modern-website.html">Modern Website Guide</a></li>
          <li><a href="{depth}blog/react-vs-nextjs.html">React vs Next.js</a></li>
          <li><a href="{depth}blog/saas-development-guide.html">SaaS Development Guide</a></li>
        </ul>
      </div>
    </div>
    <p>&copy; 2026 <a href="{nav_home}">Malik Taleeb Shahbaz</a> · Web Developer &amp; Software Engineer.</p>
  </footer>
  <a href="{WHATSAPP}" class="sticky-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script src="{depth}assets/main.js" defer></script>
</body>
</html>"""


def render_geo_page(p):
    sections_html = ""
    for title, body in p["sections"]:
        sections_html += f"""
      <div class="glass-card reveal">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>"""

    faq_html = ""
    if p.get("faq"):
        faq_items = ""
        for q, a in p["faq"]:
            faq_items += f"""
        <details class="faq-item">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>"""
        faq_html = f"""
      <div class="glass-card reveal">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">{faq_items}
        </div>
      </div>"""

    body = f"""
    <header class="content-hero reveal">
      <span class="section-label">{p['label']}</span>
      <h1>{p['h1']}</h1>
      <p class="lead">{p['lead']}</p>
    </header>
    <div class="content-body reveal">{sections_html}{faq_html}
    </div>"""

    url = f"{BASE}/geo/{p['file']}"

    faq_schema_entities = []
    for q, a in p.get("faq", []):
        faq_schema_entities.append({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": a},
        })

    extra = ""
    if faq_schema_entities:
        extra = json.dumps({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq_schema_entities,
        }, indent=2)

    return page_shell(
        p["title"],
        p["description"],
        url,
        [("Home", f"{BASE}/"), ("Locations", f"{BASE}/#locations"), (p["h1"], None)],
        extra,
        body,
    )


def main():
    geo_dir = os.path.join(ROOT, "geo")
    os.makedirs(geo_dir, exist_ok=True)
    for p in GEO_PAGES:
        path = os.path.join(geo_dir, p["file"])
        with open(path, "w", encoding="utf-8") as f:
            f.write(render_geo_page(p))
        print(f"Wrote {path}")
    print("Geo pages done. Run scripts/build-longform-blogs.py for blog articles.")


if __name__ == "__main__":
    main()
