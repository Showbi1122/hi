import type { FaqItem } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

type FaqListProps = {
  items: FaqItem[];
  linkify?: boolean;
};

export function FaqList({ items, linkify = false }: FaqListProps) {
  return (
    <div className="glint-faq">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={index * 0.04}>
          <details className="faq-item group">
            <summary>
              <span>{item.question}</span>
              <span className="faq-plus" aria-hidden>
                +
              </span>
            </summary>
            <div className="faq-body">
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
        <Link
          href="/services/custom-website-development"
          className="text-[#08d665] hover:underline"
        >
          Custom websites
        </Link>
        {text.replace(/^Custom websites,?\s*/i, ", ")}
      </>
    );
  }
  return <>{text}</>;
}
