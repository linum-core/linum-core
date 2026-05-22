'use client'

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { radarSkills } from '@/lib/data/radarSkills'

export function SkillsRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadarChart data={radarSkills} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(212, 175, 55, 0.15)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#e0e0e0', fontSize: 12, fontFamily: 'var(--font-body)' }}
        />
        <Radar
          dataKey="value"
          stroke="#00d9ff"
          fill="#d4af37"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2a2a2a',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 4,
            color: '#ffffff',
            fontSize: 12,
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
