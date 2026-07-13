import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = OG_IMAGE,
  imageAlt,
  keywords,
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Malik Taleeb Shahbaz" }],
    creator: "Malik Taleeb Shahbaz",
    publisher: "Malik Taleeb Shahbaz",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt ?? title }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
