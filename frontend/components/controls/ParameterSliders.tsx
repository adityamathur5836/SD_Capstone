"use client";

import { Settings2, Info } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';

export default function ParameterSliders() {
  const { pipelineConfig, setPipelineConfig } = useMedicalStore();

  const parameters = [
    {
      id: 'diseasePrevalence',
      label: 'Disease Prevalence',
      min: 0.05,
      max: 0.8,
      step: 0.01,
      unit: '%',
      multiply: 100,
      description: 'The proportion of patients in the cohort with the clinical condition.'
    },
    {
      id: 'noiseLevel',
      label: 'Research Diversity (Noise)',
      min: 0.01,
      max: 0.2,
      step: 0.01,
      unit: '',
      multiply: 1,
      description: 'Higher noise increases data diversity but may reduce strict clinical fidelity.'
    },
    {
      id: 'batchSize',
      label: 'Generation Batch Size',
      min: 8,
      max: 128,
      step: 8,
      unit: ' samples',
      multiply: 1,
      description: 'Number of samples generated per GPU cycle.'
    }
  ];

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2 mb-8">
        <Settings2 className="w-5 h-5 text-medical-accent" />
        <h3 className="font-bold text-slate-900">Clinical Parameters</h3>
      </div>

      <div className="space-y-8">
        {parameters.map((param) => (
          <div key={param.id} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 group relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {param.label}
                </label>
                <Info className="w-3 h-3 text-slate-300 cursor-help" />
                <div className="absolute left-0 -top-12 w-48 p-2 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {param.description}
                </div>
              </div>
              <span className="text-sm font-black text-medical-accent">
                {Math.round((pipelineConfig[param.id as keyof typeof pipelineConfig] as number) * param.multiply)}
                {param.unit}
              </span>
            </div>

            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={pipelineConfig[param.id as keyof typeof pipelineConfig] as number}
              onChange={(e) => setPipelineConfig({ [param.id]: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-medical-accent"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Lower Fidelity</span>
          <span>Higher Clinical Yield</span>
        </div>
      </div>
    </div>
  );
}
