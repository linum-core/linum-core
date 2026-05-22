'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
