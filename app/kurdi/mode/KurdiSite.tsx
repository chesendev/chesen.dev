"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Bir } from "./Bir";
import { heroes, isNewroz, ui } from "./strings";
import { sunFaviconHref, SurHorizon } from "./glyphs";
import { KurdiContact } from "./KurdiContact";
import { KurdiFx } from "./KurdiFx";
import { KurdiNav } from "./KurdiNav";
import { KurdiPalette } from "./KurdiPalette";
import {
  KurdiAbout,
  KurdiHero,
  KurdiNow,
  KurdiWork,
} from "./KurdiSections";
import styles from "./kurdi.module.css";

declare global {
  interface Window {
    __kurdiHello?: boolean;
  }
}

/**
 * The whole mode, mounted only when someone walks through /kurdi.
 * Side effects on mount: ready flag (drops the veil), lang, favicon,
 * and the rotating console greeting — a different figure each entry.
 */
export default function KurdiSite({
  view = "home",
}: {
  view?: "home" | "not-found";
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.kurdiReady = "";
    root.lang = "kmr";

    // in-mode favicon: the sun, 21 rays
    const icons = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'),
    );
    const previous = icons.map((el) => el.href);
    const sun = sunFaviconHref();
    for (const el of icons) el.href = sun;

    // console greeting — the pantheon takes turns
    if (!window.__kurdiHello) {
      window.__kurdiHello = true;
      let n = 0;
      try {
        n = parseInt(localStorage.getItem("chesen:kurdi:hello") ?? "0", 10) || 0;
        localStorage.setItem("chesen:kurdi:hello", String(n + 1));
      } catch {
        /* rotation just stays on the first figure */
      }
      const hero = heroes[n % heroes.length];
      console.log(
        `%c MODA KURDÎ %c ${hero.line} %c`,
        "background:#febd11;color:#0d0b09;font-weight:bold;padding:2px 8px;",
        "background:#14110e;color:#f3ead9;padding:2px 8px;font-style:italic;",
        "",
      );
      console.log(`— ${hero.name} · ${hero.date} ✌️`);
    }

    return () => {
      root.removeAttribute("data-kurdi-ready");
      icons.forEach((el, i) => {
        el.href = previous[i];
      });
      window.__kurdiHello = false;
    };
  }, []);

  if (view === "not-found") {
    return (
      <div className={styles.root}>
        <div className={styles.ribbon} aria-hidden="true" />
        <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 sm:px-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--zer)" }}
          >
            {ui.notFound.code}
          </p>
          <h1
            className="mt-6 font-display text-4xl tracking-tight sm:text-6xl"
            style={{ color: "var(--sor-display)" }}
          >
            {ui.notFound.title}
          </h1>
          <p className="mt-4 max-w-md" style={{ color: "var(--xani-dim)" }}>
            {ui.notFound.body}
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex w-fit items-center gap-3 border px-6 py-3 font-mono text-sm transition-colors hover:!bg-[var(--hevsel-500)] hover:!text-[var(--basalt)]"
            style={{ borderColor: "var(--hevsel-500)", color: "var(--xani)" }}
          >
            ← {ui.notFound.back}
          </Link>
        </main>
        <SurHorizon
          className="block h-14 w-full"
          style={{ color: "#161210" }}
        />
      </div>
    );
  }

  const newroz = isNewroz();

  return (
    <div className={styles.root} id="site-root">
      <div className={styles.ribbon} aria-hidden="true" />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:bg-[var(--basalt)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        style={{ borderColor: "var(--zer)" }}
      >
        {ui.skip}
      </a>
      <KurdiNav />
      <main>
        <KurdiHero newroz={newroz} />
        <KurdiWork />
        <Bir />
        <KurdiAbout />
        <KurdiNow />
        <KurdiContact />
      </main>
      <KurdiPalette />
      <KurdiFx />
    </div>
  );
}
