"use client";

import { Navigation } from "./navigation";
import { Button } from "./ui/button";
import { LogOut, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800">
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b px-6 dark:border-gray-800">
        <Activity className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-semibold">Training Webapp</span>
      </div>

      {/* Sport Color Indicators */}
      <div className="flex gap-2 px-6 py-4 border-b dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-swim" title="Schwimmen"></div>
          <div className="w-3 h-3 rounded-full bg-bike" title="Radfahren"></div>
          <div className="w-3 h-3 rounded-full bg-run" title="Laufen"></div>
          <div className="w-3 h-3 rounded-full bg-hockey" title="Hockey"></div>
          <div className="w-3 h-3 rounded-full bg-gym" title="Gym"></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Navigation />
      </div>

      {/* Logout Button */}
      <div className="border-t p-4 dark:border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}
