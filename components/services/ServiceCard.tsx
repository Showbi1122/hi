import type { Service } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

type ServiceCardProps = {
  service: Service;
  index?: number;
  featured?: boolean;
};

export function ServiceCard({ service, index = 0, featured }: ServiceCardProps) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        id={service.id}
        className={`single-service h-full ${featured ? "active" : ""}`}
      >
        <Link
          href={`/services/${service.slug}`}
          className="service-card-link"
          aria-label={`View ${service.title}`}
        >
          <div className="service-icon" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.icon} alt="" width={90} height={90} />
          </div>
          <div className="service-text">
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
          <div className="circles-wrap" aria-hidden>
            <div className="circles">
              <span className="g-circle circle-1" />
              <span className="g-circle circle-2" />
              <span className="g-circle circle-3" />
              <span className="g-circle circle-4" />
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
