"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "../../content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-zinc-800/80 bg-background/90"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <a href="#top" className="font-mono text-sm text-foreground">
          chesen<span className="text-accent">.dev</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("chesen:palette"))}
          className="border border-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-foreground"
          aria-label={`Open command palette (${profile.handle})`}
        >
          ⌘K
        </button>
      </nav>
    </header>
  );
}
