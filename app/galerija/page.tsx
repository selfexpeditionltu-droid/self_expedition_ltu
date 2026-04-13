import Link from "next/link";
import type { Metadata } from "next";
import GalleryCta from "@/components/ui/gallery-cta";

export const metadata: Metadata = {
  title: "Galerija — Self Expedition LTU",
  description: "Atsiminimai iš Self Expedition veiklų gamtoje.",
};

const allPhotos = [
  { id: 1, src: "/materials/foto-1-5.jpg", caption: "Žygis per sniegą", type: "image" },
  { id: 2, src: "/materials/copy_CECF4970-587C-41EF-9C7A-1F68C86D6FA3.mp4", caption: "Kovinis šaudymas", type: "video" },
  { id: 3, src: "/materials/IMG_2445.JPG", caption: "Ugnies kurimas", type: "image" },
  { id: 4, src: "/materials/IMG_2548.JPG", caption: "Kovinis šaudymas", type: "image" },
  { id: 5, src: "/materials/IMG_4528.JPG", caption: "Psichologinis išgyvenimas", type: "image" },
  { id: 6, src: "/materials/IMG_5846.JPG", caption: "Išgyvenimas nelaisvėje", type: "image" },
  { id: 7, src: "/materials/IMG_4951.PNG", caption: "Nusileidimas virve", type: "image" },
  { id: 8, src: "/materials/IMG_3422.JPG", caption: "Ištvermės stiprinimas", type: "image" },
  { id: 9, src: "/materials/IMG_5665.JPG", caption: "Ugnies kūrimas", type: "image" },
  { id: 10, src: "/materials/IMG_2435.JPG", caption: "Stovykla miške", type: "image" },
  { id: 11, src: "/materials/IMG_2868.JPG", caption: "Šaudymas", type: "image" },
  { id: 12, src: "/materials/IMG_3112.JPG", caption: "Bernvakaris", type: "image" },
  { id: 13, src: "/materials/IMG_3410.JPG", caption: "Komandinis darbas", type: "image" },
  { id: 14, src: "/materials/foto-1-10.jpg", caption: "Žygis gamtoje", type: "image" },
  { id: 15, src: "/materials/IMG_4530.mp4", caption: "Veiklos gamtoje", type: "video" },
];

export default function GalerijaPage() {
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <p
          className="font-body text-xs uppercase mb-4"
          style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
        >
          / / &nbsp; Atsiminimai
        </p>
        <h1
          className="font-display text-6xl md:text-9xl mb-4"
          style={{ color: "var(--ash)", letterSpacing: "0.05em" }}
        >
          GALERIJA
        </h1>
        <p
          className="font-body text-lg"
          style={{ color: "var(--ash-dim)" }}
        >
          Akimirkos iš mūsų veiklų gamtoje.
        </p>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {allPhotos.map((photo) => (
            <a
              key={photo.id}
              href={photo.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block"
              style={{ border: "1px solid rgba(200,169,110,0.1)" }}
            >
              {photo.type === "video" ? (
                <video
                  src={photo.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "contrast(1.1) brightness(0.8) saturate(0.85)" }}
                />
              ) : (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "contrast(1.1) brightness(0.8) saturate(0.85)" }}
                />
              )}

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(0deg, rgba(8,12,8,0.9) 0%, transparent 60%)" }}
              >
                <p
                  className="font-body text-xs"
                  style={{ color: "var(--ash)", letterSpacing: "0.05em" }}
                >
                  {photo.caption}
                </p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--sand)" }}
                >
                  <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center py-12 px-8"
          style={{ border: "1px solid rgba(200,169,110,0.2)" }}
        >
          <p
            className="font-display text-3xl md:text-5xl mb-4"
            style={{ color: "var(--ash)", letterSpacing: "0.06em" }}
          >
            NORI TAPTI DALIMI?
          </p>
          <p
            className="font-body text-lg mb-8"
            style={{ color: "var(--ash-dim)" }}
          >
            Užsiregistruok ir sukurk savo atsiminimai.
          </p>
          <GalleryCta />
        </div>
      </div>
    </main>
  );
}
