"use client";

import React, { useState } from "react";
import ComplianceDashboard from "@/components/security/ComplianceDashboard";
import PrivacyImpactAssessment from "@/components/security/PrivacyImpactAssessment";
import ConsentManager from "@/components/security/ConsentManager";
import {
  ShieldCheck,
  FileText,
  Users,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";

const CompliancePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: ShieldCheck, description: "Regulatory readiness & audit trail" },
    { id: "pia", label: "Privacy Impact", icon: FileText, description: "Research use-case assessments" },
    { id: "consent", label: "Consent Registry", icon: Users, description: "Patient authorization tracking" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-indigo-600" />
            Security & Regulatory Compliance
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Manage institutional security standards, track patient consents, and conduct privacy impact assessments
            to ensure HIPAA and GDPR compliance for synthetic medical datasets.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            HIPAA Verified
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[200px] p-4 rounded-xl border text-left transition-all ${
              activeTab === tab.id
                ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/20 shadow-md"
                : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-1">
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-indigo-600" : "text-slate-500"}`} />
              <span className={`font-bold ${activeTab === tab.id ? "text-indigo-900" : "text-slate-700"}`}>
                {tab.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 italic pl-8">{tab.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "dashboard" && <ComplianceDashboard />}
        {activeTab === "pia" && <PrivacyImpactAssessment />}
        {activeTab === "consent" && <ConsentManager />}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <ShieldCheck className="h-32 w-32" />
        </div>
        <div className="relative z-10 max-w-lg">
          <h3 className="text-xl font-bold italic mb-2">Institutional Security Bulletin</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            All synthetic data generated on this platform undergoes automated PHI scrubbing.
            Remember to conduct a new Privacy Impact Assessment for any study involving external data exports.
          </p>
          <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
            View full security policy
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
