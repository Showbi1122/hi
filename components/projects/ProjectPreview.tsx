"use client";

import type { Project } from "@/lib/data/projects";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProjectModal = dynamic(
  () => import("@/components/projects/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false },
);

export function ProjectPreview({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="mt-5 inline-flex text-sm font-semibold text-gold-light transition-colors hover:text-gold"
      >
        View Project →
      </button>
      {loaded ? (
        <ProjectModal
          project={project}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
