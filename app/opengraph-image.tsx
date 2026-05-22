// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Linum Core — Software Development & Consulting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ color: '#d4af37', fontSize: 72, fontWeight: 700, letterSpacing: '-2px', marginBottom: 24 }}>
          LINUM CORE
        </div>
        <div style={{ color: '#ffffff', fontSize: 32, marginBottom: 16 }}>
          Software Development & Consulting
        </div>
        <div style={{ color: '#00d9ff', fontSize: 22, fontStyle: 'italic' }}>
          There&apos;s an unseen connection… We build it.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            color: '#808080',
            fontSize: 18,
          }}
        >
          linumcore.com
        </div>
      </div>
    ),
    { ...size }
  )
}
