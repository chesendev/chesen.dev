"use client";

import { useEffect, useRef } from "react";

/**
 * The signature visual: a grid of signal dots driven by a cheap
 * trigonometric field, with a cursor ripple. Canvas 2D, one rAF loop,
 * ~1.5k fillRects/frame — comfortably 60fps on mid-range phones.
 *
 * Discipline:
 * - pauses when offscreen or tab is hidden
 * - static single frame under prefers-reduced-motion
 * - DPR capped at 2
 * - reads --accent-rgb so theme swaps repaint it live
 */
export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let visible = true;
    let inView = true;
    let width = 0;
    let height = 0;
    let cell = 28;
    let dpr = 1;

    const pointer = { x: -9e4, y: -9e4, tx: -9e4, ty: -9e4 };

    let accent = "254, 189, 17";
    const readAccent = () => {
      accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-rgb")
          .trim() || accent;
    };
    readAccent();

    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-overdrive"],
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = width < 640 ? 36 : 28;
    };

    const draw = (t: number) => {
      const overdrive = document.documentElement.hasAttribute(
        "data-overdrive",
      );
      const speed = overdrive ? 6 : 1;
      const time = t * speed;

      // ease pointer toward its target so the ripple feels weighted
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const x = gx * cell;
          const y = gy * cell;

          // ambient drift — two overlapping waves, deliberately not noise-lib fancy
          let alpha =
            0.05 +
            0.045 *
              Math.sin(gx * 0.55 + time * 0.0006) *
              Math.cos(gy * 0.7 - time * 0.0004);

          // cursor ripple
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripple = Math.exp(-dist / 130) * (overdrive ? 0.9 : 0.55);
          alpha += ripple;

          const size = 1.5 + ripple * 4;
          ctx.fillStyle = `rgba(${accent}, ${Math.min(alpha, 0.95)})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && visible && inView && !reduced) {
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.tx = -9e4;
      pointer.ty = -9e4;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) start();
      else stop();
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    resize();

    if (reduced) {
      draw(0); // one calm, static frame
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
