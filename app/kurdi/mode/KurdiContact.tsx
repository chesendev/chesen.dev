"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { profile, socials } from "../../../content/site";
import { GithubIcon, LinkedinIcon } from "../../components/icons";
import { EASE, Reveal } from "../../components/motion";
import { Beats } from "./KurdiSections";
import { heroGlyphs, SurHorizon } from "./glyphs";
import styles from "./kurdi.module.css";
import { isNewroz, kurdishDate, kurdishYear, ui } from "./strings";

const KawaHammer = heroGlyphs.kawa;

const links = [
  { ...socials.github, icon: GithubIcon },
  { ...socials.linkedin, icon: LinkedinIcon },
];

export function KurdiContact() {
  const [copied, setCopied] = useState(false);
  const newroz = isNewroz();

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
    <footer id="contact">
      <hr className={styles.ablaq} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 sm:px-10 sm:pt-32">
        <Reveal>
          <div className="mb-14 flex items-baseline gap-4">
            <span className="font-mono text-xs" style={{ color: "var(--zer)" }}>
              {ui.sections.contact.index}
            </span>
            <Beats active={2} />
            <h2
              className="font-display text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--sor-display)" }}
            >
              {ui.sections.contact.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p
            className="font-display text-[clamp(2rem,6vw,4rem)] leading-tight tracking-tight"
            style={{ color: "var(--sor-display)" }}
          >
            {ui.contact.headline}{" "}
            <span className="italic" style={{ color: "var(--zer)" }}>
              {ui.contact.headlineAccent}
            </span>
          </p>
          <p
            className="mt-4 max-w-md text-sm leading-relaxed"
            style={{ color: "var(--xani-dim)" }}
          >
            {ui.contact.lede}
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="group mt-8 inline-flex items-center gap-4 border-b pb-2 font-mono text-base transition-colors sm:text-lg"
            style={{
              borderColor: copied ? "var(--hevsel-400)" : "rgba(243,234,217,0.25)",
              color: "var(--xani)",
            }}
            aria-label={`${ui.palette.copyEmail}: ${profile.email}`}
          >
            <span className="relative block h-[1.5em] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? "copied" : "email"}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="block"
                  style={copied ? { color: "var(--hevsel-400)" } : undefined}
                >
                  {copied ? ui.contact.copied : profile.email}
                </motion.span>
              </AnimatePresence>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xs"
              style={{ color: copied ? "var(--hevsel-400)" : "var(--xani-faint)" }}
            >
              {copied ? "✓" : ui.contact.copyHint}
            </span>
          </button>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dicle}
                  style={{ color: "var(--xani-dim)" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon
                      className="h-4 w-4"
                      style={{ color: "var(--hevsel-400)" }}
                    />
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <div
          className="mt-24 flex flex-col justify-between gap-3 border-t pb-8 pt-6 font-mono text-xs sm:flex-row sm:items-center"
          style={{
            borderColor: "rgba(243,234,217,0.1)",
            color: "var(--xani-faint)",
          }}
        >
          <p>
            ©{" "}
            <span className={newroz ? styles.newrozYear : undefined}>
              {kurdishYear()}
            </span>{" "}
            · {profile.name} · {profile.domain}
            <span className="mx-2" style={{ color: "rgba(243,234,217,0.25)" }}>
              /
            </span>
            {kurdishDate()}
            <span className="mx-2" style={{ color: "rgba(243,234,217,0.25)" }}>
              /
            </span>
            {/* whisper-quiet exit — the only way out */}
            <Link
              href="/kurdi"
              className="transition-colors hover:text-[var(--xani-dim)]"
              style={{ color: "rgba(243,234,217,0.3)" }}
            >
              {ui.contact.exit}
            </Link>
          </p>
          <p className="inline-flex items-center gap-2">
            {ui.contact.builtBy}
            {/* Kawa's hammer, once, outside the Bîr — Çekiçle Felsefe */}
            <KawaHammer
              className="h-4 w-4"
              style={{ color: "var(--zer)" }}
            />
          </p>
        </div>
      </div>

      {/* Sur — the wall as the final horizon */}
      <SurHorizon
        className="block h-14 w-full"
        style={{ color: "#161210" }}
      />
    </footer>
  );
}
