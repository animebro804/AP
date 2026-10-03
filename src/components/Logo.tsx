import React, { useState, useEffect } from 'react';
import { LogoPresetId, getSavedLogoPreset, getSavedCustomLogo } from '../data/logoState';
import { LogoEmblem } from './LogoEmblem';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onlyIcon?: boolean;
  onOpenCustomizer?: () => void;
}

/**
 * AP VISUALS OFFICIAL BRAND LOGO
 * Renders the circular studio emblem:
 * - Reactive to preset selections ('cinematic-gold', 'cyber-prism', 'titanium-mono', 'solar-crimson')
 * - Supports custom user-uploaded logo
 * - Micro lens-flare highlights and luxury typography
 */
export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = false, 
  size = 'md',
  onlyIcon = false,
  onOpenCustomizer,
}) => {
  const [preset, setPreset] = useState<LogoPresetId>(getSavedLogoPreset());
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(getSavedCustomLogo());

  useEffect(() => {
    const handleLogoChanged = (e: Event) => {
      const customEv = e as CustomEvent<{ preset: LogoPresetId; custom: string | null }>;
      if (customEv.detail) {
        setPreset(customEv.detail.preset);
        setCustomLogoUrl(customEv.detail.custom);
      } else {
        setPreset(getSavedLogoPreset());
        setCustomLogoUrl(getSavedCustomLogo());
      }
    };

    window.addEventListener('ap-logo-changed', handleLogoChanged);
    return () => window.removeEventListener('ap-logo-changed', handleLogoChanged);
  }, []);

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base tracking-[0.25em]',
    lg: 'text-xl tracking-[0.3em]',
    xl: 'text-2xl tracking-[0.35em]'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Circle Studio Emblem */}
      <div 
        className={`relative ${iconSizes[size]} rounded-full overflow-hidden shrink-0 shadow-xl shadow-black/80 transition-all duration-300 group-hover:scale-105 border border-white/20 hover:border-amber-400/50 bg-[#09090d] flex items-center justify-center p-0.5 ${onOpenCustomizer ? 'cursor-pointer' : ''}`}
        aria-label="AP Visuals Studio Logo"
        onClick={(e) => {
          if (onOpenCustomizer) {
            e.preventDefault();
            e.stopPropagation();
            onOpenCustomizer();
          }
        }}
        title={onOpenCustomizer ? "Click to change or upload logo" : "AP Visuals Official Studio Logo"}
      >
        <LogoEmblem 
          preset={preset} 
          customLogoUrl={customLogoUrl} 
          className="w-full h-full object-contain" 
        />
        
        {/* Specular glass reflection sweep */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Brand Typographic Wordmark (unless onlyIcon requested) */}
      {!onlyIcon && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black font-sans text-white ${textSizes[size]}`}>
              AP
            </span>
            <span className={`font-light font-sans text-zinc-300 ${textSizes[size]}`}>
              VISUALS
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-1">
              AI • Animation • VFX • Creative Media
            </span>
          )}
        </div>
      )}
    </div>
  );
};
