"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE, Reveal } from "../../components/motion";
import { heroGlyphs } from "./glyphs";
import { KurdiSection } from "./KurdiSections";
import styles from "./kurdi.module.css";
import { heroes, ui } from "./strings";

/**
 * BÎR — the twenty-one. One for each ray of the sun.
 * The spine is the Dicle; stations alternate across it.
 * No portraits. Restraint is the craft.
 */
export function Bir() {
  const [verseOpen, setVerseOpen] = useState(false);

  return (
    <KurdiSection
      id="bir"
      index={ui.sections.bir.index}
      title={ui.sections.bir.title}
      sub={ui.sections.bir.sub}
    >
      <div className="relative">
        {/* the Dicle, flowing */}
        <svg
          className={styles.spine}
          viewBox="0 0 12 1200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.spinePath}
            d="M6 0c4 60-4 120 0 180s-4 120 0 180 -4 120 0 180 4 120 0 180 -4 120 0 180 4 120 0 180 -4 80 0 120"
            fill="none"
            strokeWidth="1.2"
          />
        </svg>

        <ol className="space-y-12 md:space-y-16">
          {heroes.map((hero, i) => {
            const Glyph = heroGlyphs[hero.id];
            const right = i % 2 === 1;
            const isMemuzin = hero.id === "memuzin";
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
                  {isMemuzin ? (
                    <button
                      type="button"
                      onClick={() => setVerseOpen(true)}
                      aria-label={hero.name}
                      className="cursor-pointer transition-transform hover:scale-110"
                      style={{ color: "var(--hevsel-400)" }}
                    >
                      <Glyph className="h-6 w-6" />
                    </button>
                  ) : (
                    <span style={{ color: "var(--hevsel-400)" }}>
                      <Glyph className="h-6 w-6" />
                    </span>
                  )}
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

      {/* the hidden verse — a reward, not a banner */}
      <AnimatePresence>
        {verseOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-6"
            onClick={() => setVerseOpen(false)}
          >
            <motion.figure
              role="dialog"
              aria-label={ui.eggs.verseTitle}
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
                {ui.eggs.verseTitle}
              </figcaption>
              {ui.eggs.verse.map((line) => (
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
                {ui.eggs.verseSign}
              </p>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </KurdiSection>
  );
}
