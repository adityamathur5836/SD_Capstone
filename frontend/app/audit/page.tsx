"use client";

import { ShieldCheck, Clock, User, ClipboardList } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';

export default function AuditPage() {
  const { auditLogs } = useMedicalStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Audit Trail</h1>
          <p className="text-slate-500 mt-1 font-medium">Immutable log of research activities for HIPAA/GDPR compliance.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Compliance Level: High
        </div>
      </div>

      <div className="glass-card overflow-hidden !p-0 border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Researcher</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-900 font-bold">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-500" />
                      </div>
                      {log.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 font-medium max-w-md truncate">
                      {log.details}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">No audit logs recorded yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium italic">
          Logs are cryptographically signed and archived for 7 years.
        </p>
        <button className="text-xs font-bold text-medical-accent hover:underline">
          Export Compliance Report (PDF)
        </button>
      </div>
    </div>
  );
}
