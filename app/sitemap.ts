import { getAllBlogPosts } from "@/lib/blog";
import { getAllGeoSlugs } from "@/data/geo";
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
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const coreEntries: SitemapEntry[] = CORE_PAGES.map(
    ({ path, priority, changeFrequency }) => ({
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastModified: buildDate,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: SitemapEntry[] = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const geoEntries: SitemapEntry[] = getAllGeoSlugs().map((slug) => ({
    url: `${SITE_URL}/geo/${slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...coreEntries, ...blogEntries, ...geoEntries];
}
