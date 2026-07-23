import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";

export const socialLinks = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "WhatsApp", href: WHATSAPP_LINK },
  { label: "Instagram", href: INSTAGRAM_URL },
] as const;

export const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        label: "Custom Websites",
        href: "/services/custom-website-development",
      },
      {
        label: "SaaS Development",
        href: "/services/saas-web-application-development",
      },
      {
        label: "POS & Business Software",
        href: "/services/website-maintenance-industry-sites",
      },
      {
        label: "React & Next.js",
        href: "/services/react-nextjs-development",
      },
      {
        label: "SEO Websites",
        href: "/services/seo-website-development",
      },
    ],
  },
  {
    title: "Blog",
    links: [
      {
        label: "Modern Website Guide",
        href: "/blog/why-every-business-needs-modern-website",
      },
      { label: "React vs Next.js", href: "/blog/react-vs-nextjs" },
      {
        label: "Landing Page vs Website",
        href: "/blog/landing-page-vs-full-website",
      },
      { label: "All Articles", href: "/blog" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "WhatsApp", href: WHATSAPP_LINK, external: true },
    ],
  },
] as const;
