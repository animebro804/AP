import React from 'react';
import { processSteps } from '../data/studioData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section 
      id="process" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Our Creative Process"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span>Workflow Pipeline</span>
        </div>
        <h2 
          id="process-heading"
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans"
        >
          Our Creative Process
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3 font-light">
          A disciplined synthesis of imaginative concept design, neural simulation, and cinematic post-mastering.
        </p>
      </div>

      {/* 4 Process Steps Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {processSteps.map((step, idx) => (
          <div
            key={step.step}
            id={`process-step-${step.step}`}
            className="group relative p-8 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/80"
          >
            <div>
              {/* Step Number Monogram */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-extrabold font-mono text-zinc-500 group-hover:text-white transition-colors">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  PHASE
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-xl font-bold font-sans text-white tracking-wider uppercase group-hover:text-zinc-100 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-zinc-300 mt-1">
                {step.summary}
              </p>

              {/* Description */}
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
                {step.description}
              </p>
            </div>

            {/* Checklist highlights */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-1.5">
              {step.detailPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <CheckCircle2 className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
