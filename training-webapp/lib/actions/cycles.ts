"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CycleType, PhaseType } from "@/types";

export async function createCycle(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const type = formData.get("type") as CycleType;
  const name = formData.get("name") as string;
  const phase = formData.get("phase") as PhaseType;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const goal = formData.get("goal") as string;
  const parentCycleId = formData.get("parentCycleId") as string | null;

  const { data: cycle, error } = await supabase
    .from("training_cycles")
    .insert({
      user_id: user.id,
      type,
      name,
      phase,
      start_date: startDate,
      end_date: endDate,
      goal,
      parent_cycle_id: parentCycleId || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/periodization");
  revalidatePath("/dashboard");

  return { success: true, cycle };
}

export async function getCycles() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { cycles: [] };
  }

  const { data: cycles, error } = await supabase
    .from("training_cycles")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching cycles:", error);
    return { cycles: [] };
  }

  return { cycles: cycles || [] };
}

export async function getCyclesByType(type: CycleType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { cycles: [] };
  }

  const { data: cycles, error } = await supabase
    .from("training_cycles")
    .select("*")
    .eq("type", type)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching cycles:", error);
    return { cycles: [] };
  }

  return { cycles: cycles || [] };
}

export async function getActiveCycle(type: CycleType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { cycle: null };
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: cycle } = await supabase
    .from("training_cycles")
    .select("*")
    .eq("type", type)
    .lte("start_date", today)
    .gte("end_date", today)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return { cycle };
}

export async function deleteCycle(cycleId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("training_cycles")
    .delete()
    .eq("id", cycleId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/periodization");
  revalidatePath("/dashboard");

  return { success: true };
}
