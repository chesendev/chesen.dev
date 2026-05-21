"use client";

import { motion, type Variants } from "framer-motion";
import { Boxes, Code2, Palette, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type SkillGroup = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend & Core",
    description: "Building services, APIs, and algorithm-heavy systems.",
    icon: Code2,
    items: ["C#", ".NET", "Java", "C++", "Python"],
  },
  {
    id: "web3",
    title: "Blockchain / Web3",
    description: "Smart contracts and on-chain primitives.",
    icon: Boxes,
    items: ["Move", "SUI"],
  },
  {
    id: "creative",
    title: "Creative Tools",
    description: "Visuals, motion graphics, and content production.",
    icon: Palette,
    items: ["Adobe Photoshop", "Premiere Pro", "After Effects"],
  },
];

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
};

export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-b border-white/5 px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Stack"
          title="Skills & Tech"
          subtitle="The tools and languages I reach for when shipping."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={card}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-accent/30 hover:bg-white/[0.04]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10"
                />
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-zinc-100">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {group.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-white/10 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-base text-zinc-500">{subtitle}</p>
    </motion.div>
  );
}
