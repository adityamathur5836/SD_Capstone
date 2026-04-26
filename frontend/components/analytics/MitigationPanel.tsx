"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function MitigationPanel() {
  const { applyMitigation } = useMedicalStore();

  const mockSuggestions = [
    {
      id: 'mit-1',
      text: 'Apply re-weighting to Ethnicity Group B (Currently underrepresented by 12.4%)',
      impact: 'Will reduce Ethic Bias Score by 0.015',
      confidence: 0.94,
      severity: 'high'
    },
    {
      id: 'mit-2',
      text: 'Synthesize additional 500 samples for Female cohort in Age range 65+',
      impact: 'Improves gender parity by 8%',
      confidence: 0.88,
      severity: 'medium'
    },
    {
      id: 'mit-3',
      text: 'Enable adversarial de-biasing for socio-economic markers',
      impact: 'Reduces SES correlation by 0.042',
      confidence: 0.82,
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Mitigation Engine</h3>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-medical-accent bg-blue-50 px-2 py-0.5 rounded-full">
           <Sparkles className="w-3 h-3" /> AI suggestions active
        </span>
      </div>

      <div className="space-y-4">
        {mockSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="group relative p-5 rounded-3xl bg-white border border-slate-100 hover:border-medical-accent transition-all hover:shadow-xl hover:shadow-blue-50/50"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-2xl ${
                suggestion.severity === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {suggestion.severity === 'high' ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-medical-accent transition-colors">
                  {suggestion.text}
                </p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                  Estimated Impact: <span className="text-medical-success">{suggestion.impact}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-medical-accent" style={{ width: `${suggestion.confidence * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Conf: {Math.round(suggestion.confidence * 100)}%</span>
               </div>
               <button
                 onClick={() => applyMitigation(suggestion.id)}
                 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 hover:text-medical-accent transition-colors"
               >
                 Execute <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
         <div className="relative z-10">
            <h4 className="font-bold text-sm mb-1">Bias-Free Guarantee</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Synthesized datasets under "Ethics Gold" standard are certified for research publication use.
            </p>
         </div>
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-12 h-12" />
         </div>
      </div>
    </div>
  );
}
