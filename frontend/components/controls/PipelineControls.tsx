"use client";

import { Play, Pause, Square, RotateCcw, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PipelineControls() {
  const {
    isTraining,
    setTraining,
    isGenerating,
    setGenerating,
    resetPipeline,
    addAuditLog,
    startGeneration
  } = useMedicalStore();

  const pathname = usePathname();
  const isGeneratePage = pathname === '/generate';
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const isActive = isTraining || isGenerating;

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggle();
      } else if (e.code === 'Escape' && isActive) {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTraining, isActive]);

  const handleToggle = () => {
    if (isTraining) {
      setTraining(false);
      addAuditLog("GAN Training Paused", "Researcher manually paused the training process.");
    } else if (isGenerating) {
      setGenerating(false);
      addAuditLog("Data Synthesis Paused", "Researcher manually paused the generation process.");
    } else {
      if (isGeneratePage) {
        startGeneration();
      } else {
        setTraining(true);
        addAuditLog("GAN Training Started", "Researcher initiated model training.");
      }
    }
  };

  const handleStop = () => {
    setShowConfirmStop(true);
  };

  const confirmStop = () => {
    setTraining(false);
    setGenerating(false);
    setShowConfirmStop(false);
    addAuditLog("Pipeline Emergency Stop", "Researcher triggered an immediate halt of all AI operations.");
  };

  const handleReset = () => {
    if (confirm("Reset all pipeline configurations to clinical defaults? This will clear current progress.")) {
      resetPipeline();
      addAuditLog("Pipeline Reset", "All parameters reverted to default clinical state.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl shadow-xl border border-slate-800">
        <button
          onClick={handleToggle}
          className={`group relative flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${
            isTraining
              ? 'bg-amber-500 hover:bg-amber-600 text-amber-950'
              : 'bg-medical-accent hover:bg-blue-500 text-white'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span className="text-sm font-bold uppercase tracking-wider">
            {isActive ? 'Pause' : 'Start'}
          </span>

          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Shortcut: Space
          </span>
        </button>

        <button
          onClick={handleStop}
          disabled={!isActive}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            isActive
              ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
              : 'text-slate-600 cursor-not-allowed'
          }`}
          title="Emergency Stop (Esc)"
        >
          <Square className="w-4 h-4 fill-current" />
          <span className="text-sm font-bold uppercase tracking-wider">Stop</span>
        </button>

        <div className="w-[1px] h-6 bg-slate-800 mx-2" />

        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          title="Reset Parameters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Verification Modal */}
      {showConfirmStop && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Pipeline Halt?</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Stopping the pipeline will terminate the current GPU processing session.
              Unsaved progress may be lost. Do you wish to proceed?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmStop(false)}
                className="flex-1 px-6 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={confirmStop}
                className="flex-1 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" /> Stop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
