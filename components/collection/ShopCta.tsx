import { Aurora } from "@/components/ui/Aurora";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

export function ShopCta() {
  return (
    <section className="relative isolate overflow-hidden bg-noir py-28 text-center text-ivory lg:py-40" aria-labelledby="shop-cta-title">
      <Aurora className="-z-10" />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal variant="fade">
          <p className="label text-champagne">Complimentary delivery · 30-day returns · Lifetime repairs</p>
        </Reveal>
        <WordReveal
          id="shop-cta-title"
          segments={[{ text: "Find the piece you'll wear" }, { text: "for the next twenty years.", className: "text-gradient italic" }]}
          className="mt-8 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-4">
          <GradientButton href="#shop">Shop the collection</GradientButton>
          <GradientButton href="/#appointments" variant="ghost-light">
            Book an appointment
          </GradientButton>
        </Reveal>
      </div>
    </section>
  );
}
