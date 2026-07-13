import { footerColumns } from "@/lib/data/footer";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border bg-bg-secondary py-14">
      <h2 className="sr-only">Site links and resources</h2>
      <div className="mx-auto mb-9 grid max-w-content grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-gold">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="px-5 text-center text-sm text-muted lg:px-12">
        © 2026{" "}
        <Link href="/" className="text-gold-light hover:text-gold">
          Malik Taleeb Shahbaz
        </Link>{" "}
        · Web Developer, Full Stack Software Engineer &amp; SaaS Developer. All
        rights reserved.
      </p>
    </footer>
  );
}
