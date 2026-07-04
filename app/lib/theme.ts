export type ThemeId = "ember" | "gold";

const KEY = "theme";

export function currentTheme(): ThemeId {
  return document.documentElement.dataset.theme === "gold" ? "gold" : "ember";
}

export function applyTheme(theme: ThemeId) {
  const root = document.documentElement;
  if (theme === "gold") {
    root.dataset.theme = "gold";
  } else {
    delete root.dataset.theme;
  }
  try {
    if (theme === "gold") localStorage.setItem(KEY, "gold");
    else localStorage.removeItem(KEY);
  } catch {
    /* private mode — theme just won't persist */
  }
}

export function toggleTheme(): ThemeId {
  const next: ThemeId = currentTheme() === "gold" ? "ember" : "gold";
  applyTheme(next);
  return next;
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("chesen:toast", { detail: message }));
}
