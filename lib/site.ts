export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://taleeb-shahbaz.vercel.app";

export const SITE_NAME = "Malik Taleeb Shahbaz | Software & Web Developer";

export const AUTHOR = {
  name: "Malik Taleeb Shahbaz",
  jobTitles: [
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "SaaS Developer",
  ],
  worksFor: "Nexelix",
  country: "PK",
  location: "Abbottabad, Pakistan",
};

export const WHATSAPP_PHONE = "923193677763";
export const WHATSAPP_LINK = "https://wa.link/ydmrc4";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/malik-taleeb-shahbaz-138769342";
export const GITHUB_URL = "https://github.com/mtaleebshahbaz";
export const INSTAGRAM_URL = "https://www.instagram.com/malik.taleeb.7/";

export const GOOGLE_SITE_VERIFICATION = "Gw7r1otlfmraHwdP_SsMbxKxDD6q7ca3YXWO6ZFvJ9E";

/**
 * GA4 Measurement ID (public by design — it ships in the browser HTML).
 *
 * NEXT_PUBLIC_* values are inlined at *build* time. Production previously
 * shipped an empty string because Vercel had no NEXT_PUBLIC_GA_MEASUREMENT_ID,
 * and the layout skipped `<GoogleAnalytics />` when the ID was falsy — so
 * View Source had no googletagmanager tag at all. Default to the real ID so
 * a missing env var cannot silently disable analytics.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-NWBZZ23DVZ";

/** Optional public resume / CV URL for download tracking */
export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL?.trim() ?? "";

/** Optional public contact email for mailto tracking */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";

export const OG_IMAGE = "/assets/home/og-image.webp";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
