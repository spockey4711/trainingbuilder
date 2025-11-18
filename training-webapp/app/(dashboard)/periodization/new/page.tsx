import { CycleForm } from "@/components/cycles/cycle-form";
import { getCyclesByType } from "@/lib/actions/cycles";

export default async function NewCyclePage() {
  const { cycles: macroCycles } = await getCyclesByType("macro");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Training Cycle</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Set up your periodization structure
        </p>
      </div>

      <CycleForm parentCycles={macroCycles} />
    </div>
  );
}
