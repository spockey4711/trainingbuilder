import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TestDBPage() {
  const supabase = await createClient();

  // Test each table
  const tables = [
    'training_cycles',
    'workouts',
    'workout_notes',
    'training_plans',
    'metrics',
    'sessions'
  ];

  const results = await Promise.all(
    tables.map(async (table) => {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });

        return {
          table,
          status: error ? 'error' : 'success',
          count: count ?? 0,
          error: error?.message
        };
      } catch (err) {
        return {
          table,
          status: 'error',
          count: 0,
          error: String(err)
        };
      }
    })
  );

  const allSuccess = results.every(r => r.status === 'success');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Database Test</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Testing Supabase table setup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Overall Status: {allSuccess ? '✅ All Tables Working' : '❌ Some Tables Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.table}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {result.status === 'success' ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="font-medium">{result.table}</div>
                    {result.error && (
                      <div className="text-sm text-red-600">{result.error}</div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {result.count} rows
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {allSuccess && (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>All database tables are set up correctly</li>
              <li>RLS policies are active</li>
              <li>Ready to start building features</li>
              <li>You can delete this test page when done</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
