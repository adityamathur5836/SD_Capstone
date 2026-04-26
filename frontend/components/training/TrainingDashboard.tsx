"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  Play, Pause, StopCircle, Settings2,
  ChevronRight, BrainCircuit, Activity,
  Database, LayoutDashboard, History,
  Gauge
} from 'lucide-react';
import TrainingLossChart from './TrainingLossChart';
import ResourceMonitor from './ResourceMonitor';
import CheckpointBrowser from './CheckpointBrowser';
import TrainingLogViewer from './TrainingLogViewer';
import { useState, useEffect, useRef } from 'react';
import { medicalApi } from '@/services/api';

export default function TrainingDashboard() {
  const {
    isTraining, setTraining,
    pipelineConfig, setPipelineConfig,
    trainingProgress, activeDataset,
    addTrainingMetrics, token
  } = useMedicalStore();
  const [activeTab, setActiveTab] = useState<'metrics' | 'checkpoints' | 'history'>('metrics');
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (isTraining && token) {
      const url = `${medicalApi.getTrainingStreamUrl()}?access_token=${token}`;
      const es = new EventSource(url);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        try {
          const metrics = JSON.parse(event.data);
          addTrainingMetrics(metrics);
        } catch (err) {
          console.error('Error parsing training metrics:', err);
        }
      };

      es.onerror = (err) => {
        console.error('EventSource failed:', err);
        es.close();
        setTraining(false);
      };

      return () => {
        es.close();
      };
    } else {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [isTraining, token, addTrainingMetrics, setTraining]);

  const stats = [
    { label: 'Current Epoch', value: trainingProgress?.epoch?.toString() || '0', sub: `/ ${pipelineConfig.batchSize * 10 || 1000}` },
    { label: 'Loss (G / D)', value: trainingProgress?.generator_loss != null ? `${trainingProgress.generator_loss.toFixed(3)} / ${trainingProgress.discriminator_loss.toFixed(3)}` : '0.000', sub: 'Active' },
    { label: 'Similarity Score', value: trainingProgress?.accuracy != null ? (trainingProgress.accuracy * 100).toFixed(1) : '0.0', sub: '%' },
    { label: 'Training Mode', value: isTraining ? 'Active' : 'Standby', sub: pipelineConfig.noiseLevel > 0.05 ? 'High Entropy' : 'Stable' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl ${isTraining ? 'bg-medical-accent animate-pulse' : 'bg-slate-200'} text-white`}>
              <BrainCircuit className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Training Sandbox</h2>
              <div className="flex items-center gap-2 mt-0.5">
                 <span className="text-xs font-bold text-slate-400">
                    Source: <span className={activeDataset ? 'text-slate-600' : 'text-rose-500'}>
                        {activeDataset ? activeDataset.name : 'No dataset selected'}
                    </span>
                 </span>
                 <div className="w-1 h-1 rounded-full bg-slate-300" />
                 <span className="text-xs font-bold text-medical-accent">{activeDataset ? `${activeDataset.file_count} samples` : '0 samples'}</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setTraining(!isTraining)}
              disabled={!activeDataset && !isTraining}
              title={!activeDataset ? 'Please upload a dataset first' : ''}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isTraining
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  : !activeDataset
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200'
              }`}
            >
              {isTraining ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isTraining ? 'Pause Run' : 'Resume Training'}
            </button>
            <button
              onClick={() => setTraining(false)}
              disabled={!isTraining}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 disabled:text-slate-300 disabled:hover:bg-transparent transition-all"
            >
              <StopCircle className="w-3.5 h-3.5" /> Stop
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {stats.map((stat) => (
           <div key={stat.label} className="glass-card p-4 transition-transform hover:scale-[1.02]">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <div className="flex items-baseline gap-1.5">
               <span className="text-2xl font-black text-slate-900 tabular-nums">{stat.value}</span>
               <span className="text-[10px] font-bold text-slate-400">{stat.sub}</span>
             </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="glass-card">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                 <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`text-xs font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${
                        activeTab === 'metrics' ? 'border-medical-accent text-medical-accent' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Performance Metrics
                    </button>
                    <button
                      onClick={() => setActiveTab('checkpoints')}
                      className={`text-xs font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${
                        activeTab === 'checkpoints' ? 'border-medical-accent text-medical-accent' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Model Checkpoints
                    </button>
                 </div>

                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">Smoothing: 0.6</span>
                    <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
                       <Settings2 className="w-3.5 h-3.5" />
                    </button>
                 </div>
              </div>

              <div className="min-h-[400px]">
                 {activeTab === 'metrics' ? (
                   <TrainingLossChart />
                 ) : (
                   <CheckpointBrowser />
                 )}
              </div>
           </div>

           <TrainingLogViewer />
        </div>

        <div className="space-y-6">
           <div className="glass-card">
              <ResourceMonitor />
           </div>

           <div className="glass-card space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Gauge className="w-4 h-4 text-medical-accent" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Training Constraints</h3>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <div className="flex justify-between">
                       <label className="text-xs font-bold text-slate-500">Early Stopping (FID)</label>
                       <span className="text-xs font-black text-slate-900">{pipelineConfig.noiseLevel > 0.1 ? '15.0' : '10.0'}</span>
                    </div>
                    <input
                       type="range"
                       min="0" max="0.2" step="0.01"
                       value={pipelineConfig.noiseLevel}
                       onChange={(e) => setPipelineConfig({ noiseLevel: parseFloat(e.target.value) })}
                       className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-accent"
                    />
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between">
                       <label className="text-xs font-bold text-slate-500">Batch Size</label>
                       <span className="text-xs font-black text-slate-900">{pipelineConfig.batchSize}</span>
                    </div>
                    <input
                       type="range"
                       min="16" max="128" step="16"
                       value={pipelineConfig.batchSize}
                       onChange={(e) => setPipelineConfig({ batchSize: parseInt(e.target.value) })}
                       className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-accent"
                    />
                 </div>

                 <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                       <span className="font-bold text-slate-500">Differential Privacy</span>
                       <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">ACTIVE (ε=0.5)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="font-bold text-slate-500">Auto-Checkpoint</span>
                       <span className="font-black text-slate-400">EVERY 50 EPOCHS</span>
                    </div>
                 </div>
              </div>
           </div>

           <button className="w-full group flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
              <History className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
              Compare Past Runs
           </button>
        </div>
      </div>
    </div>
  );
}
