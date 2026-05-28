import { Preloader } from "@/src/components/ui/Preloader";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/Footer";
import { HeroSection } from "@/src/components/sections/HeroSection";
import { PortfolioSection } from "@/src/components/sections/PortfolioSection";
import { AboutSection } from "@/src/components/sections/AboutSection";
import { CompetenciesSection } from "@/src/components/sections/CompetenciesSection";
import { FeedbacksSection } from "@/src/components/sections/FeedbacksSection";
import { ContactSection } from "@/src/components/sections/ContactSection";
import { ManifestoSection } from "@/src/components/sections/ManifestoSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <PortfolioSection />
        <AboutSection />
        <CompetenciesSection />
        <FeedbacksSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
