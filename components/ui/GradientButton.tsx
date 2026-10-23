import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { href: string; children: ReactNode; className?: string; variant?: "bloom" | "ghost-light" | "ghost-dark" };

/** Pill CTA: the bloom gradient glides across on hover and the arrow lifts out. */
export function GradientButton({ href, children, className, variant = "bloom" }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pr-2 pl-7 label transition-[background-position,color,box-shadow] duration-700 ease-glide",
        variant === "bloom" && "bg-bloom bg-[length:220%_100%] bg-left text-ivory shadow-[0_18px_40px_-18px_rgba(125,29,56,0.7)] hover:bg-right",
        variant === "ghost-light" && "text-ivory ring-1 ring-ivory/50 ring-inset hover:bg-ivory hover:text-ink",
        variant === "ghost-dark" && "text-ink ring-1 ring-ink/30 ring-inset hover:bg-ink hover:text-ivory",
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full transition-transform duration-700 ease-glide group-hover:rotate-45",
          variant === "bloom" ? "bg-ivory/15" : "bg-current/10",
        )}
      >
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}
