import { cn } from "@/lib/utils";

/**
 * Slow-drifting gradient light: four blurred colour fields (wine, rose, apricot, plum)
 * that move on long CSS loops. Pure transforms, so it stays cheap; static under reduced motion.
 */
export function Aurora({ className, intensity = "full" }: { className?: string; intensity?: "full" | "soft" }) {
  const o = intensity === "full" ? "" : "opacity-60";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute -top-1/4 -left-1/4 h-[70%] w-[70%] animate-drift-a rounded-full bg-[#7d1d38] blur-[110px]", o)} />
      <div className={cn("absolute top-1/4 -right-1/4 h-[65%] w-[60%] animate-drift-b rounded-full bg-[#c2566a]/80 blur-[120px]", o)} />
      <div className={cn("absolute -bottom-1/3 left-1/4 h-[60%] w-[55%] animate-drift-c rounded-full bg-[#e39a78]/70 blur-[120px]", o)} />
      <div className={cn("absolute bottom-0 -left-1/4 h-[50%] w-[45%] animate-drift-b rounded-full bg-[#4a1f4f] blur-[100px]", o)} />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
