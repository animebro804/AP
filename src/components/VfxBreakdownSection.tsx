import React, { useState, useRef, useEffect } from 'react';
import { vfxBreakdowns } from '../data/studioData';
import { Sliders, Sparkles, Layers, Cpu, Check, Eye, Maximize2, RefreshCw } from 'lucide-react';

export const VfxBreakdownSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = vfxBreakdowns[activeIdx];

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent | PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        handlePointerMove(e);
      }
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointermove', handleGlobalPointerMove);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointermove', handleGlobalPointerMove);
    };
  }, [isDragging]);

  return (
    <section 
      id="breakdown" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="VFX Breakdown and AI Transformation Lab"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-zinc-300 mb-3">
            <Sliders className="w-3.5 h-3.5 text-zinc-300" />
            <span>VFX Breakdown Lab</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            Before & After Transformation
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-2 max-w-2xl font-light">
            Drag the interactive slider below to inspect the gap between raw concept plates and final photorealistic neural synthesis.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900/80 border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
              viewMode === 'slider' 
                ? 'bg-white text-black font-semibold shadow-md' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Split Wipe Slider
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
              viewMode === 'side-by-side' 
                ? 'bg-white text-black font-semibold shadow-md' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {/* Breakdown Category Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
        {vfxBreakdowns.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveIdx(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans tracking-wide transition-all border ${
                isActive
                  ? 'bg-zinc-800 text-white border-white/30 shadow-lg shadow-black/60'
                  : 'bg-zinc-950/60 text-zinc-400 border-white/[0.06] hover:text-zinc-200 hover:border-white/15'
              }`}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{item.subtitle.split('->')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0e13] shadow-2xl">
        
        {viewMode === 'slider' ? (
          /* Split Wipe Slider Mode */
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="relative aspect-[16/9] w-full select-none cursor-ew-resize overflow-hidden touch-none"
          >
            {/* AFTER Image (Full background) */}
            <img
              src={activeItem.afterImage}
              alt={activeItem.afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {activeItem.afterLabel}
            </div>

            {/* BEFORE Image (Clipped by slider position) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={activeItem.beforeImage}
                alt={activeItem.beforeLabel}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%'
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                {activeItem.beforeLabel}
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border-2 border-white flex items-center justify-center text-white shadow-2xl">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Drag hint overlay at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-zinc-300 uppercase pointer-events-none">
              Drag or Click to Compare • {sliderPos}%
            </div>
          </div>
        ) : (
          /* Side-by-Side Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-black/40">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
              <img
                src={activeItem.beforeImage}
                alt={activeItem.beforeLabel}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                {activeItem.beforeLabel}
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
              <img
                src={activeItem.afterImage}
                alt={activeItem.afterLabel}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                {activeItem.afterLabel}
              </div>
            </div>
          </div>
        )}

        {/* Technical Metadata & Pipeline Specs Footer */}
        <div className="p-6 sm:p-8 bg-zinc-950/90 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Description & Tags */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                {activeItem.subtitle}
              </div>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                {activeItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-white/[0.08]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Technical Specs Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/50 border border-white/[0.08]">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Neural Engine</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{activeItem.specs.engine}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Master Resolution</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{activeItem.specs.resolution}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Temporal Lock</div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{activeItem.specs.framerate}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Lead Supervision</div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-0.5">{activeItem.specs.leadArtist}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
