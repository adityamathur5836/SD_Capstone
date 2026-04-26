"use client";

import { Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

const steps = [
  { id: 1, name: 'Upload', href: '/upload' },
  { id: 2, name: 'Train', href: '/train' },
  { id: 3, name: 'Generate', href: '/generate' },
  { id: 4, name: 'Analyze', href: '/analyze' },
  { id: 5, name: 'Export', href: '/export' },
];

export default function PipelineStepper() {
  const pathname = usePathname();

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center space-x-4">
        {steps.map((step, stepIdx) => {
          const isCurrent = pathname === step.href;
          const currentStepIdx = steps.findIndex(s => s.href === pathname);
          const isCompleted = currentStepIdx > stepIdx;

          return (
            <li key={step.name} className="flex-1">
              <div className="group flex flex-col border-t-4 pt-4 transition-colors">
                <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                  isCurrent ? 'text-medical-accent' : isCompleted ? 'text-medical-success' : 'text-medical-muted'
                }`}>
                  Step {step.id}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${
                    isCurrent ? 'text-medical-text' : isCompleted ? 'text-medical-muted' : 'text-medical-muted'
                  }`}>
                    {step.name}
                  </span>
                  {isCompleted && <Check className="w-4 h-4 text-medical-success" />}
                </div>
                <div className={`mt-2 h-1 w-full rounded-full ${
                  isCurrent ? 'bg-medical-accent' : isCompleted ? 'bg-medical-success' : 'bg-slate-100'
                }`} />
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
