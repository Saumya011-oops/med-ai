"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  Calendar,
  Ambulance,
  Activity,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Doctor", icon: MessageCircle },
  { href: "/dashboard/reports", label: "Medical Reports", icon: FileText },
  { href: "/dashboard/appointment", label: "Book Doctor", icon: Calendar },
  { href: "/dashboard/emergency", label: "Emergency", icon: Ambulance },
  { href: "/dashboard/health-plan", label: "Health Plan", icon: Activity, disabled: true },
  { href: "/dashboard/lab-tests", label: "Lab Tests", icon: FlaskConical },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white lg:flex"
      aria-label="Dashboard navigation"
    >
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;

          if (isDisabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-400 cursor-not-allowed"
                title="Coming soon"
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
