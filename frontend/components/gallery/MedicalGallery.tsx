"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import { Eye, Star, AlertCircle, FileType } from 'lucide-react';
import { useMemo } from 'react';

interface MedicalGalleryProps {
  onInspect: (id: string) => void;
}

export default function MedicalGallery({ onInspect }: MedicalGalleryProps) {
  const { samples, galleryFilters } = useMedicalStore();

  const filteredSamples = useMemo(() => {
    return samples.filter(s => {
      if (galleryFilters.flaggedOnly && !s.medical_metadata?.flagged) return false;
      if (galleryFilters.minConfidence > 0.9) return true; // Placeholder logic
      // REAL filtering will happen here
      return true;
    });
  }, [samples, galleryFilters]);

  if (filteredSamples.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
        <FileType className="w-12 h-12 text-slate-200 mb-4" />
        <p className="text-slate-400 font-bold text-sm">No samples match your active filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {filteredSamples.map((sample) => (
        <div
          key={sample.id}
          className="group relative glass-card !p-0 overflow-hidden cursor-zoom-in border-slate-200 hover:border-medical-accent transition-all hover:shadow-xl hover:shadow-blue-50"
          onClick={() => onInspect(sample.id)}
        >
          <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
             {/* Actual Synthetic Image rendering */}
             {sample.image_url && (
               <img
                 src={sample.image_url}
                 alt={`Synthetic ${sample.medical_metadata?.condition || 'Scan'}`}
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 onError={(e) => {
                   // Fallback if image fails to load
                   (e.target as HTMLImageElement).style.display = 'none';
                 }}
               />
             )}

             {/* Aesthetic medical visualization placeholder (visible if no image or error) */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10">
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                  SYN-{sample.id.slice(0, 4)}
                </div>

                <div className="w-24 h-24 rounded-full border-2 border-medical-success/20 animate-pulse flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full border border-medical-success/40" />
                </div>
             </div>

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-medical-accent/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                  <Eye className="w-6 h-6" />
               </div>
               <span className="text-white text-xs font-black uppercase tracking-widest">Inspect Scan</span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Condition</p>
              <p className="text-sm font-bold text-slate-900">{sample.medical_metadata?.condition || 'Medical Scan'}</p>
              {sample.medical_metadata?.dr_level && (
                <p className="text-[10px] font-bold text-medical-accent">Grade: {sample.medical_metadata.dr_level}</p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                sample.medical_metadata?.flagged ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
              } border border-current opacity-70`}>
                {sample.medical_metadata?.flagged ? 'FLAGGED' : 'VERIFIED'}
              </span>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < (sample.medical_metadata?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
