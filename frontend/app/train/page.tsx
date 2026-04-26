"use client";

import TrainingDashboard from '@/components/training/TrainingDashboard';

export default function TrainPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stage 2: Model Training & Optimization</h1>
        <p className="text-slate-500 mt-1 font-medium">Monitor GAN convergence and hardware performance in real-time.</p>
      </div>

      <TrainingDashboard />
    </div>
  );
}
