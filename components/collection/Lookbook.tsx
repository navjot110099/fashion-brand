"use client";

import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { useBag } from "@/components/bag/BagContext";
import { euro, looks, productById } from "@/lib/data";
import { cn } from "@/lib/utils";

function Look({ look, index }: { look: (typeof looks)[number]; index: number }) {
  const { add } = useBag();
  const [done, setDone] = useState(false);
  const pieces = look.pieces.map((id) => productById(id)!).filter(Boolean);
  const total = pieces.reduce((a, p) => a + p.price, 0);
  const flip = index % 2 === 1;

  function shopLook() {
    pieces.forEach((p) => add(p.id, p.colors[0].name));
    setDone(true);
    window.setTimeout(() => setDone(false), 2000);
  }

  return (
    <article id={look.id} className={cn("grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-10", index > 0 && "mt-24 lg:mt-36")}>
      <Reveal variant={flip ? "right" : "left"} duration={1.3} className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
        <div className="group wash relative aspect-[4/5] bg-plum sm:aspect-[5/6]">
          <Img id={look.image.id} alt={look.image.alt} fill sizes="(min-width: 1024px) 56vw, 92vw" className="transition-transform duration-[2000ms] ease-glide group-hover:scale-[1.04]" />
          <span className="text-gradient absolute bottom-2 left-5 z-10 font-display text-[7rem] leading-none italic sm:text-[9rem]">{look.number}</span>
        </div>
      </Reveal>
      <Reveal delay={0.15} className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
        <p className="label text-[0.6rem] text-bordeaux">Look {look.number}</p>
        <h3 className="mt-3 font-display text-5xl leading-none italic sm:text-6xl">{look.title}</h3>
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {pieces.map((p) => (
            <li key={p.id}>
              <Link href={`#${p.id}`} className="group/piece flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-display text-xl transition-colors group-hover/piece:text-bordeaux">{p.name}</span>
                  <span className="text-xs text-smoke">
                    {p.colors[0].name} · {p.material}
                  </span>
                </span>
                <span className="text-sm whitespace-nowrap">{euro(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-smoke">
            The look · <span className="font-display text-lg text-ink">{euro(total)}</span>
          </p>
          <button
            type="button"
            onClick={shopLook}
            className={cn(
              "label inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.6rem] transition-all duration-500",
              done ? "bg-ink text-ivory" : "bg-bloom bg-[length:200%_100%] text-ivory hover:bg-right",
            )}
          >
            {done ? <Check className="size-3.5" aria-hidden /> : <ShoppingBag className="size-3.5" aria-hidden />}
            {done ? "Look added" : "Shop the look"}
          </button>
        </div>
      </Reveal>
    </article>
  );
}

export function Lookbook() {
  return (
    <section id="lookbook" className="bg-blush scroll-mt-16 py-24 lg:py-36" aria-labelledby="lookbook-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Title
          id="lookbook-title"
          align="center"
          size="xl"
          label="The lookbook"
          segments={[{ text: "Eight looks," }, { text: "one long night", className: "text-gradient-dark italic" }]}
          className="mb-20 max-w-4xl lg:mb-28"
        />
        {looks.map((l, i) => (
          <Look key={l.id} look={l} index={i} />
        ))}
      </div>
    </section>
  );
}
