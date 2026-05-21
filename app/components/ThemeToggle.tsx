"use client";

import { useEffect, useState } from "react";

const THEMES = [
  {
    id: "orange" as const,
    color: "#fb923c",
    label: "Modern orange",
  },
  {
    id: "gold" as const,
    color: "#fbbf24",
    label: "Altın sarısı",
  },
];

type ThemeId = (typeof THEMES)[number]["id"];
const STORAGE_KEY = "theme";

function applyTheme(next: ThemeId) {
  const root = document.documentElement;
  if (next === "orange") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = next;
  }
  try {
    if (next === "orange") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* localStorage may be blocked — that's fine */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>("orange");
  const [mounted, setMounted] = useState(false);

  // Sync state with whatever the no-FOUC script set on <html>
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "gold") setTheme("gold");
    setMounted(true);
  }, []);

  const switchTo = (next: ThemeId) => {
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur"
    >
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTo(t.id)}
            aria-label={`Switch to ${t.label}`}
            aria-pressed={active}
            title={t.label}
            className={`relative h-5 w-5 cursor-pointer rounded-full outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/40 ${
              mounted && active
                ? "scale-110 shadow-[0_0_10px_rgba(255,255,255,0.18)]"
                : "opacity-55 hover:opacity-90"
            }`}
            style={{ background: t.color }}
          >
            {mounted && active && (
              <span
                aria-hidden="true"
                className="absolute -inset-[3px] rounded-full ring-1 ring-white/40"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
