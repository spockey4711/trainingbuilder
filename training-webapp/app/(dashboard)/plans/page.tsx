import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import { getTrainingPlans, deleteTrainingPlan } from "@/lib/actions/plans";
import { format } from "date-fns";
import { ApplyPlanDialog } from "@/components/apply-plan-dialog";

const SPORT_LABELS: Record<string, string> = {
  swim: "Swim",
  bike: "Bike",
  run: "Run",
  hockey: "Hockey",
  gym: "Gym",
};

const SPORT_COLORS: Record<string, string> = {
  swim: "bg-swim",
  bike: "bg-bike",
  run: "bg-run",
  hockey: "bg-hockey",
  gym: "bg-gym",
};

export default async function PlansPage() {
  const { plans } = await getTrainingPlans();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Plans</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your training templates and weekly structures
          </p>
        </div>
        <Link href="/plans/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Training Plans</CardTitle>
            <CardDescription>Reusable weekly structures for different phases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No training plans created yet. Build templates for base, build, peak, and taper phases!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan: any) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {plan.description || "No description"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {plan.structure?.length || 0} week{plan.structure?.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>Created {format(new Date(plan.created_at), "MMM d, yyyy")}</span>
                </div>

                {/* Weekly Overview */}
                <div className="space-y-2">
                  {plan.structure?.slice(0, 2).map((week: any) => (
                    <div key={week.week} className="text-sm">
                      <div className="font-medium mb-1">Week {week.week}</div>
                      <div className="flex flex-wrap gap-1">
                        {week.days?.map((day: any, idx: number) => {
                          if (day.is_rest_day) {
                            return (
                              <div
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs rounded"
                              >
                                Rest
                              </div>
                            );
                          }

                          // Handle new structure with workouts array
                          const workouts = day.workouts || [];
                          if (workouts.length === 0) {
                            return (
                              <div
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs rounded"
                              >
                                Rest
                              </div>
                            );
                          }

                          // Show multiple workouts per day
                          return workouts.map((workout: any, wIdx: number) => (
                            <div
                              key={`${idx}-${wIdx}`}
                              className={`px-2 py-1 ${workout.sport_type ? SPORT_COLORS[workout.sport_type] : "bg-gray-200"} text-xs rounded text-white`}
                            >
                              {workout.sport_type ? SPORT_LABELS[workout.sport_type] : "Workout"}
                              {workout.target_duration && ` ${workout.target_duration}m`}
                              {workout.time && ` ${workout.time}`}
                              {workouts.length > 1 && ` (${wIdx + 1})`}
                            </div>
                          ));
                        })}
                      </div>
                    </div>
                  ))}
                  {plan.structure && plan.structure.length > 2 && (
                    <div className="text-xs text-gray-500">
                      + {plan.structure.length - 2} more week{plan.structure.length - 2 !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t flex gap-2">
                  <div className="flex-1">
                    <ApplyPlanDialog planId={plan.id} planName={plan.name} />
                  </div>
                  <form action={deleteTrainingPlan.bind(null, plan.id)} className="flex-1">
                    <Button type="submit" variant="ghost" size="sm" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
