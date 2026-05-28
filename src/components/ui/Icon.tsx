'use client'

import type { JSX } from 'react'

export function CraftIconDefs(): JSX.Element {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={0.9} />
        </filter>
        <radialGradient id="icon-tint-blue" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#6FA3D2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6FA3D2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="icon-tint-red" cx="0.7" cy="0.7" r="0.7">
          <stop offset="0" stopColor="#FF6B6B" stopOpacity="0.30" />
          <stop offset="1" stopColor="#FF6B6B" stopOpacity="0" />
        </radialGradient>
        <pattern id="paper-grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="rgba(255,255,255,0.012)" />
        </pattern>
      </defs>
    </svg>
  )
}

export function Icon({ kind }: { kind: string }): JSX.Element {
  const base = {
    width: 88,
    height: 88,
    viewBox: '0 0 88 88',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const tint = (
    <>
      <circle cx="44" cy="44" r="36" fill="url(#icon-tint-blue)" />
      <circle cx="44" cy="44" r="36" fill="url(#icon-tint-red)" />
    </>
  )

  switch (kind) {
    case 'compass':
      return (
        <svg {...base}>
          {tint}
          <g filter="url(#ink-rough)">
            <circle cx="44" cy="14" r="2.2" fill="currentColor" />
            <circle cx="44" cy="14" r="3.6" />
            <path d="M 44 17 L 24 70" />
            <path d="M 44 17 L 64 70" />
            <path d="M 22 73 L 26 67" strokeWidth="0.9" />
            <path d="M 24 70 L 26 73" strokeWidth="0.9" />
            <path d="M 62 73 L 66 67" strokeWidth="0.9" />
            <path d="M 64 70 L 66 73" strokeWidth="0.9" />
            <path d="M 16 64 C 28 78, 60 78, 72 64" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.7" />
            <path d="M 18 80 L 22 80 M 30 80 L 34 80 M 42 80 L 46 80 M 54 80 L 58 80 M 66 80 L 70 80" strokeWidth="0.7" opacity="0.55" />
          </g>
        </svg>
      )

    case 'lens':
      return (
        <svg {...base}>
          {tint}
          <g>
            <path d="M 24 64 L 64 64 L 44 22 Z" strokeWidth="1.1" />
            <path d="M 32 58 L 56 58 L 44 32 Z" strokeWidth="0.5" opacity="0.5" />
            <circle cx="24" cy="64" r="3" fill="currentColor" />
            <circle cx="64" cy="64" r="3" fill="currentColor" />
            <circle cx="44" cy="22" r="3" fill="currentColor" />
            <circle cx="44" cy="50" r="1.4" fill="currentColor" opacity="0.85" />
            <path d="M 44 44 L 44 56 M 38 50 L 50 50" strokeWidth="0.6" opacity="0.7" />
          </g>
        </svg>
      )

    case 'anchor':
      return (
        <svg {...base}>
          {tint}
          <g>
            <rect x="10" y="36" width="68" height="16" rx="2" strokeWidth="1.1" />
            <rect x="32" y="38" width="24" height="12" rx="1.2" strokeWidth="0.8" opacity="0.7" />
            <circle cx="44" cy="44" r="3.5" strokeWidth="1.1" />
            <circle cx="44" cy="44" r="1.2" fill="currentColor" />
            <path d="M 18 36 L 18 34 M 26 36 L 26 34 M 62 36 L 62 34 M 70 36 L 70 34" strokeWidth="0.7" opacity="0.65" />
            <path d="M 18 52 L 18 54 M 26 52 L 26 54 M 62 52 L 62 54 M 70 52 L 70 54" strokeWidth="0.7" opacity="0.65" />
            <path d="M 6 64 L 82 64" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 3" />
          </g>
        </svg>
      )

    case 'knot':
      return (
        <svg {...base}>
          {tint}
          <g>
            <circle cx="32" cy="44" r="20" strokeWidth="1.2" />
            <circle cx="56" cy="44" r="20" strokeWidth="1.2" />
            <circle cx="32" cy="44" r="16" strokeWidth="0.5" opacity="0.4" />
            <circle cx="56" cy="44" r="16" strokeWidth="0.5" opacity="0.4" />
            <circle cx="44" cy="44" r="2" fill="currentColor" />
            <path d="M 18 44 L 70 44" strokeWidth="0.5" opacity="0.35" strokeDasharray="2 3" />
          </g>
        </svg>
      )

    case 'quill':
      return (
        <svg {...base}>
          {tint}
          <g>
            <rect x="14" y="14" width="60" height="60" strokeWidth="1.1" />
            <circle cx="44" cy="44" r="22" strokeWidth="0.9" opacity="0.7" />
            <path d="M 14 34 L 74 34 M 14 54 L 74 54 M 34 14 L 34 74 M 54 14 L 54 74"
              strokeWidth="0.4" opacity="0.35" />
            <circle cx="54" cy="34" r="2.4" fill="currentColor" />
            <circle cx="54" cy="34" r="5" strokeWidth="0.6" opacity="0.6" />
            <path d="M 14 22 L 14 14 L 22 14" strokeWidth="0.8" />
          </g>
        </svg>
      )

    case 'key':
      return (
        <svg {...base}>
          {tint}
          <g filter="url(#ink-rough)">
            <circle cx="22" cy="44" r="14" strokeWidth="1.2" />
            <circle cx="22" cy="44" r="10" opacity="0.5" />
            <circle cx="22" cy="44" r="3" fill="currentColor" />
            <path d="M 36 44 L 76 44" strokeWidth="1.3" />
            <path d="M 60 44 L 60 52 L 64 52 L 64 44" />
            <path d="M 70 44 L 70 50 L 74 50 L 74 44" />
            <path d="M 14 38 C 18 36, 24 36, 30 38 M 14 50 C 18 52, 24 52, 30 50" strokeWidth="0.7" opacity="0.6" />
            <path d="M 22 32 L 22 36 M 22 52 L 22 56" strokeWidth="0.7" opacity="0.6" />
          </g>
        </svg>
      )

    default:
      return (
        <svg {...base}>
          <circle cx="44" cy="44" r="20" />
        </svg>
      )
  }
}
