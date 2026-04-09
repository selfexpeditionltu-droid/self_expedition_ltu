"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Load WebGL shader client-side only (no SSR)
const StarshipShader = dynamic(
  () => import("@/components/ui/starship-shader").then((m) => m.StarshipShader),
  { ssr: false }
);

const instructors = [
  {
    id: 1,
    callsign: "ČEKAS",
    service: "11 metų tarnybos · 7 metai snaiperių būryje",
    courses:
      "Taiklaus šaulio, snaiperio, kovinės savigynos, plaukimo instruktoriaus, skyriaus vado, lyderystės kursai.",
    internal: "Motorizuotos žvalgybos kursas.",
    photo: "/materials/Instruktoriai/cekas.jpeg",
  },
  {
    id: 2,
    callsign: "EDZIA",
    service: "7 metai tarnybos žvalgyboje · 1 metai snaiperių būryje",
    courses:
      "Pradinio patrulio, taikliojo šaulio, Patrulio, TCCC (taktinės medicinos), kopimo-nusileidimo, aukštesniojo lygio taktinių šuolių parašiutu kursai. Planavimas, taktika ir plaukimas — stipriosios kario pusės.",
    internal: "Motorizuotos žvalgybos kursas.",
    photo: "/materials/Instruktoriai/edzia.jpg",
  },
  {
    id: 3,
    callsign: "MILKĖ",
    service: "9 metai tarnybos · 7 metai snaiperių būryje",
    courses:
      "Snaiperio, taikliojo šaulio, pistoleto valdymo, skyriaus vado, lyderystės, parašiutizmo kursai.",
    internal: "Bazinių sprogdinimo darbų, Close Air Support, motorizuotos žvalgybos kursai.",
    photo: "/materials/Instruktoriai/milke.jpg",
  },
  {
    id: 4,
    callsign: "STIKLAS",
    service: "7 metai žvalgybos būryje",
    courses:
      "Pradinis žvalgo kursas, motorizuota žvalgyba, parašiutizmo, žvalgo vado, kopimo nusileidimo kursai.",
    internal: null,
    photo: "/materials/Instruktoriai/stiklas.jpg",
  },
];

export default function Instructors() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section
      id="instruktoriai"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      {/* WebGL rocket-streak background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <StarshipShader />
      </div>

      {/* Vignette — fades the shader into the section edges so it blends */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 80% 70% at 70% 50%, transparent 0%, var(--bg-elevated) 75%)",
        }}
      />

      {/* Section content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(180deg, transparent, var(--sand), transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <p
              className="font-body text-xs uppercase tracking-military mb-4"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              / / &nbsp; Komanda
            </p>
            <h2
              className="font-display text-6xl md:text-8xl mb-6"
              style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
            >
              MŪSŲ
              <br />
              <span style={{ color: "var(--sand)" }}>INSTRUKTORIAI</span>
            </h2>
            <p
              className="font-body text-lg max-w-xl"
              style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
            >
              Buvę snaiperiai, žvalgai ir spec. operacijų kariai — visi su realia lauko patirtimi.
            </p>
          </div>

          {/* Cards grid */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: "rgba(200,169,110,0.12)" }}
          >
            {instructors.map((person) => {
              const isActive = activeId === person.id;
              return (
                <div
                  key={person.id}
                  className="relative overflow-hidden cursor-pointer select-none"
                  style={{ aspectRatio: "3 / 4", backgroundColor: "var(--bg-elevated)" }}
                  onMouseEnter={() => setActiveId(person.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(isActive ? null : person.id)}
                >
                  {/* Photo */}
                  <img
                    src={person.photo}
                    alt={person.callsign}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.7)" }}
                  />

                  {/* Always-visible bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16"
                    style={{
                      background: "linear-gradient(to top, rgba(10,10,8,0.92) 0%, transparent 100%)",
                      transition: "opacity 300ms ease",
                      opacity: isActive ? 0 : 1,
                    }}
                  >
                    <h3
                      className="font-display text-xl md:text-2xl"
                      style={{ color: "var(--ash)", letterSpacing: "0.08em" }}
                    >
                      {person.callsign}
                    </h3>
                    <p
                      className="font-body text-xs mt-1"
                      style={{ color: "var(--sand)", letterSpacing: "0.1em", lineHeight: 1.6 }}
                    >
                      {person.service}
                    </p>
                  </div>

                  {/* Slide-up bio overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end px-5 pb-5 pt-8"
                    style={{
                      backgroundColor: "rgba(10,10,8,0.93)",
                      transform: isActive ? "translateY(0)" : "translateY(100%)",
                      transition: "transform 420ms cubic-bezier(0.32, 0, 0.2, 1)",
                      borderTop: "1px solid rgba(200,169,110,0.2)",
                    }}
                  >
                    <h3
                      className="font-display text-xl md:text-2xl mb-1"
                      style={{ color: "var(--ash)", letterSpacing: "0.08em" }}
                    >
                      {person.callsign}
                    </h3>
                    <p
                      className="font-body text-xs mb-4"
                      style={{ color: "var(--sand)", letterSpacing: "0.1em", lineHeight: 1.6 }}
                    >
                      {person.service}
                    </p>
                    <div
                      className="w-6 mb-4"
                      style={{ height: "1px", backgroundColor: "rgba(200,169,110,0.35)" }}
                    />
                    <p
                      className="font-body text-sm leading-relaxed mb-3"
                      style={{ color: "var(--ash-dim)" }}
                    >
                      {person.courses}
                    </p>
                    {person.internal && (
                      <p
                        className="font-body text-xs"
                        style={{ color: "rgba(200,169,110,0.6)", letterSpacing: "0.05em" }}
                      >
                        Vidiniai: {person.internal}
                      </p>
                    )}
                    {/* Mobile close hint */}
                    <p
                      className="font-body text-xs mt-4 lg:hidden"
                      style={{ color: "rgba(200,169,110,0.35)", letterSpacing: "0.1em" }}
                    >
                      ✕ palieskite, norėdami uždaryti
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
