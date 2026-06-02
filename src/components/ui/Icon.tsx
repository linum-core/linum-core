'use client'

import type { JSX } from 'react'

export function CraftIconDefs(): JSX.Element {
  return <></>
}

export function Icon({ kind }: { kind: string }): JSX.Element {
  const base = {
    width: 88,
    height: 88,
    viewBox: '0 0 88 88',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (kind) {
    case 'compass':
      return (
        <svg {...base}>
          <circle cx="44" cy="16" r="5" />
          <path d="M 44 21 L 26 68" />
          <path d="M 44 21 L 62 68" />
          <path d="M 30 52 L 58 52" />
          <path d="M 22 68 L 30 68" />
          <path d="M 58 68 L 66 68" />
        </svg>
      )

    case 'lens':
      return (
        <svg {...base}>
          <polygon points="44,14 14,74 74,74" />
          <polygon points="44,30 26,66 62,66" strokeWidth="0.6" opacity="0.45" />
          <circle cx="44" cy="52" r="1.8" fill="currentColor" />
        </svg>
      )

    case 'links':
      return (
        <svg {...base}>
          <rect x="8" y="30" width="34" height="28" rx="14" />
          <rect x="46" y="30" width="34" height="28" rx="14" />
          <path d="M 42 44 L 46 44" />
        </svg>
      )

    case 'server':
      return (
        <svg {...base}>
          <rect x="14" y="18" width="60" height="14" rx="3" />
          <rect x="14" y="37" width="60" height="14" rx="3" />
          <rect x="14" y="56" width="60" height="14" rx="3" />
          <circle cx="62" cy="25" r="2.2" fill="currentColor" />
          <circle cx="62" cy="44" r="2.2" fill="currentColor" />
          <circle cx="62" cy="63" r="2.2" fill="currentColor" />
          <path d="M 22 25 L 50 25 M 22 44 L 50 44 M 22 63 L 50 63" strokeWidth="0.7" opacity="0.5" />
        </svg>
      )

    case 'monitor':
      return (
        <svg {...base}>
          <rect x="10" y="18" width="68" height="44" rx="4" />
          <path d="M 30 62 L 26 74 M 58 62 L 62 74 M 22 74 L 66 74" />
          <rect x="18" y="26" width="20" height="14" rx="2" strokeWidth="0.8" />
          <rect x="50" y="26" width="20" height="14" rx="2" strokeWidth="0.8" />
          <rect x="18" y="44" width="20" height="10" rx="2" strokeWidth="0.8" />
          <rect x="50" y="44" width="20" height="10" rx="2" strokeWidth="0.8" />
        </svg>
      )

    case 'chart':
      return (
        <svg {...base}>
          <path d="M 14 72 L 74 72" />
          <path d="M 14 16 L 14 72" strokeWidth="0.8" />
          <rect x="20" y="50" width="12" height="22" rx="2" fill="currentColor" fillOpacity="0.15" />
          <rect x="36" y="38" width="12" height="34" rx="2" fill="currentColor" fillOpacity="0.15" />
          <rect x="52" y="26" width="12" height="46" rx="2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 26 46 L 42 34 L 58 22" strokeWidth="1.4" />
        </svg>
      )

    case 'rocket':
      return (
        <svg {...base}>
          <path d="M 44 12 C 54 12 62 22 62 40 L 44 52 L 26 40 C 26 22 34 12 44 12 Z" />
          <circle cx="44" cy="32" r="5" />
          <path d="M 62 40 L 68 56 L 54 50" />
          <path d="M 26 40 L 20 56 L 34 50" />
          <path d="M 38 52 L 44 64 L 50 52" strokeWidth="1" opacity="0.7" />
        </svg>
      )

    case 'mappin':
      return (
        <svg {...base}>
          <path d="M 44 70 C 44 70 22 52 22 38 C 22 26 32 18 44 18 C 56 18 66 26 66 38 C 66 52 44 70 44 70 Z" />
          <circle cx="44" cy="38" r="8" />
        </svg>
      )

    case 'cloud':
      return (
        <svg {...base}>
          <path d="M 24 60 C 12 60 12 46 24 44 C 22 32 34 24 46 30 C 50 20 68 22 68 36 C 78 36 78 52 66 54 L 24 60 Z" />
        </svg>
      )

    case 'search':
      return (
        <svg {...base}>
          <circle cx="38" cy="38" r="20" />
          <path d="M 52 52 L 70 70" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )

    case 'globe':
      return (
        <svg {...base}>
          <circle cx="44" cy="44" r="28" />
          <ellipse cx="44" cy="44" rx="14" ry="28" />
          <path d="M 16 44 L 72 44" />
          <path d="M 20 30 C 32 34 56 34 68 30" strokeWidth="0.8" />
          <path d="M 20 58 C 32 54 56 54 68 58" strokeWidth="0.8" />
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
