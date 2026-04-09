"use client";

import { useState, useEffect } from "react";
import { activities } from "@/lib/activities";
import { trackEvent, trackLead } from "@/lib/track";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

const PRIVACY_POLICY = `PRIVATUMO POLITIKA

Duomenų valdytojas: Self Expedition

Kokius duomenis renkame:
Vardą, pavardę, el. pašto adresą ir telefono numerį, kuriuos pateikiate registracijos formoje.

Kam naudojame:
• Susisiekimui dėl stovyklos organizacinių detalių
• Informacijos apie stovyklos vietą atskleidimui prieš renginį
• Naujienlaiškių ir informacijos apie būsimas stovyklas siuntimui (tik gavus jūsų sutikimą)

Teisinis pagrindas:
Duomenys tvarkomi remiantis jūsų sutikimu (BDAR 6 str. 1 d. a p.).

Saugojimo terminas:
Duomenys saugomi 2 metus po paskutinio kontakto arba kol atšaukiate sutikimą.

Jūsų teisės:
Turite teisę bet kada atšaukti sutikimą, prašyti patikslinti, ištrinti arba eksportuoti savo duomenis. Susisiekite: info@selfexpedition.lt

Duomenys neperduodami trečiosioms šalims be jūsų sutikimo.`;

export default function CtaSection() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    activities: [] as string[],
    comments: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [consent, setConsent] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ name: "", lastname: "", phone: "", email: "" });
  const [activityError, setActivityError] = useState(false);

  /* Listen for activity pre-selection from the Activities section */
  useEffect(() => {
    const handler = (e: Event) => {
      const activityId = (e as CustomEvent<string>).detail;
      setForm((prev) => ({
        ...prev,
        activities: prev.activities.includes(activityId)
          ? prev.activities
          : [...prev.activities, activityId],
      }));
    };
    window.addEventListener("se:selectActivity", handler);
    return () => window.removeEventListener("se:selectActivity", handler);
  }, []);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!value.trim()) return "Įveskite telefono numerį.";
    if (!/^\+?[\d\s\-().]+$/.test(value)) return "Neteisingas telefono numerio formatas.";
    if (digits.length !== 11) return "Neteisingas telefono numerio formatas.";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Įveskite el. pašto adresą.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Neteisingas el. pašto formatas.";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: "" }));
    if (name === "lastname" && fieldErrors.lastname) setFieldErrors((prev) => ({ ...prev, lastname: "" }));
    if (name === "phone" && fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: "" }));
    if (name === "email" && fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
  };

  const toggleActivity = (id: string) => {
    setForm((prev) => {
      const next = prev.activities.includes(id)
        ? prev.activities.filter((a) => a !== id)
        : [...prev.activities, id];
      if (next.length > 0) setActivityError(false);
      return { ...prev, activities: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = form.name.trim() ? "" : "Įveskite savo vardą.";
    const lastnameErr = form.lastname.trim() ? "" : "Įveskite savo pavardę.";
    const phoneErr = validatePhone(form.phone);
    const emailErr = validateEmail(form.email);
    const noActivity = form.activities.length === 0;
    setFieldErrors({ name: nameErr, lastname: lastnameErr, phone: phoneErr, email: emailErr });
    setActivityError(noActivity);
    if (!consent) setConsentError(true);
    if (nameErr || lastnameErr || phoneErr || emailErr || noActivity || !consent) return;
    setConsentError(false);
    setStatus("submitting");
    trackEvent("registration_form_submit", { activity: form.activities.join(", ") });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, activity: form.activities.join(", "), consentMarketing }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead({ activity: form.activities.join(", ") });
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
        {status === "error" && (
          <p
            className="text-center font-body text-sm mb-6 py-3 px-4"
            style={{ color: "#e05c5c", border: "1px solid rgba(224,92,92,0.3)", backgroundColor: "rgba(224,92,92,0.05)" }}
          >
            Klaida siunčiant. Bandykite dar kartą arba susisiekite tiesiogiai.
          </p>
        )}
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
                  style={{ ...inputStyle, borderColor: fieldErrors.name ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)" }}
                  onFocus={(e) => (e.target.style.borderColor = fieldErrors.name ? "rgba(224,92,92,0.7)" : "var(--sand)")}
                  onBlur={(e) => {
                    const err = form.name.trim() ? "" : "Įveskite savo vardą.";
                    setFieldErrors((prev) => ({ ...prev, name: err }));
                    e.target.style.borderColor = err ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)";
                  }}
                />
                {fieldErrors.name && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "0.35rem" }}>
                    {fieldErrors.name}
                  </p>
                )}
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
                  style={{ ...inputStyle, borderColor: fieldErrors.lastname ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)" }}
                  onFocus={(e) => (e.target.style.borderColor = fieldErrors.lastname ? "rgba(224,92,92,0.7)" : "var(--sand)")}
                  onBlur={(e) => {
                    const err = form.lastname.trim() ? "" : "Įveskite savo pavardę.";
                    setFieldErrors((prev) => ({ ...prev, lastname: err }));
                    e.target.style.borderColor = err ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)";
                  }}
                />
                {fieldErrors.lastname && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "0.35rem" }}>
                    {fieldErrors.lastname}
                  </p>
                )}
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
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.phone ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = fieldErrors.phone ? "rgba(224,92,92,0.7)" : "var(--sand)")}
                  onBlur={(e) => {
                    const err = validatePhone(form.phone);
                    setFieldErrors((prev) => ({ ...prev, phone: err }));
                    e.target.style.borderColor = err ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)";
                  }}
                />
                {fieldErrors.phone && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "0.35rem" }}>
                    {fieldErrors.phone}
                  </p>
                )}
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
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.email ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = fieldErrors.email ? "rgba(224,92,92,0.7)" : "var(--sand)")}
                  onBlur={(e) => {
                    const err = validateEmail(form.email);
                    setFieldErrors((prev) => ({ ...prev, email: err }));
                    e.target.style.borderColor = err ? "rgba(224,92,92,0.7)" : "rgba(200,169,110,0.25)";
                  }}
                />
                {fieldErrors.email && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "0.35rem" }}>
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: activity multi-select */}
            <div className="mb-5">
              <label style={labelStyle}>Norima veikla <span style={{ color: "rgba(200,169,110,0.5)", fontWeight: 400 }}>(galima rinktis kelias)</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activities.map((a) => {
                  const checked = form.activities.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleActivity(a.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.65rem 0.9rem",
                        backgroundColor: checked ? "rgba(200,169,110,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${checked ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.2)"}`,
                        color: checked ? "var(--sand)" : "var(--ash-dim)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "border-color 0.15s, background-color 0.15s, color 0.15s",
                      }}
                    >
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          flexShrink: 0,
                          border: `1px solid ${checked ? "var(--sand)" : "rgba(200,169,110,0.35)"}`,
                          backgroundColor: checked ? "var(--sand)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.15s, border-color 0.15s",
                        }}
                      >
                        {checked && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3l2 2 4-4" stroke="#0f150f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      {a.title}
                    </button>
                  );
                })}
              </div>
              {activityError && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "0.5rem" }}>
                  Pasirinkite bent vieną veiklą.
                </p>
              )}
            </div>

            {/* Row 4: comments */}
            <div className="mb-8">
              <label htmlFor="comments" style={labelStyle}>
                Komentarai <span style={{ color: "rgba(200,169,110,0.5)", fontWeight: 400 }}>(neprivaloma)</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                value={form.comments}
                onChange={handleChange}
                rows={4}
                placeholder="pavyzdžiui: komandos dydis, veiklos trukmė, biudžetas"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "110px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--sand)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.25)")}
              />
            </div>

            {/* GDPR consent */}
            <div className="mb-5 flex flex-col gap-3">
              {/* Consent 1 — required */}
              <button
                type="button"
                onClick={() => {
                  setConsent((v) => !v);
                  if (!consent) setConsentError(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: consent ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${consentError && !consent ? "rgba(224,92,92,0.6)" : consent ? "rgba(200,169,110,0.5)" : "rgba(200,169,110,0.18)"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s, background-color 0.15s",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    flexShrink: 0,
                    marginTop: "0.15rem",
                    border: `1px solid ${consentError && !consent ? "rgba(224,92,92,0.7)" : consent ? "var(--sand)" : "rgba(200,169,110,0.35)"}`,
                    backgroundColor: consent ? "var(--sand)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.15s, border-color 0.15s",
                  }}
                >
                  {consent && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#0f150f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.03em",
                    color: consentError && !consent ? "#e07070" : consent ? "var(--ash)" : "var(--ash-dim)",
                    lineHeight: 1.55,
                    transition: "color 0.15s",
                  }}
                >
                  Sutinku, kad mano duomenys būtų naudojami susisiekti su manimi dėl užklausos.{" "}
                  <span
                    onClick={(e) => { e.stopPropagation(); setShowPolicy(true); }}
                    style={{
                      color: "var(--sand)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Privatumo politika
                  </span>
                </span>
              </button>

              {consentError && !consent && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#e07070", letterSpacing: "0.04em", marginTop: "-0.5rem" }}>
                  Prašome patvirtinti sutikimą prieš siunčiant.
                </p>
              )}

              {/* Consent 2 — optional */}
              <button
                type="button"
                onClick={() => setConsentMarketing((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: consentMarketing ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${consentMarketing ? "rgba(200,169,110,0.5)" : "rgba(200,169,110,0.18)"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s, background-color 0.15s",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    flexShrink: 0,
                    marginTop: "0.15rem",
                    border: `1px solid ${consentMarketing ? "var(--sand)" : "rgba(200,169,110,0.35)"}`,
                    backgroundColor: consentMarketing ? "var(--sand)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.15s, border-color 0.15s",
                  }}
                >
                  {consentMarketing && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#0f150f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.03em",
                    color: consentMarketing ? "var(--ash)" : "var(--ash-dim)",
                    lineHeight: 1.55,
                    transition: "color 0.15s",
                  }}
                >
                  Sutinku gauti pasiūlymus ir naujienas ateityje.
                </span>
              </button>
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
              {status === "submitting" ? "SIUNČIAMA..." : "GAUTI PASIŪLYMĄ"}
            </button>
          </form>
        )}

        {/* Privacy policy modal */}
        {showPolicy && (
            <div
              onClick={() => setShowPolicy(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.75)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: "#0f150f",
                  border: "1px solid rgba(200,169,110,0.25)",
                  maxWidth: "560px",
                  width: "100%",
                  maxHeight: "80vh",
                  overflowY: "auto",
                  padding: "2rem",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowPolicy(false)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    color: "var(--sand)",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
                <pre
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--ash)",
                    letterSpacing: "0.03em",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                    margin: 0,
                  }}
                >
                  {PRIVACY_POLICY}
                </pre>
              </div>
            </div>
          )}
      </div>
    </section>
  );
}
