import {
  ContentPageLayout,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import Link from "next/link";

export const metadata = createPageMetadata({
  title:
    "Software Development Services | Web Development, POS & SaaS | Malik Taleeb Shahbaz",
  description:
    "Software development and web development services — custom websites, POS systems, SaaS, CRM, e-commerce, API development, and SEO-friendly business sites. Full stack developer for global clients.",
  path: "/services",
  keywords: KEYWORDS.services,
  imageAlt: "Software development and web development services by Malik Taleeb Shahbaz",
});

export default function ServicesPage() {
  return (
    <ContentPageLayout
      active="services"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Services" },
      ]}
      label="Services"
      title="Software Development & Web Development Services"
      lead={
        <>
          From company websites and e-commerce stores to POS systems, CRM tools, and
          SaaS MVPs — each service is built for speed, SEO, and conversions. Not sure
          what you need?{" "}
          <Link href="/contact" className="text-gold-light hover:underline">
            Get in touch
          </Link>{" "}
          or read the{" "}
          <Link href="/blog" className="text-gold-light hover:underline">
            blog
          </Link>
          .
        </>
      }
      schema={{
        "@context": "https://schema.org",
        "@graph": [
          defaultBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@type": "WebPage",
            name: "Software Development & Web Development Services",
            url: "https://taleeb-shahbaz.vercel.app/services",
            description:
              "Custom software development, web development, POS systems, SaaS, CRM, e-commerce, API development, and SEO-friendly business websites.",
          },
        ],
      }}
      cta={
        <Reveal>
          <Button href="/contact" size="lg">
            Hire Me
          </Button>
        </Reveal>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </ContentPageLayout>
  );
}
