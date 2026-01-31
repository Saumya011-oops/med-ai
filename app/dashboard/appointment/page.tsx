"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DoctorCard } from "@/components/DoctorCard";
import { MOCK_DOCTORS, MOCK_TIME_SLOTS } from "@/lib/mockData";
import type { Doctor } from "@/lib/mockData";

const appointmentSchema = z.object({
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  problemDescription: z.string().min(10, "Describe your concern (min 10 chars)"),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function AppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const date = watch("date");
  const time = watch("time");

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!selectedDoctor) return;
    setConfirmed(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  // Generate next 7 days for date picker
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-md"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Appointment Request Submitted
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                In production, you would receive a confirmation. Consultation
                fee: ${selectedDoctor?.fee ?? 0} (mock).
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSubmitted(false);
                  setConfirmed(false);
                  setSelectedDoctor(null);
                }}
                variant="outline"
              >
                Book another
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Book Doctor Appointment
        </h2>
        <p className="mt-1 text-gray-600">
          Choose a doctor, date & time, and describe your concern. Minimal
          consultation fee.
        </p>
      </motion.div>

      {/* Doctor selection */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Select a Doctor
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_DOCTORS.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              selected={selectedDoctor?.id === doctor.id}
              onSelect={setSelectedDoctor}
            />
          ))}
        </div>
      </section>

      {/* Date, time, description */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Date, Time & Description</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Date
                </Label>
                <Select id="date" {...register("date")} className="mt-1">
                  <option value="">Select date</option>
                  {dateOptions.map((d) => (
                    <option key={d} value={d}>
                      {new Date(d).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </Select>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Time
                </Label>
                <Select id="time" {...register("time")} className="mt-1">
                  <option value="">Select time</option>
                  {MOCK_TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="problemDescription">Problem description</Label>
              <Textarea
                id="problemDescription"
                placeholder="Briefly describe your symptoms or concern"
                rows={3}
                {...register("problemDescription")}
                className="mt-1"
              />
              {errors.problemDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.problemDescription.message}
                </p>
              )}
            </div>
            {selectedDoctor && (
              <p className="text-sm text-gray-600">
                Consultation fee: <strong>${selectedDoctor.fee}</strong>
              </p>
            )}
            <Button
              type="submit"
              disabled={!selectedDoctor || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Confirming..." : "Confirm appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
