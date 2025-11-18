"use server";

import { createClient } from "@/lib/supabase/server";

export async function searchNotes(searchQuery?: string, sportFilter?: string, tagFilter?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { notes: [] };
  }

  let query = supabase
    .from("workout_notes")
    .select(`
      *,
      workouts (
        id,
        sport_type,
        date,
        duration,
        distance
      )
    `)
    .order("created_at", { ascending: false });

  // If there's a search query, filter by text fields
  if (searchQuery && searchQuery.trim()) {
    const searchTerm = `%${searchQuery}%`;
    query = query.or(
      `feeling.ilike.${searchTerm},what_went_well.ilike.${searchTerm},what_to_adjust.ilike.${searchTerm},physical_sensations.ilike.${searchTerm},mental_notes.ilike.${searchTerm}`
    );
  }

  const { data: notes, error } = await query;

  if (error) {
    console.error("Error searching notes:", error);
    return { notes: [] };
  }

  let filteredNotes = notes || [];

  // Filter by sport if specified
  if (sportFilter && sportFilter !== "all") {
    filteredNotes = filteredNotes.filter(
      (note: any) => note.workouts?.sport_type === sportFilter
    );
  }

  // Filter by tag if specified
  if (tagFilter && tagFilter !== "all") {
    filteredNotes = filteredNotes.filter(
      (note: any) => note.tags?.includes(tagFilter)
    );
  }

  return { notes: filteredNotes };
}

export async function getAllTags() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { tags: [] };
  }

  const { data: notes } = await supabase
    .from("workout_notes")
    .select("tags")
    .not("tags", "is", null);

  if (!notes) return { tags: [] };

  // Flatten all tags and get unique ones
  const allTags = notes.flatMap((note: any) => note.tags || []);
  const uniqueTags = Array.from(new Set(allTags));

  return { tags: uniqueTags };
}
