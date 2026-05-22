'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '@/lib/data/testimonials'
import type { Testimonial } from '@/lib/types'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#d4af37' : 'none'}
          stroke={i < rating ? '#d4af37' : '#808080'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatarUrl) {
    return (
      <img
        src={testimonial.avatarUrl}
        alt={testimonial.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
      />
    )
  }

  const initials = testimonial.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-secondary shrink-0"
      aria-hidden="true"
    >
      <span className="font-heading text-primary-dark font-semibold text-lg leading-none">
        {initials}
      </span>
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function FeedbacksSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const total = testimonials.length

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  useEffect(() => {
    const interval = setInterval(goNext, 4000)
    return () => clearInterval(interval)
  }, [goNext])

  const testimonial = testimonials[current]

  return (
    <section id="feedbacks" className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionTitle
            title="What Clients Say"
            subtitle="Real results, real connections"
          />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {/* Carousel card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-primary-light border border-neutral-700 rounded-xl p-8 md:p-10"
              >
                {/* Quote mark */}
                <div className="text-secondary text-5xl font-heading leading-none mb-4 select-none" aria-hidden="true">
                  &ldquo;
                </div>

                {/* Quote text */}
                <p className="font-body text-neutral-300 text-base md:text-lg leading-relaxed italic mb-8">
                  {testimonial.quote}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4">
                  <Avatar testimonial={testimonial} />
                  <div className="flex flex-col gap-1">
                    <span className="font-heading text-white font-semibold text-base tracking-wide">
                      {testimonial.name}
                    </span>
                    <span className="font-body text-neutral-500 text-sm">
                      {testimonial.role} &middot; {testimonial.company}
                    </span>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Prev button */}
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:border-secondary hover:text-secondary transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-200 cursor-pointer ${
                    i === current
                      ? 'w-6 h-2 bg-secondary'
                      : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-300 hover:border-secondary hover:text-secondary transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
