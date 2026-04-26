"use client";

import ChartExport from './ChartExport';

interface CorrelationMatrixProps {
  attributes: string[];
  matrix: number[][];
  chartId: string;
}

export default function CorrelationMatrix({ attributes, matrix, chartId }: CorrelationMatrixProps) {

  const getIntensityColor = (val: number) => {
    const absVal = Math.abs(val);
    if (val > 0) return `rgba(59, 130, 246, ${absVal})`; // Blue for positive
    return `rgba(244, 63, 94, ${absVal})`; // Rose for negative
  };

  const exportData = matrix.flatMap((row, ri) =>
    row.map((val, ci) => ({
      Attr_A: attributes[ri],
      Attr_B: attributes[ci],
      Correlation: val
    }))
  );

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-slate-900 group flex items-center gap-2">
            Clinical Feature Correlation
            <span className="p-1 rounded-full bg-blue-50 text-medical-accent">
               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </span>
          </h3>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Pearson Coefficient Analysis</p>
        </div>
        <ChartExport chartId={chartId} data={exportData} filename="correlation_matrix" />
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="min-w-[400px]">
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <div />
            <div className="flex">
              {attributes.map(attr => (
                <div key={attr} className="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-1 truncate">
                  {attr}
                </div>
              ))}
            </div>

            {attributes.map((attr, ri) => (
              <>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center pr-2 text-right">
                  {attr}
                </div>
                <div className="flex gap-1.5 h-10">
                  {matrix[ri].map((val, ci) => (
                    <div
                      key={`${ri}-${ci}`}
                      style={{ backgroundColor: getIntensityColor(val) }}
                      className="flex-1 rounded-md flex items-center justify-center group relative cursor-help"
                    >
                      <span className={`text-[10px] font-bold ${Math.abs(val) > 0.5 ? 'text-white' : 'text-slate-900 opacity-40'}`}>
                        {val.toFixed(2)}
                      </span>

                      {/* Detailed Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 text-white rounded-xl text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl border border-white/10">
                         <p className="font-black border-b border-white/10 pb-1 mb-2">RELATIONSHIP SCAN</p>
                         <p className="flex justify-between mb-1"><span>{attributes[ri]}</span> <span className="text-blue-400">vs</span> <span>{attributes[ci]}</span></p>
                         <p className="flex justify-between font-black text-xs"><span>Index:</span> <span>{val > 0 ? '+' : ''}{val.toFixed(4)}</span></p>
                         <p className="mt-2 text-slate-400 italic">"Strong correlation suggests high clinical dependency mapping."</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold text-slate-500 tracking-widest">POSITIVE</span>
         </div>
         <div className="w-[2px] h-3 bg-slate-200" />
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-slate-500 tracking-widest">NEGATIVE</span>
         </div>
      </div>
    </div>
  );
}
