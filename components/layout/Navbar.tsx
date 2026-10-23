"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Aurora } from "@/components/ui/Aurora";
import { useBag } from "@/components/bag/BagContext";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useFocusTrap, useLockBody, useScrolled } from "@/lib/hooks";

const couture = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(60);
  const { count, open: openBag } = useBag();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useLockBody(open);
  useFocusTrap(ref, open, close);

  const overHero = pathname === "/" && !scrolled;
  const light = overHero || open;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: couture, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,color,box-shadow] duration-700",
          open ? "z-[80]" : "z-50",
          light ? "text-ivory" : "bg-ivory/85 text-ink shadow-[0_1px_0_rgba(14,10,13,0.08)] backdrop-blur-xl",
        )}
      >
        {overHero && <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/50 to-transparent" />}
        <nav aria-label="Primary" className={cn("mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 transition-[padding] duration-700 sm:px-8 lg:px-12", scrolled ? "py-3.5" : "py-6")}>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="fashion-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-ml-2 grid size-11 place-items-center lg:hidden"
            >
              <span className="relative block h-2.5 w-6">
                <span className={cn("absolute left-0 h-px w-6 bg-current transition-all duration-700 ease-couture", open ? "top-1 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-6 bg-current transition-all duration-700 ease-couture", open ? "top-1 -rotate-45" : "top-2.5")} />
              </span>
            </button>
            <ul className="hidden items-center gap-8 lg:flex">
              {site.nav.map((l) => {
                const active = !l.href.includes("#") && pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={active ? "page" : undefined} className="group relative label text-[0.66rem]">
                      {l.label}
                      <span aria-hidden className={cn("hairline-grad absolute -bottom-1.5 left-0 transition-all duration-700 ease-glide", active ? "w-full" : "w-0 group-hover:w-full")} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Logo onClick={close} />
          <div className="flex items-center justify-end gap-6">
            <Link href="/#appointments" className="label hidden text-[0.66rem] xl:inline">
              Book an appointment
            </Link>
            <button type="button" onClick={openBag} className="group relative flex items-center gap-2.5" aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}>
              <span className="label hidden text-[0.66rem] sm:inline">Bag</span>
              <ShoppingBag className="size-5 sm:hidden" aria-hidden />
              <span className="bg-bloom grid size-6 place-items-center rounded-full text-[0.65rem] font-semibold text-ivory tabular-nums transition-transform duration-500 group-hover:scale-110">
                {count}
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="fashion-menu"
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: couture }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-noir px-6 pt-28 pb-10 text-ivory lg:hidden"
          >
            <Aurora />
            <ul className="relative space-y-1">
              {[{ label: "Home", href: "/" }, ...site.nav].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: couture, delay: 0.25 + i * 0.07 }}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className={cn(
                        "block py-1 font-display text-[3rem] leading-[1.1] italic transition-opacity hover:opacity-70",
                        l.href === pathname && "text-gradient",
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="relative mt-auto space-y-6 pt-12">
              <div className="hairline-grad" />
              <Link href="/#appointments" onClick={close} className="label block">
                Book a private appointment
              </Link>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/70">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-ivory">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
