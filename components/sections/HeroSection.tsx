'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Cube3D } from '@/components/animations/Cube3D'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      aria-label="Hero — Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 217, 255, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 60%),
            #1a1a1a
          `,
        }}
      />

      {/* Floating cube — large, right side */}
      <div
        className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 opacity-60"
        aria-hidden="true"
        style={{ animation: 'float 5s ease-in-out infinite' }}
      >
        <Cube3D size={100} className="hidden md:block" />
        <Cube3D size={60} className="block md:hidden" />
      </div>

      {/* Floating cube — small, left-bottom */}
      <div
        className="absolute left-8 md:left-16 bottom-1/4 opacity-30"
        aria-hidden="true"
        style={{ animation: 'float 7s ease-in-out infinite reverse' }}
      >
        <Cube3D size={60} className="hidden lg:block" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-headline */}
        <motion.div variants={fadeInUp}>
          <span className="inline-block font-code text-accent text-sm tracking-widest uppercase mb-6 opacity-80">
            Linum Core — Gabriel Gomes
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-heading text-5xl md:text-7xl text-white font-bold leading-tight mb-6"
          variants={fadeInUp}
        >
          {t('hero.tagline').replace('…', '')}
          <span className="text-secondary">…</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          variants={fadeInUp}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          variants={fadeInUp}
        >
          <Button href="#contact" variant="primary" size="lg">
            {t('hero.cta')}
          </Button>
          <Button href="#portfolio" variant="secondary" size="lg">
            {t('nav.portfolio')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
        aria-hidden="true"
      >
        <span className="text-neutral-500 text-xs tracking-widest uppercase">
          {t('hero.scrollHint')}
        </span>
        <div style={{ animation: 'scroll-bounce 1.5s ease-in-out infinite' }}>
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
