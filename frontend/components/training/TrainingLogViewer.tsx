"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import { Terminal, Search, Filter, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function TrainingLogViewer() {
  const { trainingLogs } = useMedicalStore();
  const [filter, setFilter] = useState('');

  const mockLogs = [
    "[INFO] [08:30:45] Saved best checkpoint for Epoch 450 (FID: 12.4)",
    "[DEBUG] [08:30:12] Generator gradient norm: 1.25",
    "[WARN] [08:29:55] Slight mode collapse detected in Pathology Cluster C",
    "[INFO] [08:29:22] Epoch 450 started - Batch size 64",
    "[EVENT] [08:28:10] Early stopping criteria updated: Target Sim > 0.95",
    "[INFO] [08:27:00] Completed Epoch 449 validation",
    "[DEBUG] [08:26:45] Learning rate decayed to 1e-5",
    "[INFO] [08:25:30] PHI scrubbing verified for current batch"
  ];

  const displayLogs = (trainingLogs.length > 0 ? trainingLogs : mockLogs).filter(log =>
    log.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="glass-card flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Training Event Logs</h3>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">Real-time clinical event filtering active</p>
          </div>
        </div>

        <div className="flex gap-2">
           <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter logs..."
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-xl text-xs font-medium focus:ring-1 focus:ring-slate-200 transition-all w-48"
              />
           </div>
           <button className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all">
              <Filter className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 font-mono scrollbar-hide">
        {displayLogs.map((log, i) => {
          const isInfo = log.includes('[INFO]');
          const isWarn = log.includes('[WARN]');
          const isDebug = log.includes('[DEBUG]');
          const isEvent = log.includes('[EVENT]');

          return (
            <div key={i} className="flex gap-3 text-[11px] leading-relaxed group">
               <span className="text-slate-300 tabular-nums shrink-0">{i + 1}.</span>
               <div className="space-x-2">
                  <span className={`px-1.5 py-0.5 rounded font-bold ${
                    isInfo ? 'bg-blue-50 text-blue-600' :
                    isWarn ? 'bg-amber-50 text-amber-600' :
                    isDebug ? 'bg-slate-100 text-slate-500' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {log.split(']')[0].replace('[', '')}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 inline-flex">
                    <Clock className="w-2.5 h-2.5" />
                    {log.split(']')[1].replace('[', '').trim()}
                  </span>
                  <span className="text-slate-700 font-medium">
                    {log.split(']')[2].trim()}
                  </span>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
