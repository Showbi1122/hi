import {
  ContentPageLayout,
  GlassCard,
  defaultBreadcrumbSchema,
  defaultCta,
} from "@/components/layout/ContentPageLayout";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
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

export default function AboutPage() {
  return (
    <ContentPageLayout
      active="about"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "About" },
      ]}
      label="About Me"
      title="Software Developer & Web Developer"
      lead="I'm Malik Taleeb Shahbaz — a full stack software developer in Abbottabad, Pakistan. I build custom websites, POS systems, SaaS products, and business software for startups and companies that need fast, SEO-ready solutions."
      schema={{
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
      cta={defaultCta()}
    >
      <div className="content-body">
        <GlassCard>
          <h2>What I do</h2>
          <p>
            I work with startups, agencies, and small businesses worldwide on{" "}
            <Link href="/services">software development</Link> and web development —
            custom websites, POS systems, SaaS MVPs, CRM tools, React and Next.js
            frontends, and lead-generation sites structured to rank on Google and get
            cited by AI search tools.
          </p>
          <p>
            <strong>Tech stack:</strong> React, Next.js, Vue.js, Node.js, TypeScript,
            Firebase, Tailwind CSS, and SEO architecture (schema markup, Core Web
            Vitals, internal linking). You own the production code — not locked template
            exports.
          </p>
        </GlassCard>

        <GlassCard>
          <h2>Experience</h2>
          <p>
            <strong>2+ years</strong> shipping client projects,{" "}
            <strong>15+ websites</strong> delivered, and hands-on work at Nexelix
            (current) and 247Marketers. Most clients need company websites, POS or
            inventory systems, a SaaS MVP for investors, or a React developer agencies
            can hand work to directly.
          </p>
          <p>
            See examples in my <Link href="/projects">project portfolio</Link>.
          </p>
        </GlassCard>

        <GlassCard>
          <h2>Global &amp; local clients</h2>
          <p>
            Based in <strong>Abbottabad, Pakistan</strong>, working remotely with
            clients in the{" "}
            <Link href="/geo/web-developer-usa">United States</Link>,{" "}
            <Link href="/geo/software-developer-canada">Canada</Link>,{" "}
            <Link href="/geo/website-developer-uk">UK</Link>,{" "}
            <Link href="/geo/saas-developer-australia">Australia</Link>,{" "}
            <Link href="/geo/web-developer-uae">UAE</Link>, and across Europe. See my{" "}
            <Link href="/geo/seo-website-developer-pakistan">
              software development services in Pakistan
            </Link>
            .
          </p>
        </GlassCard>

        <GlassCard>
          <h2>Why clients hire me</h2>
          <ul>
            <li>
              Replies within <strong>24 hours</strong> — no account managers in the
              middle
            </li>
            <li>SEO-ready builds with schema, speed, and clear structure</li>
            <li>Direct accountability from discovery through launch and support</li>
            <li>Plain-English updates — you always know where the project stands</li>
          </ul>
          <p>
            Read guides on{" "}
            <Link href="/blog/react-vs-nextjs">React vs Next.js</Link> and{" "}
            <Link href="/blog/why-every-business-needs-modern-website">
              modern business websites
            </Link>
            , or browse the <Link href="/blog">blog</Link>.
          </p>
        </GlassCard>

        <GlassCard>
          <h2>How we work together</h2>
          <ol>
            <li>
              <strong>Tell me your vision</strong> — goals, timeline, and budget via{" "}
              <Link href="/contact">contact</Link>
            </li>
            <li>
              <strong>Plan &amp; design</strong> — align on layout and features before
              code
            </li>
            <li>
              <strong>Build &amp; refine</strong> — regular updates until it&apos;s right
            </li>
            <li>
              <strong>Launch &amp; support</strong> — go live with confidence
            </li>
          </ol>
          <p>
            Full process details are on the <Link href="/#process">homepage</Link>.
          </p>
        </GlassCard>
      </div>
    </ContentPageLayout>
  );
}
