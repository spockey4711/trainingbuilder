import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { getCycles, getCyclesByType, getActiveCycle, getCycleWorkoutStats } from "@/lib/actions/cycles";
import { format, differenceInDays } from "date-fns";
import { CycleList } from "@/components/cycles/cycle-list";
import { HierarchicalCycleView } from "@/components/cycles/hierarchical-cycle-view";

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

export default async function PeriodizationPage() {
  const { cycles: allCycles } = await getCycles();
  const { cycles: macroCycles } = await getCyclesByType("macro");
  const { cycles: mesoCycles } = await getCyclesByType("meso");
  const { cycles: microCycles } = await getCyclesByType("micro");

  const { cycle: activeMacro } = await getActiveCycle("macro");
  const { cycle: activeMeso } = await getActiveCycle("meso");
  const { cycle: activeMicro } = await getActiveCycle("micro");

  const { stats: workoutStats } = await getCycleWorkoutStats();

  const today = new Date();

  const getProgress = (cycle: any) => {
    const start = new Date(cycle.start_date);
    const end = new Date(cycle.end_date);
    const total = differenceInDays(end, start);
    const elapsed = differenceInDays(today, start);
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Periodization</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage macro, meso, and micro training cycles
          </p>
        </div>
        <Link href="/periodization/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Cycle
          </Button>
        </Link>
      </div>

      {/* Active Cycles Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Macro Cycle</CardTitle>
            <CardDescription>12-24 week season planning</CardDescription>
          </CardHeader>
          <CardContent>
            {activeMacro ? (
              <div className="space-y-2">
                <div className="font-semibold">{activeMacro.name}</div>
                <div className={`inline-block px-2 py-1 text-xs rounded ${PHASE_COLORS[activeMacro.phase]}`}>
                  {PHASE_LABELS[activeMacro.phase]}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(activeMacro.start_date), "MMM d")} -{" "}
                  {format(new Date(activeMacro.end_date), "MMM d, yyyy")}
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${getProgress(activeMacro)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(getProgress(activeMacro))}% complete
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No active macro cycle
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Meso Cycle</CardTitle>
            <CardDescription>3-6 week training block</CardDescription>
          </CardHeader>
          <CardContent>
            {activeMeso ? (
              <div className="space-y-2">
                <div className="font-semibold">{activeMeso.name}</div>
                <div className={`inline-block px-2 py-1 text-xs rounded ${PHASE_COLORS[activeMeso.phase]}`}>
                  {PHASE_LABELS[activeMeso.phase]}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(activeMeso.start_date), "MMM d")} -{" "}
                  {format(new Date(activeMeso.end_date), "MMM d")}
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-600"
                      style={{ width: `${getProgress(activeMeso)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(getProgress(activeMeso))}% complete
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No active meso cycle
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Micro Cycle</CardTitle>
            <CardDescription>This week's structure</CardDescription>
          </CardHeader>
          <CardContent>
            {activeMicro ? (
              <div className="space-y-2">
                <div className="font-semibold">{activeMicro.name}</div>
                <div className={`inline-block px-2 py-1 text-xs rounded ${PHASE_COLORS[activeMicro.phase]}`}>
                  {PHASE_LABELS[activeMicro.phase]}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(activeMicro.start_date), "MMM d")} -{" "}
                  {format(new Date(activeMicro.end_date), "MMM d")}
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${getProgress(activeMicro)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(getProgress(activeMicro))}% complete
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No active micro cycle
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hierarchical View */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Training Plan Hierarchy</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          View your complete training structure with micro cycles nested in meso cycles, and meso cycles in macro cycles.
        </p>
        <HierarchicalCycleView cycles={allCycles} workoutStats={workoutStats} />
      </div>

      {/* All Cycles Lists - Legacy View */}
      <details className="mt-8">
        <summary className="text-lg font-semibold cursor-pointer mb-4">
          List View (All Cycles)
        </summary>
        <div className="space-y-6">
          <CycleList title="Macro Cycles" cycles={macroCycles} type="macro" />
          <CycleList title="Meso Cycles" cycles={mesoCycles} type="meso" />
          <CycleList title="Micro Cycles" cycles={microCycles} type="micro" />
        </div>
      </details>
    </div>
  );
}
