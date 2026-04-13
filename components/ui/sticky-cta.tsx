"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/track";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const registracija = document.getElementById("registracija");

    let heroPast = false;
    let formVisible = false;

    const update = () => setVisible(heroPast && !formVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPast = !entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 }
    );

    if (heroCta) heroObserver.observe(heroCta);
    if (registracija) formObserver.observe(registracija);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        padding: "0.75rem 1rem",
        backgroundColor: "rgba(8,12,8,0.92)",
        borderTop: "1px solid rgba(200,169,110,0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Subtle top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--sand), transparent)",
        }}
      />

      <a
        href="#registracija"
        className="cta-btn"
        onClick={() => trackEvent("cta_click", { button_location: "sticky" })}
        style={{
          fontSize: "1rem",
          padding: "0.75rem 2.5rem",
          letterSpacing: "0.18em",
        }}
      >
        GAUTI PASIŪLYMĄ
      </a>
    </div>
  );
}
