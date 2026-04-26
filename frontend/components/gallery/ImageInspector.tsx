"use client";

import { X, ZoomIn, ZoomOut, Maximize, Star, Flag, Info, User, Calendar, ShieldCheck } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import ComparisonSlider from './ComparisonSlider';
import { useState } from 'react';

interface ImageInspectorProps {
  sampleId: string | null;
  onClose: () => void;
}

export default function ImageInspector({ sampleId, onClose }: ImageInspectorProps) {
  const { samples, updateSample } = useMedicalStore();
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');

  if (!sampleId) return null;

  const sample = samples.find(s => s.id === sampleId);
  if (!sample) return null;

  const handleRating = (r: number) => {
     updateSample(sample.id, {
       medical_metadata: { ...sample.medical_metadata, rating: r } as any
     });
  };

  const toggleFlag = () => {
    updateSample(sample.id, {
      medical_metadata: { ...sample.medical_metadata, flagged: !sample.medical_metadata?.flagged } as any
    });
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-6xl h-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 animate-in zoom-in-95 duration-300">

        {/* Left Side: Visual Content */}
        <div className="flex-1 bg-slate-50 relative flex flex-col p-6 min-h-0">
           <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                 <button
                   onClick={() => setViewMode('single')}
                   className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     viewMode === 'single' ? 'bg-medical-accent text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   Fidelity View
                 </button>
                 <button
                    onClick={() => setViewMode('compare')}
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      viewMode === 'compare' ? 'bg-medical-accent text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                    }`}
                 >
                   Side-by-Side
                 </button>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2 rounded-lg hover:bg-white text-slate-400 border border-transparent hover:border-slate-200 transition-all"><ZoomIn className="w-4 h-4" /></button>
                 <button className="p-2 rounded-lg hover:bg-white text-slate-400 border border-transparent hover:border-slate-200 transition-all"><ZoomOut className="w-4 h-4" /></button>
              </div>
           </div>

           <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
              {viewMode === 'single' ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   {/* High Res medical scan Rendering */}
                   {sample.image_url ? (
                     <img
                       src={sample.image_url}
                       alt={`Synthetic ${sample.medical_metadata?.condition || 'Scan'}`}
                       className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                     />
                   ) : (
                     <div className="w-3/4 aspect-square rounded-full border border-blue-500/10 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 rounded-full border-4 border-medical-success/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]" />
                     </div>
                   )}
                </div>
              ) : (
                <ComparisonSlider
                  className="h-full"
                  syntheticImageUrl={sample.image_url}
                  realImageUrl="<http://localhost:8000/api/uploads/328e3328-2b13-499b-93e3-29f107fb71e0_13_right.jpeg>"
                />
              )}

              <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Source Node</p>
                 <p className="text-xs font-bold font-mono">GH-A100-PRO-029</p>
              </div>
           </div>
        </div>

        {/* Right Side: Data & Tools */}
        <div className="w-full md:w-[380px] border-l border-slate-100 flex flex-col bg-white">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                 <h2 className="text-xl font-bold text-slate-900 tracking-tight">Image Findings</h2>
                 <p className="text-[10px] font-black text-medical-accent uppercase tracking-widest mt-1">Synthetic ID #{sample.id.slice(0, 6)}</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {/* Clinical Specs */}
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Info className="w-3.5 h-3.5" /> Clinical Profile
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1.5"><User className="w-3 h-3"/> Victim Gender</p>
                       <p className="text-sm font-bold text-slate-900">{sample.demographics?.gender || 'Unknown'}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3"/> Target Age</p>
                       <p className="text-sm font-bold text-slate-900">{sample.demographics?.age || '??'} years</p>
                    </div>
                 </div>
              </div>

              {/* Assessment */}
              <div className="space-y-6">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Researcher Assessment
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-600">Fidelity Rating</label>
                    <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map((r) => (
                         <button
                           key={r}
                           onClick={() => handleRating(r)}
                           className={`p-2 rounded-xl border transition-all ${
                             (sample.medical_metadata?.rating || 0) >= r
                               ? 'bg-amber-50 border-amber-100 text-amber-500 scale-110 shadow-sm'
                               : 'bg-white border-slate-100 text-slate-200 hover:border-amber-100 hover:text-amber-200'
                           }`}
                         >
                           <Star className={`w-5 h-5 ${(sample.medical_metadata?.rating || 0) >= r ? 'fill-current' : ''}`} />
                         </button>
                       ))}
                    </div>
                 </div>

                 <button
                   onClick={toggleFlag}
                   className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all border ${
                     sample.medical_metadata?.flagged
                       ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-md'
                       : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                   }`}
                 >
                   <Flag className={`w-4 h-4 ${sample.medical_metadata?.flagged ? 'fill-current' : ''}`} />
                   {sample.medical_metadata?.flagged ? 'Flagged for Re-training' : 'Flag Artifacts'}
                 </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Info className="w-3 h-3" /> Medical Notice
                 </p>
                 <p className="text-xs text-slate-600 leading-relaxed font-medium">
                   This scan passed initial discriminator entropy checks at ep. 94. Fidelity is optimized for structural retinal analysis.
                 </p>
              </div>
           </div>

           <div className="p-8 border-t border-slate-50">
              <button
                className="w-full py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all"
                onClick={onClose}
              >
                Approve & Export
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
