import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Plans</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your training templates and weekly structures
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Plan
        </Button>
      </div>

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
    </div>
  );
}
