"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, .btn, summary, .project-card, .social-link, .sticky-whatsapp, .faq-item summary";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches
    ) {
      return;
    }

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    // Mutable state kept out of React to avoid re-renders on every move.
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let ringScale = 1;
    let targetScale = 1;
    let clicking = false;
    let visible = false;
    let frame = 0;
    let running = false;

    const paintDot = () => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${
          clicking ? 0.6 : 1
        })`;
      }
    };

    const paintRing = () => {
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }
    };

    const tick = () => {
      ringX += (x - ringX) * 0.2;
      ringY += (y - ringY) * 0.2;
      ringScale += (targetScale - ringScale) * 0.25;
      paintRing();

      if (
        Math.abs(x - ringX) < 0.1 &&
        Math.abs(y - ringY) < 0.1 &&
        Math.abs(targetScale - ringScale) < 0.002
      ) {
        ringX = x;
        ringY = y;
        ringScale = targetScale;
        paintRing();
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    // Primary dot follows the pointer instantly (no rAF gating, no transition).
    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      paintDot();
      if (!visible) {
        visible = true;
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (dot) dot.style.opacity = "1";
        if (ring) ring.style.opacity = "1";
      }
      start();
    };

    // Hover state is only recomputed when the pointer enters a new element,
    // keeping the expensive closest() calls out of the mousemove hot path.
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const onNav = !!target.closest(".navbar, header");
      const interactive = !onNav && !!target.closest(HOVER_SELECTOR);
      targetScale = interactive && !clicking ? 1.5 : 1;
      const opacity = onNav ? "0" : "1";
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.opacity = visible ? opacity : "0";
      if (ring) ring.style.opacity = visible ? opacity : "0";
      start();
    };

    const onDown = () => {
      clicking = true;
      targetScale = 1;
      paintDot();
      start();
    };

    const onUp = () => {
      clicking = false;
      paintDot();
      start();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = false;
      } else {
        start();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-[7px] w-[7px] rounded-full bg-gold opacity-0 shadow-[0_0_14px_rgba(201,168,76,0.8)] transition-opacity duration-200 will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-[38px] w-[38px] rounded-full border-[1.5px] border-gold/55 bg-gold/[0.04] opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </>
  );
}
