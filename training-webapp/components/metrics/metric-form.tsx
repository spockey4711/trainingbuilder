"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createOrUpdateMetric } from "@/lib/actions/metrics";

interface MetricFormProps {
  existingMetric?: any;
}

export function MetricForm({ existingMetric }: MetricFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createOrUpdateMetric(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/metrics");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Daily Metrics</CardTitle>
          <CardDescription>Track your recovery and readiness markers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={existingMetric?.date || today}
              max={today}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hrv">HRV (Heart Rate Variability)</Label>
              <Input
                id="hrv"
                name="hrv"
                type="number"
                min="0"
                placeholder="65"
                defaultValue={existingMetric?.hrv || ""}
              />
              <p className="text-xs text-gray-500">Higher is generally better</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restingHeartRate">Resting Heart Rate</Label>
              <Input
                id="restingHeartRate"
                name="restingHeartRate"
                type="number"
                min="0"
                max="200"
                placeholder="60"
                defaultValue={existingMetric?.resting_heart_rate || ""}
              />
              <p className="text-xs text-gray-500">BPM, lower is generally better</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sleepHours">Sleep (hours)</Label>
              <Input
                id="sleepHours"
                name="sleepHours"
                type="number"
                step="0.5"
                min="0"
                max="24"
                placeholder="7.5"
                defaultValue={existingMetric?.sleep_hours || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleepQuality">Sleep Quality (1-10)</Label>
              <Input
                id="sleepQuality"
                name="sleepQuality"
                type="number"
                min="1"
                max="10"
                placeholder="8"
                defaultValue={existingMetric?.sleep_quality || ""}
              />
              <p className="text-xs text-gray-500">1 = Poor, 10 = Excellent</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min="0"
              placeholder="70.5"
              defaultValue={existingMetric?.weight || ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
              <Input
                id="stressLevel"
                name="stressLevel"
                type="number"
                min="1"
                max="10"
                placeholder="5"
                defaultValue={existingMetric?.stress_level || ""}
              />
              <p className="text-xs text-gray-500">1 = Very low, 10 = Very high</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readiness">Training Readiness (1-10)</Label>
              <Input
                id="readiness"
                name="readiness"
                type="number"
                min="1"
                max="10"
                placeholder="8"
                defaultValue={existingMetric?.readiness || ""}
              />
              <p className="text-xs text-gray-500">1 = Not ready, 10 = Fully ready</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save Metrics"}
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
