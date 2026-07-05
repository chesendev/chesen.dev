"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { about as aboutEn } from "../../../content/site";
import { EASE, Reveal } from "../../components/motion";
import { TenArches } from "./glyphs";
import styles from "./kurdi.module.css";
import { projects, ui } from "./strings";

/* ————— shared shell: index, four beats (Çarçira echo), title ————— */

export function FourBeats({ active }: { active: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-1.5">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full"
          style={{
            background:
              i === active % 4 ? "var(--zer)" : "rgba(243,234,217,0.18)",
          }}
        />
      ))}
    </span>
  );
}

export function KurdiSection({
  id,
  index,
  title,
  sub,
  children,
}: {
  id: string;
  index: string;
  title: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <hr className={styles.ablaq} />
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <div className="mb-14 flex items-baseline gap-4 sm:mb-20">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--zer)" }}
            >
              {index}
            </span>
            <FourBeats active={parseInt(index, 10) - 1} />
            <h2
              className="font-display text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--sor-display)" }}
            >
              {title}
            </h2>
            {sub && (
              <span className="hidden text-sm sm:inline" style={{ color: "var(--xani-faint)" }}>
                {sub}
              </span>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ————— hero: generative Zagros toward a dawn horizon ————— */

const RIDGES = [
  {
    d: "M0 220V150l90-52 70 30 110-68 90 44 120-60 110 52 90-36 120 58 100-44 110 50 90-28 100 44v130Z",
    fill: "#181310",
    depth: 26,
  },
  {
    d: "M0 220V120l120-46 90 34 130-58 100 40 140-52 110 44 130-38 120 48 130-30 130 42v116Z",
    fill: "#120e0b",
    depth: 14,
  },
  {
    d: "M0 220V96l150-40 120 32 160-48 130 36 170-42 140 38 160-30 170 40v138Z",
    fill: "#0d0b09",
    depth: 6,
  },
];

function Zagros({ brighter }: { brighter: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setShift(Math.min(1, Math.max(0, -rect.top / rect.height)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* dawn glow on the horizon — triad light, canvas stays basalt */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/5"
        style={{
          opacity: brighter ? 0.55 : 0.32,
          background:
            "radial-gradient(90% 70% at 50% 100%, rgba(207,59,44,0.35) 0%, rgba(243,234,217,0.10) 40%, rgba(47,164,101,0.16) 64%, transparent 80%)",
        }}
      />
      <div
        className="absolute left-1/2 h-16 w-16 -translate-x-1/2 rounded-full"
        style={{
          bottom: "34%",
          background: "var(--zer)",
          opacity: brighter ? 0.9 : 0.7,
          filter: "blur(1px)",
          boxShadow: "0 0 42px 6px rgba(254,189,17,0.4)",
        }}
      />
      {RIDGES.map((ridge, i) => (
        <svg
          key={i}
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 w-full will-change-transform"
          style={{
            height: `${44 - i * 10}%`,
            transform: reduced
              ? undefined
              : `translateY(${shift * ridge.depth}px)`,
          }}
        >
          <path d={ridge.d} fill={ridge.fill} />
        </svg>
      ))}
    </div>
  );
}

export function KurdiHero({ newroz }: { newroz: boolean }) {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Zagros brighter={newroz} />
      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 pb-24 pt-28 sm:px-10">
        <motion.p
          {...fade(0)}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "var(--hevsel-400)" }}
        >
          {ui.hero.kicker}
        </motion.p>

        <motion.h1
          {...fade(0.1)}
          className="font-display leading-[0.95] tracking-tight"
          style={{ fontSize: "var(--rustem-1)", color: "var(--sor-display)" }}
        >
          Mehdi
          <span className="block italic">Osmanoğlu</span>
        </motion.h1>

        <motion.p
          {...fade(0.35)}
          className="mt-10 max-w-xl text-balance text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--xani)" }}
        >
          {ui.hero.positioning}
        </motion.p>

        <motion.p
          {...fade(0.45)}
          className="mt-3 max-w-xl text-pretty text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--xani-dim)" }}
        >
          {ui.hero.supporting}
        </motion.p>

        <motion.div
          {...fade(0.55)}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 border px-6 py-3 font-mono text-sm transition-colors"
            style={
              {
                borderColor: "var(--hevsel-500)",
                color: "var(--xani)",
              } as CSSProperties
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--hevsel-500)";
              e.currentTarget.style.color = "var(--basalt)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--xani)";
            }}
          >
            {ui.hero.cta}
            <span className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--xani-faint)" }}
          >
            {ui.hero.orPress}{" "}
            <kbd
              className="rounded border px-1.5 py-0.5 text-[11px]"
              style={{
                borderColor: "rgba(243,234,217,0.2)",
                color: "var(--xani-dim)",
              }}
            >
              ⌘K
            </kbd>
          </span>
        </motion.div>

        <motion.div
          {...fade(0.65)}
          className="mt-20 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--xani-faint)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute h-full w-full animate-ping rounded-full opacity-70 motion-reduce:animate-none"
              style={{ background: "var(--hevsel-400)" }}
            />
            <span
              className="relative h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--hevsel-400)",
                boxShadow: "0 0 8px rgba(76,201,129,0.8)",
              }}
            />
          </span>
          <span style={{ color: "var(--xani-dim)" }}>
            {ui.hero.availability}
          </span>
          <span style={{ color: "var(--xani-faint)" }}>/</span>
          <span>{ui.hero.location}</span>
        </motion.div>

        {/* the fourfold rhythm — four hairlines. unlabeled. */}
        <div
          aria-hidden="true"
          className="mt-14 grid max-w-md grid-cols-4 gap-3"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              className="h-px"
              style={{ background: "rgba(243,234,217,0.14)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————— selected work ————— */

const FACETS = [
  { key: "problem", label: ui.facets.problem },
  { key: "approach", label: ui.facets.approach },
  { key: "learned", label: ui.facets.learned },
] as const;

export function KurdiWork() {
  return (
    <KurdiSection
      id="work"
      index={ui.sections.work.index}
      title={ui.sections.work.title}
    >
      {/* Pira Dehderî — ten arches over the Dicle */}
      <div
        className="mb-16 w-full max-w-sm"
        style={{ color: "var(--hevsel-500)", opacity: 0.6 }}
      >
        <TenArches className="h-4 w-full" />
      </div>

      <div className="space-y-20 sm:space-y-24">
        {projects.map((project, i) => (
          <Reveal key={project.index} delay={i * 0.05}>
            <article className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div>
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--xani-faint)" }}
                >
                  {project.index} · {project.stack}
                </p>
                <h3
                  className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl"
                  style={{ color: "var(--sor)" }}
                >
                  {project.name}
                </h3>
              </div>
              <dl className="space-y-6">
                {FACETS.map((facet) => (
                  <div key={facet.key}>
                    <dt
                      className="font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: "var(--hevsel-400)" }}
                    >
                      {facet.label}
                    </dt>
                    <dd
                      className="mt-1.5 max-w-prose text-[15px] leading-relaxed"
                      style={{ color: "var(--xani)" }}
                    >
                      {project[facet.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </KurdiSection>
  );
}

/* ————— about + çîrok ————— */

export function KurdiAbout() {
  return (
    <KurdiSection
      id="about"
      index={ui.sections.about.index}
      title={ui.sections.about.title}
    >
      <div className="grid gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Reveal>
          <div className="space-y-6">
            {ui.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-prose text-[15px] leading-relaxed sm:text-base"
                style={{ color: "var(--xani)" }}
              >
                {paragraph}
              </p>
            ))}

            {/* Çîrok — the block the public site doesn't have */}
            <figure
              className="mt-10 border-l-2 py-1 pl-6"
              style={{ borderColor: "var(--hevsel-500)" }}
            >
              <figcaption
                className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em]"
                style={{ color: "var(--zer)" }}
              >
                {ui.about.cirokTitle}
              </figcaption>
              {ui.about.cirok.map((line) => (
                <p
                  key={line}
                  className="font-display text-lg italic leading-relaxed sm:text-xl"
                  style={{ color: "var(--xani)" }}
                >
                  {line}
                </p>
              ))}
            </figure>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-10 font-mono text-sm">
            <div>
              <h3
                className="mb-3 text-[10px] uppercase tracking-[0.25em]"
                style={{ color: "var(--hevsel-400)" }}
              >
                {ui.about.languagesTitle}
              </h3>
              <ul className="space-y-1.5">
                {ui.about.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between gap-4"
                    style={{ color: "var(--xani)" }}
                  >
                    <span>{lang.name}</span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--xani-faint)" }}
                    >
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="mb-3 text-[10px] uppercase tracking-[0.25em]"
                style={{ color: "var(--hevsel-400)" }}
              >
                {ui.about.toolboxTitle}
              </h3>
              <ul
                className="flex flex-wrap gap-x-4 gap-y-1.5"
                style={{ color: "var(--xani)" }}
              >
                {aboutEn.toolbox.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="mb-3 text-[10px] uppercase tracking-[0.25em]"
                style={{ color: "var(--hevsel-400)" }}
              >
                {ui.about.logTitle}
              </h3>
              <ul className="space-y-1.5">
                {ui.about.log.map((item) => (
                  <li
                    key={item.entry}
                    className="flex items-baseline gap-4"
                    style={{ color: "var(--xani)" }}
                  >
                    <span
                      className="shrink-0 text-xs"
                      style={{ color: "var(--zer)" }}
                    >
                      {item.year}
                    </span>
                    <span>{item.entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </KurdiSection>
  );
}

/* ————— now ————— */

export function KurdiNow() {
  return (
    <KurdiSection
      id="now"
      index={ui.sections.now.index}
      title={ui.sections.now.title}
    >
      <Reveal>
        <ul className="max-w-2xl space-y-4">
          {ui.now.map((item) => (
            <li key={item} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[3px] shrink-0 font-mono text-xs"
                style={{ color: "var(--zer)" }}
              >
                ▸
              </span>
              <p
                className="text-[15px] leading-relaxed sm:text-base"
                style={{ color: "var(--xani)" }}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </KurdiSection>
  );
}
