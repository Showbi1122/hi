import { InnerPageHero } from "@/components/layout/InnerPageHero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultBreadcrumbSchema } from "@/components/layout/ContentPageLayout";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_LINK,
} from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

export const metadata = createPageMetadata({
  title:
    "About Malik Taleeb Shahbaz | Software Developer Pakistan | Web Developer Abbottabad",
  description:
    "Meet Malik Taleeb Shahbaz — software developer and web developer in Abbottabad, Pakistan. Custom software, POS systems, React, Next.js, SaaS, and 15+ websites delivered for global clients.",
  path: "/about",
  keywords: KEYWORDS.about,
  imageAlt: "Malik Taleeb Shahbaz, software developer and web developer in Pakistan",
});

const highlightServices = services.slice(0, 3);

const socialTiles = [
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_LINK,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="site site-black site-inner">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            defaultBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
            {
              "@type": "Person",
              name: "Malik Taleeb Shahbaz",
              jobTitle: [
                "Software Developer",
                "Web Developer",
                "Full Stack Developer",
              ],
              url: "https://taleeb-shahbaz.vercel.app/about",
              image: "https://taleeb-shahbaz.vercel.app/assets/home/taleeb.webp",
              sameAs: [
                "https://github.com/mtaleebshahbaz",
                "https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342",
              ],
            },
          ],
        }}
      />
      <TopBar />
      <Navbar active="about" />

      <main id="main-content">
        <InnerPageHero title="About Us" current="About" watermark="About" />

        {/* About block — Glint about-area-primery */}
        <section className="about-area about-area-primery section-padding" id="about">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="about-shape about-shape-primery">
                  <div
                    className="about-img-section about-img-section1 text-center"
                    role="img"
                    aria-label="Malik Taleeb Shahbaz, software developer"
                  />
                </div>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="primery-heading">
                  <strong className="filltext">About us</strong>
                  <h2>
                    Software developer &amp; web developer who builds products that{" "}
                    <span>convert</span>
                  </h2>
                  <div className="space-20" />
                  <p>
                    I&apos;m Malik Taleeb Shahbaz — a full stack software developer in
                    Abbottabad, Pakistan. I build custom websites, POS systems, SaaS
                    products, and business software for startups and companies that need
                    fast, SEO-ready solutions.
                  </p>
                  <p>
                    <strong>2+ years</strong> shipping client projects,{" "}
                    <strong>15+ websites</strong> delivered, and hands-on work at Nexelix
                    (current) and 247Marketers. Remote clients worldwide.
                  </p>
                  <div className="space-40" />
                  <Link href="/contact" className="cbtn cbnt1">
                    Hire Me <i className="cbtn-ico">→</i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 service cards — Glint service-primery */}
        <section className="service-area service-primery padding-top padding-bottom" id="service">
          <div className="glint-container">
            <div className="row">
              {highlightServices.map((service, index) => (
                <div key={service.id} className="col-lg-4" style={{ marginBottom: 40 }}>
                  <article
                    className={`single-service pricing2 ${index === 1 ? "active" : ""}`}
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
                  </article>
                </div>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 20 }}>
              <Link href="/services" className="cbtn cbnt1">
                View all services <i className="cbtn-ico">→</i>
              </Link>
            </div>
          </div>
        </section>

        {/* Projects — Glint project-area-primery */}
        <section className="project-area project-area-primery section-padding" id="portfolio">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-6">
                <div className="primery-heading">
                  <strong className="filltext">our projects</strong>
                  <small>WORKING PROCESS</small>
                  <h2>
                    latest working <span>project</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="primery-info-content">
                  <p>
                    Real sites and apps for education, retail, and business clients.{" "}
                    <Link href="/projects">See the full portfolio</Link>.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <ul id="da-thumbs" className="da-thumbs portfolio-carousel2">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects#${project.slug}`} className="project-card-link">
                    <span className="single-portfolio-item single-portfolio-item2 project-card-box">
                      <Image
                        src={project.image.replace("-600.webp", ".webp")}
                        alt={project.imageAlt}
                        width={1200}
                        height={800}
                        className="portfolio-item-img"
                      />
                    </span>
                    <span className="hover-overlay">
                      <span>{project.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA — Glint newsletter-style hire strip */}
        <section className="cta-area padding-top padding-bottom cta-primery" id="contact-cta">
          <div className="glint-container">
            <div className="row">
              <div className="col-lg-6 m-auto text-center">
                <div className="primery-heading cta-heading">
                  <small>Next Step</small>
                  <div className="space-20" />
                  <h2>
                    Ready to hire a <span>web developer?</span>
                  </h2>
                </div>
                <div className="space-40" />
                <div className="cta-form cta-form-centered">
                  <Link href="/contact" className="subscribe-btn">
                    Contact Me <i className="cbtn-ico">→</i>
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cbtn cbnt1"
                  >
                    WhatsApp <i className="cbtn-ico">→</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="space-100" />

          <div className="social-area">
            <div className="glint-container">
              <div className="row social-row">
                {socialTiles.map((s) => (
                  <div key={s.href} className="col-social">
                    <div className="single-social">
                      <div className="sinlge-social-hover">
                        <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                          <span className="single-social-icon">{s.icon}</span>
                          <p className="single-soicial-text">
                            Join on
                            <br />
                            {s.label}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
