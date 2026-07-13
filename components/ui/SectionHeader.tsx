import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  label,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        centered && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <span className="section-label">{label}</span>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
