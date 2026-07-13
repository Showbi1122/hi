import { BlogCard } from "@/components/blog/BlogCard";
import { ContentPageLayout, defaultBreadcrumbSchema } from "@/components/layout/ContentPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogPosts, toBlogCardData } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import { SITE_URL } from "@/lib/site";

export const metadata = createPageMetadata({
  title:
    "Blog | Software Development, Web Development & SEO Guides | Malik Taleeb Shahbaz",
  description:
    "Guides on software development, web development, SaaS, POS systems, React, Next.js, SEO, and business websites. Written by full stack developer Malik Taleeb Shahbaz.",
  path: "/blog",
  keywords: KEYWORDS.blog,
  imageAlt: "Software development and web development blog by Malik Taleeb Shahbaz",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts().sort((a, b) =>
    a.headline.localeCompare(b.headline),
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/blog/#webpage`,
        url: `${SITE_URL}/blog`,
        name: "Web Development & SEO Blog",
        description:
          "In-depth guides on modern websites, SaaS development, React, Next.js, SEO, AI web development, and lead generation. Written by full stack developer Malik Taleeb Shahbaz.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/blog/#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/blog/#itemlist`,
        name: "Web Development & SEO Blog Articles",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.headline,
          url: `${SITE_URL}/blog/${post.slug}`,
        })),
      },
      defaultBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <ContentPageLayout
        active="blog"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
        label="Insights"
        title="Web Development & SEO Blog"
        lead="Long-form guides from actual project work: websites, SaaS, SEO, React, and the questions clients ask before we start building."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const card = toBlogCardData(post);
            return (
              <BlogCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                slug={card.slug}
                title={card.title}
                description={card.description}
                category={card.category}
                readTime={card.readTime}
                featuredImage={card.featuredImage}
                imageAlt={card.imageAlt}
              />
            );
          })}
        </div>
      </ContentPageLayout>
    </>
  );
}
