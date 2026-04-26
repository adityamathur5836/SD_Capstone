"use client";

import {
  Info, Search, BookOpen,
  Tag, Activity, ShieldCheck,
  BrainCircuit
} from 'lucide-react';
import { useState } from 'react';

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Medical' | 'AI' | 'Compliance';
}

export const glossaryData: GlossaryTerm[] = [
  {
    term: 'FID (Fréchet Inception Distance)',
    definition: 'A metric used to assess the quality of images created by a generative model. Lower scores indicate higher fidelity and realism.',
    category: 'AI'
  },
  {
    term: 'PHI (Protected Health Information)',
    definition: 'Any information in a medical record that can be used to identify an individual and that was created, used, or disclosed in the course of providing a health care service.',
    category: 'Compliance'
  },
  {
    term: 'Mode Collapse',
    definition: 'A common failure state in GAN training where the generator produces a limited range of outputs, failing to capture the full diversity of the real data.',
    category: 'AI'
  },
  {
    term: 'Differential Privacy (DP)',
    definition: 'A system for publicly sharing information about a dataset by describing the patterns of groups within the dataset while withholding information about individuals in the dataset.',
    category: 'Compliance'
  },
  {
    term: 'DICOM',
    definition: 'Digital Imaging and Communications in Medicine. The international standard for medical images and related information.',
    category: 'Medical'
  },
  {
    term: 'Class Imbalance',
    definition: 'A situation where the number of samples in one class is significantly higher than in other classes, potentially leading to model bias.',
    category: 'AI'
  }
];

export function GlossaryTooltip({ term, children }: { term: string, children: React.ReactNode }) {
  const data = glossaryData.find(g => g.term.toLowerCase().startsWith(term.toLowerCase()));

  return (
    <span className="group relative inline-block">
      <span className="cursor-help border-b border-dotted border-medical-accent/40 hover:text-medical-accent transition-colors">
        {children}
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[110] pointer-events-none scale-95 group-hover:scale-100">
         <div className="flex items-center gap-2 mb-2">
            <Info className="w-3.5 h-3.5 text-medical-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest">{data?.category || 'Definition'}</span>
         </div>
         <p className="text-[11px] font-bold leading-relaxed">
            {data?.definition || 'Medical or technical terminology definition.'}
         </p>
         <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900" />
      </div>
    </span>
  );
}

export default function MedicalGlossary() {
  const [search, setSearch] = useState('');

  const filtered = glossaryData.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-medical-accent text-white">
               <BookOpen className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Medical & AI Glossary</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Terminology Database</p>
            </div>
         </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter terms..."
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-medical-accent/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
        {filtered.map((item) => (
          <div key={item.term} className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-medical-accent/20 hover:bg-slate-50 transition-all">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-900">{item.term}</span>
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  item.category === 'AI' ? 'bg-blue-50 text-blue-600' :
                  item.category === 'Medical' ? 'bg-medical-accent/5 text-medical-accent' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                   {item.category}
                </span>
             </div>
             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                {item.definition}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
