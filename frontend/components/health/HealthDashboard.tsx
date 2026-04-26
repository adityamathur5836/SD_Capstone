"use client";

import { useMedicalStore, HealthStatus } from '@/store/useMedicalStore';
import {
  Activity, Zap, ShieldCheck,
  Database, Server, RefreshCw,
  AlertCircle, CheckCircle2, AlertTriangle
} from 'lucide-react';

const StatusIcon = ({ status }: { status: HealthStatus }) => {
  switch (status) {
    case 'healthy': return <CheckCircle2 className="w-4 h-4 text-medical-success" />;
    case 'degraded': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'down': return <AlertCircle className="w-4 h-4 text-rose-500" />;
    case 'maintenance': return <Activity className="w-4 h-4 text-blue-500" />;
    default: return null;
  }
};

const StatusBadge = ({ status }: { status: HealthStatus }) => {
  const styles = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    degraded: 'bg-amber-50 text-amber-700 border-amber-100',
    down: 'bg-rose-50 text-rose-700 border-rose-100',
    maintenance: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function HealthDashboard() {
  const { systemHealth } = useMedicalStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white ${systemHealth.overall === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
               <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Platform Health Overview</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time Heartbeat Monitoring</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400">Auto-refresh: 5s</span>
            <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all active:rotate-180 duration-500">
               <RefreshCw className="w-3.5 h-3.5" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systemHealth.components.map((comp) => (
          <div key={comp.id} className="p-5 rounded-3xl border border-slate-100 bg-white hover:border-slate-200 transition-all group">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className={`p-2.5 rounded-2xl bg-slate-50 text-slate-400 group-hover:scale-110 transition-transform ${comp.status !== 'healthy' ? 'text-amber-500' : ''}`}>
                      {comp.id.includes('api') && <Zap className="w-4 h-4" />}
                      {comp.id.includes('gpu') && <Server className="w-4 h-4" />}
                      {comp.id.includes('db') && <Database className="w-4 h-4" />}
                      {comp.id.includes('storage') && <Activity className="w-4 h-4" />}
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{comp.name}</h4>
                      <p className="text-[9px] text-slate-400 font-medium">Checked {new Date(comp.lastChecked).toLocaleTimeString()}</p>
                   </div>
                </div>
                <StatusBadge status={comp.status} />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Latency</p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-slate-900 tabular-nums">{comp.latency || '--'}</span>
                      <span className="text-[9px] font-bold text-slate-400">ms</span>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Uptime (24h)</p>
                   <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-emerald-600 tabular-nums">100</span>
                      <span className="text-[9px] font-bold text-slate-400">%</span>
                   </div>
                </div>
             </div>

             <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                   <div
                     className={`h-full animate-pulse ${comp.status === 'healthy' ? 'bg-emerald-500/30' : 'bg-amber-500/30'}`}
                     style={{ width: '100%' }}
                   />
                </div>
                <StatusIcon status={comp.status} />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
