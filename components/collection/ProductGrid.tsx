"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Title } from "@/components/ui/Title";
import { useBag } from "@/components/bag/BagContext";
import { categories, euro, products, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

type Category = (typeof categories)[number];
type Sort = "featured" | "price-asc" | "price-desc";

function ProductCard({ product }: { product: Product }) {
  const { add } = useBag();
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  function onAdd() {
    add(product.id, color.name);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article id={product.id} className="group scroll-mt-40">
      <div className={cn("wash relative overflow-hidden bg-ivory-2", product.tall ? "aspect-[3/4] lg:aspect-[3/4.6]" : "aspect-[3/4]")}>
        <Img
          id={product.image.id}
          alt={`${product.image.alt} — shown in ${color.name}`}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 46vw, 92vw"
          className="transition-transform duration-[1600ms] ease-glide group-hover:scale-[1.05]"
          style={{ objectPosition: product.image.position }}
        />
        {/* Colour preview: tints the photograph toward the chosen shade */}
        <AnimatePresence>
          {color.tint && (
            <motion.span
              key={color.name}
              aria-hidden
              className="absolute inset-0 z-[2] mix-blend-color"
              style={{ background: color.tint }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
        <span className="label absolute top-4 left-4 z-10 rounded-full bg-ivory/90 px-3 py-1.5 text-[0.55rem] text-ink">{product.category}</span>
        <button
          type="button"
          onClick={onAdd}
          className={cn(
            "label absolute inset-x-4 bottom-4 z-10 flex items-center justify-center gap-2 rounded-full py-3.5 text-[0.62rem] transition-all duration-500 ease-glide lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100",
            added ? "bg-ink text-ivory" : "bg-bloom bg-[length:200%_100%] text-ivory hover:bg-right",
          )}
          aria-label={`Add ${product.name} in ${color.name} to bag`}
        >
          {added ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
          {added ? "Added to bag" : "Add to bag"}
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[1.45rem] leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-smoke">{product.material}</p>
        </div>
        <p className="shrink-0 font-display text-xl">{euro(product.price)}</p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div role="group" aria-label={`${product.name} colours`} className="flex gap-2">
          {product.colors.map((c) => {
            const on = c.name === color.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                aria-label={`Show in ${c.name}`}
                onClick={() => setColor(c)}
                className={cn(
                  "size-6 rounded-full ring-offset-2 ring-offset-ivory transition-all duration-300",
                  on ? "ring-1 ring-ink" : "ring-1 ring-ink/15 hover:ring-ink/50",
                )}
                style={{ background: c.hex }}
              />
            );
          })}
        </div>
        <span className="text-xs text-smoke" aria-live="polite">
          {color.name}
        </span>
      </div>
    </article>
  );
}

export function ProductGrid() {
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<Sort>("featured");

  // Footer links such as /collection?category=Outerwear preselect a filter.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    const match = categories.find((x) => x === c);
    if (!match) return;
    const t = window.setTimeout(() => setCategory(match), 0);
    return () => window.clearTimeout(t);
  }, []);

  let list = category === "All" ? products : products.filter((p) => p.category === category);
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <section id="shop" className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-32" aria-labelledby="shop-title">
      <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Title id="shop-title" label="The pieces" segments={[{ text: "Shop" }, { text: "Nocturne", className: "text-gradient-dark italic" }]} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <LayoutGroup id="cats">
            <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => {
                const on = category === c;
                const n = c === "All" ? products.length : products.filter((p) => p.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCategory(c)}
                    className={cn("relative isolate shrink-0 rounded-full px-4 py-2 text-sm transition-colors", on ? "text-ivory" : "text-ink/70 hover:text-ink")}
                  >
                    {on && <motion.span layoutId="cat-pill" className="bg-bloom absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    {c} <span className={on ? "text-ivory/70" : "text-smoke"}>{n}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <label className="relative flex w-fit items-center gap-2 self-start text-sm sm:self-auto">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer appearance-none rounded-full bg-transparent py-2 pr-9 pl-4 ring-1 ring-ink/20 transition hover:ring-ink/50 focus:ring-bordeaux focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 size-4" aria-hidden />
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} pieces
      </p>
      <motion.div layout className="grid gap-x-6 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 5) * 0.04 }}
              className={cn(i % 3 === 1 && "xl:mt-20")}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
