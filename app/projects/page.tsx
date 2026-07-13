import {
  ContentPageLayout,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/data/projects";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import Link from "next/link";

export const metadata = createPageMetadata({
  title:
    "Web Development Portfolio | Software Development Projects | Malik Taleeb Shahbaz",
  description:
    "Portfolio of software development and web development projects — business websites, education platforms, React dashboards, and custom web applications built for real clients.",
  path: "/projects",
  keywords: KEYWORDS.projects,
  imageAlt: "Web development and software development project portfolio",
});

export default function ProjectsPage() {
  return (
    <ContentPageLayout
      active="projects"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Projects" },
      ]}
      label="Portfolio"
      title="Software Development & Web Development Portfolio"
      lead={
        <>
          Custom websites and web applications built for education, retail, and
          business clients. Need a company website, POS system, or SaaS MVP?{" "}
          <Link href="/contact" className="text-gold-light hover:underline">
            Get in touch
          </Link>{" "}
          or read{" "}
          <Link href="/about" className="text-gold-light hover:underline">
            about my work
          </Link>
          .
        </>
      }
      schema={{
        "@context": "https://schema.org",
        "@graph": [
          defaultBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          {
            "@type": "CollectionPage",
            name: "Software Development & Web Development Portfolio",
            url: "https://taleeb-shahbaz.vercel.app/projects",
            description:
              "Portfolio of custom websites, business software, education platforms, and web applications by Malik Taleeb Shahbaz.",
          },
        ],
      }}
      cta={
        <Reveal>
          <Button href="/contact" size="lg">
            Start a Project
          </Button>
        </Reveal>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </ContentPageLayout>
  );
}
