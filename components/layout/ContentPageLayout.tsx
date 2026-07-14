import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

export { defaultBreadcrumbSchema } from "@/lib/seo/breadcrumb";

type ContentPageLayoutProps = {
  active?: "about" | "services" | "projects" | "blog" | "contact";
  breadcrumb: { label: string; href?: string }[];
  label: string;
  title: string;
  lead: ReactNode;
  children: ReactNode;
  cta?: ReactNode;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  watermark?: string;
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
  watermark,
}: ContentPageLayoutProps) {
  return (
    <div className="site site-black">
      {schema ? <JsonLd data={schema} /> : null}
      <TopBar />
      <Navbar active={active} />
      <article id="main-content">
        <div className="glint-page-hero">
          <div className="glint-container">
            <Breadcrumb items={breadcrumb} />
            <header className="heading white relative">
              <Reveal>
                <strong className="filltext">{watermark || label}</strong>
                <small>{label}</small>
                <h1 className="mb-5 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.1] tracking-tight text-white">
                  {title}
                </h1>
                <p className="!mt-6 max-w-3xl text-lg leading-[1.8] text-[#999]">{lead}</p>
              </Reveal>
            </header>
          </div>
        </div>
        <div className="glint-container pb-20">{children}</div>
        {cta ? (
          <div className="glint-container pb-20 text-center">{cta}</div>
        ) : null}
      </article>
      <Footer />
    </div>
  );
}
