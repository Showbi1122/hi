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
    <Reveal className="h-full">
      <article className="single-blog">
        <div className="single-blog-img">
          <Image
            src={featuredImage}
            alt={imageAlt}
            width={640}
            height={400}
            className="object-cover"
            loading="lazy"
          />
          <span className="blog-banner">{category}</span>
        </div>
        <div className="blog-description">
          <p>{readTime ? readTime : "Article"}</p>
          <Link href={href} className="blog-title">
            {title}
          </Link>
          <p className="mb-4 line-clamp-2 !normal-case !text-[#666]">{description}</p>
          <Link href={href} className="readmore-btn">
            <span className="arrow">→</span> read more
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
