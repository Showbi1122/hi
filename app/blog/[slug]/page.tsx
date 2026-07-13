import { BlogHtmlContent } from "@/components/blog/BlogHtmlContent";
import { FaqList } from "@/components/content/FaqList";
import {
  ContentPageLayout,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { LINKEDIN_URL, SITE_URL, WHATSAPP_LINK } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    type: "article",
    keywords: post.keywords,
    publishedTime: post.datePublished,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;

  const schemas = [
    defaultBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.headline, path: `/blog/${slug}` },
    ]),
    {
      "@type": "BlogPosting",
      headline: post.headline,
      description: post.metaDescription,
      author: {
        "@type": "Person",
        name: "Malik Taleeb Shahbaz",
        url: SITE_URL,
        jobTitle: "Full Stack Web Developer",
      },
      publisher: { "@type": "Person", name: "Malik Taleeb Shahbaz" },
      datePublished: post.datePublished,
      dateModified: new Date().toISOString().split("T")[0],
      mainEntityOfPage: url,
      image: `${SITE_URL}/assets/home/og-image.webp`,
      wordCount: post.wordCount,
      keywords: post.keywords,
      articleSection: post.tag,
    },
    {
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": schemas }} />
      <ContentPageLayout
        active="blog"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.headline },
        ]}
        label={post.tag}
        title={post.headline}
        lead={
          <span
            dangerouslySetInnerHTML={{ __html: post.lead }}
            className="[&_a]:text-gold-light [&_a]:hover:underline"
          />
        }
      >
        <div className="max-w-article">
          <p className="mb-2 text-sm text-muted">
            {post.readingTime} · By Malik Taleeb Shahbaz · Updated{" "}
            {new Date().toISOString().split("T")[0]}
          </p>

          <div className="prose-blog">
            <BlogHtmlContent html={post.content} />
          </div>

          <section className="mt-10">
            <FaqList items={post.faqs} />
          </section>

          <Reveal>
            <footer className="article-conclusion mt-12">
              <h2 className="mb-4 font-display text-2xl text-zinc-100">
                Need Help Building Your Website?
              </h2>
              <p
                className="mb-6 text-muted [&_a]:text-gold-light [&_a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: post.ctaText }}
              />
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Start a Conversation</Button>
                <Button href={WHATSAPP_LINK} variant="glass" external>
                  WhatsApp
                </Button>
              </div>
            </footer>
          </Reveal>

          {post.relatedArticles.length > 0 ? (
            <aside className="mt-12 border-t border-border pt-8">
              <h2 className="mb-4 font-display text-lg text-gold">Related Articles</h2>
              <ul className="space-y-2">
                {post.relatedArticles.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href.replace("/blog/../services", "/services")}
                      className="text-sm text-muted hover:text-gold-light"
                    >
                      {article.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </ContentPageLayout>
    </>
  );
}
