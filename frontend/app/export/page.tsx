"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  FileCheck2, LayoutGrid, List,
  Search, Filter, Download,
  CheckCircle2, AlertCircle, Clock,
  ArrowRight
} from 'lucide-react';
import ExportWizard from '@/components/export/ExportWizard';
import DatasetVersioning from '@/components/export/DatasetVersioning';
import APIKeyManager from '@/components/export/APIKeyManager';
import IntegrationTemplates from '@/components/export/IntegrationTemplates';

export default function ExportPage() {
  const { exportQueue } = useMedicalStore();

  const mockQueue = [
    {
      id: 'task-8829',
      format: 'DICOM',
      status: 'completed' as const,
      progress: 100,
      timestamp: '15 mins ago',
      fileCount: 450
    },
    {
      id: 'task-8830',
      format: 'NIfTI',
      status: 'processing' as const,
      progress: 45,
      timestamp: 'Active',
      fileCount: 220
    }
  ];

  const displayQueue = exportQueue.length > 0 ? exportQueue : mockQueue;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stage 5: Data Export & Integration</h1>
          <p className="text-slate-500 mt-1 font-medium">Deploy synthetic cohorts to clinical research environments and ML pipelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ExportWizard />
              <div className="space-y-6">
                 <div className="glass-card flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-500 text-white">
                             <List className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Active Export Queue</h3>
                       </div>
                    </div>

                    <div className="flex-1 space-y-4">
                       {displayQueue.map((task) => (
                         <div key={task.id} className="p-4 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-slate-900">{task.format} Export</span>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase">ID: {task.id}</span>
                               </div>
                               {task.status === 'completed' ? (
                                 <CheckCircle2 className="w-4 h-4 text-medical-success" />
                               ) : (
                                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                               )}
                            </div>

                            <div className="space-y-1">
                               <div className="flex justify-between text-[10px] font-bold">
                                  <span className="text-slate-400">{task.fileCount} Assets Bundle</span>
                                  <span className={task.status === 'completed' ? 'text-medical-success' : 'text-blue-500'}>
                                    {task.progress}%
                                  </span>
                               </div>
                               <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-500 ${task.status === 'completed' ? 'bg-medical-success' : 'bg-blue-500'}`}
                                    style={{ width: `${task.progress}%` }}
                                  />
                               </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                               <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" /> {task.timestamp}
                               </span>
                               {task.status === 'completed' ? (
                                 <button className="text-[10px] font-black text-medical-accent uppercase tracking-widest flex items-center gap-1 hover:underline">
                                    Download <Download className="w-3 h-3" />
                                 </button>
                               ) : (
                                 <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Processing...</span>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-medical-success/5 border border-emerald-100 flex gap-3">
                       <FileCheck2 className="w-5 h-5 text-medical-success shrink-0" />
                       <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
                         All exports are signed with a digital fingerprint and include a comprehensive quality certificate for ethics review.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IntegrationTemplates />
              <div className="glass-card bg-slate-900 text-white overflow-hidden relative">
                 <div className="relative z-10 space-y-6">
                    <div>
                       <h3 className="text-lg font-bold">Cloud Deployment</h3>
                       <p className="text-xs text-slate-400">Sync datasets with institutional storage.</p>
                    </div>

                    <div className="space-y-3">
                       {['AWS S3 (Clinical)', 'Google Cloud Healthcare', 'Azure Health Data'].map((cloud) => (
                         <div key={cloud} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                            <span className="text-sm font-medium">{cloud}</span>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                         </div>
                       ))}
                    </div>

                    <button className="w-full py-3 bg-medical-accent text-white rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
                       Configure New Sync
                    </button>
                 </div>

                 <div className="absolute top-0 right-0 w-32 h-32 bg-medical-accent/20 blur-3xl -mr-16 -mt-16" />
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass-card">
              <DatasetVersioning />
           </div>

           <div className="glass-card border-none bg-amber-500/10">
              <APIKeyManager />
           </div>

           <div className="glass-card bg-slate-50 flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                 <AlertCircle className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 text-sm">Need a Custom Format?</h4>
                 <p className="text-[10px] text-slate-400 font-medium px-6">Our lab provides specialized export plugins for proprietary scanner hardware.</p>
              </div>
              <button className="text-xs font-black text-medical-accent uppercase tracking-widest hover:underline">
                 Contact Research Ops
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
