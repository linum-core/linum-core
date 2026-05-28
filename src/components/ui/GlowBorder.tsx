'use client'

import { useState, type ReactNode } from 'react'

interface GlowBorderProps {
  color?: 'blue' | 'wine'
  className?: string
  children: ReactNode
}

export function GlowBorder({ color = 'blue', className = '', children }: GlowBorderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowAnimation =
    color === 'blue'
      ? 'glow-pulse 2s ease-in-out infinite alternate'
      : 'red-pulse 2s ease-in-out infinite alternate'

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
