import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFaq = {
  question: string;
  answer: string;
};

export type RelatedArticle = {
  href: string;
  label: string;
};

export type BlogPostMeta = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  socialDescription: string;
  headline: string;
  tag: string;
  cardDescription: string;
  lead: string;
  readingTime: string;
  wordCount: number;
  keywords: string;
  featuredImage: string;
  imageAlt: string;
  datePublished: string;
  ctaText: string;
  relatedArticles: RelatedArticle[];
  faqs: BlogFaq[];
};

export type BlogCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  featuredImage: string;
  imageAlt: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const postCache = new Map<string, BlogPost>();

function parsePost(filePath: string): BlogPost {
  const cached = postCache.get(filePath);
  if (cached) return cached;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = data.slug as string;
  const post: BlogPost = {
    slug,
    seoTitle: data.seoTitle as string,
    metaDescription: data.metaDescription as string,
    socialDescription: data.socialDescription as string,
    headline: data.headline as string,
    tag: data.tag as string,
    cardDescription: data.cardDescription as string,
    lead: data.lead as string,
    readingTime: data.readingTime as string,
    wordCount: data.wordCount as number,
    keywords: data.keywords as string,
    featuredImage:
      (data.featuredImage as string) ?? `/assets/blog/${slug}.webp`,
    imageAlt: data.imageAlt as string,
    datePublished: data.datePublished as string,
    ctaText: data.ctaText as string,
    relatedArticles: (data.relatedArticles ?? []) as RelatedArticle[],
    faqs: (data.faqs ?? []) as BlogFaq[],
    content: content.trim(),
  };

  postCache.set(filePath, post);
  return post;
}

export function getAllBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const post = parsePost(path.join(BLOG_DIR, file));
      const { content: _, ...meta } = post;
      return meta;
    })
    .sort((a, b) => a.headline.localeCompare(b.headline));
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath);
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export const featuredBlogSlugs = [
  "ssg-vs-ssr-isr-csr-nextjs",
  "why-every-business-needs-modern-website",
  "react-vs-nextjs",
];

export function toBlogCardData(post: BlogPostMeta): BlogCardData {
  return {
    slug: post.slug,
    title: post.headline,
    description: post.cardDescription,
    category: post.tag,
    readTime: post.readingTime,
    featuredImage: post.featuredImage,
    imageAlt: post.imageAlt,
  };
}
