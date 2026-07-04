"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "../../content/site";
import { applyTheme, currentTheme, type ThemeId } from "../lib/theme";

const TRIMS: { id: ThemeId; color: string; label: string }[] = [
  { id: "ember", color: "#fb923c", label: "Ember trim" },
  { id: "gold", color: "#fbbf24", label: "Gold trim" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [trim, setTrim] = useState<ThemeId>("ember");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTrim(currentTheme());
    setMounted(true);
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

        <div className="flex items-center gap-4">
          <div
            role="group"
            aria-label="Accent trim"
            className="flex items-center gap-2"
          >
            {TRIMS.map((t) => {
              const active = mounted && trim === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-label={t.label}
                  aria-pressed={active}
                  title={t.label}
                  onClick={() => {
                    applyTheme(t.id);
                    setTrim(t.id);
                  }}
                  className={`h-3 w-3 rounded-full transition-all ${
                    active
                      ? "scale-125 ring-1 ring-white/50 ring-offset-2 ring-offset-background"
                      : "opacity-40 hover:opacity-80"
                  }`}
                  style={{ background: t.color }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("chesen:palette"))}
            className="border border-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-foreground"
            aria-label={`Open command palette (${profile.handle})`}
          >
            ⌘K
          </button>
        </div>
      </nav>
    </header>
  );
}
