export type Badge = "intense" | "extreme" | "hard" | "legendary" | "classified";

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: Badge;
  icon: string; // SVG path data
  image?: string;
}

export const BADGE_LABELS: Record<Badge, string> = {
  intense: "INTENSYVUS",
  extreme: "EKSTREMALUS",
  hard: "SUNKUS",
  legendary: "LEGENDINIS",
  classified: "SLAPTAI",
};

// Color-coded by difficulty: yellow → orange → red, with gold for prestige, dark for mystery
export const BADGE_COLORS: Record<Badge, string> = {
  hard: "#b8860b",          // amber — challenging
  intense: "#c45c10",       // orange — intense
  extreme: "#b52222",       // red — extreme danger
  legendary: "#c8a96e",     // gold glow — prestige
  classified: "#1e1535",    // dark purple — classified mystery
};

export const BADGE_TEXT_COLORS: Record<Badge, string> = {
  hard: "#080c08",
  intense: "#080c08",
  extreme: "#f0d8d8",
  legendary: "#080c08",
  classified: "#8a7aa0",
};

export const activities: Activity[] = [
  {
    id: "survival",
    title: "Išgyvenimo Stovykla",
    subtitle: "Wilderness Survival",
    description:
      "Išmoksi statyti priedangą, kurti ugnį be degtukai, rasti vandens ir maisto miške. Reali situacija, realios pasekmės.",
    badge: "extreme",
    // Campfire / flame icon
    icon: "M12 22c-4 0-8-4.686-8-9a8 8 0 0116 0c0 4.314-4 9-8 9zM12 2c.5 2 2 3.5 2 5.5a2 2 0 01-4 0C10 5.5 11.5 4 12 2zM8 17h8",
    image: "/materials/IMG_2435.JPG",
  },
  {
    id: "saudymas",
    title: "Šaudymas",
    subtitle: "Tactical Shooting",
    description:
      "Oro pistoletas, arbaletas, snaiperio pozicija. Tikslumas, kvėpavimas, koncentracija. Tavo rankos, tavo rezultatas.",
    badge: "intense",
    // Crosshair / target icon
    icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 2v4M12 18v4M2 12h4M18 12h4M12 12m-1 0a1 1 0 102 0 1 1 0 00-2 0",
    image: "/materials/IMG_2868.JPG",
  },
  {
    id: "bernvakaris",
    title: "Bernvakaris",
    subtitle: "Bachelor Survival",
    description:
      "Ne baras, ne naktinis. Tikras bernvakaris — miškas, ugnis, išbandymai, kurių nepamiršite. Paskutinė laisvė prieš žiedą.",
    badge: "legendary",
    // Trophy / crown icon
    icon: "M2 20h20M6 20V10l6-8 6 8v10M10 20v-5h4v5",
    image: "/materials/IMG_3112.JPG",
  },
  {
    id: "zygis",
    title: "Žygis & Orientavimasis",
    subtitle: "Land Navigation",
    description:
      "Kompasas, žemėlapis, tikslinis taškas. Be telefono, be GPS. Orientuokis kaip karys, pasiekk tikslą kaip medžiotojas.",
    badge: "hard",
    // Compass icon
    icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
    image: "/materials/foto-1-10.jpg",
  },
  {
    id: "komanda",
    title: "Komandinis Darbas",
    subtitle: "Team Operations",
    description:
      "Efektyvus komunikavimas streso sąlygomis, misijų planavimas, rolių paskirstymas. Stipri komanda — tai ne atsitiktinumas.",
    badge: "intense",
    // Two people / team icon
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    image: "/materials/IMG_3410.JPG",
  },
  {
    id: "classified",
    title: "??? Classified",
    subtitle: "Unknown",
    description:
      "Šios veiklos detalės atskleidžiamos tik atvykus. Žinome tik tiek: nestandartiška, nepaprasta, nepamirštama.",
    badge: "classified",
    // Lock icon
    icon: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4M12 16v2",
  },
];
