"use client";

import { useState, useEffect } from "react";
import { events, buildEventMap, type CalendarEvent } from "@/lib/events";
import type { SpotsResult } from "@/app/api/events/spots/route";

// ── Lithuanian locale ─────────────────────────────────────────────────────────
const LT_MONTHS = [
  "Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis",
  "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis",
];
const LT_DAYS_SHORT = ["Pr", "An", "Tr", "Kt", "Pn", "Šš", "Sk"]; // Mon–Sun

// ── Helpers ───────────────────────────────────────────────────────────────────
function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth() + n, 1);
  return d;
}

/** Returns day cells for a month grid (Monday-first, with null for padding) */
function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun … 6=Sat
  const pad = firstDow === 0 ? 6 : firstDow - 1; // shift to Mon-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(pad).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function MonthGrid({
  year,
  month,
  eventMap,
  today,
  spotsData,
  onEventClick,
}: {
  year: number;
  month: number;
  eventMap: Record<string, CalendarEvent>;
  today: string;
  spotsData: SpotsResult;
  onEventClick: (e: CalendarEvent) => void;
}) {
  const cells = buildMonthGrid(year, month);

  return (
    <div className="flex-1 min-w-0">
      {/* Month title */}
      <div
        className="font-display text-3xl mb-4 pb-3"
        style={{
          color: "var(--sand)",
          letterSpacing: "0.12em",
          borderBottom: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        {LT_MONTHS[month].toUpperCase()}
        <span
          className="font-body text-sm ml-3"
          style={{ color: "var(--ash-dim)", letterSpacing: "0.05em" }}
        >
          {year}
        </span>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {LT_DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="font-body text-center text-xs uppercase py-1"
            style={{ color: "var(--ash-dim)", letterSpacing: "0.1em", opacity: 0.7 }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px" style={{ backgroundColor: "rgba(200,169,110,0.06)" }}>
        {cells.map((day, i) => {
          if (day === null) {
            return (
              <div
                key={`pad-${i}`}
                className="aspect-square"
                style={{ backgroundColor: "var(--bg)" }}
              />
            );
          }

          const iso = toISO(year, month, day);
          const isToday = iso === today;
          const event = eventMap[iso];
          const spots = event ? spotsData[event.id] : undefined;
          const isFull = spots ? spots.spots_left <= 0 : false;
          const isUrgent = spots ? spots.spots_left > 0 && spots.spots_left <= 5 : false;

          return (
            <button
              key={iso}
              onClick={() => event && !isFull && onEventClick(event)}
              disabled={!event || isFull}
              className="aspect-square flex flex-col items-center justify-center relative transition-colors duration-150"
              style={{
                backgroundColor: isToday
                  ? "rgba(200,169,110,0.12)"
                  : isFull
                  ? "rgba(255,255,255,0.02)"
                  : event
                  ? "rgba(200,169,110,0.08)"
                  : "var(--bg)",
                cursor: event && !isFull ? "pointer" : "default",
                border: "none",
              }}
              aria-label={event ? `${day} — ${event.title}` : String(day)}
            >
              {/* Highlight ring */}
              {event && !isFull && (
                <div
                  className="absolute inset-0"
                  style={{ boxShadow: `inset 0 0 0 1px ${isUrgent ? "rgba(180,60,60,0.6)" : "rgba(200,169,110,0.4)"}` }}
                />
              )}
              {isFull && event && (
                <div
                  className="absolute inset-0"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                />
              )}

              <span
                className="font-body text-sm leading-none"
                style={{
                  color: isToday
                    ? "var(--sand)"
                    : isFull
                    ? "rgba(160,144,128,0.35)"
                    : event
                    ? "var(--ash)"
                    : "var(--ash-dim)",
                  fontWeight: isToday || (event && !isFull) ? 600 : 400,
                }}
              >
                {day}
              </span>

              {/* Event dot / full indicator */}
              {event && !isFull && (
                <span
                  className="mt-1 block rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: isUrgent ? "#b43c3c" : "var(--sand)",
                    boxShadow: isUrgent
                      ? "0 0 6px rgba(180,60,60,0.8)"
                      : "0 0 6px rgba(200,169,110,0.8)",
                  }}
                />
              )}
              {isFull && (
                <span
                  className="mt-1 font-body"
                  style={{ fontSize: "0.45rem", color: "rgba(160,144,128,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  pilna
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Event modal ───────────────────────────────────────────────────────────────
function EventModal({
  event,
  spots,
  onClose,
}: {
  event: CalendarEvent;
  spots?: SpotsResult[string];
  onClose: () => void;
}) {
  // Parse date for Lithuanian display
  const [y, m, d] = event.date.split("-").map(Number);
  const dateLabel = `${d} ${LT_MONTHS[m - 1]} ${y}`;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg"
        style={{
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid rgba(200,169,110,0.3)",
          clipPath:
            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, var(--sand), transparent)" }}
        />

        <div className="p-8">
          {/* Date */}
          <p
            className="font-body text-xs uppercase mb-2"
            style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
          >
            / / &nbsp; {dateLabel}
          </p>

          {/* Title */}
          <h3
            className="font-display text-4xl mb-6"
            style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
          >
            {event.title.toUpperCase()}
          </h3>

          {/* Activities list */}
          <ul className="mb-6 flex flex-col gap-2">
            {event.activities.map((act, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="font-display text-lg mt-px shrink-0"
                  style={{ color: "var(--sand)" }}
                >
                  {i + 1}.
                </span>
                <span
                  className="font-body text-base"
                  style={{ color: "var(--ash-dim)", lineHeight: 1.6 }}
                >
                  {act}
                </span>
              </li>
            ))}
          </ul>

          {/* Spots urgency banner */}
          {spots && spots.spots_left > 0 && spots.spots_left <= 5 && (
            <div
              className="mb-5 px-4 py-3 flex items-center gap-3"
              style={{
                backgroundColor: "rgba(140,30,30,0.18)",
                border: "1px solid rgba(180,60,60,0.45)",
              }}
            >
              <span style={{ color: "#e05c5c", fontSize: "1.1rem", lineHeight: 1 }}>⚠</span>
              <span
                className="font-display text-lg"
                style={{ color: "#e07070", letterSpacing: "0.08em" }}
              >
                LIKO TIK {spots.spots_left} {spots.spots_left === 1 ? "VIETA" : "VIETOS"}
              </span>
              <span
                className="font-body text-xs ml-auto"
                style={{ color: "rgba(224,112,112,0.6)", letterSpacing: "0.08em" }}
              >
                iš {spots.capacity}
              </span>
            </div>
          )}
          {spots && spots.spots_left === 0 && (
            <div
              className="mb-5 px-4 py-3 text-center"
              style={{
                backgroundColor: "rgba(30,30,30,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="font-display text-lg"
                style={{ color: "var(--ash-dim)", letterSpacing: "0.1em" }}
              >
                RENGINYS UŽPILDYTAS
              </span>
            </div>
          )}

          {/* Meta info grid */}
          <div
            className="grid grid-cols-2 gap-px mb-6"
            style={{ backgroundColor: "rgba(200,169,110,0.1)" }}
          >
            {[
              { label: "Kaina", value: `${event.price_eur} EUR / asm.` },
              { label: "Trukmė", value: `${event.duration} (${event.time})` },
              { label: "Vieta", value: event.location },
              {
                label: "Vietos",
                value: spots
                  ? `Liko ${spots.spots_left} iš ${spots.capacity}`
                  : `${event.capacity} vietų`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <p
                  className="font-body text-xs uppercase mb-1"
                  style={{ color: "var(--sand-dim)", letterSpacing: "0.12em" }}
                >
                  {label}
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "var(--ash)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {spots?.spots_left === 0 ? (
              <span
                className="flex-1 text-center font-body text-sm uppercase py-3"
                style={{ color: "var(--ash-dim)", letterSpacing: "0.1em", opacity: 0.5 }}
              >
                Vietos užpildytos
              </span>
            ) : (
              <a
                href={event.registration_link}
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("se:selectCalendarEvent", { detail: event })
                  );
                  onClose();
                }}
                className="cta-btn flex-1 text-center"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Registruotis
              </a>
            )}
            <button
              onClick={onClose}
              className="cta-btn-ghost"
              style={{ padding: "0.75rem 1.25rem" }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function CalendarSection() {
  const eventMap = buildEventMap(events);
  const [spotsData, setSpotsData] = useState<SpotsResult>({});

  useEffect(() => {
    fetch("/api/events/spots")
      .then((r) => r.json())
      .then((data) => setSpotsData(data))
      .catch(() => {}); // silently degrade — calendar still works without spots data
  }, []);

  const todayDate = new Date();
  const todayISO = toISO(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate()
  );

  // Start window on the earliest upcoming event's month, or current month
  const firstEventDate = events
    .map((e) => new Date(e.date))
    .filter((d) => d >= todayDate)
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const initialStart = firstEventDate
    ? new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1)
    : new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);

  const [startMonth, setStartMonth] = useState<Date>(initialStart);
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);

  const months = [0, 1, 2].map((offset) => {
    const d = addMonths(startMonth, offset);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const rangeLabel = `${LT_MONTHS[months[0].month]} – ${LT_MONTHS[months[2].month]} ${months[2].year}`;

  return (
    <>
      <section
        id="kalendorius"
        className="relative py-28 overflow-hidden"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {/* Subtle background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,74,30,0.04) 0%, transparent 50%)",
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
                / / &nbsp; Renginių kalendorius
              </p>
              <h2
                className="font-display text-6xl md:text-8xl"
                style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
              >
                DATOS
                <br />
                <span style={{ color: "var(--sand)" }}>IR LAIKAS.</span>
              </h2>
            </div>
            <p
              className="font-body text-base max-w-sm"
              style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
            >
              Paspausk ant pažymėtos datos ir sužinok viską apie renginį.
              Vietos ribojamos — registruokis laiku.
            </p>
          </div>

          {/* Divider */}
          <div
            className="mb-8 h-px"
            style={{
              background: "linear-gradient(90deg, var(--sand), transparent)",
            }}
          />

          {/* Navigation bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setStartMonth((d) => addMonths(d, -1))}
              className="font-body text-sm uppercase flex items-center gap-2 transition-colors duration-150"
              style={{ color: "var(--ash-dim)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sand)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash-dim)")}
            >
              ← Atgal
            </button>

            <span
              className="font-body text-xs uppercase"
              style={{ color: "var(--sand-dim)", letterSpacing: "0.15em" }}
            >
              {rangeLabel}
            </span>

            <button
              onClick={() => setStartMonth((d) => addMonths(d, 1))}
              className="font-body text-sm uppercase flex items-center gap-2 transition-colors duration-150"
              style={{ color: "var(--ash-dim)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sand)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ash-dim)")}
            >
              Pirmyn →
            </button>
          </div>

          {/* 3-month calendar grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {months.map(({ year, month }) => (
              <MonthGrid
                key={`${year}-${month}`}
                year={year}
                month={month}
                eventMap={eventMap}
                today={todayISO}
                spotsData={spotsData}
                onEventClick={setActiveEvent}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center gap-6 flex-wrap">
            {[
              {
                dot: "var(--sand)",
                glow: "rgba(200,169,110,0.7)",
                label: "Vietų yra",
              },
              {
                dot: "#b43c3c",
                glow: "rgba(180,60,60,0.7)",
                label: "Paskutinės vietos!",
              },
            ].map(({ dot, glow, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="block rounded-full shrink-0"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: dot,
                    boxShadow: `0 0 6px ${glow}`,
                  }}
                />
                <span
                  className="font-body text-xs uppercase"
                  style={{ color: "var(--ash-dim)", letterSpacing: "0.1em" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Event modal */}
      {activeEvent && (
        <EventModal
          event={activeEvent}
          spots={spotsData[activeEvent.id]}
          onClose={() => setActiveEvent(null)}
        />
      )}
    </>
  );
}
