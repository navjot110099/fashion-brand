"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/motion/Reveal";
import { journal } from "@/lib/data";
import { useFocusTrap, useLockBody } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const bodies: Record<string, string[]> = {
  "Seventy-two hours, one coat": [
    "The Nocturne coat begins as a paper pattern drafted by Inès Morel, our head tailor of nineteen years. Each size is graded by hand; each panel is cut with shears, never a blade machine, so the double-faced wool can be split and folded without a single visible seam.",
    "Over three days, two tailors hand-fell the edges, set the dropped shoulder and anchor the silk satin lining with 1,400 invisible stitches. The final press takes forty minutes. Then it rests overnight — the wool, Inès says, needs to remember its new shape.",
  ],
  "Notes on velvet": [
    "Silk velvet is woven as a double cloth, face to face, then sliced apart while still on the loom. The result is a pile so fine it shifts colour with every movement — from near-black to the red of old Bordeaux.",
    "We work with a third-generation mill outside Lyon that weaves our velvet in runs of just two hundred metres. When it is gone, it is gone; the next season's dye lot will be subtly, beautifully different.",
  ],
  "Nocturne, in twelve frames": [
    "Léa Vasseur shot the campaign across five nights in September, beginning each session at midnight and stopping only when the light turned blue. No studio lights — only street lamps, candles and the glow of the city.",
    "'I wanted the clothes to feel like they belonged to the night rather than visiting it,' she says. 'Velvet photographs best when it is almost too dark to see.'",
  ],
};

export function Journal() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(null), []);
  useLockBody(open !== null);
  useFocusTrap(ref, open !== null, close);
  const article = open !== null ? journal[open] : null;

  return (
    <section id="journal" className="bg-blush py-28 lg:py-40" aria-labelledby="journal-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Title id="journal-title" label="The journal" segments={[{ text: "Stories from" }, { text: "the atelier", className: "text-gradient-dark italic" }]} className="mb-16" />
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {journal.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.12} className={cn(i === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-5 lg:col-start-8")}>
              <article className="group">
                <button type="button" onClick={() => setOpen(i)} className="block w-full text-left" aria-label={`Read: ${j.title}`}>
                  <div className={cn("wash relative overflow-hidden bg-ivory-2", i === 0 ? "aspect-[4/5]" : "aspect-[16/9]")}>
                    <Img id={j.image.id} alt={j.image.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="transition-transform duration-[1600ms] ease-glide group-hover:scale-[1.05]" />
                  </div>
                  <p className="label mt-6 flex items-center gap-3 text-[0.6rem] text-smoke">
                    <span className="text-bordeaux">{j.category}</span> · {j.read}
                  </p>
                  <h3 className={cn("mt-3 font-display leading-tight transition-colors duration-500 group-hover:text-bordeaux", i === 0 ? "text-4xl sm:text-5xl" : "text-3xl")}>{j.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-smoke">{j.excerpt}</p>
                  <span className="label mt-5 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.62rem] transition-colors group-hover:border-bordeaux group-hover:text-bordeaux">
                    Read the story <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {article && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto bg-ivory"
            >
              <div className="wash relative aspect-[16/8] bg-ivory-2">
                <Img id={article.image.id} alt={article.image.alt} fill sizes="672px" />
              </div>
              <button type="button" onClick={close} className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-ivory/90 transition hover:rotate-90" aria-label="Close story">
                <X className="size-4" />
              </button>
              <div className="p-7 sm:p-10">
                <p className="label text-[0.6rem] text-bordeaux">
                  {article.category} · {article.read}
                </p>
                <h2 id="article-title" className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  {article.title}
                </h2>
                <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-smoke">
                  <p className="font-display text-xl text-ink italic">{article.excerpt}</p>
                  {bodies[article.title]?.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
