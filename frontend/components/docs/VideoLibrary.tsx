"use client";

import {
  Play, Clock, Search,
  ChevronRight, Bookmark,
  MonitorPlay, Brain, Layers
} from 'lucide-react';
import { useState } from 'react';

export default function VideoLibrary() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'v1',
      title: 'Generating High-Fidelity MRI Cohorts',
      dur: '08:42',
      category: 'Workflows',
      desc: 'Learn how to configure latent seeds and condition parameters for realistic MRI synthesis.',
      preview: '<https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400&h=225&fit=crop>',
      icon: <Brain className="w-4 h-4" />
    },
    {
      id: 'v2',
      title: 'Auditing for Demographic Bias',
      dur: '05:15',
      category: 'Analytics',
      desc: 'Expert guide on interpreting the Comparative Heatmap and applying parity mitigations.',
      preview: '<https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=400&h=225&fit=crop>',
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'v3',
      title: 'Advanced DICOM Export Workflows',
      dur: '12:30',
      category: 'Integration',
      desc: 'Master the Export Wizard to ensure compliance with institutional radiology software.',
      preview: '<https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400&h=225&fit=crop>',
      icon: <MonitorPlay className="w-4 h-4" />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
               <MonitorPlay className="w-4 h-4" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Research Video Library</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Step-by-Step Guided Media</p>
            </div>
         </div>
         <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
            View All Media
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v.id} className="glass-card p-0 overflow-hidden group border-slate-100 flex flex-col h-full">
             <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={v.preview}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-xl group-active:scale-95 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                   </div>
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-slate-900/60 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                   {v.dur}
                </div>
             </div>

             <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                   <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      {v.icon}
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{v.category}</span>
                </div>

                <h4 className="text-sm font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                   {v.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                   {v.desc}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                   <button className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" /> Save
                   </button>
                   <button className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                      Watch Guide <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
