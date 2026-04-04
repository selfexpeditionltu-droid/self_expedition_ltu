import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Activities from "@/components/sections/activities";
import SocialProof from "@/components/sections/social-proof";
import Duk from "@/components/sections/duk";
import CalendlySection from "@/components/sections/calendly-section";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Activities />
      <SocialProof />
      <Duk />
      <CalendlySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
