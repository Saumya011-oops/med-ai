"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Calendar,
  Ambulance,
  Activity,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modules = [
  {
    href: "/dashboard/chat",
    title: "Chat with AI Doctor",
    description: "Describe symptoms and get initial guidance. Not a replacement for certified doctors.",
    icon: MessageCircle,
    color: "bg-primary-100 text-primary-600",
  },
  {
    href: "/dashboard/reports",
    title: "Scan & Understand Medical Reports",
    description: "Upload reports (camera or file) and get AI-powered analysis.",
    icon: FileText,
    color: "bg-green-100 text-green-700",
  },
  {
    href: "/dashboard/appointment",
    title: "Book Doctor Appointment",
    description: "Choose a certified doctor, pick date & time, minimal consultation fee.",
    icon: Calendar,
    color: "bg-blue-100 text-blue-700",
  },
  {
    href: "/dashboard/emergency",
    title: "Emergency Ambulance",
    description: "Request nearest ambulance. For real emergencies, call local services.",
    icon: Ambulance,
    color: "bg-red-100 text-red-700",
  },
  {
    href: "/dashboard/health-plan",
    title: "Personalized Health Plan",
    description: "AI fitness & diet plans (coming soon).",
    icon: Activity,
    color: "bg-amber-100 text-amber-700",
    disabled: true,
    badge: "Coming Soon",
  },
  {
    href: "/dashboard/lab-tests",
    title: "Book Lab Test at Home",
    description: "Select test, address, and time slot. Mock location supported.",
    icon: FlaskConical,
    color: "bg-purple-100 text-purple-700",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-600">
          Choose a service below to get started.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, i) => {
          const Icon = module.icon;
          const content = (
            <Card
              className={`relative transition-all hover:shadow-md ${
                module.disabled
                  ? "cursor-not-allowed opacity-75"
                  : "hover:border-primary-200"
              }`}
            >
              {module.badge && (
                <Badge variant="comingSoon" className="absolute right-4 top-4">
                  {module.badge}
                </Badge>
              )}
              <CardHeader>
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${module.color}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {module.disabled ? (
                  <p className="text-sm text-amber-700">
                    Future: AI fitness & diet plans. Stay tuned.
                  </p>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-600">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </CardContent>
            </Card>
          );

          if (module.disabled) {
            return (
              <motion.div
                key={module.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {content}
              </motion.div>
            );
          }

          return (
            <motion.div
              key={module.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={module.href}>{content}</Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
