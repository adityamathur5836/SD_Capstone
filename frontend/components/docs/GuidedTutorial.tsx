"use client";

import { useMedicalStore } from '@/store/useMedicalStore';
import {
  X, ChevronRight, ChevronLeft,
  Sparkles, Pointer, MousePointer2,
  CheckCircle2
} from 'lucide-react';
import { useEffect, useState } from 'react';

export interface TutorialStep {
  title: string;
  description: string;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to the Research Studio',
    description: 'This interactive guide will help you generate your first high-fidelity synthetic clinical cohort.',
    position: 'center'
  },
  {
    title: 'Configure Modality',
    description: 'Select your target medical modality. We support DICOM, MRI, CT, and X-Ray parameters.',
    target: '#modality-selector',
    position: 'bottom'
  },
  {
    title: 'Privacy Guardrails',
    description: 'Adjust the Differential Privacy (ε) epsilon. Smaller values offer higher privacy but may affect data utility.',
    target: '#privacy-slider',
    position: 'top'
  },
  {
    title: 'Auditing Bias',
    description: 'Always check the Bias Score before exporting. Our AI will automatically suggest mitigations for demographic imbalance.',
    target: '#bias-meter',
    position: 'left'
  },
  {
    title: 'Ready for Export',
    description: 'Once satisfied, use the Export Wizard to download your cohort in DICOM format for ethics board review.',
    position: 'center'
  }
];

export default function GuidedTutorial() {
  const { tutorialStep, setTutorialStep } = useMedicalStore();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (tutorialStep !== null && tutorialSteps[tutorialStep]?.target) {
      const el = document.querySelector(tutorialSteps[tutorialStep].target!);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    } else {
      setTargetRect(null);
    }
  }, [tutorialStep]);

  if (tutorialStep === null) return null;

  const current = tutorialSteps[tutorialStep];
  const isLast = tutorialStep === tutorialSteps.length - 1;

  const getPositionStyles = () => {
    if (current.position === 'center' || !targetRect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const gap = 20;
    switch (current.position) {
      case 'bottom': return { top: targetRect.bottom + gap, left: targetRect.left + (targetRect.width / 2) - 160 };
      case 'top': return { top: targetRect.top - 200 - gap, left: targetRect.left + (targetRect.width / 2) - 160 };
      case 'left': return { top: targetRect.top, left: targetRect.left - 320 - gap };
      case 'right': return { top: targetRect.top, left: targetRect.right + gap };
      default: return {};
    }
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-auto" />

      {/* Highlight Hole (Simplified for browser-only CSS) */}
      {targetRect && (
        <div
          className="absolute border-[4px] border-medical-accent rounded-2xl shadow-[0_0_0_9999px_rgba(15,23,42,0.6)] z-10"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16
          }}
        />
      )}

      {/* Tutorial Card */}
      <div
        className="absolute w-80 bg-white rounded-3xl shadow-2xl p-6 pointer-events-auto z-20 animate-in zoom-in-95 duration-300"
        style={getPositionStyles()}
      >
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-medical-accent animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guide {tutorialStep + 1} / {tutorialSteps.length}</span>
           </div>
           <button
             onClick={() => setTutorialStep(null)}
             className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
           >
              <X className="w-4 h-4" />
           </button>
        </div>

        <h3 className="text-sm font-black text-slate-900 mb-2">{current.title}</h3>
        <p className="text-[11px] text-slate-600 font-medium leading-relaxed mb-6">
           {current.description}
        </p>

        <div className="flex items-center justify-between">
           <div className="flex gap-1">
              {tutorialSteps.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${i === tutorialStep ? 'w-4 bg-medical-accent' : 'w-1 bg-slate-100'}`} />
              ))}
           </div>

           <div className="flex items-center gap-2">
              {tutorialStep > 0 && (
                <button
                  onClick={() => setTutorialStep(tutorialStep - 1)}
                  className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                   <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => isLast ? setTutorialStep(null) : setTutorialStep(tutorialStep + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-black transition-all group"
              >
                 {isLast ? 'Complete' : 'Next'}
                 {!isLast && <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                 {isLast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
