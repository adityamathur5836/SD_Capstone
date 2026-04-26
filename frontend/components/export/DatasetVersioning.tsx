"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  GitBranch, Clock, User,
  ArrowRight, ShieldCheck,
  RefreshCw, Plus
} from 'lucide-react';

export default function DatasetVersioning() {
  const { datasetVersions } = useMedicalStore();

  const mockVersions = [
    {
      id: 'v2.4.0',
      timestamp: '2024-01-28 09:00',
      samplesCount: 5000,
      fidelityScore: 0.942,
      biasScore: 0.021,
      changelog: 'Applied ethnic parity mitigation for Pathology Cluster B.',
      author: 'Dr. Sarah Chen'
    },
    {
      id: 'v2.3.1',
      timestamp: '2024-01-27 14:30',
      samplesCount: 5000,
      fidelityScore: 0.938,
      biasScore: 0.045,
      changelog: 'Regenerated with DP epsilon 0.5 for compliance.',
      author: 'A. Mathur'
    },
    {
      id: 'v2.2.0',
      timestamp: '2024-01-26 11:20',
      samplesCount: 2500,
      fidelityScore: 0.892,
      biasScore: 0.052,
      changelog: 'Initial high-fidelity cohort for Retinopathy study.',
      author: 'Researcher Alpha'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
               <GitBranch className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Dataset Version History</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Snapshot & Audit Ledger</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-medical-accent text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-medical-accent/90 transition-all shadow-lg shadow-medical-accent/20">
            <Plus className="w-3.5 h-3.5" /> Snapshot
         </button>
      </div>

      <div className="relative space-y-3">
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-100" />

        {(datasetVersions.length > 0 ? datasetVersions : mockVersions).map((v, i) => (
          <div key={v.id} className="relative pl-12 group">
             <div className={`absolute left-4 top-4 w-3 h-3 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200 transition-all group-hover:scale-125 ${i === 0 ? 'bg-medical-accent' : 'bg-slate-300'}`} />

             <div className="glass-card p-5 hover:shadow-md transition-all border-slate-100">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900">{v.id}</span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full">
                         <Clock className="w-3 h-3" /> {v.timestamp}
                      </span>
                   </div>
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                      <User className="w-3 h-3" /> {v.author}
                   </div>
                </div>

                <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed line-clamp-2 italic">
                   "{v.changelog}"
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cohort Size</p>
                      <p className="text-sm font-bold text-slate-900">{v.samplesCount.toLocaleString()}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fidelity</p>
                      <p className="text-sm font-bold text-emerald-600">{(v.fidelityScore * 100).toFixed(1)}%</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bias Risk</p>
                      <p className={`text-sm font-bold ${v.biasScore < 0.03 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {(v.biasScore * 100).toFixed(1)}%
                      </p>
                   </div>
                </div>

                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase text-slate-500 hover:bg-slate-100 transition-all">
                      <RefreshCw className="w-3 h-3" /> Restore
                   </button>
                   <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 text-[10px] font-black uppercase text-white hover:bg-black transition-all">
                      Compare <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
        Load Full Audit Trail
      </button>
    </div>
  );
}
