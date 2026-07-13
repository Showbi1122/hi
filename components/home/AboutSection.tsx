import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 pt-20 md:pt-24">
      <SectionHeader
        label="About Me"
        title="Software Developer & Web Developer"
        description={
          <>
            Custom software development and web development for businesses that need
            sites and apps that rank, load fast, and convert.{" "}
            <Link href="/about" className="text-gold-light hover:underline">
              Read the full about page
            </Link>
            .
          </>
        }
      />
      <GlassCard>
        <p>
          I&apos;m Malik Taleeb Shahbaz, a full stack software developer and web
          developer based in Abbottabad, Pakistan, working with startups, agencies, and
          small businesses worldwide. I build{" "}
          <Link href="/services">custom websites</Link>, POS systems, SaaS web apps,
          React and Next.js frontends, and business management software structured to
          rank on Google and get cited by AI search tools.
        </p>
        <p>
          <strong>Tech stack:</strong> React, Next.js, Vue.js, Node.js, TypeScript,
          Firebase, REST APIs, database design, Tailwind CSS, and SEO architecture
          (schema markup, Core Web Vitals, internal linking). You own the production
          code — not locked template exports.
        </p>
        <p>
          <strong>Experience:</strong> 2+ years shipping client projects, 15+ websites
          delivered, and hands-on work at Nexelix (current) and 247Marketers. Clients
          hire me for company websites, POS and inventory systems, SaaS MVPs, and
          React or Next.js development they can hand off to directly.
        </p>
        <p>
          I work remotely with clients in the{" "}
          <Link href="/geo/web-developer-usa">United States</Link>,{" "}
          <Link href="/geo/software-developer-canada">Canada</Link>,{" "}
          <Link href="/geo/website-developer-uk">UK</Link>,{" "}
          <Link href="/geo/saas-developer-australia">Australia</Link>,{" "}
          <Link href="/geo/web-developer-uae">UAE</Link>, and across Europe. Local
          clients can see my{" "}
          <Link href="/geo/seo-website-developer-pakistan">
            software development work in Pakistan
          </Link>
          . Read guides on <Link href="/blog/react-vs-nextjs">React vs Next.js</Link>{" "}
          and{" "}
          <Link href="/blog/why-every-business-needs-modern-website">
            modern business websites
          </Link>
          , or browse the full <Link href="/blog">blog</Link>.
        </p>
        <p>
          People hire me because I answer within 24 hours, ship SEO-ready builds, and
          stay accountable after launch. No account managers, no surprise invoices.
        </p>
      </GlassCard>
    </section>
  );
}
