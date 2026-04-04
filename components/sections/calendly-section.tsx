"use client";

/**
 * CalendlySection — inline Calendly booking widget.
 *
 * Rendered only when NEXT_PUBLIC_CALENDLY_URL is set.
 * Script is loaded lazily via next/script afterInteractive.
 */

import { useEffect, useRef } from "react";
import Script from "next/script";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export default function CalendlySection() {
  const widgetRef = useRef<HTMLDivElement>(null);

  /* Re-init widget after Calendly script loads */
  const initWidget = () => {
    if (
      typeof window !== "undefined" &&
      (window as any).Calendly &&
      widgetRef.current
    ) {
      (window as any).Calendly.initInlineWidget({
        url:            CALENDLY_URL,
        parentElement:  widgetRef.current,
        prefill:        {},
        utm:            {},
      });
    }
  };

  /* Attempt init on mount too (if script already cached) */
  useEffect(() => {
    initWidget();
  }, []);

  if (!CALENDLY_URL) return null;

  return (
    <section
      id="pokalbis"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,74,30,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="font-body text-xs uppercase tracking-military mb-3"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              / / &nbsp; Rezervuok laiką
            </p>
            <h2
              className="font-display text-6xl md:text-8xl"
              style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
            >
              PASIKALBĖKIM
              <br />
              <span style={{ color: "var(--sand)" }}>PRIEŠ.</span>
            </h2>
          </div>
          <p
            className="font-body text-base max-w-sm"
            style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
          >
            Turite klausimų? Norėtumėte daugiau sužinoti prieš registruodamiesi?
            Pasirinkite laiką — 15 min. pokalbis, jokių įsipareigojimų.
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-10 h-px"
          style={{ background: "linear-gradient(90deg, var(--sand), transparent)" }}
        />

        {/* Calendly inline widget */}
        <div
          ref={widgetRef}
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{
            minWidth:         "320px",
            height:           "700px",
            border:           "1px solid rgba(200,169,110,0.2)",
            backgroundColor:  "transparent",
          }}
        />

        {/* Calendly script */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onLoad={initWidget}
        />
      </div>
    </section>
  );
}
