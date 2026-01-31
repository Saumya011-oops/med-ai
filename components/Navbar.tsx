"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Stethoscope, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentUser, type User } from "@/lib/auth";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/signup", label: "Get Started" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Stethoscope className="h-5 w-5" aria-hidden />
          </div>
          <span className="text-xl font-semibold text-gray-900">MedAI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  pathname.startsWith("/dashboard")
                    ? "text-primary-600"
                    : "text-gray-600"
                )}
              >
                Dashboard
              </Link>
              <span className="text-sm text-gray-500">{user.username}</span>
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium hover:bg-gray-50"
              >
                Open Portal
              </Link>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600",
                    pathname === link.href ? "text-primary-600" : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/signup"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm text-gray-500"
                  onClick={() => setMobileOpen(false)}
                >
                  {user.username}
                </Link>
              </>
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))
            )}
          </nav>
        </div>
      )}
    </motion.header>
  );
}
