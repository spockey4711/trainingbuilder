"use client";

import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteWorkout } from "@/lib/actions/workouts";
import { useState } from "react";
import type { SportType } from "@/types";

interface WorkoutNote {
  id: string;
  rpe: number | null;
  feeling: string | null;
  what_went_well: string | null;
  what_to_adjust: string | null;
  tags: string[] | null;
}

interface Workout {
  id: string;
  sport_type: SportType;
  date: string;
  workout_time?: string | null;
  duration: number;
  distance: number | null;
  metrics: any;
  workout_notes: WorkoutNote[];
}

const SPORT_COLORS: Record<SportType, string> = {
  swim: "bg-swim",
  bike: "bg-bike",
  run: "bg-run",
  hockey: "bg-hockey",
  gym: "bg-gym",
};

const SPORT_LABELS: Record<SportType, string> = {
  swim: "Swim",
  bike: "Bike",
  run: "Run",
  hockey: "Hockey",
  gym: "Gym",
};

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this workout?")) return;

    setDeletingId(id);
    await deleteWorkout(id);
    setDeletingId(null);
  };

  if (workouts.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No workouts logged yet. Click "New Workout" to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => {
        const note = workout.workout_notes?.[0];

        return (
          <Card key={workout.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${SPORT_COLORS[workout.sport_type]}`} />
                    <h3 className="text-lg font-semibold">
                      {SPORT_LABELS[workout.sport_type]}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(workout.date), "MMM d, yyyy")}
                      {workout.workout_time && ` • ${workout.workout_time}`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{workout.duration} min</span>
                    {workout.distance && <span>{workout.distance} km</span>}
                    {note?.rpe && <span>RPE: {note.rpe}/10</span>}
                    {workout.metrics?.avg_heart_rate && (
                      <span>Avg HR: {workout.metrics.avg_heart_rate}</span>
                    )}
                    {workout.metrics?.pace && (
                      <span>Pace: {workout.metrics.pace} min/km</span>
                    )}
                  </div>

                  {note?.feeling && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {note.feeling}
                    </p>
                  )}

                  {note?.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {workout.sport_type === "gym" && workout.metrics?.exercises && (
                    <div className="mt-3 space-y-1">
                      {workout.metrics.exercises.map((ex: any, i: number) => (
                        <div key={i} className="text-sm text-gray-600 dark:text-gray-400">
                          {ex.name}: {ex.sets} × {ex.reps} @ {ex.weight}kg
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(workout.id)}
                  disabled={deletingId === workout.id}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
