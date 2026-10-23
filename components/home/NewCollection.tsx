import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { euro, productById } from "@/lib/data";
import { cn } from "@/lib/utils";

const tiles = [
  { id: "satin-gown", cls: "lg:col-span-5 lg:row-span-2", ratio: "aspect-[3/4] lg:aspect-auto lg:h-full", offset: 60 },
  { id: "fur-bomber", cls: "lg:col-span-3 lg:col-start-7", ratio: "aspect-[3/4]", offset: 40 },
  { id: "camel-trench", cls: "lg:col-span-3 lg:col-start-10 lg:mt-28", ratio: "aspect-[3/4]", offset: 30 },
];

export function NewCollection() {
  return (
    <section id="collection" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="new-title">
      <div className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
        <Title
          id="new-title"
          className="lg:col-span-7"
          label="New collection"
          segments={[{ text: "Nocturne," }, { text: "in twenty-eight pieces", className: "text-gradient-dark italic" }]}
        />
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <p className="text-[1.02rem] leading-relaxed text-smoke">
            Cut from silk velvet, duchess satin and Biella wool in a palette that moves from deep wine to candlelit
            champagne. Every piece is made in limited runs in our Paris atelier.
          </p>
          <GradientButton href="/collection" className="mt-8">
            Discover the collection
          </GradientButton>
        </Reveal>
      </div>

      <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-6">
        {tiles.map((t, i) => {
          const p = productById(t.id)!;
          return (
            <Reveal key={t.id} variant="up" delay={i * 0.12} duration={1.3} className={cn("group", t.cls)}>
              <Link href={`/collection#${p.id}`} className="flex h-full flex-col">
                <Parallax offset={t.offset} className={cn("wash flex-1 bg-ivory-2", t.ratio)}>
                  <Img
                    id={p.image.id}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="transition-transform duration-[1600ms] ease-glide group-hover:scale-[1.05]"
                    style={{ objectPosition: p.image.position }}
                  />
                </Parallax>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl italic sm:text-2xl">{p.name}</p>
                  <p className="text-sm text-smoke">{euro(p.price)}</p>
                </div>
                <p className="label mt-1 text-[0.6rem] text-smoke">{p.material}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
