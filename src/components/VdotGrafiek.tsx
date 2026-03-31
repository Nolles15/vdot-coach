import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Dot,
} from 'recharts';
import type { TestResult } from '../lib/supabase';

interface Props {
  results: TestResult[];
}

export default function VdotGrafiek({ results }: Props) {
  const { t } = useTranslation();

  if (results.length < 2) {
    return <p className="text-sm text-slate-500 italic">{t('chart_no_data')}</p>;
  }

  const sorted = [...results].sort(
    (a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime()
  );

  const data = sorted.map((r) => ({ date: r.test_date, vdot: r.vdot }));
  const minVdot = Math.floor(Math.min(...data.map((d) => d.vdot)) - 2);
  const maxVdot = Math.ceil(Math.max(...data.map((d) => d.vdot)) + 2);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={false}
          tickFormatter={(v: string) => {
            const d = new Date(v);
            return `${d.getDate()}-${d.getMonth() + 1}`;
          }}
        />
        <YAxis
          domain={[minVdot, maxVdot]}
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
          itemStyle={{ color: '#60a5fa' }}
          labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
          formatter={(value) => [
            typeof value === 'number' ? value.toFixed(1) : value,
            t('chart_vdot'),
          ]}
          labelFormatter={(label) => new Date(String(label)).toLocaleDateString('nl-NL')}
        />
        <Line
          type="monotone"
          dataKey="vdot"
          stroke="#3b82f6"
          strokeWidth={2.5}
          dot={<Dot r={4} fill="#3b82f6" stroke="#1e293b" strokeWidth={2} />}
          activeDot={{ r: 6, fill: '#60a5fa', stroke: '#1e293b', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
