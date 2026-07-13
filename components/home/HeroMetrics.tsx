"use client";

import { heroMetrics } from "@/lib/data/home";
import { useEffect, useState } from "react";

export function HeroMetrics() {
  const [counts, setCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = heroMetrics.filter((m) => "count" in m) as Array<{
      count: number;
    }>;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next: Record<number, number> = {};
      targets.forEach((metric) => {
        next[metric.count] = Math.round(metric.count * eased);
      });
      setCounts(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-5 border-t border-border pt-8 min-[1201px]:justify-start">
      {heroMetrics.map((metric, index) => (
        <div key={metric.label} className="flex items-center gap-5">
          <div className="text-center min-[1201px]:text-left">
            <strong className="block font-display text-[1.6rem] font-extrabold leading-tight text-gold-light">
              {"count" in metric
                ? `${counts[metric.count] ?? metric.count}+`
                : metric.value}
            </strong>
            <span className="text-[0.78rem] font-medium text-muted">
              {metric.label}
            </span>
          </div>
          {index < heroMetrics.length - 1 ? (
            <span
              aria-hidden
              className="hidden h-9 w-px bg-border min-[1201px]:block max-md:hidden"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
