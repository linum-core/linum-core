'use client'

interface ProjectMockupProps {
  kind: string
  title?: string
}

export function ProjectMockup({ kind, title = '' }: ProjectMockupProps) {
  const variantClass = `mock-art-${kind === 'navy' ? 1 : kind === 'wine' ? 3 : 2}`

  const innerByKind: Record<string, React.ReactNode> = {
    navy: (
      <div style={{ position: 'absolute', inset: '12% 10%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 14, width: '40%', background: 'rgba(244,246,251,0.18)', borderRadius: 3 }} />
        <div style={{ height: 8, width: '70%', background: 'rgba(244,246,251,0.1)', borderRadius: 3 }} />
        <div style={{ height: 8, width: '55%', background: 'rgba(244,246,251,0.1)', borderRadius: 3 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ aspectRatio: '1', background: 'rgba(74,122,184,0.18)', border: '1px solid rgba(74,122,184,0.35)', borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ marginTop: 16, height: 28, width: '30%', background: 'linear-gradient(135deg, #2F4F6F, #8A1F1F)', borderRadius: 99 }} />
      </div>
    ),

    wine: (
      <div style={{ position: 'absolute', inset: '15% 10%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ height: 10, width: '30%', background: 'rgba(244,246,251,0.15)', borderRadius: 2 }} />
          <div style={{ height: 10, width: 24, background: 'rgba(194,59,59,0.5)', borderRadius: 99 }} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 6, padding: '6px 0', borderBottom: '1px solid rgba(244,246,251,0.06)' }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: i === 1 ? '#FF6B6B' : 'rgba(74,122,184,0.5)', marginTop: 1 }} />
            <div style={{ flex: 1, height: 6, background: 'rgba(244,246,251,0.1)', borderRadius: 2 }} />
            <div style={{ width: 30, height: 6, background: 'rgba(244,246,251,0.06)', borderRadius: 2 }} />
          </div>
        ))}
      </div>
    ),

    neutral: (
      <div style={{ position: 'absolute', inset: '12% 10%', display: 'flex', gap: 10 }}>
        <div style={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 7, background: i === 2 ? 'rgba(74,122,184,0.4)' : 'rgba(244,246,251,0.08)', borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 14, width: '60%', background: 'rgba(244,246,251,0.16)', borderRadius: 3 }} />
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(47,79,111,0.18), rgba(194,59,59,0.12))', borderRadius: 4, border: '1px solid rgba(74,122,184,0.25)', display: 'flex', alignItems: 'flex-end', padding: 8, gap: 3 }}>
            {[40, 65, 30, 80, 55, 70, 45, 60, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i % 3 === 0 ? 'rgba(255,107,107,0.45)' : 'rgba(74,122,184,0.45)', borderRadius: 1 }} />
            ))}
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="mock">
      <div className="mock__chrome">
        <span className="mock__dot"></span>
        <span className="mock__dot"></span>
        <span className="mock__dot"></span>
        <span className="mock__url">linumcore.com / {title.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>
      <div className={`mock__body ${variantClass}`}>
        {innerByKind[kind] ?? innerByKind.neutral}
      </div>
    </div>
  )
}
