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

// Calculate workout statistics for all cycles
export async function getCycleWorkoutStats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { stats: {} };
  }

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("id, cycle_id, duration, distance, sport_type, metrics")
    .not("cycle_id", "is", null);

  if (error) {
    console.error("Error fetching workout stats:", error);
    return { stats: {} };
  }

  // Calculate stats by cycle
  const stats: Record<string, {
    count: number;
    totalDuration: number;
    totalDistance: number;
    totalVolume: number;
  }> = {};

  workouts?.forEach((workout) => {
    if (!workout.cycle_id) return;

    if (!stats[workout.cycle_id]) {
      stats[workout.cycle_id] = {
        count: 0,
        totalDuration: 0,
        totalDistance: 0,
        totalVolume: 0,
      };
    }

    stats[workout.cycle_id].count++;
    stats[workout.cycle_id].totalDuration += workout.duration || 0;
    stats[workout.cycle_id].totalDistance += workout.distance || 0;

    // Calculate volume (duration in hours * intensity factor)
    // For now, simple volume = duration in minutes
    // Can be enhanced with TSS or other metrics
    const volume = workout.duration || 0;
    stats[workout.cycle_id].totalVolume += volume;
  });

  return { stats };
}

// Get workouts for a specific cycle (including child cycles)
export async function getWorkoutsByCycle(cycleId: string, includeChildren: boolean = true) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { workouts: [] };
  }

  let cycleIds = [cycleId];

  if (includeChildren) {
    // Get all child cycles recursively
    const { cycles: allCycles } = await getCycles();
    const getChildCycleIds = (parentId: string): string[] => {
      const children = allCycles.filter((c: any) => c.parent_cycle_id === parentId);
      const childIds = children.map((c: any) => c.id);
      const grandchildIds = children.flatMap((c: any) => getChildCycleIds(c.id));
      return [...childIds, ...grandchildIds];
    };
    cycleIds = [cycleId, ...getChildCycleIds(cycleId)];
  }

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select(`
      *,
      workout_notes (*)
    `)
    .in("cycle_id", cycleIds)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching workouts by cycle:", error);
    return { workouts: [] };
  }

  return { workouts: workouts || [] };
}
