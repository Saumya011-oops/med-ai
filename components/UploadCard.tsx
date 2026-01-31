"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MOCK_REPORT_ANALYSIS } from "@/lib/mockData";
import Link from "next/link";

const ACCEPT = "application/pdf,image/jpeg,image/png,image/jpg";

export function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<typeof MOCK_REPORT_ANALYSIS | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setAnalysis(null);
    if (selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Mock analysis delay
    setTimeout(() => {
      setAnalysis(MOCK_REPORT_ANALYSIS);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Upload Medical Report</h3>
          <p className="text-sm text-gray-500">
            Camera scan or file upload (PDF, JPG, PNG)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            onChange={handleFileChange}
            className="hidden"
            aria-label="Choose file"
          />

          {!file ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-10 transition-colors hover:border-primary-400 hover:bg-primary-50/50"
              >
                <Upload className="mb-2 h-10 w-10 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Upload file
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PDF, JPG, PNG
                </span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-10 transition-colors hover:border-primary-400 hover:bg-primary-50/50"
              >
                <Camera className="mb-2 h-10 w-10 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Camera scan
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  Opens file picker (camera in production)
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary-600" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemove} aria-label="Remove file">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {preview && (
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 w-full object-contain bg-gray-50"
                  />
                </div>
              )}
              {!analysis ? (
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Report"}
                </Button>
              ) : null}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Analysis result */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Analysis Summary</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{analysis.summary}</p>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-900">
                  Key observations
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                  {analysis.observations.map((obs, i) => (
                    <li key={i}>{obs}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-900">
                  Suggested next steps
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                  {analysis.suggestedSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="/dashboard/appointment"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Consult a Doctor
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
