import Link from "next/link";
import type { Metadata } from "next";
import Duk from "@/components/sections/duk";

export const metadata: Metadata = {
  title: "D.U.K. — Self Expedition LTU",
  description: "Dažniausiai užduodami klausimai apie Self Expedition veiklas.",
};

export default function DukPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(8,12,8,0.96)",
          borderBottom: "1px solid rgba(200,169,110,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Link
          href="/"
          className="font-body text-sm uppercase flex items-center gap-2 transition-colors duration-200 hover:text-sand"
          style={{ color: "var(--ash-dim)", letterSpacing: "0.12em" }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Grįžti
        </Link>

        <span className="font-display text-lg" style={{ color: "var(--sand)", letterSpacing: "0.1em" }}>
          SELF EXPEDITION <span style={{ color: "var(--ash-dim)", fontSize: "0.7em" }}>LTU</span>
        </span>
      </div>

      <Duk />
    </main>
  );
}
