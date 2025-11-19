"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Calendar,
  Target,
  LineChart,
  FileText,
  Layers,
  BarChart3,
  Gauge
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const navigationItems = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "workouts", href: "/workouts", icon: Dumbbell },
  { key: "calendar", href: "/calendar", icon: Calendar },
  { key: "periodization", href: "/periodization", icon: Target },
  { key: "metrics", href: "/metrics", icon: LineChart },
  { key: "notes", href: "/notes", icon: FileText },
  { key: "plans", href: "/plans", icon: Layers },
];

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <nav className="flex flex-col gap-1">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <Icon className="h-5 w-5" />
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
