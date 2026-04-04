"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import TextScramble from "@/components/ui/text-scramble";
import { trackEvent } from "@/lib/track";

const EmberParticles = dynamic(() => import("@/components/ui/ember-particles"), {
  ssr: false,
});

export default function Hero() {
  const [triggerKey, setTriggerKey] = useState(0);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Real background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/materials/foto-1-12.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "contrast(1.2) brightness(0.38) saturate(0.5)",
        }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(45,74,30,0.4) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(139,26,26,0.25) 0%, transparent 60%),
            linear-gradient(180deg, rgba(8,12,8,0.2) 0%, rgba(8,12,8,0.6) 55%, rgba(8,12,8,1) 100%)
          `,
        }}
      />

      {/* Three.js ember particles */}
      <EmberParticles />

      {/* Horizontal line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--sand), transparent)", zIndex: 3 }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full" style={{ zIndex: 5 }}>
        {/* Overline */}
        <p
          className="font-body text-xs tracking-military mb-6"
          style={{ color: "var(--sand)", letterSpacing: "0.25em" }}
        >
          ◈ &nbsp; LIETUVA &nbsp; / &nbsp; OUTDOOR TRAINING &nbsp; ◈
        </p>

        {/* Headline */}
        <h1
          className="font-display text-7xl md:text-[10rem] lg:text-[13rem] leading-none mb-4"
          style={{ color: "var(--ash)", letterSpacing: "0.04em" }}
        >
          SELF
          <br />
          <span style={{ color: "var(--sand)" }}>EXPEDITION</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="font-display text-2xl md:text-4xl mb-10 max-w-2xl"
          style={{ color: "var(--ash-dim)", letterSpacing: "0.08em" }}
        >
          PERŽENK SAVO RIBAS.
          <br />
          <span style={{ color: "var(--ash)" }}>IŠMOK. IŠGYVEK. STIPRĖK.</span>
        </p>

        {/* Body text */}
        <p
          className="font-body text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          style={{ color: "var(--ash-dim)" }}
        >
          Taktinės išgyvenimo stovyklos, šaudymas, žygiai ir komandinis ugdymas — ne simuliacija, o realybė. Lietuva kaip klasė.
        </p>

        {/* CTA group */}
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="#registracija"
            className="cta-btn"
            onMouseEnter={() => setTriggerKey((k) => k + 1)}
            onClick={() => trackEvent("hero_cta_click")}
          >
            <TextScramble
              text="REGISTRUOTIS"
              triggerKey={triggerKey}
              className="font-display text-xl tracking-military"
            />
          </Link>

          <a
            href="#veiklos"
            className="cta-btn-ghost"
          >
            Veiklos
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="relative w-full border-t"
        style={{ borderColor: "rgba(200,169,110,0.2)", backgroundColor: "rgba(8,12,8,0.85)", zIndex: 5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "200+", label: "Dalyviai" },
            { value: "6", label: "Veiklų tipai" },
            { value: "100%", label: "Lauke, ne salėje" },
            { value: "0", label: "Nuobodžių dienų" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display text-4xl md:text-5xl"
                style={{ color: "var(--sand)" }}
              >
                {stat.value}
              </span>
              <span
                className="font-body text-xs uppercase tracking-wide"
                style={{ color: "var(--ash-dim)", letterSpacing: "0.12em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
