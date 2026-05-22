interface CardProps {
  glowColor?: 'cyan' | 'gold'
  className?: string
  children: React.ReactNode
}

export function Card({ glowColor = 'cyan', className = '', children }: CardProps) {
  const hoverBorder =
    glowColor === 'cyan' ? 'hover:border-accent/60' : 'hover:border-secondary/60'
  const hoverShadow =
    glowColor === 'cyan'
      ? 'hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]'
      : 'hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'

  return (
    <div
      className={`
        bg-primary-light/40 backdrop-blur-md
        border border-secondary/20 rounded-lg
        transition-all duration-300
        ${hoverBorder} ${hoverShadow}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
