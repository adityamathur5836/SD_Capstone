"use client";

import { Cpu, Database, Timer, Activity } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import { useMemo } from 'react';

export default function ResourceMonitor() {
  const { resourceUsage } = useMedicalStore();

  const resources = useMemo(() => [
    {
      label: 'GPU Memory',
      value: resourceUsage.gpuMemory || 72,
      unit: '%',
      icon: Database,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      label: 'System Load',
      value: resourceUsage.gpuLoad || 91,
      unit: '%',
      icon: Activity,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Processing Time',
      value: '22:15',
      unit: ' left',
      icon: Timer,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ], [resourceUsage]);

  return (
    <div className="glass-card !bg-slate-900 border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-white">Resource Allocation</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {resources.map((res) => (
          <div key={res.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${res.bg}`}>
                <res.icon className={`w-4 h-4 ${res.color}`} />
              </div>
              <span className="text-xs font-bold text-slate-400">{res.label}</span>
            </div>
            <div className="text-sm font-black text-white tabular-nums">
              {res.value}{res.unit}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <span>Cluster Throughput</span>
          <span>42 fps</span>
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-[92%] h-full bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
