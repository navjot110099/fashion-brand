"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Thousands separators (off for years). */
  grouping?: boolean;
};

function format(v: number, decimals: number, prefix: string, suffix: string, grouping = true) {
  return (
    prefix +
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouping }) +
    suffix
  );
}

/** Counts up to `to` the first time it enters the viewport. */
export function Counter({
  to,
  from = 0,
  duration = 2.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  grouping = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduce) {
      node.textContent = format(to, decimals, prefix, suffix, grouping);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v, decimals, prefix, suffix, grouping);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, decimals, prefix, suffix, grouping]);

  return (
    <span className={className}>
      <span className="sr-only">{format(to, decimals, prefix, suffix, grouping)}</span>
      <span ref={ref} aria-hidden>
        {format(from, decimals, prefix, suffix, grouping)}
      </span>
    </span>
  );
}
