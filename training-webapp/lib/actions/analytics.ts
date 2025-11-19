"use server";

import { createClient } from "@/lib/supabase/server";
import { startOfWeek, format, parseISO, differenceInWeeks, subDays } from "date-fns";
import type { SportType, VolumeAnalytics, SportVolumeBreakdown, WeeklyVolume } from "@/types";

// Get comprehensive volume analytics
export async function getVolumeAnalytics(startDate?: string, endDate?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { analytics: null };
  }

  let query = supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  if (startDate) {
    query = query.gte("date", startDate);
  }
  if (endDate) {
    query = query.lte("date", endDate);
  }

  const { data: workouts, error } = await query;

  if (error) {
    return { error: error.message };
  }

  if (!workouts || workouts.length === 0) {
    return {
      analytics: {
        totalDuration: 0,
        totalDistance: 0,
        totalWorkouts: 0,
        bySport: [],
        byWeek: [],
      },
    };
  }

  // Calculate totals
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
  const totalWorkouts = workouts.length;

  // Calculate by sport
  const sportMap = new Map<SportType, {
    duration: number;
    distance: number;
    workouts: number;
  }>();

  workouts.forEach((workout) => {
    const sport = workout.sport_type as SportType;
    if (!sportMap.has(sport)) {
      sportMap.set(sport, { duration: 0, distance: 0, workouts: 0 });
    }
    const stats = sportMap.get(sport)!;
    stats.duration += workout.duration || 0;
    stats.distance += workout.distance || 0;
    stats.workouts += 1;
  });

  const bySport: SportVolumeBreakdown[] = Array.from(sportMap.entries()).map(
    ([sport, stats]) => ({
      sport,
      duration: stats.duration,
      distance: stats.distance,
      workouts: stats.workouts,
      avgDuration: stats.workouts > 0 ? stats.duration / stats.workouts : 0,
      percentage: totalDuration > 0 ? (stats.duration / totalDuration) * 100 : 0,
    })
  );

  // Sort by duration descending
  bySport.sort((a, b) => b.duration - a.duration);

  // Calculate by week
  const weekMap = new Map<string, {
    duration: number;
    distance: number;
    workouts: number;
    tss: number;
  }>();

  workouts.forEach((workout) => {
    const date = parseISO(workout.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const weekKey = format(weekStart, "yyyy-MM-dd");

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, { duration: 0, distance: 0, workouts: 0, tss: 0 });
    }
    const stats = weekMap.get(weekKey)!;
    stats.duration += workout.duration || 0;
    stats.distance += workout.distance || 0;
    stats.workouts += 1;
    stats.tss += workout.metrics?.tss || 0;
  });

  const byWeek: WeeklyVolume[] = Array.from(weekMap.entries())
    .map(([week, stats]) => ({
      week,
      duration: stats.duration,
      distance: stats.distance,
      workouts: stats.workouts,
      tss: stats.tss > 0 ? stats.tss : undefined,
    }))
    .sort((a, b) => a.week.localeCompare(b.week));

  const analytics: VolumeAnalytics = {
    totalDuration,
    totalDistance,
    totalWorkouts,
    bySport,
    byWeek,
  };

  return { analytics };
}

// Get volume by cycle
export async function getVolumeByCycle(cycleId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { analytics: null };
  }

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .eq("cycle_id", cycleId)
    .order("date", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  if (!workouts || workouts.length === 0) {
    return {
      analytics: {
        totalDuration: 0,
        totalDistance: 0,
        totalWorkouts: 0,
        bySport: [],
        byWeek: [],
      },
    };
  }

  // Similar calculation as above
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
  const totalWorkouts = workouts.length;

  const sportMap = new Map<SportType, {
    duration: number;
    distance: number;
    workouts: number;
  }>();

  workouts.forEach((workout) => {
    const sport = workout.sport_type as SportType;
    if (!sportMap.has(sport)) {
      sportMap.set(sport, { duration: 0, distance: 0, workouts: 0 });
    }
    const stats = sportMap.get(sport)!;
    stats.duration += workout.duration || 0;
    stats.distance += workout.distance || 0;
    stats.workouts += 1;
  });

  const bySport: SportVolumeBreakdown[] = Array.from(sportMap.entries()).map(
    ([sport, stats]) => ({
      sport,
      duration: stats.duration,
      distance: stats.distance,
      workouts: stats.workouts,
      avgDuration: stats.workouts > 0 ? stats.duration / stats.workouts : 0,
      percentage: totalDuration > 0 ? (stats.duration / totalDuration) * 100 : 0,
    })
  );

  bySport.sort((a, b) => b.duration - a.duration);

  const analytics: VolumeAnalytics = {
    totalDuration,
    totalDistance,
    totalWorkouts,
    bySport,
    byWeek: [],
  };

  return { analytics };
}

// Calculate training load and fitness metrics
export async function getTrainingLoadMetrics(days: number = 42) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { metrics: null };
  }

  const startDate = format(subDays(new Date(), days), "yyyy-MM-dd");

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", startDate)
    .order("date", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  if (!workouts || workouts.length === 0) {
    return {
      metrics: {
        acuteLoad: 0,
        chronicLoad: 0,
        acwr: 0,
        currentTSS: 0,
        weeklyTSS: [],
      },
    };
  }

  // Calculate daily TSS (using duration as proxy if TSS not available)
  const dailyLoad = new Map<string, number>();
  workouts.forEach((workout) => {
    const date = workout.date;
    const tss = workout.metrics?.tss || (workout.duration || 0) / 60 * 50; // Rough estimate
    dailyLoad.set(date, (dailyLoad.get(date) || 0) + tss);
  });

  // Calculate Acute Load (last 7 days average)
  // Calculate Chronic Load (last 42 days average)
  const today = new Date();
  let acuteLoad = 0;
  let chronicLoad = 0;

  for (let i = 0; i < 42; i++) {
    const date = format(subDays(today, i), "yyyy-MM-dd");
    const load = dailyLoad.get(date) || 0;

    if (i < 7) {
      acuteLoad += load;
    }
    chronicLoad += load;
  }

  acuteLoad = acuteLoad / 7;
  chronicLoad = chronicLoad / 42;

  // ACWR (Acute:Chronic Workload Ratio)
  const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : 0;

  // Weekly TSS
  const weeklyTSS: { week: string; tss: number }[] = [];
  const weekMap = new Map<string, number>();

  workouts.forEach((workout) => {
    const date = parseISO(workout.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, "yyyy-MM-dd");
    const tss = workout.metrics?.tss || (workout.duration || 0) / 60 * 50;
    weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + tss);
  });

  Array.from(weekMap.entries()).forEach(([week, tss]) => {
    weeklyTSS.push({ week, tss });
  });

  weeklyTSS.sort((a, b) => a.week.localeCompare(b.week));

  const currentTSS = dailyLoad.get(format(today, "yyyy-MM-dd")) || 0;

  return {
    metrics: {
      acuteLoad: Math.round(acuteLoad),
      chronicLoad: Math.round(chronicLoad),
      acwr: Math.round(acwr * 100) / 100,
      currentTSS: Math.round(currentTSS),
      weeklyTSS,
    },
  };
}

// Get detailed workout analysis
export async function getDetailedWorkoutAnalysis() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { workouts: [] };
  }

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_notes (*)
    `)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(100);

  if (error) {
    return { error: error.message };
  }

  return { workouts: workouts || [] };
}
