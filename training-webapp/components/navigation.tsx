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
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Workouts", href: "/workouts", icon: Dumbbell },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Periodization", href: "/periodization", icon: Target },
  { name: "Metrics", href: "/metrics", icon: LineChart },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Plans", href: "/plans", icon: Layers },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
