import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeekWorkouts } from "@/lib/actions/calendar";
import { getActiveCycle } from "@/lib/actions/cycles";
import { format } from "date-fns";
import { CalendarWeekView } from "@/components/calendar/calendar-week-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PHASE_COLORS: Record<string, string> = {
  base: "bg-blue-50 border-blue-200",
  build: "bg-orange-50 border-orange-200",
  peak: "bg-red-50 border-red-200",
  taper: "bg-purple-50 border-purple-200",
  recovery: "bg-green-50 border-green-200",
};

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const params = await searchParams;
  const { workouts, weekDays, weekStart, weekEnd } = await getWeekWorkouts(
    params.week
  );
  const { cycle: activeMeso } = await getActiveCycle("meso");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kalender</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Woche vom {format(new Date(weekStart), "MMM d")} -{" "}
            {format(new Date(weekEnd), "MMM d, yyyy")}
          </p>
        </div>
        <Link href="/workouts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Training protokollieren
          </Button>
        </Link>
      </div>

      {activeMeso && (
        <Card className={`border-2 ${PHASE_COLORS[activeMeso.phase]}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{activeMeso.name}</div>
                <div className="text-sm text-gray-600">
                  {activeMeso.phase.charAt(0).toUpperCase() + activeMeso.phase.slice(1)} Phase
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(activeMeso.start_date), "MMM d")} -{" "}
                {format(new Date(activeMeso.end_date), "MMM d")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <CalendarWeekView
        weekDays={weekDays}
        workouts={workouts}
        currentWeekStart={weekStart}
      />
    </div>
  );
}
