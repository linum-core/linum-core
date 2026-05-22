'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { fadeInUp } from '@/lib/animations'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: fadeInUp.hidden,
        visible: {
          ...(fadeInUp.visible as object),
          transition: {
            ...((fadeInUp.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
