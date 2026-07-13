import type { Service } from "@/lib/data/services";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Reveal>
      <article
        id={service.id}
        className="group rounded-[20px] border border-border bg-surface p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-border-gold hover:shadow-card"
      >
        <span aria-hidden className="mb-4 block text-[1.75rem]">
          {service.icon}
        </span>
        <h3 className="mb-3 font-display text-xl text-zinc-100">{service.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">{service.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-gold bg-gold-dim px-3 py-1 text-[0.72rem] font-semibold text-gold-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="border-t border-border pt-5">
          {service.details.map((detail) => (
            <details key={detail.title} className="group/details mb-2">
              <summary className="cursor-pointer list-none py-2 text-sm font-semibold text-zinc-100 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="text-gold group-open/details:hidden">+ </span>
                <span className="hidden text-gold group-open/details:inline">− </span>
                {detail.title}
              </summary>
              <div className="pb-3 text-sm leading-relaxed text-muted">
                {detail.title === "Included" ? (
                  <>
                    Meta tags, JSON-LD, sitemap.xml, robots.txt, internal linking,
                    image optimization, FAQ schema.{" "}
                    <Link
                      href="/blog/seo-best-practices-business-websites"
                      className="text-gold-light hover:underline"
                    >
                      Read SEO guide
                    </Link>
                    .
                  </>
                ) : (
                  detail.content
                )}
              </div>
            </details>
          ))}
        </div>
      </article>
    </Reveal>
  );
}
