import React, { useState } from 'react';
import { techPipelineTools } from '../data/studioData';
import { Cpu, Film, Sparkles, Workflow, Volume2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const TechPipelineSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Generative AI', '3D & VFX', 'Post-Production', 'Audio & Foley'];

  const filteredTools = selectedCategory === 'ALL'
    ? techPipelineTools
    : techPipelineTools.filter(t => t.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Generative AI':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case '3D & VFX':
        return <Cpu className="w-4 h-4 text-blue-400" />;
      case 'Post-Production':
        return <Film className="w-4 h-4 text-amber-400" />;
      case 'Audio & Foley':
        return <Volume2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Workflow className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section 
      id="pipeline" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20 border-t border-white/[0.06]"
      aria-label="Studio Production Pipeline and Technology"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-zinc-300 mb-3">
            <Workflow className="w-3.5 h-3.5 text-zinc-300" />
            <span>Proprietary Toolchain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            Our Production Pipeline
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-2 max-w-2xl font-light">
            We don’t rely on generic prompt generators. We operate an advanced multi-pass workflow linking diffusion neural engines, virtual camera choreographies, and cinema-grade color science.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-white/10 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tools & Pipelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[#0d0e13] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/70 group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                    {getCategoryIcon(tool.category)}
                  </div>
                  <span className="text-[11px] font-mono uppercase text-zinc-400">
                    {tool.category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/5 text-zinc-300 border border-white/10">
                  {tool.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-sans group-hover:text-zinc-200 transition-colors">
                {tool.name}
              </h3>
              
              <p className="text-zinc-300 text-xs sm:text-sm mt-2.5 leading-relaxed font-light">
                {tool.description}
              </p>
            </div>

            {/* Feature checklist */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-1.5">
              {tool.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Reliability Strip */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#0d0e13] to-zinc-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white uppercase tracking-wide">
              Zero-Artifact Guarantee & Temporal Coherence
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Every frame passes manual cleanup, optical motion stabilization, and frame-rate smoothing before client review.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-emerald-400 font-bold">100% STUDIO RENDER NODES</div>
            <div className="text-[11px] text-zinc-400">Locally accelerated GPU clusters</div>
          </div>
        </div>
      </div>
    </section>
  );
};
