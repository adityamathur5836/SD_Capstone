"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Clock, Zap } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function PerformanceTracker() {
  const mockLatencyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: 120 + Math.random() * 80,
  }));

  const data = {
    labels: mockLatencyData.map(d => d.time),
    datasets: [
      {
        fill: true,
        label: 'Latency (ms)',
        data: mockLatencyData.map(d => d.latency),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 10, weight: 900 },
        bodyFont: { size: 12, weight: 600 },
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          maxTicksLimit: 8,
          font: { size: 10, weight: 700 },
          color: '#94a3b8',
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="glass-card flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
               <TrendingUp className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Performance Analytics</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Latency & Throughput</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="text-right">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Latency</p>
               <p className="text-sm font-black text-slate-900">142ms</p>
            </div>
            <div className="text-right">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
               <p className="text-sm font-black text-emerald-600">99.8%</p>
            </div>
         </div>
      </div>

      <div className="flex-1 min-h-[250px]">
         <Line options={options} data={data} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
         <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-blue-500 shadow-sm">
               <Clock className="w-4 h-4" />
            </div>
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">P95 Response</p>
               <p className="text-xs font-black text-slate-900">198ms</p>
            </div>
         </div>
         <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white text-emerald-500 shadow-sm">
               <Zap className="w-4 h-4" />
            </div>
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Throughput</p>
               <p className="text-xs font-black text-slate-900">8.2k req/m</p>
            </div>
         </div>
      </div>
    </div>
  );
}
