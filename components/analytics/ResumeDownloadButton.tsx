"use client";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { RESUME_URL } from "@/lib/site";

type ResumeDownloadButtonProps = {
  location?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Renders only when NEXT_PUBLIC_RESUME_URL is set. */
export function ResumeDownloadButton({
  location = "about",
  className = "cbtn cbnt1",
  children = (
    <>
      Download Resume <i className="cbtn-ico">↓</i>
    </>
  ),
}: ResumeDownloadButtonProps) {
  if (!RESUME_URL) return null;

  return (
    <TrackedLink
      href={RESUME_URL}
      location={location}
      eventName="resume_download"
      className={className}
      download
    >
      {children}
    </TrackedLink>
  );
}
