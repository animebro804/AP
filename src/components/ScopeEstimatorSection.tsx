import React, { useState } from 'react';
import { Calculator, Clock, Users, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ScopeEstimatorProps {
  onApplySpecToContact: (specSummary: string, projectType: string) => void;
}

export const ScopeEstimatorSection: React.FC<ScopeEstimatorProps> = ({ onApplySpecToContact }) => {
  const [projectFormat, setProjectFormat] = useState('Cinematic Commercial');
  const [duration, setDuration] = useState('30s Hero Spot');
  const [aspectRatio, setAspectRatio] = useState('16:9 + 9:16 Bundle');
  const [velocity, setVelocity] = useState('Standard (10-14 Days)');
  
  const [addons, setAddons] = useState({
    scripting: true, // Led by Muhammad Sabtain
    animation: true, // Led by Muhammad AbuBakar
    asmrAudio: false,
    latent4K: true,
  });

  const formats = [
    { id: 'Cinematic Commercial', label: 'Cinematic Commercial', desc: 'High-impact brand narrative for hero campaigns' },
    { id: 'Miniature ASMR', label: 'Miniature ASMR Reel', desc: 'Tactile micro-scale visuals with sensory audio' },
    { id: 'Music Video VFX', label: 'Music Video AI Visuals', desc: 'Surreal visual transformations & rhythm syncing' },
    { id: 'Character Animation', label: '3D & AI Character Animation', desc: 'Expressive temporal consistency & camera moves' },
    { id: 'Concept Teaser', label: 'Concept World Teaser', desc: 'Imaginative universe reveal and sci-fi aesthetic' },
  ];

  const durations = ['15s Teaser', '30s Hero Spot', '60s Brand Film', '90s+ Extended Film'];
  
  const aspectRatios = [
    { id: '16:9 Widescreen', label: '16:9 Cinema Widescreen' },
    { id: '9:16 Social Vertical', label: '9:16 Social Reel / TikTok' },
    { id: '16:9 + 9:16 Bundle', label: 'Dual Format Master (16:9 & 9:16)' },
    { id: '2.39:1 Anamorphic', label: '2.39:1 Anamorphic Ultra-Wide' },
  ];

  const velocities = [
    { id: 'Standard (10-14 Days)', label: 'Standard Production', time: '10 – 14 Days' },
    { id: 'Priority (5-7 Days)', label: 'Priority Sprint', time: '5 – 7 Days' },
    { id: 'Express Rush (48-72h)', label: 'Express Studio Rush', time: '48 – 72 Hours' },
  ];

  // Calculate estimated timeline text
  const getTimeline = () => {
    const vel = velocities.find(v => v.id === velocity);
    return vel ? vel.time : '10 – 14 Days';
  };

  // Determine assigned leads
  const getTeamAllocation = () => {
    const leads = ['Website Owner (Creative Direction)'];
    if (addons.scripting) leads.push('Muhammad Sabtain (Scripting & Prompts)');
    if (addons.animation) leads.push('Muhammad AbuBakar (Animation & Motion)');
    if (addons.asmrAudio) leads.push('Spatial ASMR Sound Lead');
    return leads;
  };

  const handleApply = () => {
    const summary = `PROJECT SCOPE ESTIMATION:
• Format: ${projectFormat}
• Duration: ${duration}
• Aspect Ratio: ${aspectRatio}
• Turnaround Target: ${velocity}
• Included Pipelines:
  - Custom Scripting by Muhammad Sabtain: ${addons.scripting ? 'YES' : 'NO'}
  - Dynamic Motion Animation by Muhammad AbuBakar: ${addons.animation ? 'YES' : 'NO'}
  - Tactile ASMR / Binaural Foley: ${addons.asmrAudio ? 'YES' : 'NO'}
  - 4K Latent Upscale & ACES Grade: ${addons.latent4K ? 'YES' : 'NO'}`;

    onApplySpecToContact(summary, projectFormat);
  };

  return (
    <section 
      id="estimator" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Production Scope & Project Estimator"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-zinc-300 mb-3">
          <Calculator className="w-3.5 h-3.5 text-zinc-300" />
          <span>Studio Scope Calculator</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
          Configure Your Production
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3 font-light">
          Select your deliverables and creative pipelines to estimate turnaround timelines and team allocation for your visual project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Selectors */}
        <div className="lg:col-span-8 space-y-8 bg-[#0d0e13] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* 1. Format Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-3">
              1. Project Category / Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {formats.map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setProjectFormat(fmt.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    projectFormat === fmt.id
                      ? 'bg-zinc-800 border-white text-white shadow-lg'
                      : 'bg-black/30 border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-sm font-semibold text-white">{fmt.label}</div>
                  <div className="text-xs text-zinc-400 mt-1 line-clamp-1">{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Duration & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Duration */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-3">
                2. Video Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {durations.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono tracking-wide border transition-all text-center ${
                      duration === dur
                        ? 'bg-white text-black font-semibold border-white'
                        : 'bg-black/30 border-white/[0.08] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-3">
                3. Aspect Ratio Master
              </label>
              <div className="space-y-1.5">
                {aspectRatios.map((asp) => (
                  <button
                    key={asp.id}
                    type="button"
                    onClick={() => setAspectRatio(asp.id)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-sans text-left border transition-all flex items-center justify-between ${
                      aspectRatio === asp.id
                        ? 'bg-zinc-800 text-white border-white/40 font-medium'
                        : 'bg-black/30 border-white/[0.06] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span>{asp.label}</span>
                    {aspectRatio === asp.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 4. Creative Pipelines & Addons */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-3">
              4. Creative Modules & Team Pipelines
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer hover:border-white/20 transition-all">
                <input
                  type="checkbox"
                  checked={addons.scripting}
                  onChange={(e) => setAddons({ ...addons, scripting: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    Narrative Scripting & Concept Architecture
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Led by <span className="text-zinc-200 font-medium">Muhammad Sabtain</span> (Creative Scripting)
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer hover:border-white/20 transition-all">
                <input
                  type="checkbox"
                  checked={addons.animation}
                  onChange={(e) => setAddons({ ...addons, animation: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    High-Motion AI & 3D Animation
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Led by <span className="text-zinc-200 font-medium">Muhammad AbuBakar</span> (Keyframe & Dynamic Motion)
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer hover:border-white/20 transition-all">
                <input
                  type="checkbox"
                  checked={addons.asmrAudio}
                  onChange={(e) => setAddons({ ...addons, asmrAudio: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    Spatial ASMR & Tactile Binaural Foley
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Custom micro-foley and spatial psychoacoustic soundscape
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.08] cursor-pointer hover:border-white/20 transition-all">
                <input
                  type="checkbox"
                  checked={addons.latent4K}
                  onChange={(e) => setAddons({ ...addons, latent4K: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    4K Latent Upscale & ACES Color Grade
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    DCI-P3 theatrical color grade and neural artifact clean-up
                  </div>
                </div>
              </label>

            </div>
          </div>

          {/* 5. Velocity Target */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-3">
              5. Production Speed / Turnaround
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {velocities.map((vel) => (
                <button
                  key={vel.id}
                  type="button"
                  onClick={() => setVelocity(vel.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    velocity === vel.id
                      ? 'bg-zinc-800 text-white border-white shadow-md'
                      : 'bg-black/30 border-white/[0.08] text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold font-sans text-white">{vel.label}</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">{vel.time}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Production Summary Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#121318] to-[#0a0a0d] border border-white/15 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">Spec Summary</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Live Estimate
              </span>
            </div>

            {/* Turnaround Estimate */}
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-300" />
                <span>Estimated Delivery</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-1">
                {getTimeline()}
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Based on current studio capacity & pipeline complexity
              </div>
            </div>

            {/* Assigned Creative Leads */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-zinc-300" />
                <span>Creative Team Allocation</span>
              </div>
              <div className="space-y-1.5">
                {getTeamAllocation().map((person, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <span>{person}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Spec Overview */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1.5 text-xs text-zinc-300 font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-400">Format:</span>
                <span className="text-white font-medium">{projectFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Length:</span>
                <span className="text-white font-medium">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Aspect:</span>
                <span className="text-white font-medium">{aspectRatio.split(' ')[0]}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleApply}
              className="w-full py-4 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-white/10 group cursor-pointer"
            >
              <span>Transfer Spec to Inquiry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center flex items-center justify-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full confidentiality & bespoke creative consultation</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
