import { aiWebsiteAutomation } from "@/data/service-pages/ai-website-automation";
import { customWebsiteDevelopment } from "@/data/service-pages/custom-website-development";
import { landingPageLeadGeneration } from "@/data/service-pages/landing-page-lead-generation";
import { reactNextjsDevelopment } from "@/data/service-pages/react-nextjs-development";
import { saasWebApplicationDevelopment } from "@/data/service-pages/saas-web-application-development";
import { seoWebsiteDevelopment } from "@/data/service-pages/seo-website-development";
import type { ServicePageContent } from "@/data/service-pages/types";
import { uiUxWebDesign } from "@/data/service-pages/ui-ux-web-design";
import { websiteMaintenanceIndustrySites } from "@/data/service-pages/website-maintenance-industry-sites";

export type { ServicePageContent } from "@/data/service-pages/types";

export const servicePages: ServicePageContent[] = [
  customWebsiteDevelopment,
  saasWebApplicationDevelopment,
  reactNextjsDevelopment,
  landingPageLeadGeneration,
  aiWebsiteAutomation,
  seoWebsiteDevelopment,
  uiUxWebDesign,
  websiteMaintenanceIndustrySites,
];

export function getServicePage(slug: string): ServicePageContent | null {
  return servicePages.find((page) => page.slug === slug) ?? null;
}

export function getAllServicePageSlugs(): string[] {
  return servicePages.map((page) => page.slug);
}
