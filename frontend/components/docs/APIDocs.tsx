"use client";

import {
  Terminal, Code2, Copy,
  Check, Play, Send,
  Globe, Database, Shield
} from 'lucide-react';
import { useState } from 'react';

export default function APIDocs() {
  const [activeMethod, setActiveMethod] = useState<'GET' | 'POST'>('GET');
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/v1/generate/stream', desc: 'Initiate high-fidelity GAN stream for real-time sample consumption.' },
    { method: 'POST', path: '/v1/audit/compliance', desc: 'Submit a synthetic cohort for institutional ethics and bias scoring.' },
    { method: 'GET', path: '/v1/meddata/glossary', desc: 'Fetch machine-readable medical terminology mappings and PHI scrub rules.' }
  ];

  const codeSnippet = activeMethod === 'GET'
    ? `curl -X GET "<https://api.medsynth.ai/v1/generate/stream>" \\\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\\
  -H "Accept: application/dicom+zip"`
    : `curl -X POST "<https://api.medsynth.ai/v1/audit/compliance>" \\\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\\
  -d '{
    "cohort_id": "CH_8829_MRI",
    "mitigation_level": "parity_plus"
  }'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
               <Terminal className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Research API Infrastructure</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Programmatic Clinical Access</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
           {endpoints.map((ep) => (
             <button
               key={ep.path}
               onClick={() => setActiveMethod(ep.method as any)}
               className={`w-full p-4 rounded-3xl border text-left transition-all ${
                 ep.method === activeMethod ? 'border-medical-accent bg-medical-accent/5' : 'border-slate-100 hover:border-slate-200 bg-white'
               }`}
             >
                <div className="flex items-center gap-3 mb-2">
                   <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                     ep.method === 'GET' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                   }`}>
                      {ep.method}
                   </span>
                   <code className="text-[11px] font-black text-slate-900">{ep.path}</code>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                   {ep.desc}
                </p>
             </button>
           ))}

           <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { label: 'Security', icon: <Shield className="w-3.5 h-3.5" />, val: 'AES-256' },
                { label: 'Uptime', icon: <Globe className="w-3.5 h-3.5" />, val: '99.99%' },
                { label: 'Format', icon: <Database className="w-3.5 h-3.5" />, val: 'JSON/DICOM' }
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                   <div className="flex justify-center text-slate-400 mb-1">{stat.icon}</div>
                   <p className="text-[9px] font-black text-slate-900 uppercase leading-none mb-1">{stat.val}</p>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="relative group">
           <pre className="h-full p-6 bg-slate-900 rounded-3xl overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-400 scrollbar-hide border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                 <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                 </div>
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">shell (bash)</span>
              </div>
              <code className="text-blue-400">{codeSnippet}</code>
           </pre>

           <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2.5 bg-slate-800/80 backdrop-blur-md text-slate-300 rounded-xl hover:bg-white hover:text-slate-900 transition-all border border-slate-700 shadow-xl"
              >
                 {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-medical-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-medical-accent/20">
                 Run Sample <Send className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-3xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all">
         <Code2 className="w-4 h-4" /> Download Official Python SDK
      </button>
    </div>
  );
}
