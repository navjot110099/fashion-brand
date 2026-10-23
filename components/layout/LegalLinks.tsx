"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";

const docs = {
  "Delivery & returns": [
    "Complimentary express delivery on orders over €1,500, and standard delivery from €15 within the EU. Every order arrives in our recycled-card box, hand-tied.",
    "Returns are complimentary within 30 days of delivery for unworn pieces with tags attached. Made-to-measure tailoring is final sale.",
  ],
  Privacy: [
    "Maison Noir SAS processes personal data under the GDPR solely to fulfil orders, provide client services and, with consent, send our letter.",
    "Request access or deletion at any time: privacy@maisonnoir.fr.",
  ],
  Terms: [
    "Prices are shown in euros and include VAT. Product colours may vary slightly by screen. All pieces remain the property of Maison Noir until payment is received.",
  ],
} as const;

type Doc = keyof typeof docs;

export function LegalLinks() {
  const ref = useRef<HTMLDialogElement>(null);
  const [doc, setDoc] = useState<Doc>("Privacy");
  return (
    <>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {(Object.keys(docs) as Doc[]).map((d) => (
          <li key={d}>
            <button
              type="button"
              onClick={() => {
                setDoc(d);
                ref.current?.showModal();
              }}
              className="transition-colors hover:text-champagne"
            >
              {d}
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={ref}
        aria-labelledby="legal-title"
        className="m-auto w-[min(92vw,34rem)] bg-ivory p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="bg-bloom h-1" aria-hidden />
        <div className="p-8 sm:p-10">
          <div className="mb-6 flex items-start justify-between gap-6">
            <h2 id="legal-title" className="font-display text-3xl">
              {doc}
            </h2>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 transition hover:rotate-90 hover:bg-ink hover:text-ivory"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="space-y-4 leading-relaxed text-smoke">
            {docs[doc].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
