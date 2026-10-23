"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Phone } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function Appointments() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>(["New collections"]);
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const toggle = (t: string) => setInterests((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]));

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Please enter a valid email address.");
    if (!interests.length) return setError("Choose at least one thing you'd like to hear about.");
    setError("");
    setState("loading");
    window.setTimeout(() => setState("done"), 1200);
  }

  return (
    <section id="appointments" className="relative isolate overflow-hidden bg-noir text-ivory" aria-labelledby="letter-title">
      <div className="bg-bloom absolute inset-0 -z-20" aria-hidden />
      <Aurora intensity="soft" className="-z-10 mix-blend-overlay" />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-36">
        <Reveal className="lg:col-span-5">
          <p className="label text-ivory/80">Private appointments</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            An hour at Rue Saint-Honoré, <em>just for you.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory/85">
            Try the collection in our salon with a stylist, champagne and complimentary alterations by the atelier.
            Appointments Tuesday to Saturday.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}?subject=Private%20appointment%20request`}
              className="group inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 label text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              Request an appointment
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a href={site.phoneHref} className="inline-flex items-center gap-3 rounded-full px-5 py-4 label text-ivory ring-1 ring-ivory/50 ring-inset transition-colors hover:bg-ivory/10">
              <Phone className="size-4" aria-hidden /> {site.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2px] bg-ink/25 p-7 ring-1 ring-ivory/20 backdrop-blur-xl sm:p-10">
            <p className="label text-ivory/80">The Noir letter</p>
            <h3 id="letter-title" className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              First access to new collections, private sales and atelier stories.
            </h3>
            <AnimatePresence mode="wait" initial={false}>
              {state === "done" ? (
                <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-start gap-3 font-display text-2xl italic" role="status">
                  <Check className="mt-1.5 size-5 shrink-0" aria-hidden />
                  Merci — you&rsquo;re on the list. (Demo: no email was sent or stored.)
                </motion.p>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="mt-8">
                  <fieldset>
                    <legend className="label mb-3 text-[0.6rem] text-ivory/75">I&rsquo;d like to hear about</legend>
                    <div className="flex flex-wrap gap-2">
                      {["New collections", "Private sales", "Atelier stories", "Events in Paris"].map((t) => {
                        const on = interests.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(t)}
                            className={`rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-ivory text-ink" : "ring-1 ring-ivory/40 ring-inset hover:bg-ivory/10"}`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label htmlFor={`${id}-email`} className="label mt-7 mb-2 block text-[0.6rem] text-ivory/75">
                    Email
                  </label>
                  <div className="flex items-center gap-3 border-b border-ivory/50 pb-2 transition-colors focus-within:border-ivory">
                    <input
                      id={`${id}-email`}
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      aria-invalid={!!error}
                      aria-describedby={`${id}-msg`}
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 bg-transparent py-2 font-display text-xl text-ivory placeholder:text-ivory/50 focus:outline-none"
                    />
                    <button type="submit" disabled={state === "loading"} className="grid size-11 place-items-center rounded-full bg-ivory text-ink transition-transform hover:scale-105 disabled:opacity-70" aria-label="Subscribe">
                      {state === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ArrowRight className="size-4" aria-hidden />}
                    </button>
                  </div>
                  <p id={`${id}-msg`} role={error ? "alert" : undefined} className={`mt-3 text-sm ${error ? "font-medium text-ivory" : "text-ivory/70"}`}>
                    {error ? `⚠ ${error}` : "One letter a month. Unsubscribe whenever you like."}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
