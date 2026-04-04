"use client";

import { useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%";

interface TextScrambleProps {
  text: string;
  className?: string;
  /** Speed in ms per frame step (lower = faster). Default 40. */
  speed?: number;
  /** Trigger a re-scramble when this value changes. */
  triggerKey?: unknown;
}

export default function TextScramble({
  text,
  className,
  speed = 40,
  triggerKey,
}: TextScrambleProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    iterRef.current = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (time - lastTime < speed) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      const iter = iterRef.current;
      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iter) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iter < text.length) {
        iterRef.current += 0.5;
        frameRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text, speed]);

  // Scramble on mount and whenever triggerKey changes
  useEffect(() => {
    scramble();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [scramble, triggerKey]);

  return (
    <span ref={elRef} className={className} aria-label={text}>
      {text}
    </span>
  );
}
