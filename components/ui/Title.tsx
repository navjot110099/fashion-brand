import { Reveal } from "@/components/motion/Reveal";
import { WordReveal, type Segment } from "@/components/motion/WordReveal";
import { cn } from "@/lib/utils";

/** Editorial section title: small label on a gradient hairline, then a masked Bodoni headline. */
export function Title({
  label,
  segments,
  id,
  tone = "dark",
  align = "left",
  className,
  size = "lg",
}: {
  label: string;
  segments: Segment[];
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  size?: "lg" | "xl";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <Reveal variant="fade" className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
        <span className="hairline-grad w-12" aria-hidden />
        <span className={cn("label", tone === "dark" ? "text-bordeaux" : "text-champagne")}>{label}</span>
        {align === "center" && <span className="hairline-grad w-12" aria-hidden />}
      </Reveal>
      <WordReveal
        id={id}
        segments={segments}
        className={cn(
          "font-display leading-[0.98] font-normal tracking-[-0.015em]",
          size === "lg" ? "text-[2.6rem] sm:text-6xl lg:text-[4.4rem]" : "text-[3rem] sm:text-7xl lg:text-[6rem]",
          tone === "dark" ? "text-ink" : "text-ivory",
        )}
      />
    </div>
  );
}
