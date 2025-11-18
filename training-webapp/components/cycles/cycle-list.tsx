"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { deleteCycle } from "@/lib/actions/cycles";
import { useState } from "react";
import type { CycleType } from "@/types";

const PHASE_COLORS: Record<string, string> = {
  base: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  build: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  peak: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  taper: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  recovery: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const PHASE_LABELS: Record<string, string> = {
  base: "Base",
  build: "Build",
  peak: "Peak",
  taper: "Taper",
  recovery: "Recovery",
};

interface CycleListProps {
  title: string;
  cycles: any[];
  type: CycleType;
}

export function CycleList({ title, cycles, type }: CycleListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cycle?")) return;

    setDeletingId(id);
    await deleteCycle(id);
    setDeletingId(null);
  };

  if (cycles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No {type} cycles created yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cycles.map((cycle) => (
            <div
              key={cycle.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{cycle.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${PHASE_COLORS[cycle.phase]}`}>
                    {PHASE_LABELS[cycle.phase]}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {format(new Date(cycle.start_date), "MMM d, yyyy")} -{" "}
                  {format(new Date(cycle.end_date), "MMM d, yyyy")}
                </div>
                {cycle.goal && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {cycle.goal}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(cycle.id)}
                disabled={deletingId === cycle.id}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
