"use client";

import { GA_MEASUREMENT_ID } from "@/lib/site";
import { sendGAEvent } from "@next/third-parties/google";

export const GA_EVENTS = {
  blog_view: "blog_view",
  project_view: "project_view",
  contact_form_submit: "contact_form_submit",
  resume_download: "resume_download",
  github_click: "github_click",
  linkedin_click: "linkedin_click",
  email_click: "email_click",
  whatsapp_click: "whatsapp_click",
  blog_read_50_percent: "blog_read_50_percent",
  blog_read_100_percent: "blog_read_100_percent",
  search_used: "search_used",
  newsletter_signup: "newsletter_signup",
} as const;

export type GaEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

export type GaEventParams = Record<
  string,
  string | number | boolean | undefined
>;

function canTrack(): boolean {
  return typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID);
}

/**
 * Low-level GA4 event sender. Safe to call anytime — no-ops when GA is off.
 */
export function trackEvent(
  eventName: GaEventName | (string & {}),
  params: GaEventParams = {},
): void {
  if (!canTrack()) return;

  const payload: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }

  try {
    sendGAEvent("event", eventName, payload);
  } catch {
    // Never break UX if analytics fails
  }
}

export function trackBlogView(params: {
  blog_slug: string;
  blog_title: string;
  blog_tag?: string;
}): void {
  trackEvent(GA_EVENTS.blog_view, params);
}

export function trackProjectView(params: {
  project_slug: string;
  project_title: string;
  project_industry?: string;
}): void {
  trackEvent(GA_EVENTS.project_view, params);
}

export function trackContactFormSubmit(params: {
  form_variant?: string;
  has_email?: boolean;
} = {}): void {
  trackEvent(GA_EVENTS.contact_form_submit, params);
}

export function trackResumeDownload(params: {
  resume_url?: string;
  location?: string;
} = {}): void {
  trackEvent(GA_EVENTS.resume_download, params);
}

export function trackGithubClick(params: { location?: string } = {}): void {
  trackEvent(GA_EVENTS.github_click, params);
}

export function trackLinkedinClick(params: { location?: string } = {}): void {
  trackEvent(GA_EVENTS.linkedin_click, params);
}

export function trackEmailClick(params: { location?: string } = {}): void {
  trackEvent(GA_EVENTS.email_click, params);
}

export function trackWhatsappClick(params: { location?: string } = {}): void {
  trackEvent(GA_EVENTS.whatsapp_click, params);
}

export function trackBlogRead50(params: {
  blog_slug: string;
  blog_title: string;
}): void {
  trackEvent(GA_EVENTS.blog_read_50_percent, params);
}

export function trackBlogRead100(params: {
  blog_slug: string;
  blog_title: string;
}): void {
  trackEvent(GA_EVENTS.blog_read_100_percent, params);
}

export function trackSearchUsed(params: {
  search_term: string;
  results_count?: number;
  location?: string;
}): void {
  const term = params.search_term.trim();
  if (!term) return;
  trackEvent(GA_EVENTS.search_used, {
    search_term: term,
    results_count: params.results_count,
    location: params.location,
  });
}

export function trackNewsletterSignup(params: {
  method?: string;
  location?: string;
} = {}): void {
  trackEvent(GA_EVENTS.newsletter_signup, params);
}

/** Infer click event from an outbound URL. */
export function resolveOutboundEvent(
  href: string,
): GaEventName | null {
  const value = href.toLowerCase();
  if (value.startsWith("mailto:")) return GA_EVENTS.email_click;
  if (
    value.includes("wa.link") ||
    value.includes("whatsapp.com") ||
    value.includes("api.whatsapp.com")
  ) {
    return GA_EVENTS.whatsapp_click;
  }
  if (value.includes("linkedin.com")) return GA_EVENTS.linkedin_click;
  if (value.includes("github.com")) return GA_EVENTS.github_click;
  if (
    value.includes("resume") ||
    value.endsWith(".pdf") ||
    value.includes("/cv")
  ) {
    return GA_EVENTS.resume_download;
  }
  return null;
}

export function trackOutboundClick(
  href: string,
  params: { location?: string } = {},
): void {
  const event = resolveOutboundEvent(href);
  if (!event) return;
  trackEvent(event, { link_url: href, ...params });
}
