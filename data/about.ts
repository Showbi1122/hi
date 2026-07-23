import type { FaqItem } from "@/data/faqs";

export const aboutStats = [
  { value: "2+", label: "Years shipping client work" },
  { value: "15+", label: "Websites delivered" },
  { value: "10+", label: "Countries worked with" },
  { value: "1", label: "Developer on your project" },
] as const;

export const aboutPrinciples = [
  {
    title: "Clarity before code",
    description:
      "We agree on the offer, pages, and success metrics before I open the editor. Scope surprises help nobody.",
  },
  {
    title: "Speed that converts",
    description:
      "Pretty layouts that load slowly still lose customers. I treat Core Web Vitals and mobile UX as sales tools.",
  },
  {
    title: "SEO as a foundation",
    description:
      "Titles, structure, schema, and crawlable pages ship with the build. SEO is not a week-twelve afterthought.",
  },
  {
    title: "Direct communication",
    description:
      "You talk to the person writing the code. Updates land in WhatsApp, email, or Loom, not a ticket black hole.",
  },
] as const;

export const aboutMarkets = [
  {
    title: "Startups and founders",
    description:
      "MVPs, marketing sites, and dashboards when you need something live before the next investor or customer call.",
  },
  {
    title: "Service businesses",
    description:
      "Consultants, trades, clinics, and agencies that need clear service pages, forms, and lead tracking.",
  },
  {
    title: "Retail and operations",
    description:
      "POS-style tools, inventory views, and internal workflows that replace messy spreadsheets.",
  },
  {
    title: "Remote international teams",
    description:
      "US, UK, Gulf, Australia, Europe, and Pakistan clients. Async updates, clear English, timezone-friendly calls.",
  },
] as const;

export const aboutStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
  "Firebase",
  "REST APIs",
  "PostgreSQL",
  "Stripe-ready apps",
  "Vercel",
  "SEO / JSON-LD",
] as const;

export const aboutFaqs: FaqItem[] = [
  {
    question: "Where are you based?",
    answer:
      "Abbottabad, Pakistan. Most of my client work is remote for companies in the US, UK, UAE, Australia, Europe, and elsewhere.",
  },
  {
    question: "Do you work alone or with a big agency team?",
    answer:
      "I am a freelance full-stack developer. You get one accountable person for design-in-code, development, and launch. For specialized needs I can recommend partners, but the default is direct delivery.",
  },
  {
    question: "What languages do you communicate in?",
    answer:
      "Project work and documentation in clear English. I can also coordinate in Urdu when that helps local stakeholders.",
  },
  {
    question: "How fast do you reply?",
    answer:
      "Usually within one business day on WhatsApp or LinkedIn. During active builds you get regular progress notes, not radio silence.",
  },
  {
    question: "Can you take over an existing site?",
    answer:
      "Yes. Many projects start with an audit of what to keep, fix, or rebuild. I will be honest if a refresh is enough versus a full rewrite.",
  },
  {
    question: "Do you offer maintenance after launch?",
    answer:
      "Optional. Some clients only need a clean handoff. Others keep me for updates, new pages, and dependency hygiene.",
  },
];
