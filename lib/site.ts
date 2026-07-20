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

/** GA4 Measurement ID — set via NEXT_PUBLIC_GA_MEASUREMENT_ID */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const OG_IMAGE = "/assets/home/og-image.webp";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
