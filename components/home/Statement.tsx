import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/Counter";

const stats = [
  { to: 28, label: "Years on Rue Saint-Honoré" },
  { to: 41, label: "Artisans in the atelier" },
  { to: 100, suffix: "%", label: "Made in France & Italy" },
];

export function Statement() {
  return (
    <section className="bg-blush relative overflow-hidden py-28 lg:py-40" aria-label="The house">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-8">
          <Reveal variant="fade" className="mb-10 flex items-center gap-4">
            <span className="hairline-grad w-12" aria-hidden />
            <span className="label text-bordeaux">Maison Noir · Paris, since 1998</span>
          </Reveal>
          <WordReveal
            as="p"
            stagger={0.03}
            segments={[
              { text: "We dress the hours" },
              { text: "after dark", className: "text-gradient-dark italic" },
              { text: "— in velvet that drinks the light, satin that pours, and tailoring cut close enough to" },
              { text: "remember you.", className: "text-gradient-dark italic" },
            ]}
            className="font-display text-[2rem] leading-[1.18] sm:text-5xl lg:text-[3.6rem]"
          />
          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="flex flex-col">
                <dt className="label order-2 mt-2 text-[0.6rem] text-smoke">{s.label}</dt>
                <dd className="text-gradient-dark font-display text-5xl italic sm:text-6xl">
                  <Counter to={s.to} suffix={s.suffix ?? ""} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Reveal variant="fade" duration={1.6} className="lg:col-span-3 lg:col-start-10 lg:pt-24">
          <Parallax offset={50} className="wash aspect-[3/4] bg-ivory-2">
            <Img id="1760551733370-78b60b3bb962" alt="Model with copper curls in a soft faux-fur coat over a bordeaux knit" fill sizes="(min-width: 1024px) 24vw, 90vw" className="object-[50%_25%]" />
          </Parallax>
          <p className="mt-4 flex justify-between text-sm">
            <span className="font-display italic">Rouge — from the campaign</span>
            <span className="text-smoke">Nocturne AW26</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
