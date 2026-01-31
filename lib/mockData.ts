/**
 * Mock data for MedAI frontend.
 * Replace with API calls in production.
 */

// Doctors for booking
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image?: string;
  fee: number;
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Chen",
    specialization: "General Physician",
    experience: "12 years",
    rating: 4.9,
    fee: 25,
  },
  {
    id: "doc-2",
    name: "Dr. James Wilson",
    specialization: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    fee: 45,
  },
  {
    id: "doc-3",
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experience: "8 years",
    rating: 4.7,
    fee: 30,
  },
  {
    id: "doc-4",
    name: "Dr. Michael Okonkwo",
    specialization: "Pediatrician",
    experience: "10 years",
    rating: 4.9,
    fee: 35,
  },
];

// Lab test types
export interface LabTest {
  id: string;
  name: string;
  price: number;
}

export const MOCK_LAB_TESTS: LabTest[] = [
  { id: "lab-1", name: "Complete Blood Count (CBC)", price: 15 },
  { id: "lab-2", name: "Blood Sugar (Fasting)", price: 10 },
  { id: "lab-3", name: "Thyroid Profile", price: 25 },
  { id: "lab-4", name: "Lipid Profile", price: 20 },
  { id: "lab-5", name: "Liver Function Test", price: 22 },
  { id: "lab-6", name: "Kidney Function Test", price: 18 },
];

// Time slots for appointments
export const MOCK_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

// Mock AI chat responses (sample flow)
export const MOCK_AI_RESPONSES: Record<string, string> = {
  default:
    "I'm your AI health assistant. To help you better, could you describe your main symptoms and how long you've had them?",
  followup:
    "Thank you for sharing. Based on what you've described, I recommend:\n\n1. Rest and hydration\n2. Over-the-counter pain relief if needed (e.g. paracetamol)\n3. Monitor your temperature\n\n**This is guidance only, not a diagnosis or prescription.** Please consult a certified doctor for a proper evaluation. Would you like me to help you book an appointment?",
};

// Mock report analysis result
export interface ReportAnalysis {
  summary: string;
  observations: string[];
  suggestedSteps: string[];
}

export const MOCK_REPORT_ANALYSIS: ReportAnalysis = {
  summary:
    "The uploaded report appears to be a routine blood panel. Key metrics are within normal ranges with minor variations noted below.",
  observations: [
    "Hemoglobin: Within normal range",
    "Blood sugar (fasting): Slightly elevated – consider follow-up",
    "Cholesterol: Borderline – lifestyle advice may help",
  ],
  suggestedSteps: [
    "Discuss results with a certified doctor for personalized advice",
    "Consider a follow-up test in 3 months if advised",
    "Maintain a balanced diet and regular exercise",
  ],
};
