"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { socials } from "../../content/site";
import { EASE } from "./motion";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

declare global {
  interface Window {
    __chesenHello?: boolean;
  }
}

/**
 * Ambient client effects: styled console greeting, konami overdrive,
 * barrel roll listener, and the global toast. One component, one purpose
 * each — none of them touch layout.
 */
export function Fx() {
  const [message, setMessage] = useState<string | null>(null);

  // console greeting — once per page load
  useEffect(() => {
    if (window.__chesenHello) return;
    window.__chesenHello = true;
    console.log(
      "%c chesen.dev %c built by hand, no template %c",
      "background:#febd11;color:#09090b;font-weight:bold;padding:2px 8px;",
      "background:#18181b;color:#f4f4f5;padding:2px 8px;",
      "",
    );
    console.log(
      `curious how the signal field works? → ${socials.github.url}\n⌘K works. so does ↑↑↓↓←→←→BA.`,
    );
  }, []);

  // konami → overdrive (the palette this site launched with)
  useEffect(() => {
    let progress = 0;
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        document.documentElement.setAttribute("data-overdrive", "");
        window.dispatchEvent(
          new CustomEvent("chesen:toast", {
            detail: "OVERDRIVE — original palette restored for 8s.",
          }),
        );
        clearTimeout(timer);
        timer = setTimeout(
          () => document.documentElement.removeAttribute("data-overdrive"),
          8000,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  // barrel roll
  useEffect(() => {
    const onBarrel = () => {
      const root = document.getElementById("site-root");
      if (!root || root.classList.contains("barrel")) return;
      root.classList.add("barrel");
      root.addEventListener(
        "animationend",
        () => root.classList.remove("barrel"),
        { once: true },
      );
    };
    window.addEventListener("chesen:barrel", onBarrel);
    return () => window.removeEventListener("chesen:barrel", onBarrel);
  }, []);

  // toast
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener("chesen:toast", onToast);
    return () => {
      window.removeEventListener("chesen:toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 border border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-200 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]"
        >
          <span className="mr-2 text-accent">▸</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
