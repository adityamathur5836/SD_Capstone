"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  CheckCircle2
} from "lucide-react";

const PrivacyImpactAssessment = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      title: "Data Sensitivity",
      question: "Which types of patient data will be synthesized for this study?",
      options: ["Ocular Images Only", "Images + Demographics", "Full Clinical History", "Genomic Samples"]
    },
    {
      id: 2,
      title: "Data Purpose",
      question: "What is the primary research goal of this data generation?",
      options: ["Model Training", "External Publication", "Collaborative Data Sharing", "Internal Validation"]
    },
    {
      id: 3,
      title: "Retention Policy",
      question: "How long will the generated samples be retained in the research pool?",
      options: ["< 6 Months", "6-12 Months", "Permanent Archive", "Deleted after Verification"]
    }
  ];

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
        <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">PIA Submitted Successfully</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Your Privacy Impact Assessment has been logged. Automated risk score: <span className="text-emerald-600 font-bold italic">Low (14%)</span>.
          You may now proceed with large-scale generation for this use case.
        </p>
        <button
          onClick={() => { setStep(1); setSubmitted(false); }}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit New Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <ClipboardCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 italic">Privacy Impact Assessment</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
              Step {step} of {questions.length} <span className="mx-1">•</span> Regulatory Compliance
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${i <= step ? "bg-indigo-600" : "bg-slate-200"} transition-colors`}
            />
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg mb-2">
              {questions[step-1].title}
            </span>
            <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              {questions[step-1].question}
              <HelpCircle className="h-4 w-4 text-slate-400 cursor-help" />
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[step-1].options.map((opt, i) => (
              <button
                key={i}
                className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all group flex items-start justify-between"
              >
                <span className="text-slate-700 group-hover:text-indigo-900 font-medium">{opt}</span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              Required for HIPAA sub-audit 2024.1
            </div>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : step === questions.length ? "Submit Assessment" : "Next Question"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyImpactAssessment;
