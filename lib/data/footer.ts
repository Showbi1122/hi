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
      { label: "Custom Websites", href: "/services#service-custom-website" },
      { label: "SaaS Development", href: "/services#service-saas" },
      { label: "POS & Business Software", href: "/services#service-industry" },
      { label: "React & Next.js", href: "/services#service-frontend" },
      { label: "SEO Websites", href: "/services#service-seo" },
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
        label: "SSG vs SSR in Next.js",
        href: "/blog/ssg-vs-ssr-isr-csr-nextjs",
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
