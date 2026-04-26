"use client";

interface PrivacyGaugeProps {
  score: number; // 0 to 1
  size?: number;
}

export default function PrivacyGauge({ score, size = 160 }: PrivacyGaugeProps) {
  const percentage = Math.round(score * 100);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score * circumference);

  const getColor = (s: number) => {
    if (s >= 0.95) return '#10b981'; // Success
    if (s >= 0.85) return '#f59e0b'; // Warning
    return '#ef4444'; // Critical
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-900 tracking-tighter">{percentage}%</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Privacy</span>
      </div>

      {score < 0.95 && (
        <div className="mt-4 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Vulnerability Risk</span>
        </div>
      )}
    </div>
  );
}
