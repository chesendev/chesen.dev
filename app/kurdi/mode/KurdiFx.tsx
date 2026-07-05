"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "../../components/motion";
import styles from "./kurdi.module.css";
import { ui } from "./strings";

/**
 * The mode's ambient moments: typed sequences (newroz, amedspor),
 * Kawa's ember burst, the tifo sweep, and the toast. Everything is
 * reduced-motion aware and cleans up after itself.
 */
export function KurdiFx() {
  const [message, setMessage] = useState<string | null>(null);
  const [tifo, setTifo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [embers, setEmbers] = useState(false);

  // toast
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener("chesen:toast", onToast);
    return () => {
      window.removeEventListener("chesen:toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  // typed sequences
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      buffer = (buffer + e.key.toLowerCase()).slice(-12);
      if (buffer.endsWith("newroz")) {
        buffer = "";
        setEmbers(true);
      } else if (buffer.endsWith("amedspor")) {
        buffer = "";
        setTifo(true);
        setTimeout(() => setTifo(false), 1700);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Kawa's fire: one anvil-strike spark, then embers rising
  useEffect(() => {
    if (!embers) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      window.dispatchEvent(
        new CustomEvent("chesen:toast", { detail: ui.eggs.newrozToast }),
      );
      setEmbers(false);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      setEmbers(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h * 0.72;

    type Ember = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
    };
    const particles: Ember[] = Array.from({ length: 110 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const speed = 2 + Math.random() * 5;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        hue: 20 + Math.random() * 30, // ember oranges into zer
      };
    });

    let raf = 0;
    let start = 0;
    const draw = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      ctx.clearRect(0, 0, w, h);

      // the anvil strike — a flash line, first 120ms only
      if (elapsed < 120) {
        ctx.strokeStyle = `rgba(254,189,17,${1 - elapsed / 120})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 26, cy + 8);
        ctx.lineTo(cx + 20, cy - 30);
        ctx.stroke();
      }

      let alive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity, gentle — embers drift
        p.vx *= 0.99;
        p.life -= 0.011;
        ctx.fillStyle = `hsla(${p.hue}, 95%, 58%, ${Math.max(p.life, 0)})`;
        ctx.fillRect(p.x, p.y, 2.4, 2.4);
      }

      if (alive && elapsed < 2600) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, w, h);
        setEmbers(false);
        window.dispatchEvent(
          new CustomEvent("chesen:toast", { detail: ui.eggs.newrozToast }),
        );
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [embers]);

  return (
    <>
      {embers && <canvas ref={canvasRef} className={styles.spark} />}

      {tifo && (
        <div className={styles.tifo} aria-hidden="true">
          <div className={styles.tifoPanel} />
          <div className={styles.tifoPanel} />
          <p className={styles.tifoChant}>{ui.eggs.amedsporChant}</p>
        </div>
      )}

      <AnimatePresence>
        {message && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 border px-4 py-2 font-mono text-xs shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]"
            style={{
              background: "var(--basalt)",
              borderColor: "rgba(243,234,217,0.15)",
              color: "var(--xani)",
            }}
          >
            <span className="mr-2" style={{ color: "var(--zer)" }}>
              ▸
            </span>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
