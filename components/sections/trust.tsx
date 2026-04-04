const pillars = [
  {
    number: "01",
    title: "Realios Aplinkybės",
    description:
      "Jokie robotai, jokie simuliatoriai. Tikras miškas, tikras oras, tikri iššūkiai. Jūs sprendžiate realiu laiku.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    number: "02",
    title: "Patyrę Instruktoriai",
    description:
      "Komanda su karišku ir laukinės gamtos išgyvenimo patyrimu. Jie žino, ką daro — ir išmokys jus.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    number: "03",
    title: "Maži Grupių Dydžiai",
    description:
      "Max 12 žmonių grupėje. Kiekvienas dalyvis gauna dėmesį. Nėra galimybės pasislėpti — ir tai yra tikslas.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    number: "04",
    title: "Prisiminimai Visam Gyvenimui",
    description:
      "Ne dar viena įmonės šventė. Ne dar viena birthday party. Tai išbandymas, kurį prisimins visi. Garantuotai.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

export default function Trust() {
  return (
    <section
      id="kodel"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      {/* Background diagonal accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,74,30,0.08) 0%, transparent 50%, rgba(139,26,26,0.06) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p
            className="font-body text-xs uppercase tracking-military mb-3"
            style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
          >
            / / &nbsp; Kodėl mes
          </p>
          <h2
            className="font-display text-6xl md:text-8xl"
            style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
          >
            KODĖL
            <br />
            <span style={{ color: "var(--sand)" }}>SELF</span>{" "}
            <span style={{ color: "var(--ash)" }}>EXP?</span>
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {pillars.map((p, i) => (
            <div
              key={p.number}
              className="relative flex gap-8 p-10 group"
              style={{
                borderTop: "1px solid rgba(200,169,110,0.12)",
                borderRight: i % 2 === 0 ? "1px solid rgba(200,169,110,0.12)" : "none",
              }}
            >
              {/* Number */}
              <span
                className="font-display text-7xl md:text-8xl shrink-0 leading-none"
                style={{ color: "rgba(200,169,110,0.12)", lineHeight: 1 }}
              >
                {p.number}
              </span>

              <div className="flex flex-col">
                {/* Icon */}
                <div className="mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--sand)" }}
                  >
                    <path d={p.icon} />
                  </svg>
                </div>

                <h3
                  className="font-display text-3xl mb-3 group-hover:text-sand transition-colors duration-200"
                  style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: "var(--ash-dim)" }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
