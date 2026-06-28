#!/usr/bin/env python3
"""Generate about.html, projects.html, contact.html, and services.html from site content."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://taleeb-shahbaz.vercel.app"

NAV = """<nav aria-label="Main navigation" class="navbar" id="navbar">
<a class="nav-logo" href="/"><span>MTS</span> · Developer</a>
<button aria-expanded="false" aria-label="Open menu" class="nav-toggle" id="nav-toggle">☰</button>
<ul class="nav-links" id="nav-links">
<li><a href="/">Home</a></li>
<li><a href="about.html"{about_active}>About</a></li>
<li><a href="services.html"{services_active}>Services</a></li>
<li><a href="projects.html"{projects_active}>Projects</a></li>
<li><a href="blog/">Blog</a></li>
<li><a href="/#process">Process</a></li>
<li><a class="nav-cta{contact_active}" href="contact.html">Hire&nbsp;Me</a></li>
</ul>
</nav>"""

HEAD_COMMON = """<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link as="style" href="assets/style.min.css" rel="preload"/>
<link href="assets/style.min.css" rel="stylesheet"/>
<link as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Sora:wght@600;700;800&amp;display=swap" media="print" onload="this.media='all'" rel="stylesheet"/>
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Sora:wght@600;700;800&amp;display=swap" rel="stylesheet"/></noscript>
<meta content="#050508" name="theme-color"/>
<link href="/favicon.ico" rel="icon" sizes="any"/>
<link href="/favicon.svg" rel="icon" type="image/svg+xml"/>
<link href="/favicon-32x32.webp" rel="icon" sizes="32x32" type="image/webp"/>
<link href="/favicon-16x16.webp" rel="icon" sizes="16x16" type="image/webp"/>
<link href="/apple-touch-icon.webp" rel="apple-touch-icon" sizes="180x180"/>
<link href="/site.webmanifest" rel="manifest"/>
<link href="assets/content.css" media="print" onload="this.media='all'" rel="stylesheet"/>
<noscript><link href="assets/content.css" rel="stylesheet"/></noscript>"""

FOOTER = """<footer class="site-footer">
<h2 class="footer-section-title">Site links and resources</h2>
<div class="footer-grid">
<div class="footer-col">
<h3>Pages</h3>
<ul>
<li><a href="/">Home</a></li>
<li><a href="about.html">About</a></li>
<li><a href="projects.html">Projects</a></li>
<li><a href="services.html">Services</a></li>
<li><a href="contact.html">Contact</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Services</h3>
<ul>
<li><a href="services.html#service-custom-website">Custom Websites</a></li>
<li><a href="services.html#service-saas">SaaS Development</a></li>
<li><a href="services.html#service-frontend">React &amp; Next.js</a></li>
<li><a href="services.html#service-seo">SEO Websites</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Blog</h3>
<ul>
<li><a href="blog/why-every-business-needs-modern-website.html">Modern Website Guide</a></li>
<li><a href="blog/react-vs-nextjs.html">React vs Next.js</a></li>
<li><a href="blog/">All Articles</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Connect</h3>
<ul>
<li><a href="contact.html">Contact</a></li>
<li><a href="https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
<li><a href="https://wa.link/ydmrc4" rel="noopener noreferrer" target="_blank">WhatsApp</a></li>
</ul>
</div>
</div>
<p>© 2026 <a href="/">Malik Taleeb Shahbaz</a> · Web Developer, Full Stack Software Engineer &amp; SaaS Developer. All rights reserved.</p>
</footer>
<a aria-label="Chat on WhatsApp" class="sticky-whatsapp" href="https://wa.link/ydmrc4" rel="noopener noreferrer" target="_blank">
<svg fill="currentColor" height="28" viewbox="0 0 24 24" width="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
</a>
<script defer="" src="assets/main.min.js"></script>"""


def page_shell(title, description, canonical, breadcrumb, schema, body, active):
    nav = NAV.format(
        about_active=' class="active"' if active == "about" else "",
        services_active=' class="active"' if active == "services" else "",
        projects_active=' class="active"' if active == "projects" else "",
        contact_active=' active' if active == "contact" else "",
    )
    og_image = f"{BASE}/assets/home/og-image.webp"
    return f"""<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>{title}</title>
