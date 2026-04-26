"use client";

import { Database, Sparkles, ShieldCheck, Microscope, LayoutGrid, Settings2 } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import ParameterSliders from '@/components/controls/ParameterSliders';
import ResourceMonitor from '@/components/controls/ResourceMonitor';
import PipelineControls from '@/components/controls/PipelineControls';
import AttributeFilters from '@/components/gallery/AttributeFilters';
import MedicalGallery from '@/components/gallery/MedicalGallery';
import ImageInspector from '@/components/gallery/ImageInspector';
import { useState, useMemo } from 'react';

export default function GeneratePage() {
  const { isGenerating, samples } = useMedicalStore();
  const [activeView, setActiveView] = useState<'controls' | 'findings'>('controls');
  const [inspectingId, setInspectingId] = useState<string | null>(null);

  const hasSamples = samples.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stage 3: Generate Synthetic Data</h1>
            <p className="text-slate-500 mt-1 font-medium">Execute high-fidelity synthesis and validate results.</p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
             <button
               onClick={() => setActiveView('controls')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                 activeView === 'controls' ? 'bg-white shadow-sm text-medical-accent' : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               <Settings2 className="w-3.5 h-3.5" /> Configure
             </button>
             <button
               onClick={() => setActiveView('findings')}
               disabled={!hasSamples && !isGenerating}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                 activeView === 'findings' ? 'bg-white shadow-sm text-medical-accent' : 'text-slate-500 hover:text-slate-700'
               } ${(!hasSamples && !isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               <LayoutGrid className="w-3.5 h-3.5" /> Findings {hasSamples && `(${samples.length})`}
             </button>
          </div>
        </div>
        <PipelineControls />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {activeView === 'controls' ? (
          <>
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card min-h-[460px] flex flex-col items-center justify-center relative overflow-hidden">
                {isGenerating ? (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-medical-accent/20 border-t-medical-accent animate-spin mx-auto" />
                      <Microscope className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-medical-accent" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-slate-900">Synthesizing Cohort...</h3>
                       <p className="text-slate-400 font-medium text-sm">Mapping high-dimensional latent medical features.</p>
                    </div>
                    <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-medical-accent animate-progress" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center mx-auto mb-8 border-2 border-slate-100 shadow-inner">
                      <Database className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Synthesis Node Ready</h3>
                    <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-8">
                      Adjust clinical prevalence and demographic bias to target specific research needs.
                    </p>
                    {hasSamples && (
                      <button
                         onClick={() => setActiveView('findings')}
                         className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                      >
                         Review Last Generation
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">Differential Privacy (DP) Active</h4>
                  <p className="text-xs text-emerald-700 font-medium leading-relaxed mt-1">
                    Samples are protected via ε=0.5 noise injection, ensuring that no individual patient pattern can be re-identified from the synthetic dataset.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ParameterSliders />
              <ResourceMonitor />
            </div>
          </>
        ) : (
          <>
            <div className="lg:col-span-1">
               <AttributeFilters />
            </div>
            <div className="lg:col-span-3">
               <MedicalGallery onInspect={setInspectingId} />
            </div>
          </>
        )}
      </div>

      <ImageInspector
        sampleId={inspectingId}
        onClose={() => setInspectingId(null)}
      />
    </div>
  );
}
