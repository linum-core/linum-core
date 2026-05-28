'use client'

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type DataKey = 'technical' | 'stacks' | 'relational'

const datasets: Record<DataKey, { subject: string; value: number }[]> = {
  technical: [
    { subject: 'TypeScript', value: 90 },
    { subject: 'Node.js', value: 85 },
    { subject: 'Next.js', value: 88 },
    { subject: 'System Design', value: 80 },
    { subject: 'Testing', value: 75 },
    { subject: 'DevOps', value: 72 },
  ],
  stacks: [
    { subject: 'React', value: 92 },
    { subject: 'PostgreSQL', value: 82 },
    { subject: 'Docker', value: 78 },
    { subject: 'AWS', value: 74 },
    { subject: 'Redis', value: 70 },
    { subject: 'GraphQL', value: 76 },
  ],
  relational: [
    { subject: 'Communication', value: 88 },
    { subject: 'Project Mgmt', value: 85 },
    { subject: 'Client Relations', value: 90 },
    { subject: 'Problem Solving', value: 92 },
    { subject: 'Agile', value: 84 },
    { subject: 'Documentation', value: 78 },
  ],
}

interface SkillsRadarChartProps {
  dataKey: DataKey
}

export function SkillsRadarChart({ dataKey }: SkillsRadarChartProps) {
  const data = datasets[dataKey]

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(74, 122, 184, 0.2)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#e0e0e0', fontSize: 12, fontFamily: 'var(--font-body)' }}
        />
        <Radar
          dataKey="value"
          stroke="#4a7ab8"
          fill="rgba(74,122,184,0.15)"
          fillOpacity={1}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a1f28',
            border: '1px solid rgba(74,122,184,0.3)',
            borderRadius: 4,
            color: '#f4f6fb',
            fontSize: 12,
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
