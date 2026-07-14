import {
  ContentPageLayout,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { FaqList } from "@/components/content/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllGeoSlugs, getGeoPage } from "@/data/geo";
import { createPageMetadata } from "@/lib/metadata";
import { LINKEDIN_URL, SITE_URL, WHATSAPP_LINK } from "@/lib/site";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllGeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/geo/${slug}`,
    type: "article",
  });
}

export default async function GeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getGeoPage(slug);
  if (!page) notFound();

  const url = `${SITE_URL}/geo/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      defaultBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/#locations" },
        { name: page.h1, path: `/geo/${slug}` },
      ]),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        description: page.description,
        url,
        provider: {
          "@type": "Person",
          name: "Malik Taleeb Shahbaz",
          url: SITE_URL,
        },
        serviceType: "Web Development",
      },
      ...(page.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <ContentPageLayout
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/#locations" },
          { label: page.h1 },
        ]}
        label={page.label}
        title={page.h1}
        lead={page.lead}
        cta={
          <>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cbtn cbnt1"
            >
              Get a Free Quote <span className="cbtn-ico">→</span>
            </a>
            <p className="mt-4 text-sm text-muted">
              Or{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#08d665] hover:underline"
              >
                message on LinkedIn
              </a>
            </p>
          </>
        }
      >
        <div className="max-w-article">
          {page.sections.map((section) => (
            <section key={section.title} className="editorial-block">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
          {page.faqs.length > 0 ? (
            <section className="pt-4">
              <h2 className="mb-6 font-display text-[1.35rem] font-bold tracking-tight text-white md:text-[1.5rem]">
                Frequently Asked Questions
              </h2>
              <FaqList items={page.faqs} />
            </section>
          ) : null}
        </div>
      </ContentPageLayout>
    </>
  );
}
