"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  Bell, AlertCircle, AlertTriangle,
  Info, CheckCircle2, ChevronRight,
  MoreVertical, ShieldAlert
} from 'lucide-react';

export default function AlertSystem() {
  const { activeAlerts, acknowledgeAlert } = useMedicalStore();

  const mockAlerts = [
    {
      id: 'alert-1',
      priority: 'critical' as const,
      title: 'GPU Cluster Overheating',
      message: 'Node GH-24 reached 85°C. Automated cooling response initiated.',
      timestamp: 'Just now',
      isAcknowledged: false
    },
    {
      id: 'alert-2',
      priority: 'warning' as const,
      title: 'API Latency Spike',
      message: 'Gateway latency exceeded 500ms for 3 consecutive minutes.',
      timestamp: '12 mins ago',
      isAcknowledged: false
    }
  ];

  const alerts = activeAlerts.length > 0 ? activeAlerts : mockAlerts;

  const priorityStyles = {
    critical: { icon: <AlertCircle className="w-4 h-4" />, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    warning: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    info: { icon: <Info className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
               <Bell className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">System Priority Alerts</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Incident Management</p>
            </div>
         </div>
         <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-black">
            {alerts.filter(a => !a.isAcknowledged).length}
         </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-3xl border transition-all ${priorityStyles[alert.priority].bg} ${priorityStyles[alert.priority].border} ${alert.isAcknowledged ? 'opacity-60 saturate-0' : ''}`}
          >
             <div className="flex items-start justify-between gap-3">
                <div className={`p-2 rounded-xl bg-white shadow-sm ${priorityStyles[alert.priority].color}`}>
                   {priorityStyles[alert.priority].icon}
                </div>
                <div className="flex-1 space-y-1">
                   <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{alert.title}</h4>
                      <span className="text-[9px] font-bold text-slate-400">{alert.timestamp}</span>
                   </div>
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {alert.message}
                   </p>
                </div>
                <button className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                   <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
             </div>

             {!alert.isAcknowledged && (
               <div className="mt-4 flex items-center justify-between pt-3 border-t border-black/5">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${priorityStyles[alert.priority].color}`}>
                     Immediate Action Required
                  </span>
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all"
                  >
                     Acknowledge <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
             )}
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-3">
             <div className="p-3 rounded-full bg-slate-50">
                <CheckCircle2 className="w-8 h-8 opacity-20" />
             </div>
             <div>
                <p className="text-xs font-bold uppercase tracking-widest">System Nominal</p>
                <p className="text-[10px] font-medium mt-1">No active incidents detected.</p>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-3xl bg-slate-900 text-white flex gap-3 overflow-hidden relative">
         <ShieldAlert className="w-5 h-5 text-medical-accent shrink-0 relative z-10" />
         <div className="space-y-1 relative z-10">
            <p className="text-[11px] font-bold">Maintenance Notice</p>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Scheduled DB optimization on Jan 30, 22:00 UTC. Research generation may be briefy paused.
            </p>
         </div>
         <div className="absolute top-0 right-0 w-24 h-24 bg-medical-accent/10 blur-2xl -mr-12 -mt-12" />
      </div>
    </div>
  );
}
