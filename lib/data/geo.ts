export type GeoSection = {
  title: string;
  content: string;
};

export type GeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  label: string;
  lead: string;
  sections: GeoSection[];
  faqs: { question: string; answer: string }[];
  linkTitle: string;
  linkSubtitle: string;
};

export const geoPages: GeoPage[] = [
  {
    slug: "web-developer-usa",
    title: "Web Developer in USA | Hire Malik Taleeb Shahbaz",
    description:
      "Hire an experienced web developer for US businesses. Custom websites, React apps, SaaS development, and SEO-optimized sites for startups and enterprises across the United States.",
    h1: "Web Developer for United States Businesses",
    label: "USA · Remote Development",
    linkTitle: "Web Developer in USA",
    linkSubtitle: "Startups & small business",
    lead: "I work with US startups, agencies, and small businesses on sites and web apps that load fast and convert. Calls happen in your time zone; updates land in Slack or Loom when you're offline.",
    sections: [
      {
        title: "Why US companies hire me",
        content:
          "American clients need developers who deliver on deadline, communicate in plain English, and understand how US customers browse and buy online. I build mobile-first, ADA-conscious interfaces, integrate analytics and CRM tools common in the US market, and optimize for Google Core Web Vitals.",
      },
      {
        title: "Services for US clients",
        content:
          "Custom business websites, landing pages for paid ads, React and Next.js frontends, SaaS dashboards, lead-generation funnels, and SEO-ready marketing sites. I work with founders in New York, California, Texas, Florida, and nationwide.",
      },
      {
        title: "Technologies",
        content:
          "JavaScript, TypeScript, React, Next.js, Node.js, HTML5, CSS3, Firebase, REST APIs, and performance-focused static sites deployed on Vercel or your preferred US hosting.",
      },
      {
        title: "How we work together",
        content:
          "We start with a discovery call, agree on scope and timeline, then build in iterations with Loom or Slack updates. Launch includes analytics, working forms, and handoff docs. Fixed price or milestones, whatever fits your procurement process.",
      },
    ],
    faqs: [
      {
        question: "Do you work with US time zones?",
        answer:
          "Yes. I schedule calls around EST, CST, MST, and PST and provide async updates so projects keep moving while you sleep.",
      },
      {
        question: "Can you build a site for Google Ads landing pages?",
        answer:
          "Absolutely. I specialize in fast landing pages with clear CTAs, trust signals, and conversion tracking for US ad campaigns.",
      },
    ],
  },
  {
    slug: "software-developer-canada",
    title: "Software Developer in Canada | Custom Web & SaaS Solutions",
    description:
      "Software developer serving Canadian businesses. Full stack web development, SaaS products, and bilingual-ready websites for companies across Canada.",
    h1: "Software Developer for Canadian Companies",
    label: "Canada · Remote Partnership",
    linkTitle: "Software Developer in Canada",
    linkSubtitle: "Full stack & SaaS",
    lead: "Toronto startup or Vancouver trades business, same problem: you need software that works and a site that doesn't embarrass you in front of clients.",
    sections: [
      {
        title: "Understanding the Canadian market",
        content:
          "Canadian buyers expect fast, accessible, privacy-aware digital experiences. I build sites that load quickly on mobile networks, support English content with room for French expansion, and follow modern privacy best practices.",
      },
      {
        title: "What I build",
        content:
          "Business websites, client portals, booking systems, SaaS MVPs, e-commerce storefronts, and internal tools using JavaScript, React, and Node.js stacks.",
      },
      {
        title: "Industries served",
        content:
          "Professional services, education, healthcare marketing, and local trades across Ontario, British Columbia, Alberta, and Quebec.",
      },
      {
        title: "Delivery process",
        content:
          "Requirements call, rough prototype, build in sprints, staging review, then production. I stay around for the first week after launch if something breaks.",
      },
    ],
    faqs: [
      {
        question: "Do you invoice in CAD?",
        answer:
          "Project quotes can be discussed in USD or CAD-equivalent based on your preference.",
      },
      {
        question: "Can you optimize for Canadian search?",
        answer:
          "Yes, local SEO structure, Google Business Profile integration, and geo-targeted landing pages.",
      },
    ],
  },
  {
    slug: "saas-developer-australia",
    title: "SaaS Developer in Australia | Web Apps & Product Development",
    description:
      "SaaS developer for Australian startups and scale-ups. Build MVPs, dashboards, subscription apps, and modern web products with React, Node.js, and cloud backends.",
    h1: "SaaS Developer for Australian Startups",
    label: "Australia · Product Development",
    linkTitle: "SaaS Developer in Australia",
    linkSubtitle: "MVP & product builds",
    lead: "Australian founders usually need an MVP before the next raise, not a six-month agency timeline. I build SaaS prototypes, dashboards, and subscription-ready apps at a pace that matches how you actually work.",
    sections: [
      {
        title: "SaaS development expertise",
        content:
          "I design and build multi-tenant web applications, user authentication flows, billing-ready architectures, admin panels, and API integrations, the foundation every Australian SaaS needs before seed funding or beta launch.",
      },
      {
        title: "Tech stack",
        content:
          "React, Next.js, Node.js, JavaScript/TypeScript, Firebase or custom REST backends, Stripe-ready checkout flows, and responsive UI built for desktop-first B2B users.",
      },
      {
        title: "From idea to launch",
        content:
          "First week: user stories and wireframes. Weeks two through four: core features and auth. Weeks five and six: polish, testing, deploy. After that we iterate based on what beta users actually do.",
      },
      {
        title: "Why remote works for AU",
        content:
          "Async collaboration fits Australian business hours. Daily progress updates and shared Notion boards keep Sydney, Melbourne, and Brisbane teams aligned.",
      },
    ],
    faqs: [
      {
        question: "Can you build an MVP for investor demos?",
        answer:
          "Yes. I focus on the 3–5 features that prove product-market fit with production-quality code.",
      },
      {
        question: "Do you handle subscription billing?",
        answer:
          "I integrate Stripe and prepare architecture for recurring billing; full PCI compliance depends on your payment setup.",
      },
    ],
  },
  {
    slug: "website-developer-uk",
    title: "Website Developer in UK | Business & Marketing Websites",
    description:
      "Website developer for UK businesses. Custom WordPress-alternative sites, marketing websites, and lead generation pages optimized for British search and mobile users.",
    h1: "Website Developer for UK Businesses",
    label: "United Kingdom",
    linkTitle: "Website Developer in UK",
    linkSubtitle: "Marketing & business sites",
    lead: "UK SMEs and consultancies need sites that look credible on a phone during a commute and don't fall apart under GDPR scrutiny. That's the bar I build to.",
    sections: [
      {
        title: "UK-focused web development",
        content:
          "British customers judge credibility in seconds. I deliver clean typography, fast hosting, cookie-consent-ready layouts, and content structures that rank for local and national UK searches.",
      },
      {
        title: "Services",
        content:
          "Company websites, portfolio sites, landing pages, brochure sites, and marketing campaign microsites for London, Manchester, Birmingham, Edinburgh, and beyond.",
      },
      {
        title: "SEO for UK search",
        content:
          "Technical SEO, schema markup, Core Web Vitals, internal linking, and content architecture targeting UK long-tail keywords.",
      },
      {
        title: "Technologies",
        content:
          "Semantic HTML, modern CSS, JavaScript, React where interactivity demands it, and static or Jamstack deployment for speed and security.",
      },
    ],
    faqs: [
      {
        question: "Are sites GDPR compliant?",
        answer:
          "I implement privacy-friendly forms, consent banners, and minimal data collection patterns; legal review of your policy is recommended.",
      },
      {
        question: "Can you match UK brand guidelines?",
        answer: "Yes, I work from your brand book, fonts, and tone of voice.",
      },
    ],
  },
  {
    slug: "react-developer-germany",
    title: "React Developer in Germany | Frontend & Full Stack Development",
    description:
      "React developer for German companies. Component-driven UIs, Next.js apps, TypeScript, and performant frontends for engineering-focused European clients.",
    h1: "React Developer for German Engineering Teams",
    label: "Germany · Frontend Excellence",
    linkTitle: "React Developer in Germany",
    linkSubtitle: "Frontend engineering",
    lead: "German teams care about code quality, documentation, and performance numbers, not slide decks. I ship React and Next.js work your engineers can extend without calling me for every typo.",
    sections: [
      {
        title: "React development services",
        content:
          "Single-page applications, Next.js SSR/SSG sites, design-system components, dashboard UIs, and API-connected frontends with TypeScript for type safety.",
      },
      {
        title: "Engineering standards",
        content:
          "ESLint-configured repos, Git workflows, component tests where needed, Lighthouse scores above 90, and WCAG-oriented markup.",
      },
      {
        title: "Collaboration with DACH teams",
        content:
          "English communication, detailed technical specs, and overlap with CET business hours for standups and reviews.",
      },
      {
        title: "Full stack capability",
        content:
          "When projects need backend work, I pair React frontends with Node.js APIs, Firebase, or headless CMS integrations.",
      },
    ],
    faqs: [
      {
        question: "Do you use Next.js or Create React App?",
        answer:
          "I recommend Next.js for SEO-critical and production apps; plain React for embedded widgets or SPAs.",
      },
      {
        question: "Can you join an existing codebase?",
        answer: "Yes, I onboard via code review and follow your team's conventions.",
      },
    ],
  },
  {
    slug: "ai-website-developer-switzerland",
    title: "AI Website Developer in Switzerland | Smart Automation & Web Apps",
    description:
      "AI website developer for Swiss businesses. Intelligent contact flows, automation integrations, and modern websites for finance, hospitality, and tech companies in Switzerland.",
    h1: "AI Website Developer for Swiss Businesses",
    label: "Switzerland · AI-Enhanced Web",
    linkTitle: "AI Website Developer in Switzerland",
    linkSubtitle: "Smart automation",
    lead: "Swiss clients want sites that feel premium and handle data carefully. I add AI chat and automation where it saves real time, not because it's on a trend list.",
    sections: [
      {
        title: "AI-powered web experiences",
        content:
          "Intelligent FAQ bots, lead-qualification chat flows, automated email routing, AI-assisted content sections, and integrations with OpenAI or custom APIs, always with human oversight and data privacy in mind.",
      },
      {
        title: "Premium design for Swiss markets",
        content:
          "Minimal layouts, precise spacing, multilingual-ready structure (DE/FR/IT/EN), and performance tuned for discerning users in Zürich, Geneva, and Basel.",
      },
      {
        title: "Use cases",
        content:
          "Private banking marketing sites, luxury hospitality, medtech landing pages, and B2B SaaS with AI-assisted onboarding.",
      },
      {
        title: "Security mindset",
        content:
          "HTTPS everywhere, environment-based secrets, no unnecessary data storage, and Swiss-aligned privacy practices.",
      },
    ],
    faqs: [
      {
        question: "Can you add an AI chatbot to my site?",
        answer:
          "Yes, embedded assistants trained on your FAQ and services, with escalation to human contact.",
      },
      {
        question: "Do you support multilingual sites?",
        answer:
          "I structure sites for easy translation and can implement language switchers.",
      },
    ],
  },
  {
    slug: "seo-website-developer-pakistan",
    title:
      "Software Developer Pakistan | Web Developer Abbottabad | SEO & Custom Software",
    description:
      "Software developer and web developer in Abbottabad, Pakistan. Malik Taleeb Shahbaz builds custom websites, POS systems, business software, and SEO-friendly sites for local and global clients.",
    h1: "Software & Web Developer in Abbottabad, Pakistan",
    label: "Abbottabad, Pakistan · Global Delivery",
    linkTitle: "Software Developer in Pakistan",
    linkSubtitle: "Abbottabad · Remote worldwide",
    lead: "I'm a software developer based in Abbottabad, Pakistan — most of my clients are abroad. I build custom websites, POS systems, SaaS apps, and SEO-ready business software at rates that make sense for startups, with overlap for Gulf and European hours when you need a call.",
    sections: [
      {
        title: "Why hire a Pakistani software developer",
        content:
          "You get skilled full stack software development at competitive rates, English fluency, overlap with Gulf and European time zones, and deep focus on organic growth — not just pretty pixels.",
      },
      {
        title: "Software & web development services",
        content:
          "Custom website development, POS system development, inventory management systems, school management software, CRM development, SaaS MVPs, API development, and e-commerce stores.",
      },
      {
        title: "SEO services included",
        content:
          "Keyword research support, meta optimization, JSON-LD schema, sitemap/robots setup, internal linking, image alt text, FAQ schema, and content structured for Google and AI answer engines.",
      },
      {
        title: "Local and export businesses",
        content:
          "I build for Pakistani retailers, exporters, IT companies, and freelancers in Abbottabad and across Pakistan targeting US, UK, and GCC markets.",
      },
      {
        title: "Technologies",
        content:
          "HTML5, JavaScript, TypeScript, React, Next.js, Vue.js, Node.js, Firebase, REST APIs, database design — deployed on Vercel with global CDN.",
      },
    ],
    faqs: [
      {
        question: "Do you offer software development in Abbottabad?",
        answer:
          "Yes. I'm based in Abbottabad and work with local businesses as well as international clients remotely.",
      },
      {
        question: "Can you rank my site on Google Pakistan?",
        answer:
          "I implement technical SEO foundations; rankings also depend on content, backlinks, and competition.",
      },
      {
        question: "Do you work with international clients?",
        answer: "Yes, most of my clients are in the US, UK, UAE, and Australia.",
      },
    ],
  },
  {
    slug: "web-developer-uae",
    title: "Web Developer in UAE | Dubai & Abu Dhabi Business Websites",
    description:
      "Web developer for UAE businesses. Business websites, lead generation sites, and web apps for Dubai, Abu Dhabi, and GCC companies.",
    h1: "Web Developer for UAE & GCC Businesses",
    label: "UAE · Gulf Region",
    linkTitle: "Web Developer in UAE",
    linkSubtitle: "GCC & Gulf region",
    lead: "Dubai consultancy, Abu Dhabi hospitality, Gulf e-commerce: mobile-first, WhatsApp-ready, and polished enough that regional buyers don't bounce in three seconds.",
    sections: [
      {
        title: "Gulf market expertise",
        content:
          "RTL-ready layouts when needed, WhatsApp-first contact flows, fast mobile performance for on-the-go users, and design language that conveys trust and luxury.",
      },
      {
        title: "Popular projects",
        content:
          "Business consultancy pages, restaurant and hospitality sites, corporate profiles for free-zone companies, and lead-generation landing pages.",
      },
      {
        title: "Lead generation focus",
        content:
          "Every UAE business site I build prioritizes clear CTAs, WhatsApp integration, multilingual options, and tracking for Meta and Google ads.",
      },
      {
        title: "Delivery",
        content:
          "Remote collaboration with video calls aligned to Gulf Standard Time, milestone payments, and launch support.",
      },
    ],
    faqs: [
      {
        question: "Can you integrate WhatsApp Business?",
        answer: "Yes. Click-to-chat, floating buttons, and pre-filled message templates.",
      },
    ],
  },
  {
    slug: "web-developer-saudi-arabia",
    title: "Web Developer in Saudi Arabia | Vision 2030 Digital Solutions",
    description:
      "Web developer for Saudi Arabian businesses. Modern websites and web apps for Riyadh, Jeddah, and KSA companies embracing digital transformation.",
    h1: "Web Developer for Saudi Arabian Companies",
    label: "Saudi Arabia · KSA",
    linkTitle: "Web Developer in Saudi Arabia",
    linkSubtitle: "KSA digital growth",
    lead: "Brands selling into Saudi Arabia need credible Arabic-friendly sites and fast mobile performance. I build remotely, aligned to Arabia Standard Time, with RTL support when you need it.",
    sections: [
      {
        title: "Digital growth in KSA",
        content:
          "Saudi buyers research online before they commit. I build corporate sites, service landing pages, and web apps that load quickly on mobile and look credible to local and expat audiences.",
      },
      {
        title: "Services",
        content:
          "Corporate websites, government contractor profiles, education portals, healthcare marketing sites, and e-commerce storefronts.",
      },
      {
        title: "Technical approach",
        content:
          "Mobile-first responsive design, optional Arabic RTL support, schema markup, fast CDN delivery, and secure HTTPS hosting.",
      },
      {
        title: "Working across time zones",
        content:
          "I align communication with Arabia Standard Time and provide bilingual content structure when required.",
      },
    ],
    faqs: [
      {
        question: "Can you support Arabic language?",
        answer:
          "I implement RTL layouts and work with your Arabic copy or translation provider.",
      },
      {
        question: "Do you serve Riyadh and Jeddah businesses?",
        answer: "Yes, remotely for companies across the Kingdom.",
      },
    ],
  },
  {
    slug: "web-developer-netherlands",
    title: "Web Developer in Netherlands | Dutch & EU Business Websites",
    description:
      "Web developer for Dutch and EU companies. Clean, accessible websites and SaaS interfaces for Amsterdam, Rotterdam, and Netherlands startups.",
    h1: "Web Developer for Netherlands & Benelux",
    label: "Netherlands · EU Market",
    linkTitle: "Web Developer in Netherlands",
    linkSubtitle: "EU startups",
    lead: "Dutch startups want direct communication and clean code. I build marketing sites and React apps for Amsterdam and Rotterdam teams without the agency layer in between.",
    sections: [
      {
        title: "Netherlands web standards",
        content:
          "Accessible (WCAG-minded) interfaces, GDPR-ready forms, fast loading on European networks, and English/Dutch content flexibility.",
      },
      {
        title: "What I deliver",
        content:
          "Startup marketing sites, B2B SaaS landing pages, portfolio sites for agencies, and custom CRM-style internal tools.",
      },
      {
        title: "Stack",
        content:
          "React, Next.js, TypeScript, Node.js, semantic HTML, and EU-friendly hosting options.",
      },
      {
        title: "Collaboration",
        content: "Slack, GitHub, and weekly video syncs in CET-friendly hours.",
      },
    ],
    faqs: [
      {
        question: "Do you work with Amsterdam startups?",
        answer:
          "Yes, especially early-stage teams needing an MVP or marketing site quickly.",
      },
      {
        question: "Is GDPR handled?",
        answer:
          "Privacy-by-design forms and cookie patterns; legal text is your responsibility.",
      },
    ],
  },
];

export function getGeoPage(slug: string): GeoPage | undefined {
  return geoPages.find((page) => page.slug === slug);
}

export function getAllGeoSlugs(): string[] {
  return geoPages.map((page) => page.slug);
}
