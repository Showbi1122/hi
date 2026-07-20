"use client";

import { trackNewsletterSignup } from "@/lib/analytics";
import { useState } from "react";

type NewsletterSignupProps = {
  location?: string;
  className?: string;
};

/**
 * Lightweight interest capture. Tracks newsletter_signup in GA4.
 * Swap the submit handler for a real ESP (Buttondown, Mailchimp, etc.) later.
 */
export function NewsletterSignup({
  location = "blog_sidebar",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }

    trackNewsletterSignup({ method: "email", location });
    setStatus("done");
    setEmail("");
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="newsletter-email">
          Email for updates
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          required
        />
        <div className="space-20" />
        <button type="submit" className="subscribe-btn">
          {status === "done" ? "You're on the list" : "Get updates"}{" "}
          <i className="cbtn-ico">→</i>
        </button>
      </form>
      {status === "error" ? (
        <p className="contact-form-note" role="alert">
          Enter a valid email address.
        </p>
      ) : status === "done" ? (
        <p className="contact-form-note">Thanks — I&apos;ll share new posts and tips.</p>
      ) : (
        <p className="contact-form-note">
          Occasional notes on web development and shipping products. No spam.
        </p>
      )}
    </div>
  );
}
