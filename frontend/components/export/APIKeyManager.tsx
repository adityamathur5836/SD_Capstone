"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  Key, Copy, ShieldAlert,
  Eye, EyeOff, Trash2,
  ExternalLink, Zap
} from 'lucide-react';
import { useState } from 'react';

export default function APIKeyManager() {
  const { apiKeys, addAPIKey, revokeAPIKey } = useMedicalStore();
  const [showKey, setShowKey] = useState<string | null>(null);

  const mockKeys = [
    {
      id: 'key-1',
      name: 'Server: Research Cluster A',
      key: 'sk_live_medical_8829...f34a',
      created: '2024-01-28',
      lastUsed: '2 mins ago',
      status: 'active' as const
    },
    {
      id: 'key-2',
      name: 'Local: Dev Terminal',
      key: 'sk_live_medical_1192...d22b',
      created: '2024-01-25',
      lastUsed: '3 days ago',
      status: 'active' as const
    }
  ];

  const handleGenerateKey = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    addAPIKey({
      id: newId,
      name: `New Key ${apiKeys.length + 1}`,
      key: `sk_live_medical_${Math.random().toString(36).substring(2, 12)}...`,
      created: new Date().toISOString().split('T')[0],
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
               <Key className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">API Access Keys</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Programmatic Data Stream</p>
            </div>
         </div>
         <button
           onClick={handleGenerateKey}
           className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all"
         >
            <Zap className="w-3.5 h-3.5" /> Generate
         </button>
      </div>

      <div className="space-y-3">
        {(apiKeys.length > 0 ? apiKeys : mockKeys).map((k) => (
          <div key={k.id} className="p-4 rounded-3xl border border-slate-100 bg-white hover:border-amber-200 transition-all group">
             <div className="flex items-center justify-between mb-3">
                <div>
                   <p className="text-xs font-black text-slate-900">{k.name}</p>
                   <p className="text-[10px] text-slate-400 font-medium">Created {k.created}</p>
                </div>
                <div className="flex items-center gap-1.5 border border-slate-50 px-2 py-0.5 rounded-full">
                   <div className={`w-1 h-1 rounded-full ${k.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.status}</span>
                </div>
             </div>

             <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-2xl font-mono text-xs text-slate-500 border border-slate-100 overflow-hidden">
                   {showKey === k.id ? k.key : '••••••••••••••••••••••••••••••'}
                   <button
                     onClick={() => setShowKey(showKey === k.id ? null : k.id)}
                     className="ml-auto p-1.5 hover:bg-white rounded-lg transition-colors"
                   >
                      {showKey === k.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                   </button>
                </div>
                <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all">
                   <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => revokeAPIKey(k.id)}
                  className="p-2.5 bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 rounded-2xl transition-all"
                >
                   <Trash2 className="w-4 h-4" />
                </button>
             </div>

             <div className="mt-3 flex items-center justify-between">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Last active: <span className="text-slate-600"> {k.lastUsed || 'Never'} </span>
                </p>
                <a href="#" className="flex items-center gap-1 text-[9px] font-black text-medical-accent uppercase tracking-widest hover:underline">
                   View Logs <ExternalLink className="w-2.5 h-2.5" />
                </a>
             </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-3xl bg-amber-50/50 border border-amber-100 flex gap-3">
         <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
         <div className="space-y-1">
            <p className="text-[11px] font-bold text-amber-900">Security Recommendation</p>
            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
              Never share your API keys or commit them to version control. Keys grant full access to sensitive clinical cohorts.
            </p>
         </div>
      </div>
    </div>
  );
}
