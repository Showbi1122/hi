import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  id?: string;
};

export function Container({
  children,
  className,
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn("mx-auto w-full max-w-content px-5 md:px-8 lg:px-12", className)}
    >
      {children}
    </Component>
  );
}
