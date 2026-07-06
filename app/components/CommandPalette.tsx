"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nav, profile, socials } from "../../content/site";
import { toast } from "../lib/toast";
import { EASE } from "./motion";

type Command = {
  id: string;
  group: "Navigate" | "Actions" | "Links";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ block: "start" });
}

export function CommandPalette() {
  const reduced = useReducedMotion();
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
        group: "Navigate",
        label: "Top",
        keywords: "home hero start",
        run: () => scrollToSection("#top"),
      },
      ...nav.map((item) => ({
        id: `nav-${item.href}`,
        group: "Navigate" as const,
        label: item.label,
        keywords: "section go jump",
        run: () => scrollToSection(item.href),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email",
        hint: profile.email,
        keywords: "mail contact reach hire",
        run: () => {
          navigator.clipboard
            .writeText(profile.email)
            .then(() => toast("Email copied — talk soon."))
            .catch(() => toast("Clipboard blocked — email is in Contact."));
        },
      },
      {
        id: "barrel-roll",
        group: "Actions",
        label: "Do a barrel roll",
        keywords: "spin fun easter egg roll",
        run: () => window.dispatchEvent(new Event("chesen:barrel")),
      },
      {
        id: "link-github",
        group: "Links",
        label: "GitHub",
        hint: "chesendev",
        keywords: "code repos source",
        run: () => window.open(socials.github.url, "_blank", "noopener"),
      },
      {
        id: "link-linkedin",
        group: "Links",
        label: "LinkedIn",
        keywords: "profile career",
        run: () => window.open(socials.linkedin.url, "_blank", "noopener"),
      },
    ],
    [],
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

  // global hotkey + external open requests (nav button)
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
            aria-label="Command palette"
            initial={reduced ? {} : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="mx-auto mt-[16vh] w-[min(92vw,560px)] overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={
                results[selected] ? `cmd-${results[selected].id}` : undefined
              }
              placeholder="Type a command…"
              className="w-full border-b border-zinc-800 bg-transparent px-5 py-4 font-mono text-sm text-foreground placeholder:text-zinc-600 focus:outline-none"
            />

            <ul
              id="palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[46vh] overflow-y-auto py-2"
            >
              {results.length === 0 && (
                <li className="px-5 py-6 font-mono text-xs text-zinc-600">
                  Nothing matches “{query}”. Try “email”.
                </li>
              )}
              {results.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                const active = i === selected;
                return (
                  <li key={cmd.id}>
                    {showGroup && (
                      <p className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                        {cmd.group}
                      </p>
                    )}
                    <button
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={active}
                      type="button"
                      onClick={() => {
                        close();
                        cmd.run();
                      }}
                      onPointerMove={() => setSelected(i)}
                      className={`flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-zinc-900 text-foreground shadow-[inset_2px_0_0_var(--color-accent)]"
                          : "text-zinc-400"
                      }`}
                    >
                      <span>{cmd.label}</span>
                      {cmd.hint && (
                        <span className="truncate font-mono text-xs text-zinc-600">
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-zinc-800 px-5 py-2.5 font-mono text-[10px] text-zinc-600">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
