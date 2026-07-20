"use client";

import { trackProjectView } from "@/lib/analytics";
import { useEffect, useRef } from "react";

type ProjectMeta = {
  slug: string;
  title: string;
  industry?: string;
};

type ProjectViewsTrackerProps = {
  projects: ProjectMeta[];
};

/**
 * Fires project_view once per project when its section enters the viewport.
 */
export function ProjectViewsTracker({ projects }: ProjectViewsTrackerProps) {
  const seen = useRef(new Set<string>());

  useEffect(() => {
    seen.current = new Set();

    const nodes = projects
      .map((project) => {
        const el = document.getElementById(project.slug);
        return el ? { el, project } : null;
      })
      .filter(Boolean) as { el: HTMLElement; project: ProjectMeta }[];

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = nodes.find((n) => n.el === entry.target);
          if (!match || seen.current.has(match.project.slug)) continue;
          seen.current.add(match.project.slug);
          trackProjectView({
            project_slug: match.project.slug,
            project_title: match.project.title,
            project_industry: match.project.industry,
          });
        }
      },
      { threshold: 0.35 },
    );

    for (const { el } of nodes) observer.observe(el);

    // Hash deep-links: count as a view immediately
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const project = projects.find((p) => p.slug === hash);
      if (project && !seen.current.has(project.slug)) {
        seen.current.add(project.slug);
        trackProjectView({
          project_slug: project.slug,
          project_title: project.title,
          project_industry: project.industry,
        });
      }
    }

    return () => observer.disconnect();
  }, [projects]);

  return null;
}
