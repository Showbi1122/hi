import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";

export type BlogCardProps = {
  href: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime?: string;
  featuredImage: string;
  imageAlt: string;
};

export function BlogCard({
  href,
  title,
  description,
  category,
  readTime,
  featuredImage,
  imageAlt,
}: BlogCardProps) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-border-gold hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-[20px]">
          <Image
            src={featuredImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-premium group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e16] via-[#0e0e16]/50 to-[#050508]/20"
            aria-hidden
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-6 md:p-7">
          <span className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-wider text-gold">
            {category}
          </span>
          <h3 className="mb-3 line-clamp-3 font-display text-lg leading-snug text-zinc-100 transition-colors duration-300 group-hover:text-gold-light">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
          <span className="mt-auto text-sm font-semibold text-gold-light transition-colors duration-300 group-hover:text-gold">
            {readTime ? `${readTime} · Read article →` : "Read article →"}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
