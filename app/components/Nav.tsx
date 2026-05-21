"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border px-2 py-2 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
            : "border-white/5 bg-zinc-950/30 backdrop-blur-md"
        }`}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="ml-2 flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-zinc-100"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent text-zinc-950">
            <span className="text-[11px] font-bold">C</span>
          </span>
          <span className="hidden sm:inline">chesen</span>
          <span className="hidden text-accent sm:inline">.dev</span>
        </a>

        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/chesendev"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.08] sm:inline-block"
        >
          GitHub
          <span className="ml-1 text-zinc-500">↗</span>
        </a>
      </nav>
    </motion.header>
  );
}
