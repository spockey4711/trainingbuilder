import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SPORT_COLORS: Record<string, string> = {
  swim: "bg-swim",
  bike: "bg-bike",
  run: "bg-run",
  hockey: "bg-hockey",
  gym: "bg-gym",
};

const SPORT_LABELS: Record<string, string> = {
  swim: "Schwimmen",
  bike: "Radfahren",
  run: "Laufen",
  hockey: "Hockey",
  gym: "Gym",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Willkommen zurück, {user?.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diese Woche</CardTitle>
            <div className="h-4 w-4 text-blue-600">📅</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeekWorkouts} Trainings</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stats.thisWeekWorkouts === 0 ? "Beginne dein Training zu protokollieren" : "Weiter so!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktueller Zyklus</CardTitle>
            <div className="h-4 w-4 text-blue-600">🎯</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.currentCycle?.name || "Nicht festgelegt"}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stats.currentCycle?.phase || "Erstelle einen Trainingszyklus"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HRV Heute</CardTitle>
            <div className="h-4 w-4 text-blue-600">💓</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayHRV || "--"}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stats.todayReadiness ? `Bereitschaft: ${stats.todayReadiness}/10` : "Erfasse deine täglichen Metriken"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Letzte Trainings</CardTitle>
            <CardDescription>Deine letzten Trainingseinheiten</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentWorkouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Noch keine Trainings. Protokolliere dein erstes Training!
                </p>
                <Link href="/workouts/new">
                  <Button size="sm">Training protokollieren</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentWorkouts.map((workout: any) => (
                  <div key={workout.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${SPORT_COLORS[workout.sport_type]}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{SPORT_LABELS[workout.sport_type]}</div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(workout.date), "MMM d")} • {workout.duration} Min
                        {workout.distance && ` • ${workout.distance} km`}
                      </div>
                    </div>
                    {workout.workout_notes?.[0]?.rpe && (
                      <div className="text-sm font-medium">
                        RPE {workout.workout_notes[0].rpe}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wochenvolumen</CardTitle>
            <CardDescription>Trainingsvolumen nach Sportart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.thisWeekVolume).map(([sport, minutes]) => (
                <div key={sport} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${SPORT_COLORS[sport]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{SPORT_LABELS[sport]}</span>
                      <span className="text-sm text-gray-500">{minutes} Min</span>
                    </div>
                    {minutes > 0 && (
                      <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${SPORT_COLORS[sport]}`}
                          style={{ width: `${Math.min((minutes / 300) * 100, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
