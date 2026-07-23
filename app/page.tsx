import { TrackedLink } from "@/components/analytics/TrackedLink";
import { BlogCard } from "@/components/blog/BlogCard";
import { FaqList } from "@/components/content/FaqList";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSkills } from "@/components/sections/ExperienceSkills";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import { ServiceCard } from "@/components/services/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getLatestBlogPosts, toBlogCardData } from "@/lib/blog";
import { homepageFaqs } from "@/data/faqs";
import { geoPages } from "@/data/geo";
import { processSteps, valueProps } from "@/data/home";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import { getHomepageSchema } from "@/lib/schema/homepage";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

export const metadata = createPageMetadata({
  title:
    "Software Developer & Web Developer | POS, SaaS & Custom Apps | Malik Taleeb Shahbaz",
  description:
    "Hire Malik Taleeb Shahbaz for software development and web development — custom websites, POS systems, SaaS, CRM, and business software. Full stack developer in Abbottabad, Pakistan serving global clients.",
  path: "/",
  keywords: KEYWORDS.home,
  imageAlt:
    "Malik Taleeb Shahbaz — software developer and web developer portfolio",
});

export default function HomePage() {
  const featuredPosts = getLatestBlogPosts(3);
  const featuredServices = services.slice(0, 3);

  return (
    <div className="site site-black">
      <JsonLd data={getHomepageSchema()} />
      <TopBar />
      <Navbar active="home" />
      <Hero />

      <main id="main-content">
        <AboutSection />
        <ExperienceSkills />

        {/* Services */}
        <div className="service-area padding-bottom" id="services">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-6">
                <div className="heading white">
                  <strong className="filltext">our services</strong>
                  <small>WHAT I DO</small>
                  <h2>
                    Services and<span> Solutions</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info-content">
                  <p>
                    From company websites and e-commerce stores to POS systems and SaaS MVPs —
                    each service is built for speed, SEO, and conversions.{" "}
                    <Link href="/services" className="inline-link">
                      View all services
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <div className="row">
              {featuredServices.map((service, index) => (
                <div key={service.id} className="col-lg-4 mb-6">
                  <ServiceCard
                    service={service}
                    index={index}
                    featured={index === 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="section-padding" id="process" style={{ background: "#131617" }}>
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-6">
                <div className="heading white">
                  <strong className="filltext">process</strong>
                  <small>HOW IT WORKS</small>
                  <h2>
                    Simple Process, <span>Zero Stress</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info-content">
                  <p>From first message to live website, here&apos;s how we&apos;ll work together.</p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <div className="process-row">
              {processSteps.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.07}>
                  <div className="skill-box process-step">
                    <small>{step.step}</small>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Projects carousel-style */}
        <div className="project-area section-padding" id="projects">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="heading white">
                  <strong className="filltext">our projects</strong>
                  <small>WORKING PROCESS</small>
                  <h2>
                    latest working <span>project</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info-content">
                  <p>
                    See what I&apos;ve built for businesses like yours.{" "}
                    <Link href="/projects" className="inline-link">
                      View all projects
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <ul id="da-thumbs" className="da-thumbs portfolio-carousel">
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
        </div>

        {/* Why me as advantages (not fake testimonials) */}
        <div className="testimonials-area testimonials-area1 section-padding" id="why-me">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="heading white">
                  <strong className="filltext">why hire me</strong>
                  <small>MY ADVANTAGE</small>
                  <h2>
                    What You Get When We <span>Work Together</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info-content">
                  <p>Real benefits that matter to your business, not just code.</p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <div className="advantage-grid">
              {valueProps.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="advantage-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="advantage-icon"
                      aria-hidden
                    />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="section-padding" id="locations">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="heading white">
                  <strong className="filltext">global</strong>
                  <small>WHERE I WORK</small>
                  <h2>
                    Clients by <span>Region</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info-content">
                  <p>
                    I work remotely. These pages explain how I collaborate in different markets.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <div className="glint-locations">
              {geoPages.map((page) => (
                <Link key={page.slug} href={`/geo/${page.slug}`}>
                  <span>{page.linkTitle}</span>
                  <span className="go">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Blog */}
        <div className="blog-area padding-top padding-bottom" id="blog-preview">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="heading white">
                  <strong className="filltext">news & blog</strong>
                  <small>RECENT WRITING</small>
                  <h2>
                    latest news & <span>blogs</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info-content">
                  <p>
                    Longer guides when a topic deserves more than a tweet.{" "}
                    <Link href="/blog" className="inline-link">
                      All posts
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featuredPosts.map((post) => {
                if (!post) return null;
                const card = toBlogCardData(post);
                return (
                  <BlogCard
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    slug={card.slug}
                    title={card.title}
                    description={card.description}
                    category={card.category}
                    readTime={card.readTime}
                    featuredImage={card.featuredImage}
                    imageAlt={card.imageAlt}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="section-padding" id="faq" style={{ background: "#131617" }}>
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="heading white">
                  <strong className="filltext">faq</strong>
                  <small>COMMON QUESTIONS</small>
                  <h2>
                    Frequently Asked <span>Questions</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="info-content">
                  <p>Common questions I get before a project starts.</p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <FaqList items={homepageFaqs} />
          </div>
        </div>

        {/* CTA / Newsletter-style hire strip */}
        <div className="cta-area cta-area1 padding-top padding-bottom" id="hire">
          <div className="glint-container">
            <div className="text-center">
              <div className="heading cta-heading white mx-auto max-w-2xl">
                <small>Next Step</small>
                <div className="space-20" />
                <h2>
                  Ready to Hire a <span>Web Developer?</span>
                </h2>
                <p className="!mx-auto max-w-xl !text-center">
                  Free consultation for startups and businesses. Tell me what you need built,
                  I&apos;ll reply within 24 hours.
                </p>
              </div>
              <div className="space-40" />
              <div className="cta-form !flex !w-full !max-w-xl !flex-wrap !justify-center !gap-4">
                <Link href="/contact" className="subscribe-btn">
                  Hire Me <span className="cbtn-ico">→</span>
                </Link>
                <TrackedLink href={WHATSAPP_LINK} location="home_cta" className="cbtn cbnt1">
                  WhatsApp <span className="cbtn-ico">→</span>
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="section-padding" id="contact">
          <div className="glint-container">
            <div className="row items-center">
              <div className="col-lg-6">
                <div className="heading white">
                  <strong className="filltext">contact</strong>
                  <small>LET&apos;S TALK</small>
                  <h2>
                    Start Your Project <span>Today</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="info-content">
                  <p>Tell me about your idea, I&apos;ll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
            <div className="space-60" />
            <Reveal>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#999]">
                Need a freelance web developer for a business website, landing page, or SaaS
                MVP? Message me on WhatsApp or LinkedIn. I reply within 24 hours.
              </p>
              <div className="mb-10 flex flex-wrap gap-4">
                <TrackedLink href={WHATSAPP_LINK} location="home_contact" className="cbtn cbnt1">
                  WhatsApp — Fastest Reply <span className="cbtn-ico">→</span>
                </TrackedLink>
                <TrackedLink href={LINKEDIN_URL} location="home_contact" className="cbtn cbnt1">
                  Contact on LinkedIn <span className="cbtn-ico">→</span>
                </TrackedLink>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[LINKEDIN_URL, GITHUB_URL, WHATSAPP_LINK, INSTAGRAM_URL].map((href) => (
                  <TrackedLink
                    key={href}
                    href={href}
                    location="home_contact"
                    className="text-sm font-medium uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-[#08d665]"
                  >
                    {socialLabel(href)}
                  </TrackedLink>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function socialLabel(href: string) {
  if (href.includes("linkedin")) return "LinkedIn";
  if (href.includes("github")) return "GitHub";
  if (href.includes("wa.link")) return "WhatsApp";
  return "Instagram";
}