<meta content="{description}" name="description"/>
<meta content="index, follow, max-image-preview:large" name="robots"/>
<link href="{canonical}" rel="canonical"/>
{HEAD_COMMON}
<meta content="website" property="og:type"/>
<meta content="{title}" property="og:title"/>
<meta content="{description}" property="og:description"/>
<meta content="{canonical}" property="og:url"/>
<meta content="{og_image}" property="og:image"/>
<meta content="summary_large_image" name="twitter:card"/>
<meta content="{title}" name="twitter:title"/>
<meta content="{description}" name="twitter:description"/>
<meta content="{og_image}" name="twitter:image"/>
<script type="application/ld+json">
{schema}
</script>
</head>
<body>
{nav}
<article class="content-page">
<nav aria-label="Breadcrumb" class="breadcrumb">{breadcrumb}</nav>
{body}
</article>
{FOOTER}
</body>
</html>
"""


def extract_projects_block():
    index = (ROOT / "index.html").read_text()
    section_start = index.index('<section id="projects"')
    section_end = index.index("</section>", section_start)
    section = index[section_start:section_end]
    pl_start = section.index('<div class="project-list">')
    return section[pl_start:]


def extract_services_block():
    index = (ROOT / "index.html").read_text()
    section_start = index.index('<section id="services"')
    section_end = index.index("</section>", section_start)
    section = index[section_start:section_end]
    grid_start = section.index('<div class="services-grid')
    return section[grid_start:]


ABOUT_BODY = """
<header class="content-hero reveal">
<span class="section-label">About Me</span>
<h1>Freelance Web Developer &amp; Software Engineer</h1>
<p class="lead">I'm Malik Taleeb Shahbaz — I build React, Next.js, and SaaS products for startups and businesses that need fast, SEO-ready websites that turn visitors into leads.</p>
</header>
<div class="content-body reveal">
<div class="glass-card reveal">
<h2>What I do</h2>
<p>I work with startups, agencies, and small businesses worldwide on <a href="services.html">custom websites</a>, SaaS MVPs, React and Next.js frontends, and lead-generation sites structured to rank on Google and get cited by AI search tools.</p>
<p><strong>Tech stack:</strong> React, Next.js, Vue.js, Node.js, TypeScript, Firebase, Tailwind CSS, and SEO architecture (schema markup, Core Web Vitals, internal linking). You own the production code — not locked template exports.</p>
</div>
<div class="glass-card reveal">
<h2>Experience</h2>
<p><strong>2+ years</strong> shipping client projects, <strong>15+ websites</strong> delivered, and hands-on work at Nexelix (current) and 247Marketers. Most clients need their first professional site, a SaaS MVP for investors, or a React developer agencies can hand work to directly.</p>
<p>See examples in my <a href="projects.html">project portfolio</a>.</p>
</div>
<div class="glass-card reveal">
<h2>Global clients</h2>
<p>Based in Pakistan, working remotely with clients in the <a href="geo/web-developer-usa.html">United States</a>, <a href="geo/software-developer-canada.html">Canada</a>, <a href="geo/website-developer-uk.html">UK</a>, <a href="geo/saas-developer-australia.html">Australia</a>, <a href="geo/web-developer-uae.html">UAE</a>, and across Europe.</p>
</div>
<div class="glass-card reveal">
<h2>Why clients hire me</h2>
<ul>
<li>Replies within <strong>24 hours</strong> — no account managers in the middle</li>
<li>SEO-ready builds with schema, speed, and clear structure</li>
<li>Direct accountability from discovery through launch and support</li>
<li>Plain-English updates — you always know where the project stands</li>
</ul>
<p>Read guides on <a href="blog/react-vs-nextjs.html">React vs Next.js</a> and <a href="blog/why-every-business-needs-modern-website.html">modern business websites</a>, or browse the <a href="blog/">blog</a>.</p>
</div>
<div class="glass-card reveal">
<h2>How we work together</h2>
<ol>
<li><strong>Tell me your vision</strong> — goals, timeline, and budget via <a href="contact.html">contact</a></li>
<li><strong>Plan &amp; design</strong> — align on layout and features before code</li>
<li><strong>Build &amp; refine</strong> — regular updates until it's right</li>
<li><strong>Launch &amp; support</strong> — go live with confidence</li>
</ol>
<p>Full process details are on the <a href="/#process">homepage</a>.</p>
</div>
</div>
<div class="content-cta reveal">
<a class="btn btn-primary btn-lg" href="contact.html">Start a Project</a>
<p style="margin-top:16px;color:var(--muted);font-size:0.88rem">Or <a href="projects.html">view my portfolio</a></p>
</div>
"""

CONTACT_BODY = """
<header class="content-hero reveal">
<span class="section-label">Let's Talk</span>
<h1>Hire a Web Developer</h1>
<p class="lead">Fill out the form below — you'll be redirected to WhatsApp with your project details ready to send. I reply within 24 hours.</p>
</header>
<div class="content-body contact-page-body reveal">
<div class="contact-layout">
<div class="glass-card contact-form-card reveal">
<div class="contact-form-header">
<h2>Project inquiry</h2>
<p>Tell me what you need built. On submit, WhatsApp opens with a pre-filled message — just tap Send.</p>
</div>
<form class="contact-form" id="whatsapp-contact-form" novalidate="">
<div class="form-row">
<div class="form-field">
<label for="contact-name">Your name <span aria-hidden="true">*</span></label>
<input autocomplete="name" id="contact-name" name="name" placeholder="John Smith" required="" type="text"/>
</div>
<div class="form-field">
<label for="contact-email">Email or WhatsApp <span aria-hidden="true">*</span></label>
<input autocomplete="email" id="contact-email" name="contact" placeholder="you@email.com or +92 300 …" required="" type="text"/>
</div>
</div>
<div class="form-row">
<div class="form-field">
<label for="contact-type">Project type</label>
<select id="contact-type" name="project_type">
<option value="Business website">Business website</option>
<option value="Landing page">Landing page</option>
<option value="SaaS MVP">SaaS MVP</option>
<option value="Website redesign">Website redesign</option>
<option value="React / Next.js app">React / Next.js app</option>
<option value="Other">Other</option>
</select>
</div>
<div class="form-field">
<label for="contact-budget">Budget range</label>
<select id="contact-budget" name="budget">
<option value="Not sure yet">Not sure yet</option>
<option value="Under $500">Under $500</option>
<option value="$500 – $1,500">$500 – $1,500</option>
<option value="$1,500 – $5,000">$1,500 – $5,000</option>
<option value="$5,000+">$5,000+</option>
</select>
</div>
</div>
<div class="form-field">
<label for="contact-timeline">Timeline</label>
<select id="contact-timeline" name="timeline">
<option value="ASAP">ASAP</option>
<option value="1–2 weeks">1–2 weeks</option>
<option value="Within 1 month">Within 1 month</option>
<option value="Flexible">Flexible</option>
</select>
</div>
<div class="form-field">
<label for="contact-message">Project details <span aria-hidden="true">*</span></label>
<textarea id="contact-message" name="message" placeholder="What are you building? Who is it for? Links to your current site or inspiration?" required="" rows="5"></textarea>
</div>
<button class="btn btn-whatsapp btn-lg contact-form-submit" type="submit">
<svg aria-hidden="true" fill="currentColor" height="20" viewbox="0 0 24 24" width="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
Continue on WhatsApp
</button>
<p class="form-hint">No signup on this site — your message opens in WhatsApp ready to send.</p>
</form>
</div>
<aside class="glass-card contact-aside reveal">
<h2>Quick contact</h2>
<p>Prefer to skip the form? Message me directly — fastest reply on WhatsApp.</p>
<div class="contact-aside-actions">
<a class="btn btn-primary" href="https://wa.link/ydmrc4" rel="noopener noreferrer" target="_blank">WhatsApp</a>
<a class="btn btn-glass" href="https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342" rel="noopener noreferrer" target="_blank">LinkedIn</a>
</div>
<ul class="contact-aside-list">
<li>Reply within 24 hours</li>
<li>Remote — worldwide clients</li>
<li>Fixed price or milestones</li>
</ul>
<div class="social-grid">
<a class="social-link" href="https://github.com/mtaleebshahbaz" rel="noopener noreferrer" target="_blank">GitHub</a>
<a class="social-link" href="https://www.instagram.com/malik.taleeb.7/" rel="noopener noreferrer" target="_blank">Instagram</a>
</div>
</aside>
</div>
<div class="contact-info-grid">
<div class="glass-card reveal">
<h2>What to include</h2>
<ul>
<li>What you're building (website, app, landing page, redesign)</li>
<li>Your industry and target audience</li>
<li>Timeline and budget range if you have one</li>
<li>Links to inspiration or your current site</li>
</ul>
</div>
<div class="glass-card reveal">
<h2>Services I can help with</h2>
<p><a href="services.html#service-custom-website">Custom websites</a>, <a href="services.html#service-saas">SaaS MVPs</a>, <a href="services.html#service-frontend">React / Next.js</a>, <a href="services.html#service-landing">landing pages</a>, and <a href="services.html#service-seo">SEO-ready builds</a>. Browse <a href="projects.html">past projects</a> or read the <a href="about.html">about page</a> first.</p>
</div>
</div>
</div>
"""


def main():
    projects_block = extract_projects_block()
    services_block = extract_services_block()

    about_schema = """{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "%s/"},
        {"@type": "ListItem", "position": 2, "name": "About", "item": "%s/about.html"}
      ]
    },
    {
      "@type": "Person",
      "name": "Malik Taleeb Shahbaz",
      "jobTitle": "Web Developer",
      "url": "%s/about.html",
      "image": "%s/assets/home/taleeb.webp",
      "sameAs": [
        "https://github.com/mtaleebshahbaz",
        "https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342"
      ]
    }
  ]
}""" % (BASE, BASE, BASE, BASE)

    projects_schema = """{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "%s/"},
        {"@type": "ListItem", "position": 2, "name": "Projects", "item": "%s/projects.html"}
      ]
    },
    {
      "@type": "CollectionPage",
      "name": "Web Development Portfolio",
      "url": "%s/projects.html",
      "description": "Portfolio of custom websites, education sites, and web applications by Malik Taleeb Shahbaz."
    }
  ]
}""" % (BASE, BASE, BASE)

    contact_schema = """{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "%s/"},
        {"@type": "ListItem", "position": 2, "name": "Contact", "item": "%s/contact.html"}
      ]
    },
    {
      "@type": "ContactPage",
      "name": "Contact Malik Taleeb Shahbaz",
      "url": "%s/contact.html",
      "description": "Hire Malik Taleeb Shahbaz for web development, React, Next.js, and SaaS projects."
    }
  ]
}""" % (BASE, BASE, BASE)

    services_schema = """{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "%s/"},
        {"@type": "ListItem", "position": 2, "name": "Services", "item": "%s/services.html"}
      ]
    },
    {
      "@type": "WebPage",
      "name": "Web Development Services",
      "url": "%s/services.html",
      "description": "Custom websites, SaaS development, React/Next.js, landing pages, SEO, and AI-ready web development services."
    }
  ]
}""" % (BASE, BASE, BASE)

    pages = [
        (
            "about.html",
            "About Malik Taleeb Shahbaz | Freelance Web Developer",
            "Meet Malik Taleeb Shahbaz, freelance web developer and software engineer. React, Next.js, SaaS, 15+ websites delivered for global clients.",
            f"{BASE}/about.html",
            f'<a href="{BASE}/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">About</span>',
            about_schema,
            ABOUT_BODY,
            "about",
        ),
        (
            "services.html",
            "Web Development Services | Malik Taleeb Shahbaz",
            "Custom websites, SaaS MVPs, React/Next.js apps, landing pages, SEO builds, and AI-ready development. Freelance web developer for global clients.",
            f"{BASE}/services.html",
            f'<a href="{BASE}/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">Services</span>',
            services_schema,
            f"""<header class="content-hero reveal">
