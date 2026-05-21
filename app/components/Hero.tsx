"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useCallback, useRef } from "react";
import { GithubIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

export function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section
      id="top"
      ref={spotlightRef}
      onMouseMove={onMove}
      className="relative isolate overflow-hidden border-b border-white/5"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-10" />

      {/* Mouse-follow spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(251, 146, 60, 0.20), transparent 60%)",
        }}
      />

      {/* Static ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto flex min-h-[92vh] max-w-5xl flex-col justify-center px-6 py-28 sm:px-8 lg:px-12">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-zinc-300">Available for collaboration</span>
          <span className="mx-1 h-3 w-px bg-white/10" />
          <MapPin className="h-3 w-3" />
          <span>Elazığ / Huntsville, TX</span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Mehdi{" "}
          <span className="bg-gradient-to-r from-accent via-orange-300 to-amber-200 bg-clip-text text-transparent">
            Osmanoğlu
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-pretty text-base text-zinc-400 sm:text-lg"
        >
          Software Engineering Student
        <span className="block mt-1 text-zinc-300">
          Fırat University &amp; Sam Houston State University Dual Degree
        </span>
      </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-500 sm:text-lg"
        >
          Focused on robust backend architectures, algorithm design, and
          exploring Web3 ecosystems.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_-5px_var(--color-accent)]"
          >
            Explore Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://github.com/chesendev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-white/[0.05]"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Console-style stat row */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          <Stat label="Languages" value="5+" />
          <Stat label="Stacks" value="Backend · Web3" />
          <Stat label="Challenges" value="1 done" />
          <Stat label="Events" value="2 attended" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-white/10 pl-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-zinc-200">{value}</p>
    </div>
  );
}
