import Link from "next/link";

type InnerPageHeroProps = {
  title: string;
  current: string;
  watermark?: string;
};

/** Glint inner-page hero: title + breadcrumb + giant watermark */
export function InnerPageHero({
  title,
  current,
  watermark,
}: InnerPageHeroProps) {
  return (
    <div
      className="welcome-area-wrap welcome-inner"
      style={{
        backgroundImage: "url(/assets/home/inner-hero-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="welcome-area inner">
        <div className="glint-container">
          <div className="row items-center">
            <div className="col-lg-4">
              <div className="inner-wlc">
                <h2>{title}</h2>
                <h3>
                  <Link href="/">home</Link>
                  &nbsp;/&nbsp;{current}
                </h3>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="inner-filltext">
                <h1>{watermark || current}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
