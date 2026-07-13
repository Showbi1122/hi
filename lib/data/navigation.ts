export type NavItem = {
  label: string;
  href: string;
  isCta?: boolean;
  isHash?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why Me", href: "/#why-me", isHash: true },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Hire Me", href: "/contact", isCta: true },
];

export const innerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Hire Me", href: "/contact", isCta: true },
];

export type ActiveNav = "home" | "about" | "services" | "projects" | "blog" | "contact";

export function getNavItems(active?: ActiveNav): NavItem[] {
  return active === "home" ? mainNav : innerNav;
}

export function isNavActive(href: string, active?: ActiveNav): boolean {
  if (!active) return false;
  if (href === "/contact") return active === "contact";
  if (href === "/about") return active === "about";
  if (href === "/services") return active === "services";
  if (href === "/projects") return active === "projects";
  if (href === "/blog") return active === "blog";
  if (href === "/") return active === "home";
  return false;
}
