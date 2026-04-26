"use client";

import { useState } from 'react';
import {
  Terminal, Code2, Copy,
  Check, Play, BookOpen
} from 'lucide-react';

export default function IntegrationTemplates() {
  const [activeTab, setActiveTab] = useState<'pytorch' | 'tensorflow' | 'rest'>('pytorch');
  const [copied, setCopied] = useState(false);

  const snippets = {
    pytorch: `import torch
from medical_studio import DatasetLoader

# Initialize medical grade synthetic cohort
dataset = DatasetLoader(
    api_key="your_api_key_here",
    cohort_id="cohort_v2_4_0",
    modality="DICOM"
)

# Standard PyTorch Dataloader
train_loader = torch.utils.data.DataLoader(
    dataset, batch_size=32, shuffle=True
)`,
    tensorflow: `import tensorflow as tf
from medical_studio import TFProvider

# High-fidelity data stream
data_provider = TFProvider(
    api_key="your_api_key_here",
    cohort_id="cohort_v2_4_0"
)

# Build tf.data pipeline
dataset = data_provider.as_dataset(
    buffer_size=1000,
    parallel_calls=tf.data.AUTOTUNE
)`,
    rest: `curl -X GET "<https://api.medicalstudio.ai/v1/datasets/cohort_v2_4_0/stream>" \\\\
     -H "Authorization: Bearer YOUR_API_KEY" \\\\
     -H "Accept: application/dicom+zip" \\\\
     -o synthetic_data.zip`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
               <Code2 className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">ML Integration Hub</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Quickstart Templates</p>
            </div>
         </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6">
         <button
           onClick={() => setActiveTab('pytorch')}
           className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
             activeTab === 'pytorch' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'
           }`}
         >
           PyTorch
         </button>
         <button
           onClick={() => setActiveTab('tensorflow')}
           className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
             activeTab === 'tensorflow' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400 hover:text-slate-600'
           }`}
         >
           TensorFlow
         </button>
         <button
           onClick={() => setActiveTab('rest')}
           className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
             activeTab === 'rest' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
           }`}
         >
           REST API
         </button>
      </div>

      <div className="relative flex-1 group">
         <pre className="h-full p-6 bg-slate-900 rounded-3xl overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300 scrollbar-hide">
            <code>{snippets[activeTab]}</code>
         </pre>

         <button
           onClick={handleCopy}
           className="absolute top-4 right-4 p-2.5 bg-slate-800/50 backdrop-blur-md text-slate-300 border border-slate-700 rounded-xl hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100"
         >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
         </button>
      </div>

      <div className="mt-6 flex items-center justify-between">
         <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
            <Terminal className="w-3.5 h-3.5" /> SDK v2.4.0 (Latest)
         </div>
         <a href="#" className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
            Documentation <BookOpen className="w-4 h-4" />
         </a>
      </div>
    </div>
  );
}
