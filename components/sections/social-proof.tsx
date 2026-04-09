"use client";

const posts = [
  { id: 1, src: "/materials/foto-1-5.jpg", caption: "Žygis per sniegą", type: "image" },
  { id: 2, src: "/materials/IMG_3802.JPG", caption: "Kovinis šaudymas", type: "image" },
  { id: 3, src: "/materials/IMG_2445.JPG", caption: "Ugnies kurimas", type: "image" },
  { id: 4, src: "/materials/IMG_2548.JPG", caption: "Kovinis šaudymas", type: "image" },
  { id: 5, src: "/materials/IMG_4528.JPG", caption: "Psichologinis išgyvenimas", type: "image" },
  { id: 6, src: "/materials/IMG_5846.JPG", caption: "Išgyvenimas nelaisvėje", type: "image" },
  { id: 7, src: "/materials/IMG_4951.PNG", caption: "Nusileidimas virve", type: "image" },
  { id: 8, src: "/materials/IMG_3422.JPG", caption: "Ištvermės stiprinimas", type: "image" },
  { id: 9, src: "/materials/IMG_5665.JPG", caption: "Ugnies kūrimas", type: "image" },
];

// Real messages from participants — anonymised
const messages = [
  {
    id: 1,
    text: "Labukas, norėjau padėkoti už puikią vakar dieną! Vaikai liko sužavėti, tiek veiklų ir viskas taip gerai organizuota. Grįžę namo sakė, kad jų gimtadienis buvo pats geriausias! Ačiū dar kartą, jūs nuostabūs! 😊",
    time: "15:33",
    tag: "Gimtadienis",
  },
  {
    id: 2,
    text: "Ir dar kartą noriu jums padėkoti – buvo tikrai daug geriau, nei visi tikėjosi 😁 Didelis komplimentas jūsų komandai – esate tikrai nuostabūs, puikus komandinis darbas! Tai aptariau ne su vienu gimtadienio dalyviu. Ačiū jums!",
    time: "18:07",
    tag: "Komanda",
  },
  {
    id: 3,
    text: "Norėčiau dar kartą padėkoti už šiltą priėmimą ir super praleistą laiką! Labai smagiai praleidom, daug juoko, kas buvo žiauriai smagu 😊 Draugai sakė, kad jau seniai taip gerai nesijuokė! Grįžau kupina gerų emocijų. Ačiū jums!",
    time: "13:25",
    tag: "Grupė",
  },
  {
    id: 4,
    text: "Ši stovykla buvo viena įsimintiniausių patirčių. Per parą patyriau tikrų nuotykių – teko peržengti savo baimę. Šokti nuo tilto, orientacinis žygis, ugnies užkūrimas – grįžau namo su mėlynėm ant kojų, bet pilnas įspūdžių! Rekomenduoju visiems norintiems išeiti iš savo komforto zonos 💪",
    time: "21:43",
    tag: "Stovykla",
  },
  {
    id: 5,
    text: "Ryto įspūdžiai susigulėjo, tai rašau. Tikrai ačiū! Aiškiai, konkrečiai, neperspaustai viską paaiškini, kažkokią ramybę skleidi – jaučiaus labai komfortabiliai 👌 visiems kas klaus, rekomenduosiu! Jaučiuos labiau pasiruošęs ginklo teisių laikymui.",
    time: "09:14",
    tag: "Šaudymas",
  },
];

// Anonymous avatar — just a silhouette SVG
function AnonAvatar() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.2)" }}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(200,169,110,0.5)" }}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    </div>
  );
}

function ChatBubble({ msg, wide = false }: { msg: typeof messages[0]; wide?: boolean }) {
  return (
    <div className={`flex items-end gap-3 ${wide ? "col-span-1 md:col-span-2" : ""}`}>
      <AnonAvatar />
      <div className="flex flex-col gap-1 max-w-full">
        {/* Tag */}
        <span
          className="font-body text-xs uppercase self-start px-2 py-0.5"
          style={{
            color: "rgba(200,169,110,0.7)",
            letterSpacing: "0.12em",
            backgroundColor: "rgba(200,169,110,0.07)",
          }}
        >
          {msg.tag}
        </span>
        {/* Bubble */}
        <div
          className="relative px-5 py-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(200,169,110,0.1)",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "var(--ash-dim)" }}
          >
            {msg.text}
          </p>
          {/* Time */}
          <p
            className="font-body text-xs mt-2 text-right"
            style={{ color: "rgba(200,169,110,0.35)", letterSpacing: "0.05em" }}
          >
            {msg.time} ✓✓
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-28"
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
          <p
            className="font-body text-sm max-w-xs"
            style={{ color: "var(--ash-dim)", lineHeight: 1.8 }}
          >
            Tikri žinučių ekrano kopijų tekstai. Vardai ir nuotraukos – nenurodyti dalyvių prašymu.
          </p>
        </div>

        {/* Chat bubbles — phone-frame wrapper */}
        <div
          className="mx-auto max-w-4xl rounded-sm overflow-hidden"
          style={{
            border: "1px solid rgba(200,169,110,0.15)",
            backgroundColor: "rgba(8,12,8,0.6)",
          }}
        >
          {/* Fake messenger top bar */}
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(200,169,110,0.4)" }} />
            <span className="font-body text-xs uppercase" style={{ color: "rgba(200,169,110,0.5)", letterSpacing: "0.15em" }}>
              Atsiliepimai
            </span>
            <div className="ml-auto flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(200,169,110,0.2)" }} />
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* Row 1: two short messages side by side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChatBubble msg={messages[0]} />
              <ChatBubble msg={messages[1]} />
            </div>

            {/* Row 2: wide single message */}
            <ChatBubble msg={messages[3]} wide />

            {/* Row 3: two more messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChatBubble msg={messages[2]} />
              <ChatBubble msg={messages[4]} />
            </div>
          </div>
        </div>

        {/* Instagram photo grid */}
        <div className="mt-20 mb-4">
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
                href="/galerija"
                className="group relative aspect-square overflow-hidden block"
                style={{ border: "1px solid rgba(200,169,110,0.12)" }}
              >
                {post.type === "video" ? (
                  <video
                    src={post.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.85)", willChange: "transform" }}
                  />
                ) : (
                  <img
                    src={post.src}
                    alt={post.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.85)", willChange: "transform" }}
                  />
                )}
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(0deg, rgba(8,12,8,0.85) 0%, transparent 60%)" }}
                >
                  <p className="font-body text-sm" style={{ color: "var(--ash)", letterSpacing: "0.05em" }}>
                    {post.caption}
                  </p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--sand)" }}>
                    <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          <p
            className="font-body text-xs uppercase text-center mt-4"
            style={{ color: "var(--ash-dim)", letterSpacing: "0.15em", opacity: 0.7 }}
          >
            ↑ Spausk ant nuotraukos — peržiūrėk visą galeriją
          </p>
        </div>
      </div>
    </section>
  );
}
