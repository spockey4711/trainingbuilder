import { MetricForm } from "@/components/metrics/metric-form";
import { getTodayMetric } from "@/lib/actions/metrics";

export default async function LogMetricPage() {
  const { metric } = await getTodayMetric();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Log Daily Metrics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {metric ? "Update today's metrics" : "Track your recovery markers"}
        </p>
      </div>

      <MetricForm existingMetric={metric} />
    </div>
  );
}
