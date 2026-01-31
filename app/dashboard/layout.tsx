"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  Calendar,
  Ambulance,
  Activity,
  FlaskConical,
  User,
  LogOut,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser, clearUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Doctor", icon: MessageCircle },
  { href: "/dashboard/reports", label: "Medical Reports", icon: FileText },
  { href: "/dashboard/appointment", label: "Book Doctor", icon: Calendar },
  { href: "/dashboard/emergency", label: "Emergency", icon: Ambulance },
  { href: "/dashboard/health-plan", label: "Health Plan", icon: Activity, disabled: true },
  { href: "/dashboard/lab-tests", label: "Lab Tests", icon: FlaskConical },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/auth/login");
    }
  }, [mounted, user, router]);

  const handleLogout = () => {
    clearUser();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-gray-200 bg-white px-2 py-2 lg:hidden"
        aria-label="Mobile navigation"
      >
        {navItems
          .filter((item) => !item.disabled)
          .slice(0, 5)
          .map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                  isActive ? "text-primary-600" : "text-gray-500 hover:text-gray-900"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
      </nav>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900 lg:text-xl">
            MedAI Portal
          </h1>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 sm:flex">
              <User className="h-4 w-4" aria-hidden />
              <span>{user.username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Log out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 lg:p-8 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}
