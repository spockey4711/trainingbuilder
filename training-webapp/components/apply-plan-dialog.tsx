"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { applyPlanToWeek } from "@/lib/actions/plans";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ApplyPlanDialog({ planId, planName }: { planId: string; planName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [weekStart, setWeekStart] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleApply = async () => {
    if (!weekStart) {
      setMessage({ type: "error", text: "Please select a week start date" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await applyPlanToWeek(planId, weekStart);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({
        type: "success",
        text: `${result.workoutsCreated} workouts created successfully!`,
      });
      setTimeout(() => {
        setIsOpen(false);
        setMessage(null);
      }, 2000);
    }

    setLoading(false);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="ghost" size="sm" className="w-full">
        <Calendar className="h-4 w-4 mr-2" />
        Apply to Week
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">Apply "{planName}" to Week</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="weekStart">Week Start Date (Monday)</Label>
            <Input
              id="weekStart"
              type="date"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select a Monday to start the week
            </p>
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={loading} className="flex-1">
              {loading ? "Applying..." : "Apply Plan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
