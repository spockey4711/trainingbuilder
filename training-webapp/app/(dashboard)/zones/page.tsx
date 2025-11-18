import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Zones</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Define and manage your heart rate, power, and pace zones for accurate tracking
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Add Zones
        </Button>
      </div>

      {/* Zone Templates */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Heart Rate Zones</CardTitle>
            <CardDescription>Based on max heart rate or threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium mb-2">Standard 5-Zone Model:</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zone 1 - Recovery:</span>
                    <span className="font-mono">50-60% HRmax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zone 2 - Endurance:</span>
                    <span className="font-mono">60-70% HRmax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zone 3 - Tempo:</span>
                    <span className="font-mono">70-80% HRmax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zone 4 - Threshold:</span>
                    <span className="font-mono">80-90% HRmax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zone 5 - VO2max:</span>
                    <span className="font-mono">90-100% HRmax</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Power Zones (Cycling)</CardTitle>
            <CardDescription>Based on Functional Threshold Power (FTP)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium mb-2">Coggan Power Zones:</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z1 - Active Recovery:</span>
                    <span className="font-mono">&lt;55% FTP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z2 - Endurance:</span>
                    <span className="font-mono">55-75% FTP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z3 - Tempo:</span>
                    <span className="font-mono">75-90% FTP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z4 - Threshold:</span>
                    <span className="font-mono">90-105% FTP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z5 - VO2max:</span>
                    <span className="font-mono">105-120% FTP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Z6 - Anaerobic:</span>
                    <span className="font-mono">&gt;120% FTP</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pace Zones (Running)</CardTitle>
            <CardDescription>Based on threshold pace or race pace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium mb-2">Jack Daniels VDOT Zones:</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Easy:</span>
                    <span className="font-mono">59-74% VO2max</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marathon:</span>
                    <span className="font-mono">75-84% VO2max</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Threshold:</span>
                    <span className="font-mono">83-88% VO2max</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interval:</span>
                    <span className="font-mono">95-100% VO2max</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Repetition:</span>
                    <span className="font-mono">&gt;105% VO2max</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Distribution Info */}
      <Card>
        <CardHeader>
          <CardTitle>Zone-Based Training</CardTitle>
          <CardDescription>
            Understanding and tracking time in zones helps optimize training adaptation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Why Track Zones?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Ensure proper intensity distribution (80/20 rule: 80% low intensity, 20% high intensity)</li>
                <li>Prevent overtraining by monitoring time in high-intensity zones</li>
                <li>Track training adaptations as zones improve over time</li>
                <li>Prescribe specific workouts targeting particular physiological systems</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Coming Soon:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Custom zone configuration per sport</li>
                <li>Automatic zone distribution from FIT files</li>
                <li>Zone time tracking in workout logs</li>
                <li>Weekly/monthly zone distribution analysis</li>
                <li>Polarized vs pyramidal training analysis</li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500 italic">
                For now, you can manually enter heart rate and power data in your workouts.
                Full zone management and FIT file import will be available in a future update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
