import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getWorkouts } from "@/lib/actions/workouts";
import { WorkoutList } from "@/components/workouts/workout-list";

export default async function WorkoutsPage() {
  const { workouts } = await getWorkouts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trainings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Protokolliere und verfolge deine Trainingseinheiten
          </p>
        </div>
        <Link href="/workouts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neues Training
          </Button>
        </Link>
      </div>

      <WorkoutList workouts={workouts} />
    </div>
  );
}
