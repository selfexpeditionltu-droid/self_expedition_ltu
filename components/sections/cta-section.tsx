"use client";

import { useState, useEffect } from "react";
import { activities } from "@/lib/activities";
import { trackEvent, trackLead } from "@/lib/track";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

export default function CtaSection() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    activity: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  /* Listen for activity pre-selection from the Activities section */
  useEffect(() => {
    const handler = (e: Event) => {
      const activityId = (e as CustomEvent<string>).detail;
      setForm((prev) => ({ ...prev, activity: activityId }));
    };
    window.addEventListener("se:selectActivity", handler);
    return () => window.removeEventListener("se:selectActivity", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    trackEvent("registration_form_submit", { activity: form.activity });
    // TODO: replace with real API endpoint / email service
    await new Promise((r) => setTimeout(r, 900));
    trackLead({ activity: form.activity });
    setStatus("success");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,169,110,0.25)",
    color: "var(--ash)",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    letterSpacing: "0.04em",
    padding: "0.85rem 1.1rem",
    outline: "none",
    transition: "border-color 0.2s",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    borderRadius: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.7rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--sand)",
    marginBottom: "0.4rem",
  };

  return (
    <section
      id="registracija"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--bg)" }} />
      <div className="grid-pattern absolute inset-0" />

      {/* Red corner ribbon */}
      <div
        className="absolute top-0 right-0 w-0 h-0 pointer-events-none"
        style={{ borderLeft: "80px solid transparent", borderTop: "80px solid var(--red)" }}
      />
      <div
        className="absolute top-2 right-3 font-display text-xs rotate-45 pointer-events-none"
        style={{ color: "var(--ash)", letterSpacing: "0.1em", transformOrigin: "center" }}
      >
        NOW
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-body text-xs uppercase tracking-military mb-6"
            style={{ color: "var(--sand)", letterSpacing: "0.25em" }}
          >
            ◈ &nbsp; Vietos ribotos &nbsp; ◈
          </p>
          <h2
            className="font-display text-6xl md:text-9xl mb-6"
            style={{ color: "var(--ash)", letterSpacing: "0.05em" }}
          >
            LAIKAS
            <br />
            <span style={{ color: "var(--sand)" }}>VEIKTI.</span>
          </h2>
          <p
            className="font-body text-xl max-w-xl mx-auto"
            style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
          >
            Kiekviena grupė — maks. 12 žmonių. Vietos užsiima greitai. Nesitikėk, kad rytoj dar bus.
          </p>

          {/* Calendly shortcut */}
          {CALENDLY_URL && (
            <p
              className="font-body text-sm mt-6"
              style={{ color: "var(--ash-dim)" }}
            >
              Dar turite klausimų?{" "}
              <a
                href="#pokalbis"
                onClick={() => trackEvent("calendly_link_click")}
                style={{ color: "var(--sand)", textDecoration: "underline" }}
              >
                Rezervuokite nemokamą pokalbį →
              </a>
            </p>
          )}
        </div>

        {/* Form */}
        {status === "success" ? (
          <div
            className="text-center py-16 px-8"
            style={{ border: "1px solid rgba(200,169,110,0.3)", backgroundColor: "rgba(45,74,30,0.1)" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-14 h-14 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--sand)" }}
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
            </svg>
            <h3 className="font-display text-4xl mb-3" style={{ color: "var(--sand)", letterSpacing: "0.08em" }}>
              GAUTA!
            </h3>
            <p className="font-body text-lg" style={{ color: "var(--ash-dim)" }}>
              Susisieksime su jumis artimiausiu metu. Ruoškitės.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              border: "1px solid rgba(200,169,110,0.2)",
              backgroundColor: "rgba(8,12,8,0.6)",
              padding: "2.5rem",
            }}
          >
            {/* Row 1: name + lastname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="name" style={labelStyle}>Vardas</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jonas"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--sand)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.25)")}
                />
              </div>
              <div>
                <label htmlFor="lastname" style={labelStyle}>Pavardė</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Jonaitis"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--sand)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.25)")}
                />
              </div>
            </div>

            {/* Row 2: phone + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="phone" style={labelStyle}>Tel. numeris</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+370 600 00000"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--sand)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.25)")}
                />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>El. paštas</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jonas@mail.lt"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--sand)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.25)")}
                />
              </div>
            </div>

            {/* Row 3: activity dropdown */}
            <div className="mb-8">
              <label htmlFor="activity" style={labelStyle}>Norima veikla</label>
              <div style={{ position: "relative" }}>
                <select
                  id="activity"
                  name="activity"
                  required
                  value={form.activity}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    paddingRight: "2.5rem",
                    cursor: "pointer",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c8a96e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "calc(100% - 1rem) center",
                  }}
                >
                  <option value="" disabled style={{ backgroundColor: "#0f150f" }}>
                    Pasirink veiklą...
                  </option>
                  {activities
                    .filter((a) => a.id !== "classified")
                    .map((a) => (
                      <option key={a.id} value={a.id} style={{ backgroundColor: "#0f150f" }}>
                        {a.title}
                      </option>
                    ))}
                  <option value="classified" style={{ backgroundColor: "#0f150f" }}>
                    ??? Classified
                  </option>
                  <option value="kita" style={{ backgroundColor: "#0f150f" }}>
                    Kita / Nesuprantu — paaiškinkite man
                  </option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="cta-btn w-full"
              style={{
                fontSize: "1.2rem",
                padding: "1.1rem 2rem",
                opacity: status === "submitting" ? 0.7 : 1,
                cursor: status === "submitting" ? "not-allowed" : "pointer",
              }}
            >
              {status === "submitting" ? "SIUNČIAMA..." : "REGISTRUOTIS"}
            </button>

            <p
              className="text-center mt-4 font-body text-xs"
              style={{ color: "var(--ash-dim)", letterSpacing: "0.05em" }}
            >
              Jūsų duomenys naudojami tik susisiekimui. Vieta — atskleidžiama prieš stovyklą.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
