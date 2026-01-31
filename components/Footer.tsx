"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";

const footerLinks = {
  product: [
    { label: "AI Doctor", href: "/dashboard/chat" },
    { label: "Medical Reports", href: "/dashboard/reports" },
    { label: "Book Doctor", href: "/dashboard/appointment" },
  ],
  company: [
    { label: "About MedAI", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Stethoscope className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-lg font-semibold text-gray-900">MedAI</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Your AI-powered health assistant — anytime, anywhere.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MedAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
