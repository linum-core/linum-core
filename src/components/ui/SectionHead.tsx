import type { ReactNode } from 'react'

interface SectionHeadProps {
  num: string
  category: string
  title: ReactNode
  lede?: string
}

export function SectionHead({ num, category, title, lede }: SectionHeadProps) {
  return (
    <div className="section-head reveal">
      <div className="section-head__meta">
        <span className="section-head__num">{num}</span>
        <span className="section-head__dot" />
        <span>{category}</span>
      </div>
      <div>
        <h2 className="section-head__title">{title}</h2>
        {lede && <p className="section-head__lede">{lede}</p>}
      </div>
    </div>
  )
}
