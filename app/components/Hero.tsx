"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../content/site";
import { EASE, Magnetic } from "./motion";
import { SignalField } from "./SignalField";

/** One word of the display name, split into kinetic letters. */
function KineticWord({
  word,
  offset,
  className,
}: {
  word: string;
  offset: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const letters = Array.from(word);

  return (
    <span className={`block ${className ?? ""}`} aria-hidden="true">
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block will-change-transform"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15 + (offset + i) * 0.028,
            ease: EASE,
          }}
          whileHover={
            reduced
              ? undefined
              : { y: -10, rotate: i % 2 === 0 ? -2.5 : 2.5 }
          }
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <SignalField />
      {/* readability scrim over the field, bottom-weighted */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-6 pb-24 pt-28 sm:px-10">
        <motion.p
          {...fade(0)}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400"
        >
          {profile.kicker}
        </motion.p>

        <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.95] tracking-tight">
          <span className="sr-only">{profile.name}</span>
          <KineticWord word={profile.firstName} offset={0} />
          <KineticWord
            word={profile.lastName}
            offset={profile.firstName.length}
            className="italic text-accent"
          />
        </h1>

        <motion.p
          {...fade(0.55)}
          className="mt-10 max-w-xl text-balance text-lg leading-relaxed text-zinc-200 sm:text-xl"
        >
          {profile.positioning}
        </motion.p>

        <motion.p
          {...fade(0.65)}
          className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          {profile.supporting}
        </motion.p>

        <motion.div
          {...fade(0.75)}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Magnetic>
            <a
              href="#now"
              className="group inline-flex items-center gap-3 border border-accent/60 px-6 py-3 font-mono text-sm text-foreground transition-colors hover:bg-accent hover:text-background"
            >
              See what I&apos;m building
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </Magnetic>
          <span className="font-mono text-xs text-zinc-500">
            or press{" "}
            <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[11px] text-zinc-300">
              ⌘K
            </kbd>{" "}
            anywhere
          </span>
        </motion.div>

        <motion.div
          {...fade(0.85)}
          className="mt-20 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </span>
          <span className="text-zinc-300">{profile.availability}</span>
          <span className="text-zinc-700">/</span>
          <span>{profile.location}</span>
        </motion.div>
      </div>
    </section>
  );
}
