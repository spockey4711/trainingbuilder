"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addWeeks, subWeeks } from "date-fns";
import { useRouter } from "next/navigation";
import type { SportType } from "@/types";

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

interface CalendarWeekViewProps {
  weekDays: Date[];
  workouts: any[];
  currentWeekStart: string;
}

export function CalendarWeekView({
  weekDays,
  workouts,
  currentWeekStart,
}: CalendarWeekViewProps) {
  const router = useRouter();

  const navigateWeek = (direction: "prev" | "next") => {
    const currentDate = new Date(currentWeekStart);
    const newDate = direction === "prev" ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1);
    router.push(`/calendar?week=${format(newDate, "yyyy-MM-dd")}`);
  };

  const goToToday = () => {
    router.push("/calendar");
  };

  const getWorkoutsForDay = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    return workouts.filter((w) => w.date === dayStr);
  };

  const isToday = (day: Date) => {
    const today = format(new Date(), "yyyy-MM-dd");
    return format(day, "yyyy-MM-dd") === today;
  };

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous Week
        </Button>
        <Button variant="outline" size="sm" onClick={goToToday}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
          Next Week
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayWorkouts = getWorkoutsForDay(day);
          const today = isToday(day);

          return (
            <Card
              key={day.toISOString()}
              className={`${today ? "border-2 border-blue-600" : ""}`}
            >
              <CardContent className="p-4">
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-500">
                    {format(day, "EEEE")}
                  </div>
                  <div className={`text-2xl font-bold ${today ? "text-blue-600" : ""}`}>
                    {format(day, "d")}
                  </div>
                </div>

                <div className="space-y-2">
                  {dayWorkouts.length === 0 ? (
                    <div className="text-xs text-gray-400 text-center py-4">
                      Rest day
                    </div>
                  ) : (
                    dayWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        className={`p-2 rounded text-white text-xs ${
                          SPORT_COLORS[workout.sport_type as SportType]
                        }`}
                      >
                        <div className="font-medium">
                          {SPORT_LABELS[workout.sport_type as SportType]}
                        </div>
                        <div className="opacity-90">
                          {workout.duration} min
                          {workout.distance && ` • ${workout.distance} km`}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Week Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Week Summary</div>
            <div className="flex gap-4 text-sm">
              <span>{workouts.length} workouts</span>
              <span>
                {workouts.reduce((sum, w) => sum + (w.duration || 0), 0)} total minutes
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
