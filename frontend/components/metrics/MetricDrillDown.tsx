"use client";

import { X, TrendingUp, Info } from 'lucide-react';
import QualityChart from './QualityChart';

interface MetricDrillDownProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string | number;
  history: number[];
  labels: string[];
  description: string;
}

export default function MetricDrillDown({
  isOpen,
  onClose,
  title,
  value,
  history,
  labels,
  description
}: MetricDrillDownProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-300"
        role="dialog"
      >
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-medical-accent/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-medical-accent" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{title} Analysis</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex items-end gap-3 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 italic">
            <span className="text-4xl font-black text-slate-900 tracking-tighter">{value}</span>
            <span className="text-sm font-bold text-slate-400 mb-1.5 capitalize">Current Status</span>
          </div>

          <div className="space-y-3">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Info className="w-4 h-4 text-medical-accent" />
                Medical Significance
             </div>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
               {description}
             </p>
          </div>

          <div className="h-64 bg-slate-50 rounded-2xl p-6 border border-slate-100">
             <QualityChart
               data={history}
               labels={labels}
               label={title}
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Deviation</p>
                <p className="text-lg font-bold text-slate-900">± 0.042</p>
             </div>
             <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence Interval</p>
                <p className="text-lg font-bold text-slate-900">95% [0.89 - 0.94]</p>
             </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
           <button
             onClick={onClose}
             className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm"
           >
             Close Analysis
           </button>
        </div>
      </div>
    </div>
  );
}
