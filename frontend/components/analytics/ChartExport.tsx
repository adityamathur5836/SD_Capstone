"use client";

import { Download, FileJson, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ChartExportProps {
  chartId: string;
  data: any;
  filename: string;
}

export default function ChartExport({ chartId, data, filename }: ChartExportProps) {
  const [isOpen, setIsOpen] = useState(false);

  const exportAsImage = (format: 'png' | 'svg') => {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = canvas.toDataURL(`image/${format === 'png' ? 'png' : 'svg+xml'}`);
    link.click();
    setIsOpen(false);
  };

  const exportAsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + Object.keys(data[0] || {}).join(",") + "\\n"
      + data.map((row: any) => Object.values(row).join(",")).join("\\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-medical-accent border border-transparent hover:border-slate-200 transition-all"
        title="Export Chart"
      >
        <Download className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[70] animate-in fade-in zoom-in-95 duration-200">
            <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
              Export Format
            </p>
            <button
              onClick={() => exportAsImage('png')}
              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-medical-accent flex items-center gap-2 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" /> PNG Image
            </button>
            <button
              onClick={exportAsCSV}
              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-medical-accent flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> CSV Data
            </button>
            <button
              className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-medical-accent flex items-center gap-2 transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" /> JSON Metadata
            </button>
          </div>
        </>
      )}
    </div>
  );
}
