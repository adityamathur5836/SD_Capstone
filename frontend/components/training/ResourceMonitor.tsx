"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import { Cpu, Database, Activity, Thermometer } from 'lucide-react';
import { useMemo } from 'react';

export default function ResourceMonitor() {
  const { resourceUsage } = useMedicalStore();

  const stats = [
    {
      label: 'GPU VRAM',
      value: resourceUsage.gpuMemory > 0 ? `${resourceUsage.gpuMemory.toFixed(1)} GB` : '0.0 GB',
      percent: Math.min((resourceUsage.gpuMemory / 16) * 100, 100), // Assuming 16GB VRAM average
      icon: <Database className="w-4 h-4" />,
      color: 'bg-medical-accent'
    },
    {
      label: 'GPU Core Load',
      value: `${resourceUsage.gpuLoad.toFixed(1)}%`,
      percent: resourceUsage.gpuLoad,
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-rose-500'
    },
    {
      label: 'CPU Cluster',
      value: `${resourceUsage.cpuLoad.toFixed(1)}%`,
      percent: resourceUsage.cpuLoad,
      icon: <Cpu className="w-4 h-4" />,
      color: 'bg-amber-500'
    },
    {
      label: 'Memory Swap',
      value: `${resourceUsage.diskSpace.toFixed(1)}%`,
      percent: resourceUsage.diskSpace,
      icon: <Thermometer className="w-4 h-4" />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Resource Monitor</h3>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-medical-success bg-emerald-50 px-2 py-0.5 rounded-full">
           <div className="w-1 h-1 rounded-full bg-medical-success animate-ping" /> Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-1.5 rounded-lg bg-white shadow-sm text-slate-500">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-xl font-black text-slate-900 tabular-nums">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400">{Math.round(stat.percent)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${stat.color}`}
                  style={{ width: `${stat.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-2">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compute Node</p>
         <p className="text-xs font-black text-slate-900">NVIDIA A100-SXM4-40GB</p>
         <p className="text-[10px] text-slate-400 font-medium">Instance ID: aws-p4d-24xlarge</p>
      </div>
    </div>
  );
}
