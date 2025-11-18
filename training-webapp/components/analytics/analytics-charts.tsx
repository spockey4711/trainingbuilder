"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format, parseISO } from "date-fns";
import type { VolumeAnalytics } from "@/types";

const SPORT_COLORS: Record<string, string> = {
  swim: "#3B82F6",
  bike: "#F97316",
  run: "#10B981",
  hockey: "#EF4444",
  gym: "#8B5CF6",
};

const SPORT_LABELS: Record<string, string> = {
  swim: "Swim",
  bike: "Bike",
  run: "Run",
  hockey: "Hockey",
  gym: "Gym",
};

interface AnalyticsChartsProps {
  analytics: VolumeAnalytics;
}

export function WeeklyVolumeChart({ analytics }: AnalyticsChartsProps) {
  const weeklyChartData = analytics.byWeek.map((week) => ({
    week: format(parseISO(week.week), "MMM d"),
    duration: Math.round(week.duration / 60 * 10) / 10,
    distance: week.distance,
    workouts: week.workouts,
    tss: week.tss || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weeklyChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="duration"
          stroke="#3B82F6"
          name="Duration (hours)"
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="distance"
          stroke="#10B981"
          name="Distance (km)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SportPieChart({ analytics }: AnalyticsChartsProps) {
  const sportPieData = analytics.bySport.map((sport) => ({
    name: SPORT_LABELS[sport.sport],
    value: sport.duration,
    percentage: Math.round(sport.percentage),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={sportPieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry: any) => `${entry.name}: ${entry.percentage}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {sportPieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={SPORT_COLORS[analytics.bySport[index].sport]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function WeeklyWorkoutsChart({ analytics }: AnalyticsChartsProps) {
  const weeklyChartData = analytics.byWeek.map((week) => ({
    week: format(parseISO(week.week), "MMM d"),
    workouts: week.workouts,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={weeklyChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="workouts" fill="#10B981" name="Workouts" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface TSSChartProps {
  weeklyTSS: { week: string; tss: number }[];
}

export function WeeklyTSSChart({ weeklyTSS }: TSSChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={weeklyTSS.slice(-8)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="week"
          tickFormatter={(value) => format(parseISO(value), "MMM d")}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => format(parseISO(value as string), "MMM d, yyyy")}
        />
        <Bar dataKey="tss" fill="#8B5CF6" name="TSS" />
      </BarChart>
    </ResponsiveContainer>
  );
}
