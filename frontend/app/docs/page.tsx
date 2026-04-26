"use client";

import MedicalGlossary from '@/components/docs/MedicalGlossary';
import VideoLibrary from '@/components/docs/VideoLibrary';
import APIDocs from '@/components/docs/APIDocs';
import { useMedicalStore } from '@/store/useMedicalStore';
import {
  Book, GraduationCap, Video,
  Terminal, ShieldCheck, Download,
  ExternalLink, Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function DocumentationPage() {
  const { setTutorialStep } = useMedicalStore();
  const [activeTab, setActiveTab] = useState<'guides' | 'glossary' | 'api'>('guides');

  const tabs = [
    { id: 'guides', label: 'Research Guides', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'glossary', label: 'Medical Glossary', icon: <Book className="w-4 h-4" /> },
    { id: 'api', label: 'API Infrastructure', icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Documentation</h1>
          <p className="text-slate-500 mt-1 font-medium">Technical and clinical resources for regional medical AI development.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
              <Download className="w-4 h-4" /> Print PDF
           </button>
           <button
             onClick={() => setTutorialStep(0)}
             className="flex items-center gap-2 px-4 py-2 bg-medical-accent text-white rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-medical-accent/20"
           >
              <Sparkles className="w-4 h-4" /> Start Tutorial
           </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {activeTab === 'guides' && (
             <div className="space-y-8">
                <VideoLibrary />

                <div className="glass-card p-6 border-slate-900 bg-slate-900 text-white overflow-hidden relative">
                   <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                         <div className="p-3 rounded-2xl bg-white/10 text-white">
                            <ShieldCheck className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="text-lg font-bold text-white">Ethics Board (IRB) Resource Pack</h3>
                            <p className="text-xs text-slate-400">Standardized documentation for synthetic data usage approval.</p>
                         </div>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-3 bg-medical-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
                         Download IRB Kit <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-medical-accent/10 blur-3xl -mr-32 -mt-32" />
                </div>
             </div>
           )}

           {activeTab === 'glossary' && (
             <div className="glass-card">
                <MedicalGlossary />
             </div>
           )}

           {activeTab === 'api' && (
             <div className="glass-card">
                <APIDocs />
             </div>
           )}
        </div>

        <div className="space-y-8">
           <div className="glass-card space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Best Practices</h4>
              <div className="space-y-4">
                 {[
                   { title: 'Privacy-Utility Tradeoff', desc: 'Understanding the impact of epsilon on clinical accuracy.' },
                   { title: 'Validation Cohorts', desc: 'Why you still need a small real-world verification set.' },
                   { title: 'Reporting Standards', desc: 'How to cite synthetic data in peer-reviewed journals.' }
                 ].map((item) => (
                   <div key={item.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <p className="text-xs font-black text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card bg-emerald-50 border-emerald-100 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                    <Download className="w-4 h-4" />
                 </div>
                 <h4 className="text-xs font-black text-emerald-900 uppercase">Case Studies</h4>
              </div>
              <p className="text-[11px] text-emerald-700/80 font-medium leading-relaxed">
                 Discover how researchers at IIT Delhi used synthetic retinal scans to train glaucoma detection models.
              </p>
              <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
                 Read Case Study
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
