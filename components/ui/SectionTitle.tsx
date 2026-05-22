interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignClass =
    align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignClass} mb-12 ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl text-white font-semibold tracking-wide">
        {title}
      </h2>
      <div className="mt-3 w-16 h-0.5 bg-secondary" />
      {subtitle && (
        <p className="mt-4 text-neutral-300 text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}
