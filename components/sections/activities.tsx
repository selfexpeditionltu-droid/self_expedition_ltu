"use client";

import { activities, BADGE_LABELS, BADGE_COLORS, BADGE_TEXT_COLORS, type Badge } from "@/lib/activities";
import { trackEvent } from "@/lib/track";

function BadgeChip({ badge }: { badge: Badge }) {
  const isLegendary = badge === "legendary";

  return (
    <span
      className="font-body text-xs uppercase px-3 py-1"
      style={{
        color: BADGE_TEXT_COLORS[badge],
        backgroundColor: BADGE_COLORS[badge],
        letterSpacing: "0.12em",
        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
        boxShadow: isLegendary ? "0 0 12px rgba(200,169,110,0.5)" : "none",
        animation: isLegendary ? "glow 3s ease-in-out infinite" : "none",
        border: badge === "classified" ? "1px solid #3d2a5a" : "none",
      }}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}

export default function Activities() {
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
            Kiekviena veikla — atskiras iššūkis. Pasirink, kiek tau sunku. Bet žinok — <span style={{ color: "var(--sand)" }}>lengvo pasirinkimo čia nėra.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(200,169,110,0.12)" }}>
          {activities.map((activity, i) => (
            <button
              key={activity.id}
              className="relative group flex flex-col p-8 transition-colors duration-300 overflow-hidden text-left w-full"
              style={{
                backgroundColor: "var(--bg)",
                animationDelay: `${i * 80}ms`,
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => {
                trackEvent("activity_card_click", { activity: activity.id });
                window.dispatchEvent(
                  new CustomEvent("se:selectActivity", { detail: activity.id })
                );
                document.getElementById("registracija")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={`Registruotis: ${activity.title}`}
            >
              {/* Background image on hover */}
              {activity.image && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `url(${activity.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.2) saturate(0.6)",
                  }}
                />
              )}

              {/* Hover tint overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: "rgba(45,74,30,0.12)" }}
              />

              {/* Icon */}
              <div
                className="relative mb-6 w-12 h-12 flex items-center justify-center transition-colors duration-300"
                style={{
                  border: `1px solid ${BADGE_COLORS[activity.badge]}50`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: BADGE_COLORS[activity.badge] }}
                >
                  <path d={activity.icon} />
                </svg>
              </div>

              {/* Badge */}
              <div className="relative mb-4">
                <BadgeChip badge={activity.badge} />
              </div>

              {/* Title */}
              <h3
                className="relative font-display text-3xl mb-1 group-hover:text-sand transition-colors duration-200"
                style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
              >
                {activity.title}
              </h3>
              <p
                className="relative font-body text-xs uppercase tracking-wide mb-4"
                style={{ color: "var(--ash-dim)", letterSpacing: "0.15em" }}
              >
                {activity.subtitle}
              </p>

              {/* Description */}
              <p
                className="relative font-body text-base leading-relaxed mt-auto"
                style={{ color: "var(--ash-dim)" }}
              >
                {activity.description}
              </p>

              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderTop: `1px solid ${BADGE_COLORS[activity.badge]}`,
                  borderLeft: `1px solid ${BADGE_COLORS[activity.badge]}`,
                  transform: "rotate(180deg)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Click hint */}
        <p
          className="font-body text-xs uppercase mt-6 text-center"
          style={{ color: "var(--ash-dim)", letterSpacing: "0.15em", opacity: 0.6 }}
        >
          ↑ Spausk ant veiklos — ir pereisi tiesiai prie registracijos
        </p>
      </div>
    </section>
  );
}
