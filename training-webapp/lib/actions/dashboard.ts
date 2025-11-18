"use server";

import { createClient } from "@/lib/supabase/server";
import { startOfWeek, endOfWeek, format } from "date-fns";

export async function getDashboardStats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      thisWeekWorkouts: 0,
      thisWeekVolume: {},
      recentWorkouts: [],
      todayHRV: null,
      currentCycle: null,
    };
  }

  const now = new Date();
  const weekStart = format(startOfWeek(now), "yyyy-MM-dd");
  const weekEnd = format(endOfWeek(now), "yyyy-MM-dd");
  const today = format(now, "yyyy-MM-dd");

  // Get this week's workouts
  const { data: weekWorkouts } = await supabase
    .from("workouts")
    .select("*")
    .gte("date", weekStart)
    .lte("date", weekEnd)
    .eq("completed", true);

  // Calculate volume by sport
  const volumeBySport: Record<string, number> = {
    swim: 0,
    bike: 0,
    run: 0,
    hockey: 0,
    gym: 0,
  };

  weekWorkouts?.forEach((workout) => {
    volumeBySport[workout.sport_type] += workout.duration || 0;
  });

  // Get recent workouts with notes
  const { data: recentWorkouts } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_notes (*)
    `)
    .order("date", { ascending: false })
    .limit(5);

  // Get today's HRV
  const { data: todayMetrics } = await supabase
    .from("metrics")
    .select("hrv, readiness")
    .eq("date", today)
    .single();

  // Get current active cycle
  const { data: currentCycle } = await supabase
    .from("training_cycles")
    .select("*")
    .lte("start_date", today)
    .gte("end_date", today)
    .eq("type", "meso")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return {
    thisWeekWorkouts: weekWorkouts?.length || 0,
    thisWeekVolume: volumeBySport,
    recentWorkouts: recentWorkouts || [],
    todayHRV: todayMetrics?.hrv || null,
    todayReadiness: todayMetrics?.readiness || null,
    currentCycle: currentCycle || null,
  };
}
