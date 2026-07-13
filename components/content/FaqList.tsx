import type { FaqItem } from "@/lib/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

type FaqListProps = {
  items: FaqItem[];
  linkify?: boolean;
};

export function FaqList({ items, linkify = false }: FaqListProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={index * 0.04}>
          <details className="group rounded-[14px] border border-border bg-surface px-5 py-1 open:border-border-gold">
            <summary className="cursor-pointer list-none py-4 font-semibold text-zinc-100 marker:content-none">
              {item.question}
            </summary>
            <div className="pb-4 text-sm leading-relaxed text-muted">
              {linkify ? <FaqAnswer text={item.answer} /> : item.answer}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

function FaqAnswer({ text }: { text: string }) {
  if (text.includes("custom websites")) {
    return (
      <>
        <Link href="/services" className="text-gold-light hover:underline">
          Custom websites
        </Link>
        {text.replace(/^Custom websites,?\s*/i, ", ")}
      </>
    );
  }
  return <>{text}</>;
}
