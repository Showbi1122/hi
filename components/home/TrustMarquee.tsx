import { marqueeItems } from "@/lib/data/home";

export function TrustMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div aria-hidden className="relative z-[1] overflow-hidden border-y border-border bg-bg-secondary py-4">
      <div className="flex w-max animate-marquee gap-8">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`whitespace-nowrap text-sm font-semibold ${index % 2 === 1 ? "text-gold/50" : "text-muted"}`}
          >
            {index % 2 === 1 ? "·" : item}
          </span>
        ))}
      </div>
    </div>
  );
}
