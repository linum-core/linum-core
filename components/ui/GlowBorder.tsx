'use client'

import { useState, type ReactNode } from 'react'

interface GlowBorderProps {
  color?: 'cyan' | 'gold'
  className?: string
  children: ReactNode
}

export function GlowBorder({ color = 'cyan', className = '', children }: GlowBorderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowAnimation =
    color === 'cyan'
      ? 'glow-pulse 2s ease-in-out infinite alternate'
      : 'gold-pulse 2s ease-in-out infinite alternate'

  return (
    <div
      className={`transition-all duration-300 rounded-lg ${className}`}
      style={isHovered ? { animation: glowAnimation } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}
