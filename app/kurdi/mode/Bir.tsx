"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE, Reveal } from "../../components/motion";
import { heroGlyphs } from "./glyphs";
import { KurdiSection } from "./KurdiSections";
import styles from "./kurdi.module.css";
import { coda, codaIntro, heroes, ui, type Hero21 } from "./strings";

/**
 * BÎR — the twenty-one. One for each ray of the sun.
 * The spine is the Dicle; stations alternate across it.
 * Every glyph opens the figure's own words — a reward, not a banner.
 * No portraits. Restraint is the craft.
 */
export function Bir() {
  const [openHero, setOpenHero] = useState<Hero21 | null>(null);

  return (
    <KurdiSection
      id="bir"
      index={ui.sections.bir.index}
      title={ui.sections.bir.title}
      sub={ui.sections.bir.sub}
    >
      <div className="relative">
        {/* the Dicle, flowing — tiled so it always reaches the last station */}
        <div className={styles.spine} aria-hidden="true" />

        <ol className="space-y-12 md:space-y-16">
          {heroes.map((hero, i) => {
            const Glyph = heroGlyphs[hero.id];
            const right = i % 2 === 1;
            const station = (
              <div
                className={`pl-8 md:w-[calc(50%-2.5rem)] md:pl-0 ${
                  right ? "md:text-left" : "md:text-right"
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    right ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenHero(hero)}
                    aria-label={`Gotina ${hero.name}`}
                    className="cursor-pointer transition-transform hover:scale-110 focus-visible:scale-110"
                    style={{ color: "var(--hevsel-400)" }}
                  >
                    <Glyph className="h-6 w-6" />
                  </button>
                  <h3
                    className="font-display text-xl tracking-tight sm:text-2xl"
                    style={{ color: "var(--sor)" }}
                  >
                    {hero.name}
                  </h3>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--zer)" }}
                  >
                    {hero.date}
                  </span>
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--xani-dim)" }}
                >
                  {hero.line}
                </p>
              </div>
            );

            return (
              <li key={hero.id} className="relative">
                {/* station marker on the spine */}
                <span
                  aria-hidden="true"
                  className="absolute left-[10px] top-2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 md:left-1/2"
                  style={{ background: "var(--zer)" }}
                />
                <Reveal delay={0.03 * (i % 4)}>
                  <div
                    className={`md:flex ${
                      right ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    {station}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/*
        The coda — not one of the twenty-one. The twenty-one stand in
        the river; the man who gave them letters stands at its mouth.
      */}
      <Reveal>
        <div className="mt-24 text-center">
          <p
            className="font-mono text-[11px] tracking-[0.2em]"
            style={{ color: "var(--hevsel-400)" }}
          >
            {codaIntro}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setOpenHero(coda)}
              aria-label={`Gotina ${coda.name}`}
              className="cursor-pointer transition-transform hover:scale-110 focus-visible:scale-110"
              style={{ color: "var(--hevsel-400)" }}
            >
              {(() => {
                const CodaGlyph = heroGlyphs[coda.id];
                return <CodaGlyph className="h-6 w-6" />;
              })()}
            </button>
            <h3
              className="font-display text-xl tracking-tight sm:text-2xl"
              style={{ color: "var(--sor)" }}
            >
              {coda.name}
            </h3>
            <span className="font-mono text-xs" style={{ color: "var(--zer)" }}>
              {coda.date}
            </span>
          </div>
          <p
            className="mx-auto mt-2 max-w-md text-sm leading-relaxed"
            style={{ color: "var(--xani-dim)" }}
          >
            {coda.line}
          </p>
        </div>
      </Reveal>

      {/* the words behind the glyph */}
      <AnimatePresence>
        {openHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-6"
            onClick={() => setOpenHero(null)}
          >
            <motion.figure
              role="dialog"
              aria-label={`${openHero.name} · ${openHero.date}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="max-w-lg border p-10 text-center"
              style={{
                background: "var(--basalt)",
                borderColor: "rgba(243,234,217,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <figcaption
                className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--zer)" }}
              >
                {openHero.name} · {openHero.date}
              </figcaption>
              {openHero.quote.map((line) => (
                <p
                  key={line}
                  className="font-display text-xl italic leading-relaxed sm:text-2xl"
                  style={{ color: "var(--xani)" }}
                >
                  {line}
                </p>
              ))}
              <p
                className="mt-6 font-mono text-xs"
                style={{ color: "var(--sor)" }}
              >
                — {openHero.source}
              </p>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </KurdiSection>
  );
}
