interface CardProps {
  glowColor?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

export function Card({ glowColor = 'primary', className = '', children }: CardProps) {
  const hoverClasses =
    glowColor === 'primary'
      ? 'hover:border-blue-3/60 hover:shadow-[0_0_20px_rgba(74,122,184,0.2)]'
      : 'hover:border-red-2/60'

  return (
    <div
      className={`
        bg-bg-2/40 backdrop-blur-md
        border border-blue-3/20 rounded-lg
        transition-all duration-300
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
