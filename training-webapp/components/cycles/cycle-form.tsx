"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createCycle } from "@/lib/actions/cycles";
import type { CycleType, PhaseType } from "@/types";

interface CycleFormProps {
  defaultType?: CycleType;
  parentCycles?: any[];
}

export function CycleForm({ defaultType = "meso", parentCycles = [] }: CycleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cycleType, setCycleType] = useState<CycleType>(defaultType);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createCycle(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/periodization");
      router.refresh();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Training Cycle</CardTitle>
          <CardDescription>
            {cycleType === "macro" && "Long-term seasonal planning (12-24 weeks)"}
            {cycleType === "meso" && "Training block with specific focus (3-6 weeks)"}
            {cycleType === "micro" && "Weekly training structure"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Cycle Type</Label>
            <Select
              id="type"
              name="type"
              value={cycleType}
              onChange={(e) => setCycleType(e.target.value as CycleType)}
              required
            >
              <option value="macro">Macro Cycle (12-24 weeks)</option>
              <option value="meso">Meso Cycle (3-6 weeks)</option>
              <option value="micro">Micro Cycle (1 week)</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder={
                cycleType === "macro"
                  ? "Summer Season 2024"
                  : cycleType === "meso"
                  ? "Base Building Block 1"
                  : "Week 1 - Easy Recovery"
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phase">Training Phase</Label>
            <Select id="phase" name="phase" required>
              <option value="base">Base - Building aerobic foundation</option>
              <option value="build">Build - Increasing intensity</option>
              <option value="peak">Peak - Race-specific intensity</option>
              <option value="taper">Taper - Pre-competition rest</option>
              <option value="recovery">Recovery - Active recovery</option>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                min={today}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal / Focus</Label>
            <Textarea
              id="goal"
              name="goal"
              placeholder="What are you working towards in this cycle?"
              rows={3}
              required
            />
          </div>

          {cycleType !== "macro" && parentCycles.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="parentCycleId">Parent Cycle (Optional)</Label>
              <Select id="parentCycleId" name="parentCycleId">
                <option value="">None</option>
                {parentCycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.name}
                  </option>
                ))}
              </Select>
              <p className="text-xs text-gray-500">
                Link this cycle to a larger training block
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Creating..." : "Create Cycle"}
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
