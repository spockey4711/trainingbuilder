import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getMetrics } from "@/lib/actions/metrics";
import { format } from "date-fns";
import { HRVReadinessChart, SleepStressChart } from "@/components/metrics/metric-charts";

export default async function MetricsPage() {
  const { metrics } = await getMetrics(30);

  // Prepare chart data (reverse to show chronologically)
  const chartData = metrics
    .slice()
    .reverse()
    .map((m) => ({
      date: format(new Date(m.date), "MMM d"),
      hrv: m.hrv,
      readiness: m.readiness,
      sleepQuality: m.sleep_quality,
      stressLevel: m.stress_level,
    }));

  const hasData = metrics.length > 0;

  // Calculate averages
  const avgHRV = hasData
    ? Math.round(
        metrics.reduce((sum, m) => sum + (m.hrv || 0), 0) /
          metrics.filter((m) => m.hrv).length
      )
    : 0;

  const avgReadiness = hasData
    ? (
        metrics.reduce((sum, m) => sum + (m.readiness || 0), 0) /
        metrics.filter((m) => m.readiness).length
      ).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Metriken</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Erfasse HRV, Herzfrequenz und Leistungsdaten
          </p>
        </div>
        <Link href="/metrics/log">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Metriken protokollieren
          </Button>
        </Link>
      </div>

      {hasData && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ø HRV (30 Tage)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgHRV}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ø Bereitschaft (30 Tage)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgReadiness}/10</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Erfasste Tage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>HRV & Bereitschafts-Trend</CardTitle>
            <CardDescription>Letzte 30 Tage</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {hasData ? (
              <HRVReadinessChart data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Noch keine HRV-Daten
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schlaf & Stress</CardTitle>
            <CardDescription>Qualität und Stresslevel</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {hasData ? (
              <SleepStressChart data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Beginne Metriken zu protokollieren, um deine Trends zu sehen
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {hasData && (
        <Card>
          <CardHeader>
            <CardTitle>Letzte Einträge</CardTitle>
            <CardDescription>Deine letzten Metrik-Einträge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.slice(0, 10).map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{format(new Date(metric.date), "MMMM d, yyyy")}</div>
                    <div className="text-sm text-gray-500 flex gap-4 mt-1">
                      {metric.hrv && <span>HRV: {metric.hrv}</span>}
                      {metric.readiness && <span>Bereitschaft: {metric.readiness}/10</span>}
                      {metric.sleep_hours && <span>Schlaf: {metric.sleep_hours}h</span>}
                    </div>
                  </div>
                  {metric.readiness && (
                    <div className={`text-lg font-bold ${metric.readiness >= 7 ? "text-green-600" : metric.readiness >= 4 ? "text-yellow-600" : "text-red-600"}`}>
                      {metric.readiness}/10
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
