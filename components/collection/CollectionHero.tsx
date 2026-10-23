"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { site } from "@/lib/site";
import { looks, products } from "@/lib/data";

const couture = [0.76, 0, 0.24, 1] as const;
const glide = [0.16, 1, 0.3, 1] as const;

const palette = [
  { name: "Noir", hex: "#160f17" },
  { name: "Wine", hex: "#5c1027" },
  { name: "Bordeaux", hex: "#7d1d38" },
  { name: "Rose", hex: "#c2707a" },
  { name: "Apricot", hex: "#e3a07c" },
  { name: "Champagne", hex: "#f1d6bc" },
];

export function CollectionHero() {
  return (
    <section className="bg-blush relative overflow-hidden pt-28 lg:pt-32" aria-labelledby="collection-title">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-28">
        <div className="flex flex-col lg:col-span-7">
          <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="label mb-12 flex items-center gap-3 text-[0.6rem] text-smoke">
            <Link href="/" className="hover:text-bordeaux">
              Maison
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-ink">
              Collection
            </span>
          </motion.nav>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: glide, delay: 0.4 }} className="label flex items-center gap-4 text-bordeaux">
            <span className="hairline-grad w-12" aria-hidden />
            {site.season}
          </motion.p>
          <h1 id="collection-title" className="mt-6 font-display leading-[0.86] tracking-[-0.03em]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="text-gradient-dark block text-[22vw] italic sm:text-[17vw] lg:text-[12vw]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: couture, delay: 0.5 }}
              >
                Nocturne
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[2.2rem] sm:text-5xl lg:text-6xl"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: couture, delay: 0.7 }}
              >
                The collection &amp; lookbook
              </motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: glide, delay: 1 }} className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-smoke">
            A palette that moves from the deepest wine to candlelit champagne — silk velvet, duchess satin, cashmere and
            Biella wool, cut and finished by hand in Paris. Choose a colour, add to your bag, or shop a whole look.
          </motion.p>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6">
            {[
              [String(products.length), "Pieces online"],
              [String(looks.length), "Looks"],
              ["Paris", "Made in our atelier"],
            ].map(([k, v]) => (
              <div key={v} className="flex flex-col">
                <dt className="label order-2 mt-1 text-[0.58rem] text-smoke">{v}</dt>
                <dd className="font-display text-3xl italic">{k}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.6, ease: couture, delay: 0.45 }}
            className="wash relative mx-auto aspect-[3/4] max-w-md bg-plum lg:max-w-none"
          >
            <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: glide, delay: 0.45 }}>
              <Img id="1771072428365-f0f97d0d25b7" alt="Model in a pinstripe suit seated against warm amber wood panelling" fill preload sizes="(min-width: 1024px) 38vw, 90vw" className="object-[50%_30%]" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: glide, delay: 1.4 }}
            className="absolute -bottom-6 left-0 w-[17rem] bg-ivory/95 p-5 shadow-[0_30px_60px_-30px_rgba(46,10,25,0.5)] backdrop-blur sm:-left-8"
          >
            <p className="label text-[0.58rem] text-smoke">The season&rsquo;s palette</p>
            <div className="bg-bloom mt-3 h-3 rounded-full" aria-hidden />
            <ul className="mt-3 grid grid-cols-6 gap-1.5">
              {palette.map((c) => (
                <li key={c.name} className="flex flex-col items-center gap-1.5">
                  <span className="size-6 rounded-full ring-1 ring-ink/10" style={{ background: c.hex }} aria-hidden />
                  <span className="text-[0.55rem] text-smoke">{c.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
