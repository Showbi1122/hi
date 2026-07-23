import { getAllBlogPosts } from "@/lib/blog";
import { getAllGeoSlugs } from "@/data/geo";
import { getAllServiceSlugs } from "@/data/services";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

type SitemapEntry = MetadataRoute.Sitemap[number];

const CORE_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.95, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
];

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const coreEntries: SitemapEntry[] = CORE_PAGES.map(
    ({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: buildDate,
      changeFrequency,
      priority,
    }),
  );

  // Newest posts first (getAllBlogPosts is date-desc). Fresh posts get a bump.
  const blogPosts = getAllBlogPosts();
  const blogEntries: SitemapEntry[] = blogPosts.map((post, index) => {
    const isRecent = index < 3;
    return {
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.datePublished),
      changeFrequency: isRecent ? "weekly" : "monthly",
      priority: isRecent ? 0.85 : 0.75,
    };
  });

  const serviceEntries: SitemapEntry[] = getAllServiceSlugs().map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const geoEntries: SitemapEntry[] = getAllGeoSlugs().map((slug) => ({
    url: absoluteUrl(`/geo/${slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreEntries, ...serviceEntries, ...blogEntries, ...geoEntries];
}
