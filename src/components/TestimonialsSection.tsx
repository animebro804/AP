import React from 'react';
import { testimonials } from '../data/studioData';
import { Star, Quote, CheckCircle2, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section 
      id="reviews" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Client Reviews and Industry Trust"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-zinc-300 mb-3">
          <Award className="w-3.5 h-3.5 text-zinc-300" />
          <span>Industry Trust</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
          Trusted By Creators & Global Brands
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3 font-light">
          Here is what agency directors, producers, and creative founders say about collaborating with AP Visuals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="p-8 rounded-2xl bg-[#0d0e13] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl group"
          >
            <div>
              {/* Top Row: Stars and Project Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase bg-white/5 text-zinc-400 border border-white/10">
                  {test.projectType}
                </span>
              </div>

              {/* Quote */}
              <p className="text-zinc-200 text-base sm:text-lg leading-relaxed font-light italic">
                “{test.quote}”
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-sans">
                  {test.author}
                </h4>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {test.role} • <span className="text-zinc-300 font-medium">{test.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Partner</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
