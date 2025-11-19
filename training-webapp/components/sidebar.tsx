"use client";

import { Navigation } from "./navigation";
import { Button } from "./ui/button";
import { LogOut, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Sidebar() {
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations();
  const tSports = useTranslations('sports');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span className="text-base font-semibold">{t('common.appName')}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Sport Color Indicators */}
      <div className="flex gap-2 px-6 py-4 border-b dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-swim" title={tSports('swim')}></div>
          <div className="w-3 h-3 rounded-full bg-bike" title={tSports('bike')}></div>
          <div className="w-3 h-3 rounded-full bg-run" title={tSports('run')}></div>
          <div className="w-3 h-3 rounded-full bg-hockey" title={tSports('hockey')}></div>
          <div className="w-3 h-3 rounded-full bg-gym" title={tSports('gym')}></div>
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
          {t('navigation.logout')}
        </Button>
      </div>
    </div>
  );
}
