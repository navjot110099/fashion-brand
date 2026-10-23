"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { campaign } from "@/lib/data";
import { cn } from "@/lib/utils";

const layout = [
  "col-span-2 row-span-2 lg:col-span-5 lg:row-span-3",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "col-span-2 lg:col-span-4 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-4 lg:row-span-1",
];

export function Campaign() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section id="campaign" ref={ref} className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="campaign-title">
      <motion.p
        aria-hidden
        style={{ x: reduce ? 0 : x1 }}
        className="text-gradient-dark pointer-events-none mb-16 font-display text-[18vw] leading-none whitespace-nowrap italic opacity-90 select-none lg:text-[13vw]"
      >
        Nocturne — AW26 — Nocturne
      </motion.p>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Title id="campaign-title" label="The campaign" segments={[{ text: "Paris," }, { text: "between midnight and dawn", className: "text-gradient-dark italic" }]} />
          <p className="label text-[0.62rem] text-smoke">Photographed by Léa Vasseur · September 2026</p>
        </div>
        <Stagger className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[170px] lg:grid-cols-12 lg:gap-5" stagger={0.08}>
          {campaign.map((c, i) => (
            <StaggerItem key={c.id} variant="scale" duration={1.2} className={cn("group relative", layout[i])}>
              <figure className="wash wash-tint absolute inset-0 bg-plum">
                <Img
                  id={c.id}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  className="transition-transform duration-[1600ms] ease-glide group-hover:scale-[1.06]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-end justify-between bg-gradient-to-t from-ink/80 to-transparent p-4 text-ivory transition-transform duration-700 ease-glide group-hover:translate-y-0 sm:p-5">
                  <span className="font-display text-xl italic sm:text-2xl">{c.caption}</span>
                  <span className="label text-[0.55rem] text-ivory/70">0{i + 1}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
