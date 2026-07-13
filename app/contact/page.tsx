import { ContactForm } from "@/components/contact/ContactForm";
import {
  ContentPageLayout,
  GlassCard,
  defaultBreadcrumbSchema,
} from "@/components/layout/ContentPageLayout";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/metadata";
import { KEYWORDS } from "@/lib/seo/keywords";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";
import Link from "next/link";

export const metadata = createPageMetadata({
  title:
    "Contact & Hire a Software Developer | Web Developer Pakistan | Malik Taleeb Shahbaz",
  description:
    "Hire Malik Taleeb Shahbaz for software development and web development — custom websites, POS systems, SaaS, CRM, and business software. WhatsApp or LinkedIn, reply within 24 hours.",
  path: "/contact",
  keywords: KEYWORDS.contact,
  imageAlt: "Contact Malik Taleeb Shahbaz for software and web development",
});

export default function ContactPage() {
  return (
    <ContentPageLayout
      active="contact"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
      label="Let's Talk"
      title="Hire a Web Developer"
      lead="Fill out the form below — you'll be redirected to WhatsApp with your project details ready to send. I reply within 24 hours."
      schema={{
        "@context": "https://schema.org",
        "@graph": [
          defaultBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@type": "ContactPage",
            name: "Contact Malik Taleeb Shahbaz",
            url: "https://taleeb-shahbaz.vercel.app/contact",
            description:
              "Hire Malik Taleeb Shahbaz for web development, React, Next.js, and SaaS projects.",
          },
        ],
      }}
    >
      <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
        <GlassCard contentClassName="!p-8 md:!p-10">
          <div className="mb-7">
            <h2 className="mb-2 font-display text-2xl text-zinc-100">Project inquiry</h2>
            <p className="text-sm text-muted">
              Tell me what you need built. On submit, WhatsApp opens with a pre-filled
              message — just tap Send.
            </p>
          </div>
          <ContactForm />
        </GlassCard>

        <GlassCard className="lg:sticky lg:top-[calc(76px+24px)]">
          <h2 className="mb-2 font-display text-lg text-zinc-100">Quick contact</h2>
          <p className="mb-5 text-sm text-muted">
            Prefer to skip the form? Message me directly — fastest reply on WhatsApp.
          </p>
          <div className="mb-6 grid gap-3">
            <Button href={WHATSAPP_LINK} external className="w-full justify-center">
              WhatsApp
            </Button>
            <Button
              href={LINKEDIN_URL}
              variant="glass"
              external
              className="w-full justify-center"
            >
              LinkedIn
            </Button>
          </div>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>Reply within 24 hours</li>
            <li>Remote — worldwide clients</li>
            <li>Fixed price or milestones</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button href={GITHUB_URL} variant="glass" external className="text-sm">
              GitHub
            </Button>
            <Button href={INSTAGRAM_URL} variant="glass" external className="text-sm">
              Instagram
            </Button>
          </div>
        </GlassCard>
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 font-display text-xl text-zinc-100">What to include</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            <li>What you&apos;re building (website, POS system, SaaS app, redesign)</li>
            <li>Your industry and target audience</li>
            <li>Timeline and budget range if you have one</li>
            <li>Links to inspiration or your current site</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <h2 className="mb-4 font-display text-xl text-zinc-100">
            Services I can help with
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            <Link href="/services#service-custom-website" className="text-gold-light">
              Custom websites
            </Link>
            ,{" "}
            <Link href="/services#service-saas" className="text-gold-light">
              SaaS MVPs
            </Link>
            ,{" "}
            <Link href="/services#service-frontend" className="text-gold-light">
              React / Next.js
            </Link>
            ,{" "}
            <Link href="/services#service-industry" className="text-gold-light">
              POS &amp; business software
            </Link>
            ,{" "}
            <Link href="/services#service-landing" className="text-gold-light">
              landing pages
            </Link>
            , and{" "}
            <Link href="/services#service-seo" className="text-gold-light">
              SEO-ready builds
            </Link>
            . Browse{" "}
            <Link href="/projects" className="text-gold-light">
              past projects
            </Link>{" "}
            or read the{" "}
            <Link href="/about" className="text-gold-light">
              about page
            </Link>{" "}
            first.
          </p>
        </GlassCard>
      </div>
    </ContentPageLayout>
  );
}
