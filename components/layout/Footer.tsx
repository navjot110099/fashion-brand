import Link from "next/link";
import { Aurora } from "@/components/ui/Aurora";
import { LegalLinks } from "./LegalLinks";
import { categories } from "@/lib/data";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-noir text-ivory">
      <Aurora intensity="soft" className="-z-10 opacity-70" />
      <div className="mx-auto max-w-[1600px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-display text-4xl leading-tight sm:text-5xl">
              The night, <em className="text-gradient">tailored.</em>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              Designed and made in our atelier on Rue Saint-Honoré since 1998. Every piece is cut, sewn and finished by hand.
            </p>
          </div>
          <nav aria-label="Footer — shop" className="lg:col-span-2 lg:col-start-6">
            <p className="label mb-5 text-champagne">Shop</p>
            <ul className="space-y-2.5 text-sm text-ivory/75">
              {categories.map((c) => (
                <li key={c}>
                  <Link href={c === "All" ? "/collection" : `/collection?category=${encodeURIComponent(c)}`} className="transition-colors hover:text-ivory">
                    {c === "All" ? "The collection" : c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer — maison" className="lg:col-span-2">
            <p className="label mb-5 text-champagne">Maison</p>
            <ul className="space-y-2.5 text-sm text-ivory/75">
              {[
                ["Home", "/"],
                ["Lookbook", "/collection#lookbook"],
                ["Philosophy", "/#maison"],
                ["Campaign", "/#campaign"],
                ["Journal", "/#journal"],
                ["Appointments", "/#appointments"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="transition-colors hover:text-ivory">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3 lg:col-start-10">
            <p className="label mb-5 text-champagne">Flagship</p>
            <address className="space-y-1 text-sm text-ivory/75 not-italic">
              {site.address.map((a) => (
                <p key={a}>{a}</p>
              ))}
              <p className="pt-2">Tuesday – Saturday, 11:00 – 19:00</p>
            </address>
            <div className="mt-5 space-y-1 text-sm">
              <a href={site.phoneHref} className="block text-ivory/75 transition-colors hover:text-ivory">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-ivory/75 transition-colors hover:text-ivory">
                {site.email}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-ivory/75 underline-offset-4 transition-colors hover:text-ivory hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p aria-hidden className="text-gradient mt-20 pb-6 text-center font-display text-[15.5vw] leading-[0.9] tracking-[-0.02em] whitespace-nowrap select-none lg:text-[14.5vw]">
          Maison Noir
        </p>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-xs text-ivory/55 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {year} Maison Noir SAS · Paris · All prices include VAT.</p>
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
}
