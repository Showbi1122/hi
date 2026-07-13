"use client";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function GlassCard({
  children,
  className,
  contentClassName,
}: GlassCardProps) {
  return (
    <Reveal className={className}>
      <article className="glass-card group relative transition-all duration-300 ease-premium hover:border-border-hover">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at 50% 40%, rgba(201, 168, 76, 0.08), transparent 40%)",
          }}
        />
        <div
          className={cn(
            "content-card relative z-[1] p-8 md:px-9 md:py-8",
            contentClassName,
          )}
        >
          {children}
        </div>
      </article>
    </Reveal>
  );
}
