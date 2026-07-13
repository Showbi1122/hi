import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import type { ReactNode } from "react";

type ContentPageLayoutProps = {
  active?: "about" | "services" | "projects" | "blog" | "contact";
  breadcrumb: { label: string; href?: string }[];
  label: string;
  title: string;
  lead: ReactNode;
  children: ReactNode;
  cta?: ReactNode;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function ContentPageLayout({
  active,
  breadcrumb,
  label,
  title,
  lead,
  children,
  cta,
  schema,
}: ContentPageLayoutProps) {
  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <Navbar active={active} />
      <Container
        as="article"
        id="main-content"
        className="relative z-[1] pb-20 pt-[calc(76px+40px)]"
      >
        <Breadcrumb items={breadcrumb} />
        <header className="mb-12">
          <Reveal>
            <span className="section-label">{label}</span>
            <h1 className="mb-5 font-display text-4xl font-extrabold tracking-tight text-zinc-100 md:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">{lead}</p>
          </Reveal>
        </header>
        {children}
        {cta ? <div className="mt-12 text-center">{cta}</div> : null}
      </Container>
      <Footer />
    </>
  );
}

export { GlassCard };

export function defaultBreadcrumbSchema(
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

export function defaultCta() {
  return (
    <Reveal>
      <Button href="/contact" size="lg">
        Start a Project
      </Button>
      <p className="mt-4 text-sm text-muted">
        Or{" "}
        <Link href="/projects" className="text-gold-light hover:underline">
          view my portfolio
        </Link>
      </p>
    </Reveal>
  );
}
