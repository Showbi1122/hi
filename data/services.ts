export type ServiceDetail = {
  title: string;
  content: string;
};

export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  details: ServiceDetail[];
};

export const services: Service[] = [
  {
    id: "service-custom-website",
    icon: "/assets/icons/services/website.svg",
    title: "Custom Website Development",
    description:
      "Company and business website development — hand-coded sites that load fast on mobile, rank in search, and convert visitors into inquiries, with optional maintenance after launch.",
    tags: ["Business Sites", "Corporate", "Portfolio"],
    details: [
      {
        title: "What it is",
        content:
          "Hand-coded websites tailored to your brand, goals, and audience, from single-page landing sites to multi-section business platforms.",
      },
      {
        title: "Who needs it",
        content:
          "Small businesses, consultants, agencies, and founders who outgrew template builders or need a unique professional presence.",
      },
      {
        title: "Technologies",
        content:
          "HTML5, CSS3, JavaScript, semantic markup, JSON-LD schema, Vercel hosting.",
      },
      {
        title: "Process",
        content: "Discovery → wireframe → development → SEO setup → launch → support.",
      },
    ],
  },
  {
    id: "service-saas",
    icon: "/assets/icons/services/saas.svg",
    title: "SaaS & Web Application Development",
    description:
      "Custom web applications and SaaS MVPs with auth, billing, and dashboards — API development and database design for founders who need paying users, not just a demo.",
    tags: ["SaaS", "MVP", "Dashboards"],
    details: [
      {
        title: "What it is",
        content:
          "Full web application development, authentication, user roles, admin panels, API integrations, and cloud deployment.",
      },
      {
        title: "Who needs it",
        content:
          "Startups validating SaaS ideas, B2B tools, internal business apps, and founders preparing for investor demos.",
      },
      {
        title: "Technologies",
        content:
          "React, Next.js, Node.js, JavaScript/TypeScript, Firebase, REST APIs, Stripe-ready architecture.",
      },
      {
        title: "Benefits",
        content:
          "Own your codebase, iterate fast, launch beta in weeks not months, scale without replatforming.",
      },
    ],
  },
  {
    id: "service-frontend",
    icon: "/assets/icons/services/react.svg",
    title: "React / Next.js Development",
    description:
      "React developer and Next.js developer for SPAs, e-commerce frontends, marketing sites, and product UIs that stay fast as features grow.",
    tags: ["React", "Next.js", "Vue.js"],
    details: [
      {
        title: "What it is",
        content:
          "Frontend development for SPAs, marketing sites, and product dashboards using modern JavaScript frameworks.",
      },
      {
        title: "Who needs it",
        content:
          "Teams needing a React developer, startups choosing Next.js for SEO, and products requiring interactive UIs.",
      },
      {
        title: "Technologies",
        content:
          "React, Next.js, Vue.js, TypeScript, Tailwind CSS, component architecture, Lighthouse optimization.",
      },
    ],
  },
  {
    id: "service-landing",
    icon: "/assets/icons/services/landing.svg",
    title: "Landing Page & Lead Generation Websites",
    description:
      "High-converting landing pages with clear CTAs, trust signals, and tracking for ads, email, and organic traffic.",
    tags: ["Lead Gen", "Ads", "CTAs"],
    details: [
      {
        title: "What it is",
        content:
          "Focused single-purpose pages with clear headlines, trust signals, forms, and tracking for marketing campaigns.",
      },
      {
        title: "Who needs it",
        content:
          "Service businesses, coaches, and marketers running paid acquisition campaigns.",
      },
      {
        title: "Benefits",
        content:
          "Higher conversion rates, faster load times than page builders, full analytics integration.",
      },
    ],
  },
  {
    id: "service-ai",
    icon: "/assets/icons/services/ai.svg",
    title: "AI Website & Automation Development",
    description:
      "Chat flows, smart forms, content structured so AI search tools can cite your business accurately. Useful automation, not gimmicks.",
    tags: ["AI Chat", "Automation", "GEO"],
    details: [
      {
        title: "What it is",
        content:
          "Websites enhanced with AI assistants, automated lead routing, and content structured for ChatGPT, Gemini, and Perplexity.",
      },
      {
        title: "Who needs it",
        content:
          "Forward-thinking businesses wanting 24/7 engagement and visibility in AI-powered search results.",
      },
      {
        title: "Technologies",
        content:
          "OpenAI API integrations, semantic HTML, FAQ schema, structured content architecture.",
      },
    ],
  },
  {
    id: "service-seo",
    icon: "/assets/icons/services/seo.svg",
    title: "SEO Optimized Website Development",
    description:
      "SEO-ready websites with schema markup, fast Core Web Vitals, sitemaps, and content structure built to rank on Google and AI search.",
    tags: ["Technical SEO", "Schema", "Speed"],
    details: [
      {
        title: "What it is",
        content:
          "Web development where search visibility is a core requirement, not an afterthought.",
      },
      {
        title: "Who needs it",
        content:
          "Businesses competing for local and national keywords, and brands targeting AI answer engines.",
      },
      {
        title: "Included",
        content:
          "Meta tags, JSON-LD, sitemap.xml, robots.txt, internal linking, image optimization, FAQ schema.",
      },
    ],
  },
  {
    id: "service-uiux",
    icon: "/assets/icons/services/design.svg",
    title: "UI/UX & Web Design Development",
    description:
      "I design and code in the same pass, layout, typography, and interactions that match your brand without hiring two people.",
    tags: ["UI/UX", "Web Design", "Responsive"],
    details: [
      {
        title: "What it is",
        content:
          "Visual design translated into production-ready code, typography, spacing, color systems, and interaction patterns.",
      },
      {
        title: "Who needs it",
        content:
          "Brands that need both design sensibility and development execution without hiring two separate people.",
      },
    ],
  },
  {
    id: "service-industry",
    icon: "/assets/icons/services/industry.svg",
    title: "Website Maintenance & Industry Sites",
    description:
      "Website maintenance, redesign, and industry-specific builds — POS system development, school management systems, inventory tools, and CRM-style business software.",
    tags: ["POS Systems", "Education", "Maintenance"],
    details: [
      {
        title: "POS & retail software",
        content:
          "Point of sale software, inventory management systems, and retail dashboards tailored to how your business actually operates.",
      },
      {
        title: "Business management software",
        content:
          "CRM development, ERP-style workflows, school management systems, and custom tools that replace spreadsheets and disconnected apps.",
      },
      {
        title: "Marketing & digital agencies",
        content:
          "Campaign landing pages, client portfolios, and lead generation funnels for agency growth.",
      },
      {
        title: "Education",
        content:
          "Multi-campus college sites, course pages, and enrollment-focused school websites.",
      },
    ],
  },
];
