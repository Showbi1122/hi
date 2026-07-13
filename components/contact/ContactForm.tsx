"use client";

import { WHATSAPP_PHONE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const projectTypes = [
  "Business website",
  "Landing page",
  "SaaS MVP",
  "Website redesign",
  "React / Next.js app",
  "Other",
] as const;

const budgets = [
  "Not sure yet",
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
] as const;

const timelines = ["ASAP", "1–2 weeks", "Within 1 month", "Flexible"] as const;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const lines = [
      "Hi Malik, I'm interested in hiring you for a web development project.",
      "",
      `*Name:* ${String(data.get("name")).trim()}`,
      `*Contact:* ${String(data.get("contact")).trim()}`,
      `*Project type:* ${String(data.get("project_type"))}`,
      `*Budget:* ${String(data.get("budget"))}`,
      `*Timeline:* ${String(data.get("timeline"))}`,
      "",
      "*Project details:*",
      String(data.get("message")).trim(),
    ];

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitting(true);
    window.location.href = url;
    window.setTimeout(() => setSubmitting(false), 3000);
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Smith"
            className={inputClass}
          />
        </Field>
        <Field label="Email or WhatsApp" htmlFor="contact-email" required>
          <input
            id="contact-email"
            name="contact"
            type="text"
            required
            autoComplete="email"
            placeholder="you@email.com or +92 300 …"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Project type" htmlFor="contact-type">
          <select id="contact-type" name="project_type" className={selectClass}>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget range" htmlFor="contact-budget">
          <select id="contact-budget" name="budget" className={selectClass}>
            {budgets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Timeline" htmlFor="contact-timeline">
        <select id="contact-timeline" name="timeline" className={selectClass}>
          {timelines.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project details" htmlFor="contact-message" required>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What are you building? Who is it for? Links to your current site or inspiration?"
          className={cn(inputClass, "min-h-[130px] resize-y")}
        />
      </Field>

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        className="w-full"
        disabled={submitting}
      >
        <WhatsAppIcon />
        {submitting ? "Opening WhatsApp…" : "Continue on WhatsApp"}
      </Button>
      <p className="m-0 text-center text-sm leading-relaxed text-muted">
        No signup on this site — your message opens in WhatsApp ready to send.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-zinc-100">
        {label}
        {required ? (
          <span className="text-gold" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-white/[0.04] px-4 py-3.5 text-sm text-zinc-100 outline-none transition-all placeholder:text-white/30 focus:border-border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]";

const selectClass = cn(
  inputClass,
  "cursor-pointer appearance-none bg-[length:12px_8px] bg-[right_16px_center] bg-no-repeat pr-10",
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23c9a84c' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")]",
);

function WhatsAppIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
