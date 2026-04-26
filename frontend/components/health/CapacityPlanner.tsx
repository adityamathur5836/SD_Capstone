"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { HardDrive, Cpu, Cloud } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CapacityPlanner() {
  const storageData = {
    labels: ['Used', 'Available'],
    datasets: [
      {
        data: [720, 280],
        backgroundColor: ['#0ea5e9', '#f1f5f9'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const computeData = {
    labels: ['Active', 'Spare'],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ['#f59e0b', '#f1f5f9'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="glass-card space-y-8">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
               <Cloud className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Capacity Planning</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Resource Forecasting</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
         <div className="space-y-4">
            <div className="relative h-[120px]">
               <Doughnut data={storageData} options={chartOptions} />
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-black text-slate-900">72%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Used</span>
               </div>
            </div>
            <div className="text-center">
               <div className="flex items-center justify-center gap-2 mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">TB Storage</span>
               </div>
               <p className="text-[10px] text-slate-400 font-bold">Est. Exhaustion: 42 days</p>
            </div>
         </div>

         <div className="space-y-4">
            <div className="relative h-[120px]">
               <Doughnut data={computeData} options={chartOptions} />
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-black text-slate-900">85%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Load</span>
               </div>
            </div>
            <div className="text-center">
               <div className="flex items-center justify-center gap-2 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">Compute Nodes</span>
               </div>
               <p className="text-[10px] text-slate-400 font-bold">Scale Up Recommended</p>
            </div>
         </div>
      </div>

      <div className="pt-6 border-t border-slate-50 space-y-4">
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-Scale Policy</span>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">ACTIVE</span>
         </div>
         <button className="w-full py-3 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
            Manage Infrastructure Quotas
         </button>
      </div>
    </div>
  );
}
