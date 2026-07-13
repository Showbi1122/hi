import { BlogCard } from "@/components/blog/BlogCard";
import { FaqList } from "@/components/content/FaqList";
import { AboutSection } from "@/components/home/AboutSection";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredBlogSlugs, getAllBlogPosts, toBlogCardData } from "@/lib/blog";
import { homepageFaqs } from "@/lib/data/faqs";
import { geoPages } from "@/lib/data/geo";
import {
  industries,
  processSteps,
  technologies,
  valueProps,
} from "@/lib/data/home";
import { projects } from "@/lib/data/projects";
import { services } from "@/lib/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import { getHomepageSchema } from "@/lib/schema/homepage";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";
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
  const allPosts = getAllBlogPosts();
  const featuredPosts = featuredBlogSlugs
    .map((slug) => allPosts.find((post) => post.slug === slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={getHomepageSchema()} />
      <Navbar active="home" />
      <Hero />
      <TrustMarquee />

      <main id="main-content" className="relative z-[1]">
        <Container as="main" className="pb-20">
          <AboutSection />

          <section id="services" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Services"
              title="Software Development & Web Development Services"
              description={
                <>
                  From company websites and e-commerce stores to POS systems and SaaS
                  MVPs — each service is built for speed, SEO, and conversions.{" "}
                  <Link href="/services" className="text-gold-light hover:underline">
                    View all services
                  </Link>{" "}
                  or{" "}
                  <Link href="/blog" className="text-gold-light hover:underline">
                    read the blog
                  </Link>
                  .
                </>
              }
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          <section id="technologies" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Tech Stack"
              title="Technologies I Specialize In"
              description="Full stack development tools for web applications, POS systems, APIs, and SEO-friendly business websites."
            />
            <Reveal>
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-border bg-glass px-5 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-border-gold hover:bg-gold-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="industries" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Industries"
              title="Industries I Serve"
              description="Domain experience across sectors that depend on strong web presence."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {industries.map((industry) => (
                <Reveal key={industry.title}>
                  <div className="rounded-[14px] border border-border bg-surface px-4 py-6 text-center">
                    <span className="mb-2.5 block text-2xl" aria-hidden>
                      {industry.icon}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {industry.title}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="why-me" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Why Hire Me"
              title="What You Get When We Work Together"
              description="Real benefits that matter to your business, not just code."
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {valueProps.map((item) => (
                <Reveal key={item.title}>
                  <div className="h-full rounded-[20px] border border-border bg-surface p-6">
                    <span className="mb-3 block text-2xl" aria-hidden>
                      {item.icon}
                    </span>
                    <h3 className="mb-2 font-display text-lg text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="process" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="How It Works"
              title="Simple Process, Zero Stress"
              description="From first message to live website, here's how we'll work together."
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <Reveal key={step.step}>
                  <div className="h-full rounded-[20px] border border-border bg-surface p-6">
                    <span className="mb-3 block font-display text-3xl font-extrabold text-gold/80">
                      {step.step}
                    </span>
                    <h3 className="mb-2 font-display text-lg text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Portfolio"
              title="Real Projects, Real Results"
              description={
                <>
                  See what I&apos;ve built for businesses like yours.{" "}
                  <Link href="/projects" className="text-gold-light hover:underline">
                    View all projects
                  </Link>
                  .
                </>
              }
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section id="locations" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Global Clients"
              title="Clients by Region"
              description="I work remotely. These pages explain how I collaborate in different markets."
            />
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {geoPages.map((page) => (
                <Reveal key={page.slug}>
                  <Link
                    href={`/geo/${page.slug}`}
                    className="block rounded-[14px] border border-border bg-glass p-4 transition-all hover:-translate-y-0.5 hover:border-border-gold hover:bg-gold-dim"
                  >
                    <span className="block text-sm font-semibold text-zinc-100">
                      {page.linkTitle}
                    </span>
                    <small className="mt-1 block text-xs text-muted">
                      {page.linkSubtitle}
                    </small>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="blog-preview" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Insights"
              title="Writing on web dev & SEO"
              description={
                <>
                  Longer guides when a topic deserves more than a tweet.{" "}
                  <Link href="/blog" className="text-gold-light hover:underline">
                    All posts
                  </Link>
                  .
                </>
              }
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
          </section>

          <section id="faq" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="FAQ"
              title="Frequently Asked Questions"
              description="Common questions I get before a project starts."
            />
            <FaqList items={homepageFaqs} />
          </section>

          <section className="pt-20 md:pt-24">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-[20px] border border-border-gold bg-surface p-8 md:flex-row md:items-center md:p-10">
                <div>
                  <h2 className="mb-2 font-display text-2xl font-extrabold text-zinc-100 md:text-3xl">
                    Ready to Hire a Web Developer?
                  </h2>
                  <p className="max-w-xl text-muted">
                    Free consultation for startups and businesses. Tell me what you need
                    built, I&apos;ll reply within 24 hours.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    Hire Me
                  </Button>
                  <Button href={WHATSAPP_LINK} variant="glass" size="lg" external>
                    Chat on WhatsApp
                  </Button>
                  <Button href={LINKEDIN_URL} variant="glass" size="lg" external>
                    Message on LinkedIn
                  </Button>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="contact" className="scroll-mt-28 pt-20 md:pt-24">
            <SectionHeader
              label="Let's Talk"
              title="Start Your Project Today"
              description="Tell me about your idea, I'll get back to you within 24 hours."
            />
            <Reveal>
              <div className="glass-card p-8 md:p-10">
                <p className="mb-6 text-base text-muted">
                  Need a freelance web developer for a business website, landing page, or
                  SaaS MVP? Message me on WhatsApp or LinkedIn. I reply within 24 hours.
                </p>
                <div className="mb-6 flex flex-wrap gap-3">
                  <Button href={WHATSAPP_LINK} size="lg" external>
                    WhatsApp — Fastest Reply
                  </Button>
                  <Button href={LINKEDIN_URL} variant="glass" size="lg" external>
                    Contact on LinkedIn
                  </Button>
                </div>
                <p className="mb-4 text-sm text-muted">Or connect via:</p>
                <div className="flex flex-wrap gap-3">
                  {[LINKEDIN_URL, GITHUB_URL, WHATSAPP_LINK, INSTAGRAM_URL].map(
                    (href) => (
                      <Button
                        key={href}
                        href={href}
                        variant="glass"
                        external
                        className="text-sm"
                      >
                        {socialLabel(href)}
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}

function socialLabel(href: string) {
  if (href.includes("linkedin")) return "LinkedIn";
  if (href.includes("github")) return "GitHub";
  if (href.includes("wa.link")) return "WhatsApp";
  return "Instagram";
}
