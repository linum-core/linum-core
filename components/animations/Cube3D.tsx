'use client'

import { useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface Cube3DProps {
  size?: number
  className?: string
}

export function Cube3D({ size = 120, className = '' }: Cube3DProps) {
  const shouldReduce = useReducedMotion()

  const half = size / 2

  const faceStyle = (transform: string, bg: string, border: string): CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    transform,
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 2,
    backfaceVisibility: 'hidden',
  })

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: size * 4 }}
      aria-hidden="true"
    >
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: shouldReduce ? 'none' : `cube-rotate 15s linear infinite`,
        }}
      >
        {/* Front — accent/cyan */}
        <div style={faceStyle(`translateZ(${half}px)`, 'rgba(0, 217, 255, 0.05)', 'rgba(0, 217, 255, 0.60)')} />
        {/* Back — secondary/gold */}
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`, 'rgba(212, 175, 55, 0.05)', 'rgba(212, 175, 55, 0.60)')} />
        {/* Left — lighter accent */}
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`, 'rgba(0, 217, 255, 0.02)', 'rgba(0, 217, 255, 0.30)')} />
        {/* Right — lighter secondary */}
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`, 'rgba(212, 175, 55, 0.02)', 'rgba(212, 175, 55, 0.30)')} />
        {/* Top */}
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`, 'rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.15)')} />
        {/* Bottom */}
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`, 'rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.15)')} />
      </div>
    </div>
  )
}
