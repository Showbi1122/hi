import { FaqList } from "@/components/content/FaqList";
import type { ServicePageContent } from "@/data/service-pages/types";
import { services } from "@/data/services";
import { LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type ServicePageBodyProps = {
  page: ServicePageContent;
};

export function ServicePageBody({ page }: ServicePageBodyProps) {
  const relatedServices = page.relatedServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean);

  return (
    <div className="service-page-body">
      <div className="max-w-article">
        <section className="editorial-block" id="overview">
          <h2>Service overview</h2>
          {page.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>

        <section className="editorial-block" id="why-matters">
          <h2>Why this service matters</h2>
          {page.whyMatters.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>

        <section className="editorial-block" id="features">
          <h2>Key features</h2>
          <ul>
            {page.features.map((feature) => (
              <li key={feature.title}>
                <strong>{feature.title}.</strong> {feature.description}
              </li>
            ))}
          </ul>
        </section>

        <section className="editorial-block" id="benefits">
          <h2>Benefits</h2>
          <ul>
            {page.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="editorial-block service-process-section" id="process">
        <h2>Development process</h2>
        <div className="process-row process-row--service">
          {page.process.map((step) => (
            <div key={step.step} className="skill-box process-step">
              <small>{step.step}</small>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-article">
        <section className="editorial-block" id="technologies">
          <h2>Technologies I use</h2>
          <ul>
            {page.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        <section className="editorial-block" id="why-choose">
          <h2>Why choose me</h2>
          <ul>
            {page.whyChooseUs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="cta-form" style={{ marginTop: 28 }}>
            <Link href="/contact" className="subscribe-btn">
              {page.heroCtaLabel} <i className="cbtn-ico">→</i>
            </Link>
            <TrackedLink
              href={WHATSAPP_LINK}
              location={`service_${page.slug}_mid`}
              className="cbtn cbnt1"
            >
              WhatsApp <i className="cbtn-ico">→</i>
            </TrackedLink>
          </div>
        </section>

        <section className="editorial-block" id="industries">
          <h2>Industries I serve</h2>
          <ul>
            {page.industries.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </section>

        <section className="editorial-block" id="challenges">
          <h2>Common challenges I solve</h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Challenge</th>
                <th>How I approach it</th>
              </tr>
            </thead>
            <tbody>
              {page.challenges.map((row) => (
                <tr key={row.challenge}>
                  <td>{row.challenge}</td>
                  <td>{row.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="editorial-block" id="use-cases">
          <h2>Real-world use cases</h2>
          {page.useCases.map((useCase) => (
            <div key={useCase.title} style={{ marginBottom: 20 }}>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </div>
          ))}
        </section>

        {relatedServices.length > 0 ? (
          <section className="editorial-block" id="related-services">
            <h2>Related services</h2>
            <ul>
              {relatedServices.map((service) =>
                service ? (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        {page.relatedBlogs.length > 0 ? (
          <section className="editorial-block" id="related-articles">
            <h2>Helpful articles</h2>
            <ul>
              {page.relatedBlogs.map((blog) => (
                <li key={blog.href}>
                  <Link href={blog.href}>{blog.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="editorial-block" id="faq">
          <h2>Frequently asked questions</h2>
          <FaqList items={page.faqs} />
        </section>

        <section className="editorial-block" id="final-cta">
          <h2>{page.finalCtaTitle}</h2>
          <p>{page.finalCtaBody}</p>
          <div className="cta-form" style={{ marginTop: 24 }}>
            <Link href="/contact" className="subscribe-btn">
              Start a project <i className="cbtn-ico">→</i>
            </Link>
            <TrackedLink
              href={WHATSAPP_LINK}
              location={`service_${page.slug}_final`}
              className="cbtn cbnt1"
            >
              WhatsApp quote <i className="cbtn-ico">→</i>
            </TrackedLink>
          </div>
          <p className="mt-4 text-sm text-muted">
            Prefer LinkedIn?{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#08d665] hover:underline"
            >
              Message me there
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
