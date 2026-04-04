"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

const links = [
  { label: "Apie", href: "#apie" },
  { label: "Veiklos", href: "#veiklos" },
  { label: "D.U.K.", href: "#duk" },
  ...(CALENDLY_URL ? [{ label: "Pokalbis", href: "#pokalbis" }] : []),
  { label: "Kontaktai", href: "#footer" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(8,12,8,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(200,169,110,0.15)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Self Expedition — pagrindinis puslapis"
        >
          <img
            src="/materials/498297466_17859448140418422_4242046198524671559_n.jpg"
            alt="Self Expedition logo"
            className="w-10 h-10 object-contain rounded-sm transition-opacity duration-200 group-hover:opacity-80"
            style={{ filter: "drop-shadow(0 0 6px rgba(200,169,110,0.3))" }}
          />
          <span className="font-display text-xl tracking-military transition-colors duration-200" style={{ color: "var(--sand)" }}>
            SELF EXPEDITION <span style={{ color: "var(--ash-dim)", fontSize: "0.75em" }}>LTU</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Pagrindinė navigacija">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm tracking-wide text-ash-dim hover:text-sand transition-colors duration-200 uppercase"
              style={{ color: "var(--ash-dim)", letterSpacing: "0.1em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#registracija"
            className="cta-btn-ghost text-sm"
            style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
          >
            Registruotis
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
          aria-expanded={open}
        >
          <span
            className="block h-[2px] w-6 transition-transform duration-200"
            style={{
              backgroundColor: "var(--sand)",
              transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 transition-opacity duration-200"
            style={{
              backgroundColor: "var(--sand)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block h-[2px] w-6 transition-transform duration-200"
            style={{
              backgroundColor: "var(--sand)",
              transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ backgroundColor: "rgba(8,12,8,0.98)", borderTop: "1px solid rgba(200,169,110,0.12)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-base uppercase tracking-wide"
              style={{ color: "var(--ash)", letterSpacing: "0.1em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#registracija"
            onClick={() => setOpen(false)}
            className="cta-btn text-center"
            style={{ fontSize: "1rem" }}
          >
            Registruotis
          </a>
        </div>
      )}
    </header>
  );
}
