"use client";

import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "mehdiosmanoglu@icloud.com";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/chesendev",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehdiosmanoglu",
    icon: LinkedinIcon,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="px-6 py-16 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mx-auto max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                Contact
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Let&apos;s build something.
              </h2>
              <p className="mt-2 max-w-md text-sm text-zinc-500">
                Open to collaboration on backend, algorithms, and Web3
                experiments. Reach out — I read every message.
              </p>

              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950 px-4 py-2 font-mono text-sm text-zinc-200 transition-all hover:border-accent/40 hover:bg-zinc-900"
                aria-label="Copy email address"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>{EMAIL}</span>
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-400">
                  {copied ? (
                    <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                  ) : (
                    <Copy className="h-3 w-3" strokeWidth={2} />
                  )}
                </span>
              </button>
              <p
                aria-live="polite"
                className={`mt-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity ${
                  copied ? "text-accent opacity-100" : "text-transparent opacity-0"
                }`}
              >
                Copied to clipboard
              </p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-accent/40 hover:bg-zinc-900 hover:text-zinc-50"
                    >
                      <Icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-accent" />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
            <p>
              <span className="font-mono text-zinc-400">chesen.dev</span>
              <span className="mx-2 text-zinc-700">/</span>
              <span>© {year} Mehdi Osmanoğlu</span>
            </p>
            <p className="font-mono">
              Built with <span className="text-rose-400">♥</span> by{" "}
              <span className="text-zinc-200">Chesen</span>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
