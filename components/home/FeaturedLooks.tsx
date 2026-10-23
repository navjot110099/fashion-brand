"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { euro, looks, productById } from "@/lib/data";
import { useMediaQuery } from "@/lib/hooks";

const featured = looks.slice(0, 6);

function LookCard({ look, index }: { look: (typeof looks)[number]; index: number }) {
  const pieces = look.pieces.map((id) => productById(id)!).filter(Boolean);
  const from = Math.min(...pieces.map((p) => p.price));
  return (
    <Link href={`/collection#${look.id}`} className="group block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
      <div className="wash relative aspect-[3/4] bg-plum">
        <Img id={look.image.id} alt={look.image.alt} fill sizes="(min-width: 1024px) 30vw, 78vw" className="transition-transform duration-[1600ms] ease-glide group-hover:scale-[1.06]" />
        <span className="text-gradient absolute top-4 left-5 z-10 font-display text-6xl italic">{look.number}</span>
        <span className="absolute right-4 bottom-4 z-10 grid size-11 translate-y-3 place-items-center rounded-full bg-ivory text-ink opacity-0 transition-all duration-700 ease-glide group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 text-ivory">
        <p className="font-display text-2xl italic">{look.title}</p>
        <p className="label text-[0.6rem] text-ivory/60">Look {String(index + 1).padStart(2, "0")}</p>
      </div>
      <p className="mt-1 text-sm text-ivory/65">
        {pieces.map((p) => p.name).join(" · ")} — from {euro(from)}
      </p>
    </Link>
  );
}

/**
 * On desktop the looks travel sideways as you scroll down (a pinned editorial
 * spread). On touch screens and with reduced motion it is a native swipe row.
 */
export function FeaturedLooks() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const pinned = desktop && !reduce;
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={outer}
      className="relative bg-noir"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-labelledby="looks-title"
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgb(125_29_56/0.45),transparent_60%),radial-gradient(ellipse_at_85%_80%,rgb(227_160_124/0.18),transparent_55%)]" aria-hidden />
        <div className="relative mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between gap-8 px-5 sm:px-8 lg:mb-14 lg:px-12">
          <Title
            id="looks-title"
            tone="light"
            label="Featured looks"
            segments={[{ text: "After" }, { text: "midnight", className: "text-gradient italic" }]}
          />
          <Link href="/collection#lookbook" className="label hidden border-b border-ivory/40 pb-1 text-ivory transition-colors hover:border-ivory sm:block">
            Full lookbook
          </Link>
        </div>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "relative flex w-max gap-6 px-12"
              : "relative flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
          }
        >
          {featured.map((l, i) => (
            <LookCard key={l.id} look={l} index={i} />
          ))}
          <Link
            href="/collection#lookbook"
            className="group grid w-[60vw] shrink-0 snap-start place-items-center border border-ivory/15 p-8 text-center text-ivory sm:w-[36vw] lg:w-[22vw]"
          >
            <span>
              <span className="font-display text-4xl italic">
                Eight looks,
                <br />
                <span className="text-gradient">one night.</span>
              </span>
              <span className="label mt-6 flex items-center justify-center gap-2 text-ivory/70 group-hover:text-ivory">
                See the lookbook <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </span>
          </Link>
        </motion.div>
        {pinned && (
          <div className="relative mx-auto mt-10 h-px w-full max-w-[1600px] px-12">
            <div className="h-px bg-ivory/15">
              <motion.div className="bg-bloom h-px" style={{ width: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
