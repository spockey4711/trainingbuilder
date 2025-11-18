"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createTrainingPlan } from "@/lib/actions/plans";
import { Plus, Trash2 } from "lucide-react";
import type { SportType, TrainingCycle, DayPlan } from "@/types";

const SPORT_OPTIONS: { value: SportType; label: string }[] = [
  { value: "swim", label: "Swim" },
  { value: "bike", label: "Bike" },
  { value: "run", label: "Run" },
  { value: "hockey", label: "Hockey" },
  { value: "gym", label: "Gym" },
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface PlanFormProps {
  cycles?: TrainingCycle[];
}

export function PlanForm({ cycles = [] }: PlanFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weeks, setWeeks] = useState(1);

  // Initialize with one week of rest days
  const [weeklyPlans, setWeeklyPlans] = useState<DayPlan[][]>([
    Array(7).fill(null).map((_, day) => ({
      day: day + 1,
      is_rest_day: true,
      workout_type: "",
      sport_type: undefined,
      target_duration: undefined,
      target_distance: undefined,
      intensity: "",
    }))
  ]);

  const handleAddWeek = () => {
    setWeeks(weeks + 1);
    setWeeklyPlans([
      ...weeklyPlans,
      Array(7).fill(null).map((_, day) => ({
        day: day + 1,
        is_rest_day: true,
        workout_type: "",
        sport_type: undefined,
        target_duration: undefined,
        target_distance: undefined,
        intensity: "",
      }))
    ]);
  };

  const handleRemoveWeek = (weekIndex: number) => {
    setWeeks(weeks - 1);
    setWeeklyPlans(weeklyPlans.filter((_, i) => i !== weekIndex));
  };

  const handleDayChange = (weekIndex: number, dayIndex: number, field: keyof DayPlan, value: any) => {
    const updated = [...weeklyPlans];
    updated[weekIndex][dayIndex] = {
      ...updated[weekIndex][dayIndex],
      [field]: value,
    };

    // If toggling rest day, clear other fields
    if (field === "is_rest_day" && value === true) {
      updated[weekIndex][dayIndex].sport_type = undefined;
      updated[weekIndex][dayIndex].workout_type = "";
      updated[weekIndex][dayIndex].target_duration = undefined;
      updated[weekIndex][dayIndex].target_distance = undefined;
      updated[weekIndex][dayIndex].intensity = "";
    }

    setWeeklyPlans(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Build structure
    const structure = weeklyPlans.map((week, weekIndex) => ({
      week: weekIndex + 1,
      days: week,
    }));

    formData.set("structure", JSON.stringify(structure));

    const result = await createTrainingPlan(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/plans");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>Name and describe your training plan template</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Base Building - 4 Week Block"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Focus on building aerobic base with long slow distance work..."
              rows={3}
            />
          </div>

          {cycles.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="cycleId">Associated Cycle (optional)</Label>
              <Select id="cycleId" name="cycleId">
                <option value="">None</option>
                {cycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name} ({cycle.type})
                  </option>
                ))}
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Structure */}
      {weeklyPlans.map((week, weekIndex) => (
        <Card key={weekIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Week {weekIndex + 1}</CardTitle>
                <CardDescription>Define the workout structure for this week</CardDescription>
              </div>
              {weeklyPlans.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveWeek(weekIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{DAYS_OF_WEEK[dayIndex]}</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`rest-${weekIndex}-${dayIndex}`}
                      checked={day.is_rest_day}
                      onChange={(e) =>
                        handleDayChange(weekIndex, dayIndex, "is_rest_day", e.target.checked)
                      }
                      className="rounded"
                    />
                    <Label htmlFor={`rest-${weekIndex}-${dayIndex}`} className="text-sm">
                      Rest Day
                    </Label>
                  </div>
                </div>

                {!day.is_rest_day && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Sport</Label>
                      <Select
                        value={day.sport_type || ""}
                        onChange={(e) =>
                          handleDayChange(weekIndex, dayIndex, "sport_type", e.target.value as SportType)
                        }
                      >
                        <option value="">Select sport...</option>
                        {SPORT_OPTIONS.map((sport) => (
                          <option key={sport.value} value={sport.value}>
                            {sport.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Workout Type</Label>
                      <Input
                        value={day.workout_type}
                        onChange={(e) =>
                          handleDayChange(weekIndex, dayIndex, "workout_type", e.target.value)
                        }
                        placeholder="e.g., Long run, Tempo, Recovery"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Duration (min)</Label>
                      <Input
                        type="number"
                        value={day.target_duration || ""}
                        onChange={(e) =>
                          handleDayChange(weekIndex, dayIndex, "target_duration", parseInt(e.target.value) || undefined)
                        }
                        placeholder="60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Distance (km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={day.target_distance || ""}
                        onChange={(e) =>
                          handleDayChange(weekIndex, dayIndex, "target_distance", parseFloat(e.target.value) || undefined)
                        }
                        placeholder="10"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm">Intensity / Notes</Label>
                      <Input
                        value={day.intensity || ""}
                        onChange={(e) =>
                          handleDayChange(weekIndex, dayIndex, "intensity", e.target.value)
                        }
                        placeholder="Easy pace, Zone 2, 70-75% max HR"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAddWeek}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Another Week
      </Button>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Creating..." : "Create Training Plan"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
