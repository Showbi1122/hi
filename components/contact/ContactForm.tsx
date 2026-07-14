"use client";

import { WHATSAPP_PHONE } from "@/lib/site";
import { useState } from "react";

type ContactFormProps = {
  variant?: "default" | "glint";
};

export function ContactForm({ variant = "glint" }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "Hi Malik, I'm interested in hiring you for a web development project.",
      "",
      `*Name:* ${name}`,
      `*Contact:* ${email}`,
      "",
      "*Project details:*",
      message,
    ];

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitting(true);
    window.location.href = url;
    window.setTimeout(() => setSubmitting(false), 3000);
  }

  if (variant === "glint") {
    return (
      <div className="contact-form">
        <form onSubmit={handleSubmit} noValidate>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Name"
            aria-label="Name"
          />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            aria-label="Email"
          />
          <textarea
            name="message"
            id="messege"
            cols={30}
            rows={3}
            required
            placeholder="Message"
            aria-label="Message"
          />
          <div className="space-20" />
          <button type="submit" className="subscribe-btn" disabled={submitting}>
            {submitting ? "Opening WhatsApp…" : "Send now"}{" "}
            <i className="cbtn-ico">→</i>
          </button>
        </form>
        <p className="contact-form-note">
          Submitting opens WhatsApp with your message ready to send. I reply within 24
          hours.
        </p>
      </div>
    );
  }

  return null;
}
