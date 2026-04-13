import Nav from "@/components/nav";
import EngagementTracker from "@/components/engagement-tracker";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Instructors from "@/components/sections/instructors";
import Activities from "@/components/sections/activities";
import SocialProof from "@/components/sections/social-proof";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";
import StickyCta from "@/components/ui/sticky-cta";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Instructors />
      <Activities />
      <SocialProof />
      <CtaSection />
      <Footer />
      <StickyCta />
      <EngagementTracker />
    </main>
  );
}
