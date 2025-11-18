"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, differenceInDays } from "date-fns";
import { ChevronDown, ChevronRight, Calendar, Target, TrendingUp, Activity } from "lucide-react";
import { useState } from "react";
import type { TrainingCycle } from "@/types";

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

const TYPE_COLORS: Record<string, string> = {
  macro: "border-l-4 border-blue-600",
  meso: "border-l-4 border-orange-600",
  micro: "border-l-4 border-green-600",
};

const TYPE_LABELS: Record<string, string> = {
  macro: "Macro Cycle",
  meso: "Meso Cycle",
  micro: "Micro Cycle",
};

interface HierarchicalCycleViewProps {
  cycles: TrainingCycle[];
  workoutStats?: Record<string, { count: number; totalDuration: number; totalDistance: number; totalVolume: number }>;
}

interface CycleNode {
  cycle: TrainingCycle;
  children: CycleNode[];
}

export function HierarchicalCycleView({ cycles, workoutStats = {} }: HierarchicalCycleViewProps) {
  // Build hierarchy
  const buildHierarchy = (cycles: TrainingCycle[]): CycleNode[] => {
    const cycleMap = new Map<string, CycleNode>();
    const roots: CycleNode[] = [];

    // Create nodes
    cycles.forEach((cycle) => {
      cycleMap.set(cycle.id, { cycle, children: [] });
    });

    // Build tree
    cycles.forEach((cycle) => {
      const node = cycleMap.get(cycle.id)!;
      if (cycle.parent_cycle_id && cycleMap.has(cycle.parent_cycle_id)) {
        cycleMap.get(cycle.parent_cycle_id)!.children.push(node);
      } else {
        roots.push(node);
      }
    });

    // Sort children by start date
    const sortChildren = (node: CycleNode) => {
      node.children.sort((a, b) =>
        new Date(a.cycle.start_date).getTime() - new Date(b.cycle.start_date).getTime()
      );
      node.children.forEach(sortChildren);
    };
    roots.forEach(sortChildren);

    return roots;
  };

  const hierarchy = buildHierarchy(cycles);

  return (
    <div className="space-y-4">
      {hierarchy.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 dark:text-gray-400">
              No training cycles created yet. Create a macro cycle to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        hierarchy.map((node) => (
          <CycleTreeNode key={node.cycle.id} node={node} workoutStats={workoutStats} level={0} />
        ))
      )}
    </div>
  );
}

interface CycleTreeNodeProps {
  node: CycleNode;
  workoutStats: Record<string, { count: number; totalDuration: number; totalDistance: number; totalVolume: number }>;
  level: number;
}

function CycleTreeNode({ node, workoutStats, level }: CycleTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const { cycle, children } = node;
  const today = new Date();

  const getProgress = () => {
    const start = new Date(cycle.start_date);
    const end = new Date(cycle.end_date);
    const total = differenceInDays(end, start);
    const elapsed = differenceInDays(today, start);
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const getStatus = () => {
    const start = new Date(cycle.start_date);
    const end = new Date(cycle.end_date);
    if (today < start) return "upcoming";
    if (today > end) return "completed";
    return "active";
  };

  const status = getStatus();
  const progress = getProgress();
  const stats = workoutStats[cycle.id] || { count: 0, totalDuration: 0, totalDistance: 0, totalVolume: 0 };

  const leftPadding = level * 24;

  return (
    <div style={{ marginLeft: `${leftPadding}px` }}>
      <Card className={`${TYPE_COLORS[cycle.type]} ${status === 'active' ? 'shadow-md' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {children.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {cycle.name}
                    {status === "active" && (
                      <span className="text-xs font-normal text-green-600 dark:text-green-400">
                        • Active
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {TYPE_LABELS[cycle.type]}
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${PHASE_COLORS[cycle.phase]}`}>
                      {PHASE_LABELS[cycle.phase]}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Date Range */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(cycle.start_date), "MMM d, yyyy")} -{" "}
              {format(new Date(cycle.end_date), "MMM d, yyyy")}
            </span>
            <span className="text-gray-400">
              ({differenceInDays(new Date(cycle.end_date), new Date(cycle.start_date))} days)
            </span>
          </div>

          {/* Goal */}
          {cycle.goal && (
            <div className="flex items-start gap-2 text-sm">
              <Target className="h-4 w-4 mt-0.5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{cycle.goal}</span>
            </div>
          )}

          {/* Progress Bar */}
          {status !== "upcoming" && (
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    cycle.type === "macro"
                      ? "bg-blue-600"
                      : cycle.type === "meso"
                      ? "bg-orange-600"
                      : "bg-green-600"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Workout Stats */}
          {stats.count > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
              <div>
                <div className="text-xs text-gray-500">Workouts</div>
                <div className="text-lg font-semibold">{stats.count}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Total Time</div>
                <div className="text-lg font-semibold">
                  {Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                </div>
              </div>
              {stats.totalDistance > 0 && (
                <div>
                  <div className="text-xs text-gray-500">Total Distance</div>
                  <div className="text-lg font-semibold">{stats.totalDistance.toFixed(1)} km</div>
                </div>
              )}
              <div>
                <div className="text-xs text-gray-500">Volume</div>
                <div className="text-lg font-semibold">{stats.totalVolume.toFixed(0)}</div>
              </div>
            </div>
          )}

          {/* Child Count */}
          {children.length > 0 && (
            <div className="text-xs text-gray-500">
              Contains {children.length}{" "}
              {cycle.type === "macro" ? "meso" : cycle.type === "meso" ? "micro" : "sub"} cycle
              {children.length !== 1 ? "s" : ""}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Render Children */}
      {isExpanded && children.length > 0 && (
        <div className="mt-4 space-y-4">
          {children.map((child) => (
            <CycleTreeNode
              key={child.cycle.id}
              node={child}
              workoutStats={workoutStats}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
