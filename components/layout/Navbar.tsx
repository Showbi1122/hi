"use client";

import {
  getNavItems,
  isNavActive,
  type ActiveNav,
} from "@/data/navigation";
import { AUTHOR } from "@/lib/site";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LINK } from "@/lib/site";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavbarProps = {
  active?: ActiveNav;
};

const socials = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_LINK },
];

export function Navbar({ active }: NavbarProps) {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const navItems = useMemo(() => getNavItems(active), [active]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || sideOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, sideOpen]);

  return (
    <header
      className={cn("header-area header-main", sticky && "sticky")}
      id="header"
    >
      <div className="glint-container header-container">
        <div className="header-row">
          {/* Logo — Glint col-lg-3 */}
          <div className="header-logo">
            <Link href="/" className="logo">
              MTS<span>.</span>
            </Link>
          </div>

          {/* Center nav — Glint stellarnav */}
          <div className="header-menu">
            <nav
              className={cn("stellarnav light", open && "mobile active")}
              aria-label="Main navigation"
            >
              <ul className="navbarmneuclass">
                {navItems.map((item) => (
                  <li
                    key={item.href}
                    className={cn(isNavActive(item.href, active) && "current")}
                  >
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right tools — Glint search + grid */}
          <div className="header-tools">
            <button
              type="button"
              className="menu-toggle d-lg-none"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
            <div className="search-area d-none d-lg-flex">
              <div className="grid-menu" id="grid-side">
                <button
                  type="button"
                  aria-label="Open side panel"
                  onClick={() => setSideOpen(true)}
                >
                  <Image
                    src="/assets/ui/hamburger.svg"
                    alt=""
                    width={28}
                    height={28}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div className="mobile-nav-panel d-lg-none">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(isNavActive(item.href, active) && "active")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      ) : null}

      {/* Side widget — Glint slide panel */}
      <div
        className={cn("slide-widgest-wrap", sideOpen && "active")}
        id="slide-widgest"
        onClick={() => setSideOpen(false)}
      >
        <div
          className={cn("side-widgest", sideOpen && "active")}
          id="side-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="side-close"
            id="close-btn"
            aria-label="Close"
            onClick={() => setSideOpen(false)}
          >
            ✕
          </button>
          <div className="logo">
            <Link href="/" onClick={() => setSideOpen(false)}>
              MTS<span>.</span>
            </Link>
          </div>
          <div className="side-content">
            <p>
              I&apos;m {AUTHOR.name}, a full stack software &amp; web developer
              based in {AUTHOR.location}. Custom websites, POS systems, SaaS, and
              SEO-ready builds for clients worldwide.
            </p>
          </div>
          <div className="side-social">
            <ul>
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 28 }}>
            <Link
              href="/contact"
              className="cbtn cbnt1"
              onClick={() => setSideOpen(false)}
            >
              Hire Me <i className="cbtn-ico">→</i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
