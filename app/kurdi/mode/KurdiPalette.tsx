"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, socials } from "../../../content/site";
import { EASE } from "../../components/motion";
import { toast } from "../../lib/toast";
import { Sun21 } from "./glyphs";
import { ui } from "./strings";

type Command = {
  id: string;
  group: "navigate" | "actions" | "links";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ block: "start" });
}

/** The command palette, re-voiced in Kurmanji, crowned with the sun. */
export function KurdiPalette() {
  const reduced = useReducedMotion();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
    restoreFocusRef.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "nav-top",
        group: "navigate",
        label: ui.palette.top,
        keywords: "serî jor top",
        run: () => scrollToSection("#top"),
      },
      ...ui.nav.map((item) => ({
        id: `nav-${item.href}`,
        group: "navigate" as const,
        label: item.label,
        keywords: "biçe beş",
        run: () => scrollToSection(item.href),
      })),
      {
        id: "copy-email",
        group: "actions",
        label: ui.palette.copyEmail,
        hint: profile.email,
        keywords: "email mail têkilî kopî",
        run: () => {
          navigator.clipboard
            .writeText(profile.email)
            .then(() => toast(ui.contact.copied))
            .catch(() => toast(profile.email));
        },
      },
      {
        id: "exit-mode",
        group: "actions",
        label: ui.palette.exitMode,
        keywords: "derkeve exit vegere",
        run: () => router.push("/kurdi"),
      },
      {
        id: "link-github",
        group: "links",
        label: "GitHub",
        hint: "chesendev",
        keywords: "kod çavkanî",
        run: () => window.open(socials.github.url, "_blank", "noopener"),
      },
      {
        id: "link-linkedin",
        group: "links",
        label: "LinkedIn",
        keywords: "profîl kar",
        run: () => window.open(socials.linkedin.url, "_blank", "noopener"),
      },
      {
        id: "link-whatsapp",
        group: "links",
        label: "WhatsApp",
        keywords: "peyam telefon",
        run: () => window.open(socials.whatsapp.url, "_blank", "noopener"),
      },
    ],
    [router],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""} ${c.hint ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            restoreFocusRef.current = document.activeElement as HTMLElement;
          }
          return !prev;
        });
      }
    };
    const onOpen = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("chesen:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("chesen:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(
        (s) =>
          (s - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[selected];
      if (cmd) {
        close();
        cmd.run();
      }
    }
  };

  let lastGroup: Command["group"] | null = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] bg-black/70"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta fermanan"
            initial={reduced ? {} : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }
            }
            transition={{ duration: 0.18, ease: EASE }}
            className="mx-auto mt-[16vh] w-[min(92vw,560px)] overflow-hidden border shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)]"
            style={{
              background: "var(--basalt)",
              borderColor: "rgba(243,234,217,0.14)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 border-b px-5"
              style={{ borderColor: "rgba(243,234,217,0.12)" }}
            >
              <span style={{ color: "var(--zer)" }}>
                <Sun21 size={18} />
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="kurdi-palette-list"
                aria-activedescendant={
                  results[selected]
                    ? `kcmd-${results[selected].id}`
                    : undefined
                }
                placeholder={ui.palette.placeholder}
                className="w-full bg-transparent py-4 font-mono text-sm focus:outline-none"
                style={{ color: "var(--xani)" }}
              />
            </div>

            <ul
              id="kurdi-palette-list"
              role="listbox"
              aria-label="Ferman"
              className="max-h-[46vh] overflow-y-auto py-2"
            >
              {results.length === 0 && (
                <li
                  className="px-5 py-6 font-mono text-xs"
                  style={{ color: "var(--xani-faint)" }}
                >
                  {ui.palette.empty}
                </li>
              )}
              {results.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                const active = i === selected;
                return (
                  <li key={cmd.id}>
                    {showGroup && (
                      <p
                        className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em]"
                        style={{ color: "var(--hevsel-500)" }}
                      >
                        {ui.palette.groups[cmd.group]}
                      </p>
                    )}
                    <button
                      id={`kcmd-${cmd.id}`}
                      role="option"
                      aria-selected={active}
                      type="button"
                      onClick={() => {
                        close();
                        cmd.run();
                      }}
                      onPointerMove={() => setSelected(i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left text-sm transition-colors"
                      style={{
                        background: active ? "var(--basalt-2)" : "transparent",
                        color: active ? "var(--xani)" : "var(--xani-dim)",
                        boxShadow: active
                          ? "inset 2px 0 0 var(--zer)"
                          : undefined,
                      }}
                    >
                      <span>{cmd.label}</span>
                      {cmd.hint && (
                        <span
                          className="truncate font-mono text-xs"
                          style={{ color: "var(--xani-faint)" }}
                        >
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className="border-t px-5 py-2.5 font-mono text-[10px]"
              style={{
                borderColor: "rgba(243,234,217,0.12)",
                color: "var(--xani-faint)",
              }}
            >
              {ui.palette.hints}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
