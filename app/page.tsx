import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* More sections added in subsequent waves */}
      </main>
      <Footer />
    </>
  )
}
