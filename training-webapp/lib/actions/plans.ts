"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { WeeklyStructure } from "@/types";

export async function createTrainingPlan(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cycleId = formData.get("cycleId") as string | null;
  const structureJson = formData.get("structure") as string;

  let structure: WeeklyStructure[] = [];

  if (structureJson) {
    try {
      structure = JSON.parse(structureJson);
    } catch (e) {
      return { error: "Invalid plan structure" };
    }
  }

  const { data: plan, error } = await supabase
    .from("training_plans")
    .insert({
      user_id: user.id,
      name,
      description,
      cycle_id: cycleId || null,
      structure,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plans");

  return { success: true, plan };
}

export async function getTrainingPlans() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { plans: [] };
  }

  const { data: plans, error } = await supabase
    .from("training_plans")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching training plans:", error);
    return { plans: [] };
  }

  return { plans: plans || [] };
}

export async function getTrainingPlan(planId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { plan: null };
  }

  const { data: plan, error } = await supabase
    .from("training_plans")
    .select("*")
    .eq("id", planId)
    .single();

  if (error) {
    console.error("Error fetching training plan:", error);
    return { plan: null };
  }

  return { plan };
}

export async function deleteTrainingPlan(planId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("training_plans")
    .delete()
    .eq("id", planId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/plans");
}

export async function applyPlanToWeek(
  planId: string,
  weekStartDate: string
): Promise<{ success?: boolean; workoutsCreated?: number; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Get the plan
  const { plan } = await getTrainingPlan(planId);

  if (!plan) {
    return { error: "Plan not found" };
  }

  const structure = plan.structure as WeeklyStructure[];

  if (!structure || structure.length === 0) {
    return { error: "Plan has no structure" };
  }

  // Calculate dates for the week
  const startDate = new Date(weekStartDate);
  const workoutsToCreate = [];

  for (const weekPlan of structure) {
    for (const dayPlan of weekPlan.days) {
      if (dayPlan.is_rest_day || dayPlan.workouts.length === 0) {
        continue;
      }

      // Calculate the date for this day (Monday = 0, Sunday = 6)
      const workoutDate = new Date(startDate);
      workoutDate.setDate(startDate.getDate() + dayPlan.day);

      for (const workoutPlan of dayPlan.workouts) {
        workoutsToCreate.push({
          user_id: user.id,
          date: workoutDate.toISOString().split("T")[0],
          sport_type: workoutPlan.sport_type || "run",
          duration: workoutPlan.target_duration || null,
          distance: workoutPlan.target_distance || null,
          workout_time: workoutPlan.time || null,
          cycle_id: plan.cycle_id,
          metrics: {
            workout_type: workoutPlan.workout_type,
            intensity: workoutPlan.intensity,
          },
        });
      }
    }
  }

  if (workoutsToCreate.length === 0) {
    return { error: "No workouts to create from this plan" };
  }

  // Insert workouts
  const { data, error } = await supabase
    .from("workouts")
    .insert(workoutsToCreate)
    .select();

  if (error) {
    console.error("Error creating workouts:", error);
    return { error: error.message };
  }

  revalidatePath("/calendar");
  revalidatePath("/workouts");

  return { success: true, workoutsCreated: data?.length || 0 };
}
