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

export async function deleteTrainingPlan(planId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("training_plans")
    .delete()
    .eq("id", planId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/plans");

  return { success: true };
}
