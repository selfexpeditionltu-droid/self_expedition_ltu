"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

const SCROLL_MILESTONES = [25, 50, 75, 90];
const TIME_MILESTONES = [30, 60, 180]; // seconds
const SECTIONS = [
  { id: "veiklos", label: "activities" },
  { id: "registracija", label: "registration" },
  { id: "footer", label: "footer" },
];

export default function EngagementTracker() {
  // Scroll depth
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackEvent("scroll_depth", { percent: milestone });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Time on page
  useEffect(() => {
    const timers = TIME_MILESTONES.map((seconds) =>
      setTimeout(() => trackEvent("time_on_page", { seconds }), seconds * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Section visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const { id, label } of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;

      let fired = false;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            trackEvent("section_view", { section: label });
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
