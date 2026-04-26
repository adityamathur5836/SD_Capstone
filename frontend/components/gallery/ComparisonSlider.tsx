"use client";

import { useState, useRef, useEffect } from 'react';

interface ComparisonSliderProps {
  realImageUrl?: string;
  syntheticImageUrl?: string;
  className?: string;
}

export default function ComparisonSlider({ realImageUrl, syntheticImageUrl, className = "" }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const pointerX = x - rect.left;
    const pos = (pointerX / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, pos)));
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-slate-900 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchMove={(e) => handleMove(e as any)}
    >
      {/* Synthetic Image (Background) */}
      <div className="absolute inset-0 flex items-center justify-center">
         {syntheticImageUrl ? (
            <img
               src={syntheticImageUrl}
               alt="Synthetic Variant"
               className="w-full h-full object-cover"
            />
         ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center">
               <div className="text-white/20 font-black text-4xl uppercase tracking-[1em] rotate-12">SYNTHETIC</div>
            </div>
         )}
      </div>

      {/* Real Image (Foreground clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center border-r-2 border-white pointer-events-none"
        style={{ width: `${position}%`, overflow: 'hidden' }}
      >
        <div className="absolute top-0 left-0 h-full flex items-center justify-center" style={{ width: containerRef.current?.offsetWidth || '100vw' }}>
           {realImageUrl ? (
              <img
                src={realImageUrl}
                alt="Real Baseline"
                className="h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth }}
              />
           ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-teal-950 flex items-center justify-center">
                 <div className="text-white/20 font-black text-4xl uppercase tracking-[1em] rotate-12">ORIGINAL</div>
              </div>
           )}
        </div>
      </div>

      {/* Control Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl shadow-black/50 z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center group">
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-slate-200 rounded-full" />
             <div className="w-1 h-3 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
        Baseline (Real)
      </div>
      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
        Synthetic Variant
      </div>
    </div>
  );
}
