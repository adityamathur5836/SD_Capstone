"use client";

import { useMedicalStore, ExportFormat } from '@/store/useMedicalStore';
import {
  FileDown, CheckCircle2, ChevronRight,
  Settings, Database, FileText,
  Binary, Table, Box
} from 'lucide-react';
import { useState } from 'react';

export default function ExportWizard() {
  const { addExportTask } = useMedicalStore();
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState<ExportFormat>('DICOM');
  const [options, setOptions] = useState({
    includeMetadata: true,
    anonymizeMetadata: true,
    compress: true,
    qualityReport: true
  });

  const formats: { id: ExportFormat; label: string; icon: any; desc: string }[] = [
    { id: 'DICOM', label: 'DICOM', icon: <Box className="w-5 h-5" />, desc: 'Standard medical imaging format with full header support.' },
    { id: 'NIfTI', label: 'NIfTI', icon: <Binary className="w-5 h-5" />, desc: 'Common in neuroimaging and volumetric analysis.' },
    { id: 'PNG', label: 'PNG/JPG', icon: <FileText className="w-5 h-5" />, desc: 'Standard image formats for web and presentation.' },
    { id: 'CSV', label: 'CSV/Excel', icon: <Table className="w-5 h-5" />, desc: 'Tabular demographic and clinic metadata.' },
    { id: 'JSON', label: 'JSON', icon: <Database className="w-5 h-5" />, desc: 'Machine-readable structured data for ML pipelines.' },
  ];

  const handleExport = () => {
    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      format,
      status: 'processing' as const,
      progress: 0,
      timestamp: new Date().toISOString(),
      fileCount: 450
    };
    addExportTask(newTask);
    setStep(3);

    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) {
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="glass-card flex flex-col h-full min-h-[500px]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-medical-accent/10 text-medical-accent flex items-center justify-center">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Medical Export Wizard</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Step {step} of 3</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Select Target Format</h4>
            <div className="grid grid-cols-1 gap-3">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left ${
                    format === f.id
                      ? 'border-medical-accent bg-medical-accent/5'
                      : 'border-slate-50 hover:border-slate-100'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${format === f.id ? 'bg-medical-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 leading-none mb-1">{f.label}</p>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight">{f.desc}</p>
                  </div>
                  {format === f.id && <CheckCircle2 className="w-5 h-5 text-medical-accent ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Export Configurations</h4>

            <div className="space-y-4">
               {[
                 { id: 'includeMetadata', label: 'Preserve Medical Labels', desc: 'Include disease tags and severity scores.' },
                 { id: 'anonymizeMetadata', label: 'PHI Scrubbing (Level 3)', desc: 'Remove all DICOM specific identifiers.' },
                 { id: 'compress', label: 'Lossless Compression', desc: 'Reduce file size while preserving bit-depth.' },
                 { id: 'qualityReport', label: 'Fidelity Audit Attachment', desc: 'Include QA report PDF in export bundle.' }
               ].map((opt) => (
                 <label key={opt.id} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="space-y-0.5">
                       <p className="text-sm font-bold text-slate-900">{opt.label}</p>
                       <p className="text-[10px] text-slate-400 font-medium">{opt.desc}</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(options as any)[opt.id]}
                        onChange={(e) => setOptions({...options, [opt.id]: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-accent"></div>
                    </div>
                 </label>
               ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 rounded-full bg-emerald-100 text-medical-success flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900">Export Task Initiated</h4>
                <p className="text-sm text-slate-400 max-w-[280px]">Your {format} bundle is being compiled. You can track progress in the export queue.</p>
             </div>
             <div className="w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-medical-success animate-pulse w-[100%]" />
             </div>
             <button
               onClick={() => setStep(1)}
               className="text-xs font-black text-medical-accent uppercase tracking-widest hover:underline"
             >
               Start Another Export
             </button>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        {step > 1 && step < 3 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2.5 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Back
          </button>
        )}

        {step < 3 && (
          <button
            onClick={() => step === 2 ? handleExport() : setStep(step + 1)}
            className="ml-auto px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center gap-2 group"
          >
            {step === 2 ? 'Initiate Export' : 'Configure Options'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
