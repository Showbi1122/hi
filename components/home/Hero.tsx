import { HeroMetrics } from "@/components/home/HeroMetrics";
import { Button } from "@/components/ui/Button";
import { heroTags } from "@/lib/data/home";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      itemScope
      itemType="https://schema.org/Person"
      className="relative z-[1] flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-[calc(76px+32px)] max-md:min-h-0 max-md:pb-16 md:px-8 lg:px-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[5%] -top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_70%)] blur-[80px] animate-float-orb" />
        <div
          className="absolute -bottom-[10%] -left-[8%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12),transparent_70%)] blur-[80px] animate-float-orb"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute left-[30%] top-[40%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_70%)] blur-[80px] animate-float-orb"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-content flex-col items-stretch gap-8 text-center max-[1200px]:gap-10 min-[1201px]:flex-row min-[1201px]:items-start min-[1201px]:justify-between min-[1201px]:gap-14 min-[1201px]:text-left">
        <div className="min-w-0 flex-1 max-w-[580px] max-[1200px]:mx-auto max-[1200px]:max-w-[640px]">
          <div className="animate-up mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-glass px-4 py-2 text-[0.82rem] font-semibold text-muted" style={{ animationDelay: "0.1s" }}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
            Available for freelance &amp; full-time
          </div>

          <h1
            id="hero-title"
            itemProp="name"
            className="animate-up mb-6 font-display text-[clamp(2.8rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-zinc-100"
            style={{ animationDelay: "0.2s" }}
          >
            Professional Software &amp; Web Developer
            <br />
            <span className="gradient-text">Custom Apps, POS Systems &amp; SaaS</span>
          </h1>

          <p
            itemProp="description"
            className="animate-up mx-auto mb-7 max-w-[520px] text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-muted min-[1201px]:mx-0"
            style={{ animationDelay: "0.35s" }}
          >
            I help startups and businesses launch fast, SEO-ready websites and custom
            software — from company websites and e-commerce stores to POS systems, CRM
            tools, and SaaS products. Full stack developer based in Abbottabad, Pakistan,
            serving clients in the USA, UK, UAE, Australia, and worldwide.
          </p>

          <div
            className="animate-up mb-8 flex flex-wrap justify-center gap-2.5 min-[1201px]:justify-start"
            style={{ animationDelay: "0.45s" }}
          >
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-gold bg-gold-dim px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-wide text-gold-light"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="animate-up mb-10 flex flex-wrap justify-center gap-3.5 min-[1201px]:justify-start"
            style={{ animationDelay: "0.55s" }}
          >
            <Button href="/contact" size="lg" className="rounded-xl">
              Hire Me
              <ArrowIcon />
            </Button>
            <Button href="/projects" variant="glass" size="lg" className="rounded-xl">
              View Projects
            </Button>
          </div>

          <div className="animate-up" style={{ animationDelay: "0.65s" }}>
            <HeroMetrics />
          </div>
        </div>

        <div className="animate-up w-full max-w-[min(420px,82vw)] flex-shrink-0 max-[1200px]:order-first max-[1200px]:mx-auto min-[1201px]:max-w-[clamp(280px,34vw,380px)] max-md:max-w-full max-md:mx-0" style={{ animationDelay: "0.3s" }}>
          <div className="group relative mx-auto w-full">
            <div
              aria-hidden
              className="absolute -inset-5 hidden rounded-[28px] border border-border-gold opacity-40 animate-spin-slow min-[1201px]:block"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_#c9a84c]" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[clamp(16px,3vw,24px)] border border-border-gold bg-surface-solid shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_80px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-white/[0.12] via-transparent via-40% to-gold/[0.08]"
              />
              <Image
                src="/assets/home/taleeb.webp"
                alt="Malik Taleeb Shahbaz, software developer and web developer in Abbottabad, Pakistan"
                width={760}
                height={1013}
                priority
                fetchPriority="high"
                itemProp="image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 82vw, 380px"
                className="h-full w-full scale-[1.02] object-cover object-center transition-transform duration-700 ease-premium group-hover:scale-[1.06] max-[1200px]:scale-100 max-[1200px]:group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </div>

      <Link
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 min-[769px]:flex"
      >
        <span className="h-12 w-px animate-scroll-line bg-gradient-to-b from-gold to-transparent" />
      </Link>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
