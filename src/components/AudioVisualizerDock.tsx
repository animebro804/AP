import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowUp, Calculator, Sliders, MessageSquare } from 'lucide-react';

interface AudioVisualizerDockProps {
  onNavigate: (sectionId: string) => void;
}

export const AudioVisualizerDock: React.FC<AudioVisualizerDockProps> = ({ onNavigate }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Monitor scroll for back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API Cinematic Ambient Drone Engine
  const toggleAmbientAudio = async () => {
    if (isPlayingAudio) {
      // Fade out and stop
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.001, audioCtxRef.current.currentTime, 0.4);
        setTimeout(() => {
          oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          oscillatorsRef.current = [];
          setIsPlayingAudio(false);
        }, 500);
      } else {
        setIsPlayingAudio(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2); // Comfortable warm ambient level
      gainNodeRef.current = masterGain;

      // Lowpass filter to keep it deep, atmospheric, and cinematic (no harsh frequencies)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      // Deep root 55Hz (A1) cinematic sub drone
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Warm harmonic 110Hz (A2) with gentle detune for spatial stereo thickness
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.detune.setValueAtTime(8, ctx.currentTime);

      // Sub harmonic 82.5Hz (Fifth interval E2)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(82.5, ctx.currentTime);
      osc3.detune.setValueAtTime(-6, ctx.currentTime);

      osc1.connect(masterGain);
      osc2.connect(masterGain);
      osc3.connect(masterGain);

      osc1.start();
      osc2.start();
      osc3.start();

      oscillatorsRef.current = [osc1, osc2, osc3];
      setIsPlayingAudio(true);
    } catch (err) {
      console.warn('Audio autoplay prevented or unsupported:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Floating Glass Control Dock */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/90">
        
        {/* Ambient Cinema Audio Toggle */}
        <button
          onClick={toggleAmbientAudio}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
            isPlayingAudio
              ? 'bg-white text-black font-bold shadow-lg shadow-white/20'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title={isPlayingAudio ? 'Mute Ambient Cinema Sound' : 'Play Ambient Cinema Soundscape'}
          aria-label="Toggle cinematic ambient audio"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-black" />
              <span className="hidden sm:inline">Cinema Audio ON</span>
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-black animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                <span className="w-0.5 bg-black animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                <span className="w-0.5 bg-black animate-[pulse_0.8s_ease-in-out_infinite] h-1.5" />
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline text-zinc-300">Ambient Sound</span>
            </>
          )}
        </button>

        {/* Quick Shortcut: VFX Breakdown */}
        <button
          onClick={() => onNavigate('breakdown')}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Jump to VFX Breakdown Lab"
          aria-label="VFX Breakdown"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Quick Shortcut: Scope Estimator */}
        <button
          onClick={() => onNavigate('estimator')}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Project Scope Estimator"
          aria-label="Project Scope Estimator"
        >
          <Calculator className="w-4 h-4" />
        </button>

        {/* Quick Shortcut: Contact Studio */}
        <button
          onClick={() => onNavigate('contact')}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Initiate Project Inquiry"
          aria-label="Contact Studio"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ml-0.5"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
