"use client";

import { motion, type Variants } from "framer-motion";
import {
  Award,
  Calendar,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Milestone = {
  id: string;
  category: "Academic" | "Challenge" | "Event";
  icon: LucideIcon;
  title: string;
  detail: string;
  year: string;
  status: string;
};

const milestones: Milestone[] = [
  {
    id: "dual-diploma",
    category: "Academic",
    icon: GraduationCap,
    title: "Software Engineering Dual Diploma",
    detail:
      "Joint program between Fırat University and Sam Houston State University — rigorous CS theory combined with U.S. curriculum coursework.",
    year: "Now",
    status: "Ongoing",
  },
  {
    id: "odtu-blockchain",
    category: "Event",
    icon: Calendar,
    title: "ODTÜ Blockchain Days 2026",
    detail:
      "Attendee — METU Blockchain Society's flagship event covering protocol design, DeFi, and the Turkish Web3 ecosystem.",
    year: "2026",
    status: "Attended",
  },
  {
    id: "csharp-challenge",
    category: "Challenge",
    icon: Award,
    title: "C# Technical Challenge",
    detail:
      "Intensive program covering language fundamentals, OOP, LINQ, and algorithmic problem solving in C#.",
    year: "2026",
    status: "Completed",
  },
  {
    id: "devfest",
    category: "Event",
    icon: Calendar,
    title: "DevFest Istanbul 2025",
    detail:
      "Attendee — Google Developer Groups annual community conference focused on cloud, web, and mobile.",
    year: "2025",
    status: "Attended",
  },
];

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: EASE },
  }),
};

export function Milestones() {
  return (
    <section
      id="projects"
      className="relative border-b border-white/5 px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Timeline
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Experience &amp; Milestones
          </h2>
          <p className="mt-3 max-w-xl text-base text-zinc-500">
            Academic path, hands-on technical work, and community events that
            shape how I build.
          </p>
        </motion.div>

        <ol className="mt-14 space-y-3 sm:space-y-4">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.li
                key={m.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={item}
                className="grid grid-cols-[64px_1fr] gap-3 sm:grid-cols-[100px_1fr] sm:gap-6"
              >
                <div className="pt-5 text-right">
                  <p className="font-mono text-xs font-medium text-accent sm:text-sm">
                    {m.year}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:text-xs">
                    {m.status}
                  </p>
                </div>

                <div className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-accent/30 hover:bg-white/[0.04]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(251,146,60,0.07), transparent 50%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-zinc-900 text-accent">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        {m.category}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-zinc-100 sm:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {m.detail}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
