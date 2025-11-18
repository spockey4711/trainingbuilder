"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface MetricChartsProps {
  data: any[];
}

export function HRVReadinessChart({ data }: MetricChartsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="hrv"
          stroke="#3B82F6"
          name="HRV"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="readiness"
          stroke="#10B981"
          name="Readiness"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SleepStressChart({ data }: MetricChartsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" fontSize={12} />
        <YAxis fontSize={12} domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sleepQuality"
          stroke="#8B5CF6"
          name="Sleep Quality"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="stressLevel"
          stroke="#EF4444"
          name="Stress"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
