"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { productById } from "@/lib/data";

export type BagItem = { key: string; id: string; color: string; qty: number };

type Ctx = {
  items: BagItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, color: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  lastAdded: string | null;
};

const BagCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "maison-noir-bag";

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore the bag for this visitor (a per-browser convenience only).
  useEffect(() => {
    let saved: BagItem[] = [];
    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      saved = [];
    }
    const t = window.setTimeout(() => {
      if (Array.isArray(saved)) setItems(saved.filter((i) => productById(i.id)));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — the bag still works for this visit */
    }
  }, [items, hydrated]);

  const add = useCallback((id: string, color: string, qty = 1) => {
    const key = `${id}__${color}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, 9) } : i));
      return [...prev, { key, id, color, qty }];
    });
    setLastAdded(key);
    setOpen(true);
  }, []);
  const setQty = useCallback(
    (key: string, qty: number) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(qty, 9)) } : i))),
    [],
  );
  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((a, i) => a + i.qty, 0);
    const subtotal = items.reduce((a, i) => a + (productById(i.id)?.price ?? 0) * i.qty, 0);
    return { items, count, subtotal, isOpen, open, close, add, setQty, remove, lastAdded };
  }, [items, isOpen, open, close, add, setQty, remove, lastAdded]);

  return <BagCtx.Provider value={value}>{children}</BagCtx.Provider>;
}

export function useBag() {
  const ctx = useContext(BagCtx);
  if (!ctx) throw new Error("useBag must be used within BagProvider");
  return ctx;
}
