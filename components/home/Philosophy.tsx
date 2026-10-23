import { Aurora } from "@/components/ui/Aurora";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

const principles = [
  {
    n: "I",
    title: "Made in our atelier",
    body: "Forty-one cutters, tailors and finishers work under one roof on Rue Saint-Honoré. Nothing is outsourced, nothing rushed.",
  },
  {
    n: "II",
    title: "Cloth from family mills",
    body: "Wool from Biella, silk velvet from Lyon, satin from Como — mills we have bought from for more than two decades.",
  },
  {
    n: "III",
    title: "Repaired for life",
    body: "Every Maison Noir piece can return to the atelier for repairs, relining or alterations, free of charge, for as long as you own it.",
  },
];

export function Philosophy() {
  return (
    <section id="maison" className="relative isolate overflow-hidden bg-noir py-28 text-ivory lg:py-44" aria-labelledby="philosophy-title">
      <Aurora className="-z-10" />
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal variant="fade" className="mb-10 flex items-center justify-center gap-4">
          <span className="hairline-grad w-12" aria-hidden />
          <span className="label text-champagne">Our philosophy</span>
          <span className="hairline-grad w-12" aria-hidden />
        </Reveal>
        <WordReveal
          id="philosophy-title"
          stagger={0.04}
          segments={[
            { text: "Clothes should be quiet enough to let" },
            { text: "you", className: "text-gradient italic" },
            { text: "be the loudest thing in the room." },
          ]}
          className="mx-auto max-w-5xl text-center font-display text-[2.4rem] leading-[1.08] sm:text-6xl lg:text-[5rem]"
        />
        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="font-display text-lg italic text-ivory/70">— Céleste Marchand, founder & creative director</p>
        </Reveal>

        <Stagger className="mt-24 grid gap-px overflow-hidden rounded-[2px] bg-ivory/10 md:grid-cols-3" stagger={0.15}>
          {principles.map((p) => (
            <StaggerItem key={p.n} className="group relative bg-noir/70 p-8 backdrop-blur-xl transition-colors duration-700 hover:bg-noir/40 lg:p-12">
              <span className="text-gradient font-display text-6xl italic">{p.n}</span>
              <h3 className="mt-8 font-display text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ivory/70">{p.body}</p>
              <span className="bg-bloom absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-1000 ease-glide group-hover:w-full" aria-hidden />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
