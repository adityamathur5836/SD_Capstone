"use client";

export const dynamic = 'force-dynamic';

import dynamic_loader from 'next/dynamic';
import HealthDashboard from '@/components/health/HealthDashboard';
import AlertSystem from '@/components/health/AlertSystem';

const PerformanceTracker = dynamic_loader(() => import('@/components/health/PerformanceTracker'), { ssr: false });
const CapacityPlanner = dynamic_loader(() => import('@/components/health/CapacityPlanner'), { ssr: false });
import {
  ShieldCheck, Activity,
  Settings2, Download,
  ExternalLink
} from 'lucide-react';

export default function SystemHealthPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Reliability & Health</h1>
          <p className="text-slate-500 mt-1 font-medium">Global infrastructure monitoring and incident management for clinical operations.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
              <Download className="w-4 h-4" /> Export logs
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200">
              <Settings2 className="w-4 h-4" /> Config
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card">
                 <HealthDashboard />
              </div>
              <CapacityPlanner />
           </div>

           <PerformanceTracker />

           <div className="glass-card p-6 border-slate-900 bg-slate-900 text-white overflow-hidden relative">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/10 text-white">
                       <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold">Compliance Status: HIPPA / GDPR</h3>
                       <p className="text-xs text-slate-400">Continuous auditing of data-at-rest and in-transit.</p>
                    </div>
                 </div>
                 <button className="flex items-center gap-2 px-6 py-3 bg-medical-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
                    Generate Compliance Audit <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-medical-accent/10 blur-3xl -mr-32 -mt-32" />
           </div>
        </div>

        <div className="space-y-8">
           <div className="glass-card">
              <AlertSystem />
           </div>

           <div className="glass-card space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Activity className="w-4 h-4 text-medical-accent" />
                 <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Network Topology</h4>
              </div>
              <div className="space-y-3">
                 {[
                   { label: 'Cloud Gateway', val: 'Primary - US-East' },
                   { label: 'CDN Edge', val: 'Global (42 Nodes)' },
                   { label: 'VPN Tunnel', val: 'Encrypted (AES-256)' }
                 ].map((net) => (
                   <div key={net.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{net.label}</span>
                      <span className="text-[11px] font-black text-slate-900">{net.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
