"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const emergencySchema = z.object({
  patientName: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(1).max(120),
  emergencyDescription: z.string().min(10, "Please describe the emergency"),
});

type EmergencyFormValues = z.infer<typeof emergencySchema>;

export function EmergencyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [mockLocation] = useState("123 Main St, City (Mock)");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmergencyFormValues>({
    resolver: zodResolver(emergencySchema),
  });

  const onSubmit = async (_data: EmergencyFormValues) => {
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="pt-6">
          <div className="rounded-lg bg-white p-6 text-center shadow-soft">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Phone className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Request Received
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              In production, the nearest ambulance would be notified. For now
              this is a mock confirmation.
            </p>
            <p className="mt-4 text-sm font-medium text-red-600">
              If this is a real emergency, call local emergency services (e.g.
              911) immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-200 bg-white">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">
          Emergency Ambulance Request
        </h3>
        <p className="text-sm text-gray-500">
          Fill in the details. In production, we would dispatch the nearest
          ambulance.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mock location */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>Detected location (mock): {mockLocation}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              placeholder="Full name"
              {...register("patientName")}
              className="mt-1"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.patientName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Age"
              {...register("age")}
              className="mt-1"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="emergencyDescription">Emergency Description</Label>
            <Textarea
              id="emergencyDescription"
              placeholder="Describe the emergency (e.g. chest pain, accident, breathing difficulty)"
              rows={4}
              {...register("emergencyDescription")}
              className="mt-1"
            />
            {errors.emergencyDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.emergencyDescription.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="emergency"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Call Nearest Ambulance"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
