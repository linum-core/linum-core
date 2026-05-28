'use client'

interface MonogramMarkProps {
  size?: number
}

export function MonogramMark({ size = 40 }: MonogramMarkProps) {
  return (
    <svg viewBox="0 0 100 56" width={size} height={size * 0.56} aria-hidden="true">
      <defs>
        <linearGradient id="mono-grad" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor="#6FA3D2" />
          <stop offset="0.5" stopColor="#6FA3D2" />
          <stop offset="0.5" stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      <path
        d="M 12 28 C 12 12, 32 12, 50 28 C 68 44, 88 44, 88 28 C 88 12, 68 12, 50 28 C 32 44, 12 44, 12 28 Z"
        fill="none" stroke="url(#mono-grad)" strokeWidth="1.5"
      />
      <path
        d="M 12 28 C 12 14, 32 14, 50 28 C 68 42, 88 42, 88 28 C 88 14, 68 14, 50 28 C 32 42, 12 42, 12 28 Z"
        fill="none" stroke="url(#mono-grad)" strokeWidth="0.5" opacity="0.5"
      />
    </svg>
  )
}
