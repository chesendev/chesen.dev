"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile, socials } from "../../content/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import { EASE, Magnetic, Reveal } from "./motion";

const links = [
  { ...socials.github, icon: GithubIcon },
  { ...socials.linkedin, icon: LinkedinIcon },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="border-t border-zinc-800/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <div className="mb-14 flex items-baseline gap-4">
            <span className="font-mono text-xs text-accent">03</span>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Contact
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-display text-[clamp(2rem,6vw,4rem)] leading-tight tracking-tight">
            Say <span className="italic text-accent">hello.</span>
          </p>

          <Magnetic strength={0.15}>
            <button
              type="button"
              onClick={copyEmail}
              className="group relative mt-8 inline-flex items-center gap-4 border-b border-zinc-700 pb-2 font-mono text-base text-zinc-200 transition-colors hover:border-accent sm:text-lg"
              aria-label={`Copy email address: ${profile.email}`}
            >
              <span className="relative block h-[1.5em] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "email"}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`block ${copied ? "text-accent" : ""}`}
                  >
                    {copied ? "copied — talk soon." : profile.email}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-xs text-zinc-600 transition-colors group-hover:text-accent"
              >
                {copied ? "✓" : "[copy]"}
              </span>
            </button>
          </Magnetic>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-accent" />
                  {link.label}
                  <span className="text-zinc-700 transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col justify-between gap-3 border-t border-zinc-800/70 pt-6 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name} · {profile.domain}
          </p>
          <p>
            Built with <span className="text-rose-400">♥</span> by{" "}
            <span className="text-zinc-300">{profile.handle}</span> — no
            template.
          </p>
        </div>
      </div>
    </footer>
  );
}
