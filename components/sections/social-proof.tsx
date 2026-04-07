const posts = [
  { id: 1, src: "/materials/foto-1-5.jpg", caption: "Žygis per sniegą", type: "image" },
  { id: 2, src: "/materials/copy_CECF4970-587C-41EF-9C7A-1F68C86D6FA3.mp4", caption: "Kovinis šaudymas", type: "video" },
  { id: 3, src: "/materials/IMG_2445.JPG", caption: "Ugnies kurimas", type: "image" },
  { id: 4, src: "/materials/IMG_2548.JPG", caption: "Kovinis šaudymas", type: "image" },
  { id: 5, src: "/materials/IMG_4528.JPG", caption: "Psichologinis išgyvenimas", type: "image" },
  { id: 6, src: "/materials/IMG_5846.JPG", caption: "Išgyvenimas nelaisvėje", type: "image" },
  { id: 7, src: "/materials/IMG_4951.PNG", caption: "Nusileidimas virve", type: "image" },
  { id: 8, src: "/materials/IMG_3422.JPG", caption: "Ištvermės stiprinimas", type: "image" },
  { id: 9, src: "/materials/IMG_5665.JPG", caption: "Ugnies kūrimas", type: "image" },
];

const testimonials = [
  {
    id: 1,
    quote: "Geriausia komandos formavimo patirtis, kurią galiu rekomenduoti. Ne pramoga — transformacija.",
    author: "Marius K.",
    context: "Komandinis darbas",
  },
  {
    id: 2,
    quote: "Bernvakaris su Self Expedition LTU — tai buvo paskutinė tikra laisvė prieš žiedą. Visi draugai vis dar kalba apie tą naktį.",
    author: "Tomas R.",
    context: "Bernvakaris",
  },
  {
    id: 3,
    quote: "Maniau žinau, kiek galiu. Išgyvenimo stovykla parodė, kad žinojau labai mažai. Grįžau visai kitas žmogus.",
    author: "Erikas M.",
    context: "Išgyvenimo stovykla",
  },
  {
    id: 4,
    quote: "Organizacija tobula, instruktoriai profesionalūs, o patirtis — nepakartojama. Jau rezervavome kitą grupę.",
    author: "Rūta S.",
    context: "Žygis & Orientavimasis",
  },
  {
    id: 5,
    quote: "Tikras iššūkis. Jokio telefono, jokio GPS — tik kompasas ir komanda. Tai moko dalykų, kurių jokia mokykla nemoko.",
    author: "Vilius D.",
    context: "Žygis & Orientavimasis",
  },
  {
    id: 6,
    quote: "Šaudymo sesija viršijo visus lūkesčius. Tikslumas, concentracija, adrenalinas — visa tai toje pačioje vietoje.",
    author: "Andrius P.",
    context: "Šaudymas",
  },
];

export default function SocialProof() {
  return (
    <section
      className="py-28"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="font-body text-xs uppercase tracking-military mb-3"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              / / &nbsp; Atsiliepimai
            </p>
            <h2
              className="font-display text-5xl md:text-7xl"
              style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
            >
              KĄ SAKO
              <br />
              <span style={{ color: "var(--sand)" }}>DALYVIAI?</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/self_expedition_ltu/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn-ghost self-start md:self-auto"
          >
            @self_expedition_ltu →
          </a>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px mb-2" style={{ backgroundColor: "rgba(200,169,110,0.1)" }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative group p-8 flex flex-col gap-5 transition-colors duration-300"
              style={{ backgroundColor: "var(--bg-elevated)" }}
            >
              {/* Quote mark */}
              <span
                className="font-display text-6xl leading-none select-none"
                style={{ color: "rgba(200,169,110,0.2)", lineHeight: 1 }}
              >
                &ldquo;
              </span>

              <p
                className="font-body text-base leading-relaxed flex-1 -mt-4"
                style={{ color: "var(--ash-dim)" }}
              >
                {t.quote}
              </p>

              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(200,169,110,0.12)" }}
              >
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.25)" }}
                >
                  <span className="font-display text-sm" style={{ color: "var(--sand)" }}>
                    {t.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold" style={{ color: "var(--ash)", letterSpacing: "0.05em" }}>
                    {t.author}
                  </p>
                  <p className="font-body text-xs uppercase" style={{ color: "var(--sand)", letterSpacing: "0.12em" }}>
                    {t.context}
                  </p>
                </div>
              </div>

              {/* Hover corner */}
              <div
                className="absolute bottom-0 right-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderTop: "1px solid var(--sand)", borderLeft: "1px solid var(--sand)", transform: "rotate(180deg)" }}
              />
            </div>
          ))}
        </div>

        {/* Instagram photo grid */}
        <div className="mt-16 mb-4">
          <p
            className="font-body text-xs uppercase mb-6"
            style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
          >
            / / &nbsp; @self_expedition_ltu &nbsp; — &nbsp; Gyvenimas lauke
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/self_expedition_ltu/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block"
              style={{ border: "1px solid rgba(200,169,110,0.12)" }}
            >
              {post.type === "video" ? (
                <video
                  src={post.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.85)" }}
                />
              ) : (
                <img
                  src={post.src}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.85)" }}
                />
              )}
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(0deg, rgba(8,12,8,0.85) 0%, transparent 60%)" }}
              >
                <p className="font-body text-sm" style={{ color: "var(--ash)", letterSpacing: "0.05em" }}>
                  {post.caption}
                </p>
              </div>

              {/* Instagram icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--sand)" }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </div>
            </a>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
