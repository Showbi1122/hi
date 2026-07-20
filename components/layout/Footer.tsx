import { TrackedLink } from "@/components/analytics/TrackedLink";
import { footerColumns } from "@/data/footer";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-area footer-area1 section-padding">
      <div className="glint-container">
        <div className="mb-16 hidden grid-cols-2 gap-10 md:grid lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#08d665]">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <TrackedLink
                        href={link.href}
                        location="footer"
                        className="text-sm text-[#999] transition-colors hover:text-white"
                      >
                        {link.label}
                      </TrackedLink>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#999] transition-colors hover:text-white"
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

        <div className="text-center">
          <div className="copyright">
            <p>
              Copyright © 2026 by{" "}
              <Link href="/">
                <span>Malik Taleeb Shahbaz</span>
              </Link>{" "}
              all right reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
