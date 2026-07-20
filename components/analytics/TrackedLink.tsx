"use client";

import {
  resolveOutboundEvent,
  trackEvent,
  trackOutboundClick,
  trackResumeDownload,
  type GaEventName,
} from "@/lib/analytics";
import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

type SharedProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Where the link sits in the UI (header, footer, sticky, etc.) */
  location?: string;
  /** Force a specific GA event instead of URL inference */
  eventName?: GaEventName;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type ExternalProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick" | "children" | "className"> & {
    external?: true;
  };

type InternalProps = SharedProps & {
  external: false;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "onClick" | "children" | "className">;

function fireTracking(
  href: string,
  location: string | undefined,
  eventName: GaEventName | undefined,
) {
  if (eventName) {
    if (eventName === "resume_download") {
      trackResumeDownload({ resume_url: href, location });
      return;
    }
    trackEvent(eventName, { link_url: href, location });
    return;
  }
  trackOutboundClick(href, { location });
}

/**
 * Anchor that fires GA4 outbound events (GitHub, LinkedIn, WhatsApp, email, resume).
 */
export function TrackedLink({
  href,
  children,
  className,
  location,
  eventName,
  onClick,
  external = true,
  ...rest
}: ExternalProps | InternalProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    fireTracking(href, location, eventName ?? resolveOutboundEvent(href) ?? undefined);
    onClick?.(event);
  };

  if (external === false) {
    return (
      <Link
        href={href}
        className={className}
        onClick={handleClick}
        {...(rest as Omit<
          ComponentPropsWithoutRef<typeof Link>,
          "href" | "onClick" | "children" | "className"
        >)}
      >
        {children}
      </Link>
    );
  }

  const isMailOrTel = href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...(!isMailOrTel
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...(rest as Omit<
        ComponentPropsWithoutRef<"a">,
        "href" | "onClick" | "children" | "className"
      >)}
    >
      {children}
    </a>
  );
}
