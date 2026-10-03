import React from 'react';
import { stats } from '../data/studioData';

export const StatsStrip: React.FC = () => {
  return (
    <section 
      id="stats-strip" 
      className="py-12 border-y border-white/[0.08] bg-[#090a0e] relative overflow-hidden"
      aria-label="Studio Statistics"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <div 
              key={stat.id} 
              id={`stat-item-${stat.id}`}
              className="flex flex-col items-center sm:items-start text-center sm:text-left relative"
            >
              {/* Stat Value in bold cinematic display typography */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-white tracking-tight">
                {stat.value}
              </div>

              {/* Stat Label */}
              <div className="text-sm font-semibold tracking-wider text-zinc-200 uppercase mt-1">
                {stat.label}
              </div>

              {/* Detail snippet */}
              {stat.detail && (
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {stat.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
