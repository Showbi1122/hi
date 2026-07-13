import type { Project } from "@/lib/data/projects";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Reveal>
      <article
        itemScope
        itemType="https://schema.org/CreativeWork"
        className="group overflow-hidden rounded-[20px] border border-border bg-surface transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-border-hover hover:shadow-card"
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        </div>
        <div className="p-6 md:p-7">
          <h3 itemProp="name" className="mb-3 font-display text-xl text-zinc-100">
            {project.title}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-glass px-3 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <p itemProp="description" className="mb-4 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
          <dl className="space-y-2 border-t border-border pt-4">
            {project.caseStudy.map((field) => (
              <div key={field.label}>
                <dt className="text-[0.72rem] font-bold uppercase tracking-wider text-gold">
                  {field.label}
                </dt>
                <dd className="text-sm leading-relaxed text-muted">{field.value}</dd>
              </div>
            ))}
          </dl>
          <ProjectPreview project={project} />
        </div>
      </article>
    </Reveal>
  );
}
