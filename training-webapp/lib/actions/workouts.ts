"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SportType } from "@/types";

export async function createWorkout(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract workout data
  const sportType = formData.get("sportType") as SportType;
  const date = formData.get("date") as string;
  const workoutTime = formData.get("workoutTime") as string | null;
  const duration = parseInt(formData.get("duration") as string);
  const distance = formData.get("distance") ? parseFloat(formData.get("distance") as string) : null;
  const cycleId = formData.get("cycleId") as string | null;

  // Build metrics object based on sport type
  const metrics: Record<string, any> = {};

  // Common metrics
  if (formData.get("avgHeartRate")) {
    metrics.avg_heart_rate = parseInt(formData.get("avgHeartRate") as string);
  }
  if (formData.get("maxHeartRate")) {
    metrics.max_heart_rate = parseInt(formData.get("maxHeartRate") as string);
  }

  // Sport-specific metrics
  if (sportType === "swim" || sportType === "bike" || sportType === "run") {
    if (formData.get("pace")) metrics.pace = parseFloat(formData.get("pace") as string);
    if (formData.get("tss")) metrics.tss = parseInt(formData.get("tss") as string);
    if (sportType === "bike" && formData.get("power")) {
      metrics.power = parseInt(formData.get("power") as string);
    }
  } else if (sportType === "hockey") {
    if (formData.get("fieldTime")) metrics.field_time = parseInt(formData.get("fieldTime") as string);
    if (formData.get("sprintCount")) metrics.sprint_count = parseInt(formData.get("sprintCount") as string);
    const drillTypes = formData.get("drillTypes") as string;
    if (drillTypes) metrics.drill_types = drillTypes.split(",").map(d => d.trim());
  } else if (sportType === "gym") {
    // For gym, we'll parse exercises from a JSON field
    const exercisesJson = formData.get("exercises") as string;
    if (exercisesJson) {
      try {
        metrics.exercises = JSON.parse(exercisesJson);
      } catch (e) {
        // Invalid JSON, skip
      }
    }
  }

  // Insert workout
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .insert({
      user_id: user.id,
      sport_type: sportType,
      date,
      workout_time: workoutTime || null,
      duration,
      distance,
      metrics,
      cycle_id: cycleId || null,
      completed: true,
      planned: false,
    })
    .select()
    .single();

  if (workoutError) {
    return { error: workoutError.message };
  }

  // Extract notes data
  const rpe = formData.get("rpe") ? parseInt(formData.get("rpe") as string) : null;
  const feeling = formData.get("feeling") as string;
  const whatWentWell = formData.get("whatWentWell") as string;
  const whatToAdjust = formData.get("whatToAdjust") as string;
  const physicalSensations = formData.get("physicalSensations") as string;
  const mentalNotes = formData.get("mentalNotes") as string;
  const tagsString = formData.get("tags") as string;
  const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(t => t) : [];

  // Insert workout notes if any notes data exists
  if (rpe || feeling || whatWentWell || whatToAdjust || physicalSensations || mentalNotes || tags.length > 0) {
    const { error: notesError } = await supabase
      .from("workout_notes")
      .insert({
        user_id: user.id,
        workout_id: workout.id,
        rpe,
        feeling,
        what_went_well: whatWentWell,
        what_to_adjust: whatToAdjust,
        physical_sensations: physicalSensations,
        mental_notes: mentalNotes,
        tags: tags.length > 0 ? tags : null,
      });

    if (notesError) {
      console.error("Error creating notes:", notesError);
      // Don't fail the whole operation if notes fail
    }
  }

  revalidatePath("/workouts");
  revalidatePath("/dashboard");

  return { success: true, workout };
}

export async function getWorkouts() {
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
    .order("date", { ascending: false })
    .order("workout_time", { ascending: false, nullsLast: true })
    .limit(50);

  if (error) {
    return { error: error.message };
  }

  return { workouts: workouts || [] };
}

export async function deleteWorkout(workoutId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/workouts");
  revalidatePath("/dashboard");

  return { success: true };
}
