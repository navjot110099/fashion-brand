"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { useBag } from "./BagContext";
import { euro, productById } from "@/lib/data";
import { useFocusTrap, useLockBody } from "@/lib/hooks";

const FREE_DELIVERY = 1500;

export function BagDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, count } = useBag();
  const ref = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(false);
  useLockBody(isOpen);
  useFocusTrap(ref, isOpen, close);
  const progress = Math.min(subtotal / FREE_DELIVERY, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            key="drawer"
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-ivory"
          >
            <div className="bg-bloom h-1" aria-hidden />
            <header className="flex items-center justify-between px-6 py-5 sm:px-8">
              <h2 id="bag-title" className="font-display text-3xl">
                Your bag <span className="text-gradient-dark text-xl italic">({count})</span>
              </h2>
              <button type="button" onClick={close} className="grid size-10 place-items-center rounded-full border border-ink/15 transition hover:rotate-90 hover:bg-ink hover:text-ivory" aria-label="Close bag">
                <X className="size-4" />
              </button>
            </header>

            {items.length > 0 && (
              <div className="px-6 pb-5 sm:px-8">
                <p className="text-xs text-smoke">
                  {progress >= 1 ? "You've unlocked complimentary express delivery." : `${euro(FREE_DELIVERY - subtotal)} away from complimentary express delivery.`}
                </p>
                <div className="mt-2 h-0.5 bg-ink/10">
                  <motion.div className="bg-bloom h-full" initial={false} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto border-t border-ink/10 px-6 sm:px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <p className="font-display text-3xl italic">Nothing here yet.</p>
                  <p className="mt-3 max-w-xs text-sm text-smoke">Discover Nocturne — velvet, satin and tailoring for the hours after dark.</p>
                  <Link href="/collection" onClick={close} className="label mt-8 border-b border-ink pb-1">
                    Shop the collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const p = productById(item.id);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={item.key}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45 }}
                          className="flex gap-4 py-5"
                        >
                          <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-ivory-2">
                            <Img id={p.image.id} alt="" fill sizes="80px" style={{ objectPosition: p.image.position }} />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex justify-between gap-3">
                              <p className="font-display text-lg leading-tight">{p.name}</p>
                              <p className="text-sm whitespace-nowrap">{euro(p.price * item.qty)}</p>
                            </div>
                            <p className="mt-1 text-xs text-smoke">Colour: {item.color}</p>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1" role="group" aria-label={`Quantity for ${p.name}`}>
                                <button type="button" onClick={() => setQty(item.key, item.qty - 1)} disabled={item.qty <= 1} className="grid size-6 place-items-center disabled:opacity-30" aria-label="Decrease quantity">
                                  <Minus className="size-3" />
                                </button>
                                <span className="w-4 text-center text-sm tabular-nums">{item.qty}</span>
                                <button type="button" onClick={() => setQty(item.key, item.qty + 1)} disabled={item.qty >= 9} className="grid size-6 place-items-center disabled:opacity-30" aria-label="Increase quantity">
                                  <Plus className="size-3" />
                                </button>
                              </div>
                              <button type="button" onClick={() => remove(item.key)} className="text-xs text-smoke underline underline-offset-4 hover:text-bordeaux">
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-ink/10 px-6 py-6 sm:px-8">
                <p className="flex items-baseline justify-between">
                  <span className="label text-smoke">Subtotal</span>
                  <span className="font-display text-3xl">{euro(subtotal)}</span>
                </p>
                <p className="mt-1 text-xs text-smoke">Duties and taxes included. Complimentary returns within 30 days.</p>
                <button
                  type="button"
                  onClick={() => setNote(true)}
                  className="bg-bloom label mt-5 w-full bg-[length:200%_100%] py-4 text-ivory transition-[background-position] duration-700 hover:bg-right"
                >
                  Proceed to checkout
                </button>
                <AnimatePresence>
                  {note && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-center text-xs text-smoke" role="status">
                      This is a demonstration store — checkout and payments are not connected.
                    </motion.p>
                  )}
                </AnimatePresence>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
