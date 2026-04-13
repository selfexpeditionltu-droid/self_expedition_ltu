"use client";

import { useState } from "react";
import { activities, BADGE_LABELS, BADGE_COLORS, BADGE_TEXT_COLORS, type Badge } from "@/lib/activities";
import { trackEvent } from "@/lib/track";

function BadgeChip({ badge }: { badge: Badge }) {
  return (
    <span
      className="font-body text-xs uppercase px-3 py-1"
      style={{
        color: BADGE_TEXT_COLORS[badge],
        backgroundColor: BADGE_COLORS[badge],
        letterSpacing: "0.12em",
        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
      }}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}

export default function Activities() {
  const [flipped, setFlipped] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setFlipped((prev) => (prev === id ? null : id));
  };

  const handleRegister = (id: string) => {
    trackEvent("cta_click", { button_location: "activity", activity: id });
    window.dispatchEvent(new CustomEvent("se:selectActivity", { detail: id }));
    document.getElementById("registracija")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="veiklos"
      className="relative py-28"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="font-body text-xs uppercase tracking-military mb-3"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              / / &nbsp; Veiklos
            </p>
            <h2
              className="font-display text-6xl md:text-8xl"
              style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
            >
              KĄ
              <br />
              <span style={{ color: "var(--sand)" }}>VEIKSI?</span>
            </h2>
          </div>
          <p
            className="font-body text-base max-w-sm"
            style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
          >
            Kiekviena veikla — atskiras nuotykis. Spausk ant kortelės ir sužinok daugiau.
          </p>
        </div>

        {/* Grid — 3-4-4 on desktop, 2-col on tablet, 1-col on mobile */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-px"
          style={{ backgroundColor: "rgba(200,169,110,0.12)" }}
        >
          {activities.map((activity, index) => {
            const isFlipped = flipped === activity.id;
            // First 3 items span 4 of 12 cols (3×4=12), rest span 3 (4×3=12)
            const colSpan = index < 3 ? "lg:col-span-4" : "lg:col-span-3";
            return (
              <div
                key={activity.id}
                className={`relative col-span-1 sm:col-span-1 ${colSpan}`}
                style={{ perspective: "1000px", minHeight: "360px" }}
              >
                {/* Flip container */}
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.55s ease",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    minHeight: "360px",
                  }}
                >
                  {/* FRONT */}
                  <button
                    className="absolute inset-0 flex flex-col p-8 text-left w-full cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      border: "none",
                    }}
                    onClick={() => handleCardClick(activity.id)}
                    aria-label={`Sužinoti daugiau: ${activity.title}`}
                  >
                    {/* Icon */}
                    <div
                      className="mb-6 w-12 h-12 flex items-center justify-center shrink-0"
                      style={{
                        border: `1px solid ${BADGE_COLORS[activity.badge]}50`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: BADGE_COLORS[activity.badge] }}
                        dangerouslySetInnerHTML={{ __html: activity.icon }}
                      />
                    </div>

                    {/* Badge */}
                    <div className="mb-4">
                      <BadgeChip badge={activity.badge} />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display text-3xl mb-3"
                      style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
                    >
                      {activity.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed flex-1"
                      style={{
                        color: "var(--ash-dim)",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {activity.subtitle}
                    </p>

                    {/* Flip hint */}
                    <p
                      className="font-body text-xs uppercase mt-4 shrink-0"
                      style={{ color: "rgba(200,169,110,0.5)", letterSpacing: "0.12em" }}
                    >
                      Spausk daugiau info →
                    </p>
                  </button>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 flex flex-col p-8"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderLeft: `2px solid ${BADGE_COLORS[activity.badge]}40`,
                    }}
                  >
                    {/* Badge on back */}
                    <div className="mb-4">
                      <BadgeChip badge={activity.badge} />
                    </div>

                    <h3
                      className="font-display text-2xl mb-4"
                      style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
                    >
                      {activity.title}
                    </h3>

                    <p
                      className="font-body text-base leading-relaxed flex-1"
                      style={{ color: "var(--ash-dim)", minHeight: 0, overflowY: "auto" }}
                    >
                      {activity.description}
                    </p>

                    <div className="flex gap-3 mt-4 shrink-0">
                      <button
                        className="cta-btn flex-1"
                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                        onClick={() => handleRegister(activity.id)}
                      >
                        Gauti pasiūlymą
                      </button>
                      <button
                        className="cta-btn-ghost"
                        style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
                        onClick={() => handleCardClick(activity.id)}
                      >
                        ←
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hint */}
        <p
          className="font-body text-xs uppercase mt-6 text-center"
          style={{ color: "var(--ash-dim)", letterSpacing: "0.15em", opacity: 0.6 }}
        >
          ↑ Spausk ant veiklos — sužinok daugiau ir registruokis
        </p>
      </div>
    </section>
  );
}
