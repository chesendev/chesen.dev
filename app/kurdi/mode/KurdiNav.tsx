"use client";

import { useEffect, useState } from "react";
import { profile } from "../../../content/site";
import { ui } from "./strings";

export function KurdiNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(243,234,217,0.1)"
          : "1px solid transparent",
        background: scrolled ? "rgba(13,11,9,0.92)" : "transparent",
      }}
    >
      <nav
        aria-label="Serekî"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <a
          href="#top"
          className="font-mono text-sm"
          style={{ color: "var(--xani)" }}
        >
          chesen
          <span style={{ color: "var(--zer)" }}>.dev</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {ui.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:!text-[var(--xani)]"
                style={{ color: "var(--hevsel-400)" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("chesen:palette"))}
          className="border px-2.5 py-1 font-mono text-[11px] transition-colors"
          style={{
            borderColor: "rgba(243,234,217,0.18)",
            color: "var(--xani-dim)",
          }}
          aria-label={`Paleta fermanan veke (${profile.handle})`}
        >
          ⌘K
        </button>
      </nav>
    </header>
  );
}
