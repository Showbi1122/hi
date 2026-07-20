"use client";

import {
  trackBlogRead100,
  trackBlogRead50,
  trackBlogView,
} from "@/lib/analytics";
import { useEffect, useRef } from "react";

type BlogEngagementProps = {
  slug: string;
  title: string;
  tag?: string;
  /** CSS selector for the article body used for scroll depth */
  contentSelector?: string;
};

/**
 * Fires blog_view once on mount, plus blog_read_50_percent / blog_read_100_percent
 * when the reader scrolls through the article content.
 */
export function BlogEngagement({
  slug,
  title,
  tag,
  contentSelector = ".prose-blog",
}: BlogEngagementProps) {
  const hit50 = useRef(false);
  const hit100 = useRef(false);

  useEffect(() => {
    trackBlogView({
      blog_slug: slug,
      blog_title: title,
      blog_tag: tag,
    });
  }, [slug, title, tag]);

  useEffect(() => {
    hit50.current = false;
    hit100.current = false;

    const measure = () => {
      const el =
        document.querySelector<HTMLElement>(contentSelector) ??
        document.getElementById("main-content");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      const height = el.offsetHeight;
      if (height <= 0) return;

      const scrolled = window.scrollY + window.innerHeight - pageTop;
      const progress = Math.min(1, Math.max(0, scrolled / height));

      if (!hit50.current && progress >= 0.5) {
        hit50.current = true;
        trackBlogRead50({ blog_slug: slug, blog_title: title });
      }
      if (!hit100.current && progress >= 0.95) {
        hit100.current = true;
        trackBlogRead100({ blog_slug: slug, blog_title: title });
      }
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [slug, title, contentSelector]);

  return null;
}
