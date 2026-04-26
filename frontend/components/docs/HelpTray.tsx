"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  X, Search, Book,
  HelpCircle, MessageSquare,
  ChevronRight, ExternalLink,
  Lightbulb, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

export default function HelpTray() {
  const { isHelpTrayOpen, setHelpTrayOpen } = useMedicalStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isHelpTrayOpen) return null;

  const topics = [
    { title: 'Understanding FID Scores', category: 'Analytics', icon: <Book className="w-4 h-4" /> },
    { title: 'PHI Scrubbing Levels', category: 'Compliance', icon: <ShieldCheck className="w-4 h-4" /> },
    { title: 'GAN Convergence Issues', category: 'Training', icon: <Lightbulb className="w-4 h-4" /> },
    { title: 'Exporting to DICOM', category: 'Integration', icon: <ExternalLink className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-[100] border-l border-slate-100 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Research Help</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Documentation & Support</p>
          </div>
        </div>
        <button
          onClick={() => setHelpTrayOpen(false)}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-medical-accent/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recommended for this page</h4>
            <div className="space-y-2">
               {topics.map((topic) => (
                 <button key={topic.title} className="w-full flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all text-left">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                       {topic.icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="text-xs font-bold text-slate-900 truncate">{topic.title}</p>
                       <p className="text-[9px] text-slate-400 font-bold uppercase">{topic.category}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                 </button>
               ))}
            </div>
          </section>

          <section>
            <div className="p-5 rounded-3xl bg-medical-accent/5 border border-medical-accent/10 space-y-4">
               <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-medical-accent" />
                  <h4 className="text-xs font-black text-slate-900 uppercase">Live Research Support</h4>
               </div>
               <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Stuck on a clinical edge case? Our medical AI engineers are available 9-5 for direct consultation.
               </p>
               <button className="w-full py-2.5 bg-medical-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                  Chat with an Expert
               </button>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
         <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
            <Book className="w-4 h-4" /> Full Documentation
         </button>
      </div>
    </div>
  );
}
