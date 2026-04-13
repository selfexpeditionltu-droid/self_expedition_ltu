"use client";

/**
 * ConsentManager — handles:
 *  • Cookie consent banner (GDPR)
 *  • Conditional loading of GTM / GA4 / Meta Pixel after consent
 *
 * IDs come from environment variables (NEXT_PUBLIC_*).
 * If an ID is empty the corresponding script is simply skipped.
 */

import { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "se_cookie_consent";
const GTM_ID       = process.env.NEXT_PUBLIC_GTM_ID       ?? "";
const GA4_ID       = process.env.NEXT_PUBLIC_GA4_ID       ?? "";
const PIXEL_ID     = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type Consent = "pending" | "accepted" | "declined";

export default function ConsentManager() {
  const [consent, setConsent] = useState<Consent>("pending");
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* Read stored consent on mount */
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent | null;
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    } else {
      /* Show banner after a short delay so the page can paint first */
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {/* ── Analytics scripts — loaded ONLY after explicit consent ── */}

      {consent !== "declined" && GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">{`
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      )}

      {consent !== "declined" && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA4_ID}',{anonymize_ip:true});
          `}</Script>
        </>
      )}

      {consent !== "declined" && PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
  t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
        `}</Script>
      )}

      {/* ── Cookie consent banner ── */}
      {visible && (
        <div
          role="dialog"
          aria-label="Slapukų sutikimas"
          aria-modal="false"
          style={{
            position:        "fixed",
            bottom:          0,
            left:            0,
            right:           0,
            zIndex:          10000,
            backgroundColor: "rgba(8,12,8,0.97)",
            borderTop:       "1px solid rgba(200,169,110,0.3)",
            backdropFilter:  "blur(10px)",
            padding:         "1.75rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth:      "1200px",
              margin:        "0 auto",
              display:       "flex",
              flexDirection: "column",
              gap:           "1.1rem",
            }}
          >
            {/* Heading + text */}
            <div>
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "1.15rem",
                  color:         "var(--sand)",
                  letterSpacing: "0.12em",
                  marginBottom:  "0.4rem",
                }}
              >
                SLAPUKŲ POLITIKA
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.88rem",
                  color:      "var(--ash-dim)",
                  lineHeight: 1.65,
                  maxWidth:   "680px",
                }}
              >
                Naudojame analizės ir rinkodaros slapukus (Google Analytics 4, Google Tag Manager, Meta Pixel),
                kad tobulintume svetainę ir pasiektume jus su aktualiu turiniu.
                Jūsų duomenys tvarkomi laikantis BDAR reikalavimų.{" "}
                <a
                  href="/privatumo-politika"
                  style={{ color: "var(--sand)", textDecoration: "underline" }}
                >
                  Privatumo politika
                </a>
                .
              </p>
            </div>

            {/* Primary action row */}
            <div
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "1.5rem",
                flexWrap:   "wrap",
              }}
            >
              {/* ── ACCEPT — big, prominent ── */}
              <button
                onClick={accept}
                className="cta-btn"
                style={{ fontSize: "1rem", padding: "0.8rem 2.2rem" }}
              >
                PRIIMTI VISUS
              </button>

              {/* Manage preferences — subtle text link */}
              <button
                onClick={() => setExpanded((p) => !p)}
                style={{
                  fontFamily:     "var(--font-body)",
                  fontSize:       "0.75rem",
                  color:          "var(--ash-dim)",
                  background:     "none",
                  border:         "none",
                  cursor:         "pointer",
                  textDecoration: "underline",
                  letterSpacing:  "0.04em",
                  padding:        0,
                }}
              >
                {expanded ? "Slėpti nuostatas ↑" : "Tvarkyti nuostatas ↓"}
              </button>
            </div>

            {/* Expanded settings — decline is only accessible here */}
            {expanded && (
              <div
                style={{
                  paddingTop: "0.9rem",
                  borderTop:  "1px solid rgba(200,169,110,0.15)",
                  display:    "flex",
                  flexDirection: "column",
                  gap:        "0.75rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize:   "0.8rem",
                    color:      "var(--ash-dim)",
                    lineHeight: 1.6,
                    maxWidth:   "600px",
                  }}
                >
                  <strong style={{ color: "var(--ash)" }}>Būtinieji slapukai</strong> — visada aktyvūs, svetainė
                  neveiktų be jų (sesija, saugumas).
                  <br />
                  <strong style={{ color: "var(--ash)" }}>Analizės ir rinkodaros slapukai</strong> — padeda
                  suprasti lankytojų elgseną ir rodyti aktualias reklamas.
                  Galite atsisakyti — tai neturės įtakos svetainės veikimui.
                </p>

                {/* Decline — small, buried in expanded section */}
                <button
                  onClick={decline}
                  style={{
                    alignSelf:     "flex-start",
                    fontFamily:    "var(--font-body)",
                    fontSize:      "0.72rem",
                    color:         "rgba(160,144,128,0.7)",
                    background:    "none",
                    border:        "1px solid rgba(200,169,110,0.18)",
                    cursor:        "pointer",
                    padding:       "0.4rem 1.1rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Tik būtinieji slapukai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
