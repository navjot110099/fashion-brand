"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Img } from "@/components/ui/Img";
import { GradientButton } from "@/components/ui/GradientButton";
import { site } from "@/lib/site";

const couture = [0.76, 0, 0.24, 1] as const;
const glide = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const letters = site.collection.split("");

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[44rem] overflow-hidden bg-noir text-ivory" aria-labelledby="hero-title">
      {/* Campaign image: opens from the centre, then drifts with scroll */}
      <motion.div
        initial={{ clipPath: "inset(16% 24% 16% 24%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.8, ease: couture, delay: 0.15 }}
        className="absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: glide, delay: 0.15 }}
        >
          <motion.div className="wash absolute inset-0" style={{ scale: reduce ? 1 : imgScale }}>
            {/* Art-directed: landscape frame on desktop, portrait on phones */}
            <Img
              id="1770294759013-a5784266a817"
              alt="Model in a black velvet slip dress reclining on a deep red velvet armchair"
              fill
              preload
              sizes="(min-width: 768px) 100vw, 1px"
              className="hidden object-[60%_40%] md:block"
            />
            <Img
              id="1580478491436-fd6a937acc9e"
              alt="Model in a bordeaux blazer and leather gloves seated on a marble stair"
              fill
              preload
              sizes="(min-width: 768px) 1px, 100vw"
              className="object-[50%_30%] md:hidden"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-noir/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgb(227_160_124/0.25),transparent_55%)] mix-blend-screen" />
      </motion.div>

      <motion.div style={{ y: reduce ? 0 : contentY }} className="relative mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-28 pb-6 sm:px-8 lg:px-12 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: glide, delay: 0.9 }}
          className="flex items-start justify-between gap-6"
        >
          <p className="label text-ivory/85">
            {site.season}
            <span className="hidden sm:inline">
              <span className="mx-3 inline-block h-px w-8 bg-current align-middle opacity-60" aria-hidden />
              Collection 28
            </span>
          </p>
          <p className="label hidden text-ivory/70 sm:block">Atelier Paris</p>
        </motion.div>

        <div className="mt-auto grid items-end gap-8 lg:grid-cols-12">
          <div className="pb-2 lg:col-span-5 lg:col-start-8 lg:pb-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: glide, delay: 1.35 }}
              className="font-display text-3xl leading-tight italic sm:text-4xl"
            >
              {site.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: glide, delay: 1.5 }}
              className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ivory/80"
            >
              Silk velvet the colour of wine, satin that pours like candlelight, and tailoring cut close enough to
              remember you. Twenty-eight pieces for the hours after dark.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: glide, delay: 1.65 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <GradientButton href="/collection">Shop the collection</GradientButton>
              <GradientButton href="/collection#lookbook" variant="ghost-light">
                View the lookbook
              </GradientButton>
            </motion.div>
          </div>
        </div>

        <motion.h1
          id="hero-title"
          aria-label={`${site.collection} — ${site.season}`}
          style={{ x: reduce ? 0 : wordX }}
          className="pointer-events-none -mb-[0.12em] font-display text-[22vw] leading-[0.8] font-normal tracking-[-0.03em] whitespace-nowrap italic lg:text-[19vw]"
        >
          {letters.map((ch, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] pr-[0.04em] align-bottom">
              <motion.span
                className="text-gradient inline-block bg-[length:200%_100%] animate-sheen"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, ease: couture, delay: 0.7 + i * 0.06 }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.h1>
      </motion.div>
    </section>
  );
}
