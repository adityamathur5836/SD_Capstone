"use client";

import ChartExport from './ChartExport';

interface HeatmapCell {
  x: string;
  y: string;
  value: number;
}

interface ComparativeHeatmapProps {
  title: string;
  data: HeatmapCell[];
  chartId: string;
}

export default function ComparativeHeatmap({ title, data, chartId }: ComparativeHeatmapProps) {
  const xLabels = Array.from(new Set(data.map(d => d.x)));
  const yLabels = Array.from(new Set(data.map(d => d.y)));

  const getColor = (value: number) => {
    // Medical thermal scale (Blue -> Emerald -> Amber)
    if (value < 0.3) return 'bg-blue-50 text-blue-600';
    if (value < 0.6) return 'bg-emerald-100 text-emerald-700';
    if (value < 0.8) return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  };

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <ChartExport chartId={chartId} data={data} filename={chartId} />
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="p-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left"></th>
              {xLabels.map(lx => (
                <th key={lx} className="p-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  {lx}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yLabels.map(ly => (
              <tr key={ly}>
                <td className="p-2 text-[10px] font-black text-slate-600 uppercase tracking-widest text-left">{ly}</td>
                {xLabels.map(lx => {
                  const cell = data.find(d => d.x === lx && d.y === ly);
                  const value = cell?.value || 0;
                  return (
                    <td
                      key={`${lx}-${ly}`}
                      className={`p-3 rounded-lg text-xs font-bold text-center transition-all hover:scale-105 cursor-help ${getColor(value)}`}
                      title={`Intensity: ${Math.round(value * 100)}%`}
                    >
                      {Math.round(value * 100)}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-4">
         <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-50 via-emerald-100 to-rose-100" />
         <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest w-24">
            <span>Low</span>
            <span>High</span>
         </div>
      </div>
    </div>
  );
}