<span class="section-label">Services</span>
<h1>Web Development Services</h1>
<p class="lead">From custom business websites to SaaS MVPs — each service is built for speed, SEO, and conversions. Not sure what you need? <a href="contact.html">Get in touch</a> or read the <a href="blog/">blog</a>.</p>
</header>
{services_block}
<div class="content-cta reveal">
<a class="btn btn-primary btn-lg" href="contact.html">Start Your Project</a>
<p style="margin-top:16px;color:var(--muted);font-size:0.88rem">See <a href="projects.html">past projects</a> or <a href="about.html">about my work</a></p>
</div>""",
            "services",
        ),
        (
            "projects.html",
            "Web Development Projects & Portfolio | Malik Taleeb Shahbaz",
            "Portfolio of custom websites and web apps: driving school sites, college platforms, React dashboards, and business websites built for real clients.",
            f"{BASE}/projects.html",
            f'<a href="{BASE}/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">Projects</span>',
            projects_schema,
            f"""<header class="content-hero reveal">
<span class="section-label">Portfolio</span>
<h1>Real Projects, Real Results</h1>
<p class="lead">Custom websites and web applications built for education, professional services, and SaaS. Need something similar? <a href="contact.html">Get in touch</a> or read <a href="about.html">about my work</a>.</p>
</header>
{projects_block}
<div class="content-cta reveal">
<a class="btn btn-primary btn-lg" href="contact.html">Start Your Project</a>
<p style="margin-top:16px;color:var(--muted);font-size:0.88rem">Explore <a href="services.html">services</a> or <a href="blog/">read the blog</a></p>
</div>""",
            "projects",
        ),
        (
            "contact.html",
            "Contact & Hire Malik Taleeb Shahbaz | Web Developer",
            "Hire Malik Taleeb Shahbaz for websites, React/Next.js apps, and SaaS MVPs. WhatsApp or LinkedIn — reply within 24 hours.",
            f"{BASE}/contact.html",
            f'<a href="{BASE}/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">Contact</span>',
            contact_schema,
            CONTACT_BODY,
            "contact",
        ),
    ]

    for filename, title, desc, canonical, breadcrumb, schema, body, active in pages:
        html = page_shell(title, desc, canonical, breadcrumb, schema, body, active)
        if active == "contact":
            html = html.replace(
                '<script defer="" src="assets/main.min.js"></script>',
                '<script defer="" src="assets/contact-form.js"></script>\n<script defer="" src="assets/main.min.js"></script>',
            )
        (ROOT / filename).write_text(html)
        print("wrote", filename)


if __name__ == "__main__":
    main()
