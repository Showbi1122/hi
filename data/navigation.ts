export type NavItem = {
  label: string;
  href: string;
  isCta?: boolean;
};

/** Glint-style center nav — real pages only (no hash links) */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const innerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export type ActiveNav = "home" | "about" | "services" | "projects" | "blog" | "contact";

export function getNavItems(_active?: ActiveNav): NavItem[] {
  return mainNav;
}

export function isNavActive(href: string, active?: ActiveNav): boolean {
  if (!active) return false;
  if (href === "/about") return active === "about";
  if (href === "/services") return active === "services";
  if (href === "/projects") return active === "projects";
  if (href === "/blog") return active === "blog";
  if (href === "/") return active === "home";
  return false;
}
