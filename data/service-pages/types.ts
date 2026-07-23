import type { Service } from "@/data/services";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceChallenge = {
  challenge: string;
  solution: string;
};

export type ServiceUseCase = {
  title: string;
  description: string;
};

export type RelatedLink = {
  href: string;
  label: string;
};

export type ServicePageContent = {
  slug: string;
  serviceId: Service["id"];
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  label: string;
  lead: string;
  heroCtaLabel: string;
  overview: string[];
  whyMatters: string[];
  features: ServiceFeature[];
  benefits: string[];
  process: ServiceProcessStep[];
  technologies: string[];
  whyChooseUs: string[];
  industries: string[];
  challenges: ServiceChallenge[];
  useCases: ServiceUseCase[];
  faqs: ServiceFaq[];
  relatedServiceSlugs: string[];
  relatedBlogs: RelatedLink[];
  imageAlt: string;
  finalCtaTitle: string;
  finalCtaBody: string;
};

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}
