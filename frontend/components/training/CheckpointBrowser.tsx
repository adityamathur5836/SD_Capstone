"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import { Save, ExternalLink, Trash2, CheckCircle2 } from 'lucide-react';

export default function CheckpointBrowser() {
  const { checkpoints } = useMedicalStore();

  if (checkpoints.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="p-4 bg-slate-50 rounded-full">
          <Save className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">No Checkpoints Yet</p>
          <p className="text-xs text-slate-500 mt-1">Model weights are automatically saved every 50 epochs during active training.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Checkpoint Browser</h3>
        <span className="text-[10px] font-bold text-slate-400">Auto-save: every 50 epochs</span>
      </div>

      <div className="space-y-3">
        {checkpoints.map((cp) => (
          <div
            key={cp.id}
            className={`group p-4 rounded-3xl border transition-all ${
              cp.isBest
                ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200'
                : 'bg-white border-slate-100 hover:border-medical-accent'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${cp.isBest ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                     <Save className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Epoch {cp.epoch}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{cp.timestamp}</p>
                  </div>
               </div>
               {cp.isBest && (
                 <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Best FID
                 </span>
               )}
            </div>

            <div className="flex items-center justify-between">
               <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FID Score</p>
                    <p className={`text-sm font-bold ${cp.isBest ? 'text-emerald-600' : 'text-slate-900'}`}>{cp.fid}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metric</p>
                    <p className="text-sm font-bold text-slate-900">{cp.metrics.accuracy.toFixed(3)}</p>
                  </div>
               </div>

               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all">
        View All {checkpoints.length} Saved Models
      </button>
    </div>
  );
}
