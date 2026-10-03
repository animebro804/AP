import React from 'react';
import { services } from '../data/studioData';
import { Video, Film, Sparkles, Wand2, Mic, Layers, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-6 h-6 text-white" />;
      case 'film':
        return <Film className="w-6 h-6 text-white" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-white" />;
      case 'wand':
        return <Wand2 className="w-6 h-6 text-white" />;
      case 'mic':
        return <Mic className="w-6 h-6 text-white" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-white" />;
      default:
        return <Film className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section 
      id="services" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Studio Services"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span>Production Capabilities</span>
        </div>
        <h2 
          id="services-heading"
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans"
        >
          What We Create
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3 font-light">
          State-of-the-art neural diffusion, high-end motion synthesis, and Hollywood-grade post-production.
        </p>
      </div>

      {/* 6 Elegant Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className="group relative p-8 rounded-2xl bg-[#0e0f15] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
          >
            <div>
              {/* Icon Container with subtle glass glow */}
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                {getServiceIcon(service.iconName)}
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-bold font-sans text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-light">
                {service.description}
              </p>
            </div>

            {/* Tag Badges */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-950 text-zinc-400 border border-white/[0.05]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
