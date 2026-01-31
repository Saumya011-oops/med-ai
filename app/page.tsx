"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Stethoscope,
  Ambulance,
  Shield,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const whatIsMedAI = [
  {
    icon: MessageCircle,
    title: "AI Doctor consultation",
    description: "Chat with an AI assistant for initial guidance and symptom discussion.",
  },
  {
    icon: FileText,
    title: "Medical report analysis",
    description: "Upload reports and get AI-powered summaries and observations.",
  },
  {
    icon: Stethoscope,
    title: "Physical doctor consultation",
    description: "Book certified doctors globally at minimal cost.",
  },
  {
    icon: Ambulance,
    title: "Emergency & lab services",
    description: "Request ambulance and book at-home lab tests.",
  },
];

const howItWorks = [
  { step: 1, title: "Ask AI Doctor", desc: "Describe symptoms and get initial guidance." },
  { step: 2, title: "Upload reports", desc: "Share medical reports for AI analysis." },
  { step: 3, title: "Consult certified doctors", desc: "Book a video or in-person consultation." },
  { step: 4, title: "Get treatment & guidance", desc: "Receive prescriptions and follow-up care." },
];

const whyMedAI = [
  { title: "Verified doctors", desc: "All doctors are certified and verified." },
  { title: "Affordable healthcare", desc: "Minimal consultation fees, global access." },
  { title: "Fast AI responses", desc: "Get instant AI guidance 24/7." },
  { title: "Global reach", desc: "Connect with doctors from anywhere." },
];

const trustIndicators = [
  { icon: Shield, text: "Certified Doctors" },
  { icon: Lock, text: "Secure Medical Data" },
  { icon: CheckCircle2, text: "AI-assisted, Doctor-approved" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white px-4 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Your AI-Powered Health Assistant — Anytime, Anywhere
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
            >
              Chat with an AI doctor, analyze medical reports, and consult
              certified doctors globally at minimal cost.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/auth/signup"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary-600 px-8 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-sm font-medium hover:bg-gray-50"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What is MedAI */}
        <section className="border-t border-gray-100 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              What is MedAI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
              A single platform for AI-powered guidance and certified doctor consultations.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whatIsMedAI.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Works
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  {i < howItWorks.length - 1 && (
                    <div className="absolute right-0 top-6 hidden h-0.5 w-full max-w-[50%] bg-primary-200 lg:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why MedAI */}
        <section className="border-t border-gray-100 bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
              Why MedAI
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyMedAI.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-soft"
                >
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="border-t border-gray-100 bg-primary-50/50 px-4 py-12">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
            {trustIndicators.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-gray-700"
              >
                <item.icon className="h-6 w-6 text-primary-600" aria-hidden />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 bg-white px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to take control of your health?
            </h2>
            <p className="mt-4 text-gray-600">
              Join MedAI and get AI-powered guidance plus access to certified
              doctors worldwide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
