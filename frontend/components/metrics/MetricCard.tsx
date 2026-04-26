"use client";

import { Info, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useMemo } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  description: string;
  history: number[];
  thresholds?: {
    warning: number;
    critical: number;
    inverse?: boolean;
  };
}

export default function MetricCard({
  label,
  value,
  unit = "",
  trend,
  description,
  history,
  thresholds
}: MetricCardProps) {

  const status = useMemo(() => {
    if (!thresholds) return 'normal';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (thresholds.inverse) {
      if (numValue >= thresholds.critical) return 'critical';
      if (numValue >= thresholds.warning) return 'warning';
      return 'normal';
    } else {
      if (numValue <= thresholds.critical) return 'critical';
      if (numValue <= thresholds.warning) return 'warning';
      return 'normal';
    }
  }, [value, thresholds]);

  const statusColors = {
    normal: 'text-medical-success border-emerald-100 bg-emerald-50',
    warning: 'text-amber-600 border-amber-100 bg-amber-50',
    critical: 'text-rose-600 border-rose-100 bg-rose-50'
  };

  // Simple SVG sparkline
  const sparkline = useMemo(() => {
    if (history.length < 2) return null;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const width = 100;
    const height = 30;

    const points = history.map((val, i) => {
      const x = (i / (history.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height="30" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className={status === 'normal' ? 'text-medical-accent' : status === 'warning' ? 'text-amber-500' : 'text-rose-500'}
        />
      </svg>
    );
  }, [history, status]);

  return (
    <div className="glass-card flex flex-col group relative overflow-hidden transition-all hover:shadow-md border-slate-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5 cursor-help" title={description}>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
          <Info className="w-3 h-3 text-slate-300" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 mb-4">
        <h3 className={`text-3xl font-bold tabular-nums tracking-tight ${status === 'critical' ? 'text-rose-600' : 'text-slate-900'}`}>
          {value}
        </h3>
        <span className="text-sm font-semibold text-slate-400 mb-1.5">{unit}</span>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-50">
        <div className="h-8 flex items-center">
          {sparkline}
        </div>
      </div>

      {status !== 'normal' && (
        <div className={`absolute top-0 right-0 p-2 transform translate-x-1 -translate-y-1`}>
          <AlertCircle className={`w-4 h-4 ${status === 'critical' ? 'text-rose-500' : 'text-amber-500'} animate-pulse`} />
        </div>
      )}
    </div>
  );
}
