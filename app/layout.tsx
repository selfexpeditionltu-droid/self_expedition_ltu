import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ConsentManager from "@/components/consent-manager";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Self Expedition LTU — Perženk savo ribas",
  description:
    "Taktinės išgyvenimo stovyklos, šaudymas, žygiai ir komandinis ugdymas Lietuvoje. Registruokis dabar.",
  keywords: ["survival camp", "išgyvenimo stovykla", "šaudymas", "bernvakaris", "žygis", "Lietuva"],
  openGraph: {
    title: "Self Expedition LTU",
    description: "Perženk savo ribas. Taktinės stovyklos Lietuvoje.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt" className={`${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
        <ConsentManager />
      </body>
    </html>
  );
}
