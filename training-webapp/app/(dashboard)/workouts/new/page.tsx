import { WorkoutForm } from "@/components/workouts/workout-form";

export default function NewWorkoutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Log Workout</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Record your training session and post-training notes
        </p>
      </div>

      <WorkoutForm />
    </div>
  );
}
