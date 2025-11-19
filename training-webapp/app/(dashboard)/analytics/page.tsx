import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getVolumeAnalytics, getTrainingLoadMetrics } from "@/lib/actions/analytics";
import { Activity, TrendingUp, Target, Zap, Calendar } from "lucide-react";
import { format } from "date-fns";
import { WeeklyVolumeChart, SportPieChart, WeeklyWorkoutsChart, WeeklyTSSChart } from "@/components/analytics/analytics-charts";

const SPORT_COLORS: Record<string, string> = {
  swim: "#3B82F6",
  bike: "#F97316",
  run: "#10B981",
  hockey: "#EF4444",
  gym: "#8B5CF6",
};

const SPORT_LABELS: Record<string, string> = {
  swim: "Swim",
  bike: "Bike",
  run: "Run",
  hockey: "Hockey",
  gym: "Gym",
};

export default async function AnalyticsPage() {
  // Get last 12 weeks of data
  const startDate = format(new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");
  const { analytics, error: analyticsError } = await getVolumeAnalytics(startDate);
  const { metrics: loadMetrics, error: metricsError } = await getTrainingLoadMetrics(42);

  if (analyticsError || metricsError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Training Analytics</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          <p className="font-semibold">Error loading analytics data</p>
          <p className="text-sm mt-1">{analyticsError || metricsError}</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Training Analytics</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No training data available yet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { totalDuration, totalDistance, totalWorkouts, bySport } = analytics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Comprehensive analysis of your training volume, load, and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">Last 12 weeks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalDuration / 60)}h
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(totalDuration / 60 / 12)} hrs/week avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDistance.toFixed(0)} km</div>
            <p className="text-xs text-muted-foreground">
              {(totalDistance / 12).toFixed(1)} km/week avg
            </p>
          </CardContent>
        </Card>

        {loadMetrics && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ACWR</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadMetrics.acwr.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {loadMetrics.acwr < 0.8 && "Low load"}
                {loadMetrics.acwr >= 0.8 && loadMetrics.acwr <= 1.3 && "Optimal zone"}
                {loadMetrics.acwr > 1.3 && loadMetrics.acwr <= 1.5 && "Caution"}
                {loadMetrics.acwr > 1.5 && "High injury risk"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Weekly Volume Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Training Volume</CardTitle>
          <CardDescription>Duration and distance trends over the last 12 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyVolumeChart analytics={analytics} />
        </CardContent>
      </Card>

      {/* Sport Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Volume by Sport</CardTitle>
            <CardDescription>Training time distribution across sports</CardDescription>
          </CardHeader>
          <CardContent>
            <SportPieChart analytics={analytics} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sport Breakdown</CardTitle>
            <CardDescription>Detailed statistics by sport type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bySport.map((sport) => (
                <div key={sport.sport} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: SPORT_COLORS[sport.sport] }}
                      />
                      <span className="font-medium">{SPORT_LABELS[sport.sport]}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {sport.workouts} workouts
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                    <div>
                      <div className="font-semibold">{Math.round(sport.duration / 60)}h</div>
                      <div className="text-xs text-gray-400">Total time</div>
                    </div>
                    {sport.distance > 0 && (
                      <div>
                        <div className="font-semibold">{sport.distance.toFixed(1)} km</div>
                        <div className="text-xs text-gray-400">Distance</div>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{Math.round(sport.avgDuration)} min</div>
                      <div className="text-xs text-gray-400">Avg duration</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        backgroundColor: SPORT_COLORS[sport.sport],
                        width: `${sport.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Load Metrics */}
      {loadMetrics && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Training Load</CardTitle>
              <CardDescription>Acute and chronic training load analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Acute Load (7 days)</span>
                    <span className="text-lg font-bold">{loadMetrics.acuteLoad}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${Math.min((loadMetrics.acuteLoad / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Chronic Load (42 days)</span>
                    <span className="text-lg font-bold">{loadMetrics.chronicLoad}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${Math.min((loadMetrics.chronicLoad / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Acute:Chronic Workload Ratio (ACWR)
                  </div>
                  <div className="text-3xl font-bold mb-2">{loadMetrics.acwr.toFixed(2)}</div>
                  <div className="text-sm">
                    {loadMetrics.acwr < 0.8 && (
                      <span className="text-yellow-600">
                        Load is low - consider increasing training volume
                      </span>
                    )}
                    {loadMetrics.acwr >= 0.8 && loadMetrics.acwr <= 1.3 && (
                      <span className="text-green-600">
                        Optimal training load - low injury risk
                      </span>
                    )}
                    {loadMetrics.acwr > 1.3 && loadMetrics.acwr <= 1.5 && (
                      <span className="text-orange-600">
                        Elevated load - monitor recovery carefully
                      </span>
                    )}
                    {loadMetrics.acwr > 1.5 && (
                      <span className="text-red-600">
                        High injury risk - consider reducing volume
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly TSS Trend</CardTitle>
              <CardDescription>Training Stress Score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyTSSChart weeklyTSS={loadMetrics.weeklyTSS} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Weekly Workouts Count */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Workout Frequency</CardTitle>
          <CardDescription>Number of workouts per week</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyWorkoutsChart analytics={analytics} />
        </CardContent>
      </Card>
    </div>
  );
}
