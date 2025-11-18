"use server";

import { createClient } from "@/lib/supabase/server";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";

export async function getWeekWorkouts(weekStart?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const startDate = weekStart ? new Date(weekStart) : new Date();
  const start = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(startDate, { weekStartsOn: 1 });

  const weekDays = eachDayOfInterval({ start, end });

  if (!user) {
    return {
      workouts: [],
      weekDays,
      weekStart: format(start, "yyyy-MM-dd"),
      weekEnd: format(end, "yyyy-MM-dd"),
    };
  }

  const { data: workouts } = await supabase
    .from("workouts")
    .select("*")
    .gte("date", format(start, "yyyy-MM-dd"))
    .lte("date", format(end, "yyyy-MM-dd"))
    .order("date", { ascending: true });

  return {
    workouts: workouts || [],
    weekDays,
    weekStart: format(start, "yyyy-MM-dd"),
    weekEnd: format(end, "yyyy-MM-dd"),
  };
}
