import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "glass" | "whatsapp";
type ButtonSize = "default" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-gold to-[#b8943f] text-[#0a0a0a] shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5",
  glass:
    "border border-border bg-glass text-zinc-100 hover:border-border-hover hover:bg-white/[0.06]",
  whatsapp:
    "bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white shadow-[0_8px_32px_rgba(37,211,102,0.28)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,211,102,0.42)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-premium disabled:cursor-wait disabled:opacity-75",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
