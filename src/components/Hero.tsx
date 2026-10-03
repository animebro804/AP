import React, { useState, useEffect, useRef } from 'react';
import { brandInfo } from '../data/studioData';
import { Play, Sparkles, ArrowDown, ChevronRight, Volume2, VolumeX, Eye, Palette } from 'lucide-react';
import { Logo } from './Logo';
import { LogoCustomizerModal } from './LogoCustomizerModal';

interface HeroProps {
  onExploreWork: () => void;
  onMeetTeam: () => void;
  onWatchReel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onMeetTeam, onWatchReel }) => {
  const [isPlayingAmbientAudio, setIsPlayingAmbientAudio] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Subtle ambient audio synthesizer for cinema atmosphere (starts muted, user can toggle)
  const toggleAmbientAudio = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;

        // Create warm low frequency cinema drone (55Hz and harmonic 110Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);

        osc1.start();
        osc2.start();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (isPlayingAmbientAudio) {
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5);
        }
        setIsPlayingAmbientAudio(false);
      } else {
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.04, audioContextRef.current.currentTime + 0.5);
        }
        setIsPlayingAmbientAudio(true);
      }
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08080a] pt-20 pb-16"
      aria-label="Hero Introduction"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient Hero Video Loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter contrast-125 saturate-120"
          src="/videos/showreel.mp4"
        />

        {/* Deep cinematic gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#08080a]/85 to-[#08080a]" />

        {/* Ambient volumetric light circles */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] rounded-full bg-gradient-to-b from-zinc-700/20 via-zinc-900/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-blue-950/10 blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-zinc-800/15 blur-[100px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 cinema-grid opacity-30" />

        {/* Subtle motion grain / vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08080a_85%)]" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Studio Emblem & Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8">
          <div 
            onClick={() => setIsLogoModalOpen(true)}
            className="cursor-pointer group relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
            title="Click to customize or upload studio logo"
          >
            <Logo 
              onlyIcon 
              size="lg" 
              onOpenCustomizer={() => setIsLogoModalOpen(true)} 
            />
            {/* Hover hint badge */}
            <span className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-full bg-black/90 border border-amber-400/40 text-[9px] font-mono text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1 shadow-lg">
              <Palette className="w-2.5 h-2.5" />
              <span>Edit</span>
            </span>
          </div>

          <div 
            id="hero-studio-badge"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/15 text-zinc-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-lg shadow-black/40 hover:border-white/30 transition-all cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{brandInfo.badge}</span>
          </div>
        </div>

        {/* Cinematic Big Headline */}
        <h1 
          id="hero-headline"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] uppercase font-sans mb-6 max-w-4xl"
        >
          We Create Visuals <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 text-glow">
            Beyond Imagination.
          </span>
        </h1>

        {/* Supporting Text */}
        <p 
          id="hero-supporting-text"
          className="text-base sm:text-lg md:text-xl text-zinc-300/90 font-light max-w-2xl mx-auto leading-relaxed mb-10 text-balance"
        >
          {brandInfo.heroSupportingText}
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          {/* Explore Our Work */}
          <button
            id="hero-cta-explore-work"
            type="button"
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 active:scale-98 transition-all duration-200 shadow-xl shadow-white/10 hover:shadow-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Explore Our Work</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Meet Our Team */}
          <button
            id="hero-cta-meet-team"
            type="button"
            onClick={onMeetTeam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 hover:text-white border border-white/15 hover:border-white/30 active:scale-98 transition-all duration-200 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span>Meet Our Team</span>
          </button>

          {/* Quick Reel Preview Trigger */}
          <button
            id="hero-cta-watch-reel"
            type="button"
            onClick={onWatchReel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group focus:outline-none"
            title="Watch Featured Studio Reel"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all">
              <Play className="w-3 h-3 text-white fill-white ml-0.5" />
            </div>
            <span>Play Showreel</span>
          </button>
        </div>

        {/* Film Production Specs Bar */}
        <div className="w-full max-w-3xl pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-bold">2.39:1</span>
            <span>Cinematic CinemaScope</span>
          </div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-bold">4K HDR</span>
            <span>High Bitrate Neural AI</span>
          </div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-bold">32-Bit</span>
            <span>Spatial Binaural Foley</span>
          </div>

          {/* Ambient Cinema Audio Toggle */}
          <button
            id="hero-audio-toggle"
            type="button"
            onClick={toggleAmbientAudio}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all text-[11px] ${
              isPlayingAmbientAudio 
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30' 
                : 'border-white/10 text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
            title="Toggle subtle ambient audio drone"
          >
            {isPlayingAmbientAudio ? (
              <>
                <Volume2 className="w-3 h-3 animate-pulse" />
                <span>Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span>Atmosphere</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Downward indicator to invite scrolling */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>

      {/* Logo Customizer Modal */}
      <LogoCustomizerModal 
        isOpen={isLogoModalOpen} 
        onClose={() => setIsLogoModalOpen(false)} 
      />
    </section>
  );
};
