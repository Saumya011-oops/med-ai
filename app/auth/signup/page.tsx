"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSignup } from "@/lib/auth";

const signupSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Valid email required"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agreeTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { agreeTerms: false },
  });

  const agreeTerms = watch("agreeTerms");

  const onSubmit = async (data: SignupFormValues) => {
    setError(null);
    try {
      mockSignup({
        username: data.username,
        email: data.email,
        phone: data.phone,
      });
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Stethoscope className="h-6 w-6" aria-hidden />
          </div>
          <span className="text-xl font-semibold text-gray-900">MedAI</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started with MedAI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  {...register("username")}
                  className="mt-1"
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="mt-1"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone number (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                  className="mt-1"
                  autoComplete="tel"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="mt-1"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="mt-1"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setValue("agreeTerms", e.target.checked)}
                  aria-describedby="terms-error"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreeTerms"
                    className="text-sm font-normal text-gray-600"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary-600 hover:underline">
                      Terms & Conditions
                    </Link>
                  </Label>
                  {errors.agreeTerms && (
                    <p id="terms-error" className="text-sm text-red-600">
                      {errors.agreeTerms.message}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full" disabled>
              Google (UI only)
            </Button>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
