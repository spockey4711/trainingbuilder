"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrUpdateMetric(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const date = formData.get("date") as string;
  const hrv = formData.get("hrv") ? parseInt(formData.get("hrv") as string) : null;
  const restingHeartRate = formData.get("restingHeartRate") ? parseInt(formData.get("restingHeartRate") as string) : null;
  const weight = formData.get("weight") ? parseFloat(formData.get("weight") as string) : null;
  const sleepHours = formData.get("sleepHours") ? parseFloat(formData.get("sleepHours") as string) : null;
  const sleepQuality = formData.get("sleepQuality") ? parseInt(formData.get("sleepQuality") as string) : null;
  const stressLevel = formData.get("stressLevel") ? parseInt(formData.get("stressLevel") as string) : null;
  const readiness = formData.get("readiness") ? parseInt(formData.get("readiness") as string) : null;

  // Check if metric already exists for this date
  const { data: existing } = await supabase
    .from("metrics")
    .select("id")
    .eq("user_id", user.id)
    .eq("date", date)
    .single();

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from("metrics")
      .update({
        hrv,
        resting_heart_rate: restingHeartRate,
        weight,
        sleep_hours: sleepHours,
        sleep_quality: sleepQuality,
        stress_level: stressLevel,
        readiness,
      })
      .eq("id", existing.id);

    if (error) {
      return { error: error.message };
    }
  } else {
    // Insert new
    const { error } = await supabase
      .from("metrics")
      .insert({
        user_id: user.id,
        date,
        hrv,
        resting_heart_rate: restingHeartRate,
        weight,
        sleep_hours: sleepHours,
        sleep_quality: sleepQuality,
        stress_level: stressLevel,
        readiness,
      });

    if (error) {
      return { error: error.message };
    }
  }

  revalidatePath("/metrics");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function getMetrics(days: number = 30) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { metrics: [] };
  }

  const { data: metrics, error } = await supabase
    .from("metrics")
    .select("*")
    .order("date", { ascending: false })
    .limit(days);

  if (error) {
    console.error("Error fetching metrics:", error);
    return { metrics: [] };
  }

  return { metrics: metrics || [] };
}

export async function getTodayMetric() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { metric: null };
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: metric } = await supabase
    .from("metrics")
    .select("*")
    .eq("date", today)
    .single();

  return { metric };
}

export async function deleteMetric(metricId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("metrics")
    .delete()
    .eq("id", metricId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/metrics");
  revalidatePath("/dashboard");

  return { success: true };
}
