import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CompetenciesSection } from '@/components/sections/CompetenciesSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
        <CompetenciesSection />
        {/* Wave 5: Feedbacks + Contact */}
      </main>
      <Footer />
    </>
  )
}
