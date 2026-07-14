import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export function AboutSection() {
  return (
    <div className="about-area about-area1 section-padding" id="about">
      <div className="glint-container">
        <div className="row items-center">
          <div className="col-lg-5">
            <Reveal>
              <div className="about-shape">
                <div className="about-img-section about-img-section1 text-center" />
              </div>
            </Reveal>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <Reveal delay={0.1}>
              <div className="heading white">
                <strong className="filltext">About us</strong>
                <h2>
                  Software Developer &amp;{" "}
                  <span>Web Developer</span>
                </h2>
                <p>
                  I&apos;m Malik Taleeb Shahbaz, a full stack software developer and web
                  developer based in Abbottabad, Pakistan, working with startups, agencies, and
                  small businesses worldwide. I build{" "}
                  <Link href="/services" className="text-[#08d665] hover:underline">
                    custom websites
                  </Link>
                  , POS systems, SaaS web apps, React and Next.js frontends, and business
                  management software structured to rank on Google.
                </p>
                <p>
                  <strong className="text-white">Experience:</strong> 2+ years shipping client
                  projects, 15+ websites delivered, and hands-on work at Nexelix (current) and
                  247Marketers.
                </p>
                <Link href="/about" className="cbtn cbnt1">
                  Read full about <span className="cbtn-ico">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
