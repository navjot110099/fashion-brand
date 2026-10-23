import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Maison Noir — home" className={cn("group flex flex-col items-center leading-none", className)}>
      <span className="font-display text-[1.12rem] font-medium tracking-[0.26em] pl-[0.26em] min-[400px]:text-[1.25rem] sm:text-[1.5rem] sm:tracking-[0.42em] sm:pl-[0.42em]">MAISON NOIR</span>
      <span className="label mt-1.5 text-[0.5rem] tracking-[0.5em] pl-[0.5em] opacity-70">Paris</span>
    </Link>
  );
}
