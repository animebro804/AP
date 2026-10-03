import React from 'react';
import { brandInfo } from '../data/studioData';
import { Sparkles, Clapperboard, Lightbulb, Compass, Award, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const featureCards = [
    {
      id: 'ai-creativity',
      title: 'AI Creativity',
      tagline: 'Turning ideas into unique visual concepts.',
      description: 'We don\'t use AI as a shortcut; we wield generative algorithms as high-dimensional artistic instruments, discovering visual paradigms previously impossible to film.',
      icon: <Sparkles className="w-5 h-5 text-white" />
    },
    {
      id: 'cinematic-production',
      title: 'Cinematic Production',
      tagline: 'Creating polished, cinematic visual experiences.',
      description: 'Every frame undergoes traditional Hollywood grading, color science calibration, anamorphic lens emulation, and meticulous audio foley mastering.',
      icon: <Clapperboard className="w-5 h-5 text-white" />
    },
    {
      id: 'creative-innovation',
      title: 'Creative Innovation',
      tagline: 'Experimenting with new AI-powered production techniques.',
      description: 'Pioneering custom neural workflows, Gaussian splatting, temporal character stabilization, and real-time diffusion rendering for avant-garde creators.',
      icon: <Lightbulb className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section 
      id="about" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="About AP Visuals"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading and Narrative Statement */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>Studio Philosophy</span>
          </div>

          <h2 
            id="about-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans leading-tight"
          >
            {brandInfo.aboutHeading}
          </h2>

          <p 
            id="about-text"
            className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light"
          >
            {brandInfo.aboutText}
          </p>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300">
              <Award className="w-4 h-4 text-white" />
              <span>The AP Standard</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We reject generic algorithmic output. Every piece produced by AP Visuals carries distinct human curation, cinematic intentionality, and bespoke sound architecture.
            </p>
          </div>
        </div>

        {/* Right Column: 3 Feature Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-6">
          {featureCards.map((card, index) => (
            <div
              key={card.id}
              id={`about-card-${card.id}`}
              className="group p-8 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/25 transition-all duration-300 hover:shadow-xl hover:shadow-black/70 flex flex-col sm:flex-row sm:items-start gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/30 transition-colors">
                {card.icon}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                    {card.title}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  {card.tagline}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-light pt-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
