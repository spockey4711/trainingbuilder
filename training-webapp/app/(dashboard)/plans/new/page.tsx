import { PlanForm } from "@/components/plans/plan-form";
import { getCycles } from "@/lib/actions/cycles";

export default async function NewPlanPage() {
  const { cycles } = await getCycles();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">Create Training Plan</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Build a reusable weekly training template
        </p>
      </div>

      <PlanForm cycles={cycles} />
    </div>
  );
}
