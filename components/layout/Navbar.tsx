"use client";

import {
  getNavItems,
  isNavActive,
  type ActiveNav,
} from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavbarProps = {
  active?: ActiveNav;
};

export function Navbar({ active }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navItems = useMemo(() => getNavItems(active), [active]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 40);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] flex h-nav items-center justify-between gap-4 px-5 transition-all duration-300 ease-premium md:px-8 lg:px-12",
        scrolled
          ? "border-b border-border bg-bg/92 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-bg/60 backdrop-blur-xl",
      )}
    >
      <Link
        href="/"
        className="font-display text-[1.1rem] font-extrabold tracking-tight text-zinc-100"
      >
        <span className="gradient-text">MTS</span> · Developer
      </Link>

      <button
        type="button"
        className="rounded-[10px] border border-border bg-glass px-3 py-2.5 text-xl text-zinc-100 lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "✕" : "☰"}
      </button>

      <nav
        aria-label="Main navigation"
        className={cn(
          "lg:block",
          open
            ? "fixed inset-x-0 top-nav z-[999] block border-b border-border bg-bg/[0.98] px-5 py-5 backdrop-blur-xl"
            : "hidden",
        )}
      >
        <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-all duration-300 ease-premium lg:inline-flex lg:w-auto lg:py-2.5",
                  item.isCta
                    ? "mt-2 bg-gradient-to-br from-gold to-[#b8943f] font-bold text-[#0a0a0a] shadow-gold lg:ml-1.5 lg:mt-0"
                    : isNavActive(item.href, active)
                      ? "bg-glass text-zinc-100"
                      : "text-muted hover:bg-glass hover:text-zinc-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
