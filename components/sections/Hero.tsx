import Image from "next/image";
import Link from "next/link";

/**
 * Server-rendered hero: the H1 is the LCP element on mobile PSI.
 * Keep it visible in the first HTML paint (no opacity:0 / JS animation gate).
 */
export function Hero() {
  return (
    <div className="welcome-area-wrap welcome__wrap1" id="hero">
      <div
        className="single-welcome-area home_1"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="glint-container">
          <div className="row">
            <div className="col-lg-7">
              <div className="wlc-title white">
                <h1 id="hero-title" itemProp="name">
                  <span>Apps, POS &amp; SaaS</span> built for real businesses
                </h1>
                <p itemProp="description">
                  I help startups and businesses launch fast, SEO-ready websites and custom
                  software: from company websites to POS systems, CRM tools, and SaaS
                  products.
                </p>
                <Link href="/contact" className="cbtn cbnt1">
                  Getting Started <i className="cbtn-ico">→</i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wlc-author-1">
          <Image
            src="/assets/home/taleeb.webp"
            alt="Malik Taleeb Shahbaz, software developer and web developer in Abbottabad, Pakistan"
            width={760}
            height={1013}
            priority
            fetchPriority="high"
            sizes="(max-width: 991px) 0px, min(42vw, 520px)"
            itemProp="image"
          />
          <p className="wlc-filltext" aria-hidden="true">
            MTS
          </p>
        </div>
      </div>
    </div>
  );
}
