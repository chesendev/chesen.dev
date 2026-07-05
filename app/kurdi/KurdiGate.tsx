"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./gate.module.css";

const MODE_KEY = "chesen:mode";
const COUNT_KEY = "chesen:kurdi:n";

function activate() {
  try {
    localStorage.setItem(MODE_KEY, "kurdi");
    const n = parseInt(localStorage.getItem(COUNT_KEY) ?? "0", 10) || 0;
    localStorage.setItem(COUNT_KEY, String(n + 1));
  } catch {
    /* mode still works for this visit */
  }
  const root = document.documentElement;
  root.dataset.mode = "kurdi";
  root.lang = "kmr";
}

function deactivate() {
  try {
    localStorage.removeItem(MODE_KEY);
  } catch {
    /* ignore */
  }
  const root = document.documentElement;
  delete root.dataset.mode;
  root.removeAttribute("data-kurdi-ready");
  root.lang = "en";
}

/**
 * The only gate. Visiting toggles the mode. Entry plays a short dawn —
 * layered Zagros ridgelines in red→white→green light, a golden sun —
 * the single overt tricolor moment in the whole mode. Skippable, ≤1.5s.
 */
export function KurdiGate() {
  const router = useRouter();
  const [dawn, setDawn] = useState(false);
  const finishedRef = useRef(false);
  // Jan 22 — four lamps on the horizon. Unlabeled.
  const fourLamps =
    new Date().getMonth() === 0 && new Date().getDate() === 22;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    activate();
    router.replace("/");
  }, [router]);

  useEffect(() => {
    if (document.documentElement.dataset.mode === "kurdi") {
      deactivate();
      router.replace("/");
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      finish();
      return;
    }
    setDawn(true);
    const timer = setTimeout(finish, 1500);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [router, finish]);

  if (!dawn) return null;

  return (
    <div
      className={styles.stage}
      onClick={finish}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.sky} />

      <svg className={styles.sun} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="14" fill="currentColor" />
      </svg>

      {fourLamps && (
        <div className={styles.lamps}>
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      <svg
        className={styles.ridge}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{ height: "44%" }}
      >
        <path
          d="M0 220V150l90-52 70 30 110-68 90 44 120-60 110 52 90-36 120 58 100-44 110 50 90-28 100 44v130Z"
          fill="#141110"
        />
      </svg>
      <svg
        className={`${styles.ridge} ${styles.ridgeMid}`}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{ height: "32%" }}
      >
        <path
          d="M0 220V120l120-46 90 34 130-58 100 40 140-52 110 44 130-38 120 48 130-30 130 42v116Z"
          fill="#100d0b"
        />
      </svg>
      <svg
        className={`${styles.ridge} ${styles.ridgeFar}`}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{ height: "22%" }}
      >
        <path
          d="M0 220V96l150-40 120 32 160-48 130 36 170-42 140 38 160-30 170 40v138Z"
          fill="#0d0b09"
        />
      </svg>

      <p className={styles.hint}>···</p>
    </div>
  );
}
