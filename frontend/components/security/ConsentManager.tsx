"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Check,
  X,
  MoreVertical,
  Calendar,
  ShieldCheck
} from "lucide-react";

const ConsentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockConsents = [
    { id: "PAT-001", patient: "John Doe", type: "Research (Full)", date: "2024-01-12", status: "Active" },
    { id: "PAT-442", patient: "Jane Smith", type: "Non-Profit Only", date: "2023-11-20", status: "Active" },
    { id: "PAT-019", patient: "Robert Brown", type: "Research (Full)", date: "2024-02-05", status: "Pending" },
    { id: "PAT-881", patient: "Alice Williams", type: "Diagnostics", date: "2024-01-28", status: "Revoked" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-500" />
            Patient Consent Registry
          </h3>
          <p className="text-sm text-slate-500 italic">Tracking regulatory authorization for clinical data usage.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient ID..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest italic">
              <th className="px-6 py-4 border-b border-slate-100">Patient Hash</th>
              <th className="px-6 py-4 border-b border-slate-100">Name (Mkd)</th>
              <th className="px-6 py-4 border-b border-slate-100">Authorization Type</th>
              <th className="px-6 py-4 border-b border-slate-100">Granted date</th>
              <th className="px-6 py-4 border-b border-slate-100 text-center">Status</th>
              <th className="px-6 py-4 border-b border-slate-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockConsents.map((consent, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">{consent.id}</td>
                <td className="px-6 py-4 text-slate-900 font-medium">
                  {consent.patient.replace(/./g, (c, i) => i < 2 || i > consent.patient.length - 3 ? c : "*")}
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    {consent.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {consent.date}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                    consent.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                    consent.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                    "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}>
                    {consent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Showing {mockConsents.length} active consents</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50">Previous</button>
          <button className="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentManager;
