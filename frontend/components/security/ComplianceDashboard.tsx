"use client";

import React from "react";
import {
  ShieldCheck,
  History,
  AlertTriangle,
  FileText,
  Lock,
  Activity
} from "lucide-react";

const ComplianceDashboard = () => {
  const complianceMetrics = [
    { label: "HIPAA Readiness", value: "92.5%", color: "text-emerald-500", icon: ShieldCheck },
    { label: "GDPR Score", value: "88.0%", color: "text-blue-500", icon: Lock },
    { label: "Active Consents", value: "1,245", color: "text-amber-500", icon: FileText },
    { label: "Audit Integrity", value: "Verified", color: "text-indigo-500", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Regulatory
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
            <div className="text-sm text-slate-600">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-500" />
            Recent Security Audit Trail
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 italic text-slate-500">
                  <th className="pb-3 font-medium">Operation</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Resource</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { op: "DATA_GENERATE", user: "researcher_01", res: "COHORT_A", status: "Logged" },
                  { op: "DATA_EXPORT", user: "admin_main", res: "STUDY_X", status: "Authorized" },
                  { op: "CONSENT_REVOKE", user: "system", res: "PAT-882", status: "Verified" },
                  { op: "UPLOAD_DICOM", user: "researcher_01", res: "DS_POOL", status: "Logged" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-medium text-slate-800">{item.op}</td>
                    <td className="py-3 text-slate-600">{item.user}</td>
                    <td className="py-3 text-slate-600 font-mono text-xs">{item.res}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Gap Analysis
          </h3>
          <ul className="space-y-4">
            {[
              { title: "Encryption at Rest", progress: 100, status: "Secure" },
              { title: "MFA Enforcement", progress: 65, status: "Action Required" },
              { title: "Audit Trail Immutability", progress: 95, status: "Verified" },
              { title: "Session Timeout Logic", progress: 40, status: "Pending Fix" },
            ].map((gap, i) => (
              <li key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{gap.title}</span>
                  <span className={gap.progress < 50 ? "text-amber-600" : "text-emerald-600"}>
                    {gap.status}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${gap.progress < 50 ? "bg-amber-400" : "bg-emerald-500"}`}
                    style={{ width: `${gap.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
