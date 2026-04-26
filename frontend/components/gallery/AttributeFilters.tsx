"use client";

import { Filter, X, CheckSquare, Square, SlidersHorizontal } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';

export default function AttributeFilters() {
  const { galleryFilters, setGalleryFilters } = useMedicalStore();

  const toggleFlaggedOnly = () => {
    setGalleryFilters({ flaggedOnly: !galleryFilters.flaggedOnly });
  };

  const clearFilters = () => {
    setGalleryFilters({
      condition: undefined,
      severity: undefined,
      gender: undefined,
      flaggedOnly: false,
      minConfidence: 0.7
    });
  };

  return (
    <div className="glass-card h-fit sticky top-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-medical-accent" />
          <h3 className="font-bold text-slate-900">Drill-down Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-medical-accent transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Quality Threshold */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Min Confidence</span>
            <span className="text-medical-accent">{Math.round(galleryFilters.minConfidence * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={galleryFilters.minConfidence}
            onChange={(e) => setGalleryFilters({ minConfidence: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-medical-accent"
          />
        </div>

        {/* Clinical Parameters */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Focus</label>
          <div className="grid grid-cols-1 gap-2">
            {['Mild', 'Moderate', 'Severe', 'Healthy'].map((sev) => (
              <button
                key={sev}
                onClick={() => setGalleryFilters({ severity: galleryFilters.severity === sev ? undefined : sev })}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  galleryFilters.severity === sev
                    ? 'bg-blue-50 border-blue-100 text-blue-700 shadow-sm'
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Biological Target</label>
          <div className="flex gap-2">
             {['Male', 'Female'].map((g) => (
               <button
                 key={g}
                 onClick={() => setGalleryFilters({ gender: galleryFilters.gender === g ? undefined : g })}
                 className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                   galleryFilters.gender === g
                     ? 'bg-medical-accent border-medical-accent text-white shadow-md'
                     : 'bg-white border-slate-200 text-slate-600 hover:border-medical-accent'
                 }`}
               >
                 {g}
               </button>
             ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={toggleFlaggedOnly}
            className="flex items-center gap-3 w-full group"
          >
            {galleryFilters.flaggedOnly ? (
              <CheckSquare className="w-5 h-5 text-rose-500 fill-rose-50" />
            ) : (
              <Square className="w-5 h-5 text-slate-200 group-hover:text-slate-300" />
            )}
            <span className={`text-xs font-bold uppercase tracking-wider ${galleryFilters.flaggedOnly ? 'text-rose-600' : 'text-slate-500'}`}>
              Flagged for Review
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
