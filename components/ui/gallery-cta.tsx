"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/track";

export default function GalleryCta() {
  return (
    <Link
      href="/#registracija"
      className="cta-btn inline-block"
      style={{ fontSize: "1rem" }}
      onClick={() => trackEvent("cta_click", { button_location: "gallery" })}
    >
      Gauti pasiūlymą
    </Link>
  );
}
