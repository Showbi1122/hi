import { TrackedLink } from "@/components/analytics/TrackedLink";
import {
  ContentPageLayout,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageBody } from "@/components/services/ServicePageBody";
import { getAllServicePageSlugs, getServicePage } from "@/data/service-pages";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL, WHATSAPP_LINK } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServicePageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/services/${slug}`,
    keywords: `${page.focusKeyword}, ${page.secondaryKeywords}`,
    imageAlt: page.imageAlt,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const url = `${SITE_URL}/services/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      defaultBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: page.h1, path: `/services/${slug}` },
      ]),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seoTitle,
        description: page.metaDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/home/og-image.webp`,
          description: page.imageAlt,
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        description: page.metaDescription,
        url,
        serviceType: page.focusKeyword,
        provider: {
          "@type": "Person",
          name: "Malik Taleeb Shahbaz",
          url: SITE_URL,
          jobTitle: "Full Stack Web Developer",
        },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <ContentPageLayout
        active="services"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: page.h1 },
        ]}
        label={page.label}
        title={page.h1}
        lead={page.lead}
        watermark="service"
        cta={
          <div className="cta-form cta-form-centered">
            <Link href="/contact" className="subscribe-btn">
              {page.heroCtaLabel} <i className="cbtn-ico">→</i>
            </Link>
            <TrackedLink
              href={WHATSAPP_LINK}
              location={`service_${page.slug}_hero`}
              className="cbtn cbnt1"
            >
              WhatsApp <i className="cbtn-ico">→</i>
            </TrackedLink>
          </div>
        }
      >
        <ServicePageBody page={page} />
      </ContentPageLayout>
    </>
  );
}
