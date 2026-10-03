import React from 'react';
import { LogoPresetId } from '../data/logoState';

interface LogoEmblemProps {
  preset?: LogoPresetId;
  customLogoUrl?: string | null;
  className?: string;
}

export const LogoEmblem: React.FC<LogoEmblemProps> = ({
  preset = 'cinematic-gold',
  customLogoUrl = null,
  className = 'w-full h-full'
}) => {
  // If user uploaded a custom logo, display it
  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Custom Studio Logo"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // 1. Cyber Neon Prism
  if (preset === 'cyber-prism') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={className}>
        <defs>
          <radialGradient id="cyberBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#16122e"/>
            <stop offset="65%" stopColor="#090714"/>
            <stop offset="100%" stopColor="#040308"/>
          </radialGradient>
          <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7df9ff"/>
            <stop offset="50%" stopColor="#00d2ff"/>
            <stop offset="100%" stopColor="#0077ff"/>
          </linearGradient>
          <linearGradient id="cyberViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4df0"/>
            <stop offset="50%" stopColor="#b5179e"/>
            <stop offset="100%" stopColor="#480ca8"/>
          </linearGradient>
          <linearGradient id="cyberNeonRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4"/>
            <stop offset="50%" stopColor="#7209b7"/>
            <stop offset="100%" stopColor="#f72585"/>
          </linearGradient>
          <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="250" cy="250" r="240" fill="url(#cyberBg)"/>
        <circle cx="250" cy="250" r="238" fill="none" stroke="url(#cyberNeonRim)" strokeWidth="2.5"/>
        <circle cx="250" cy="250" r="230" fill="none" stroke="#00f5d4" strokeWidth="1" strokeOpacity="0.2"/>
        
        {/* Hexagonal Isometric Grid */}
        <polygon points="250,56 418,153 418,347 250,444 82,347 82,153" 
                 fill="none" stroke="#7209b7" strokeWidth="1.8" strokeOpacity="0.4" strokeDasharray="6 6"/>
        
        {/* Monogram AP in Cyber Wave */}
        <g filter="url(#cyberGlow)">
          <path d="M 120,380 L 165,380 L 250,140 L 215,140 Z" fill="url(#cyberCyan)"/>
          <path d="M 215,140 L 250,140 L 285,230 L 255,230 Z" fill="url(#cyberViolet)"/>
          <path d="M 168,268 L 295,268 L 282,298 L 155,298 Z" fill="url(#cyberCyan)"/>
          
          <path d="M 250,140 L 285,140 L 285,380 L 250,380 Z" fill="#2b1b54"/>
          <path d="M 285,140 C 355,140 385,175 385,225 C 385,275 350,305 285,305 L 285,268 C 328,268 348,252 348,225 C 348,195 328,177 285,177 Z" 
                fill="url(#cyberViolet)"/>
          
          {/* Cyber flare */}
          <circle cx="250" cy="140" r="5" fill="#ffffff"/>
          <ellipse cx="250" cy="140" rx="30" ry="2" fill="#00ffff"/>
        </g>
      </svg>
    );
  }

  // 2. Titanium Chiseled Monogram
  if (preset === 'titanium-mono') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={className}>
        <defs>
          <radialGradient id="monoBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#18181b"/>
            <stop offset="65%" stopColor="#09090b"/>
            <stop offset="100%" stopColor="#020203"/>
          </radialGradient>
          <linearGradient id="tiLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="40%" stopColor="#cbd5e1"/>
            <stop offset="80%" stopColor="#94a3b8"/>
            <stop offset="100%" stopColor="#475569"/>
          </linearGradient>
          <linearGradient id="tiDark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b"/>
            <stop offset="60%" stopColor="#334155"/>
            <stop offset="100%" stopColor="#64748b"/>
          </linearGradient>
          <linearGradient id="monoRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc"/>
            <stop offset="50%" stopColor="#475569"/>
            <stop offset="100%" stopColor="#cbd5e1"/>
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="240" fill="url(#monoBg)"/>
        <circle cx="250" cy="250" r="238" fill="none" stroke="url(#monoRim)" strokeWidth="2.5"/>
        <circle cx="250" cy="250" r="230" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.1"/>
        
        {/* Precision aperture ticks */}
        <g stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3">
          <line x1="250" y1="14" x2="250" y2="24"/>
          <line x1="250" y1="476" x2="250" y2="486"/>
          <line x1="14" y1="250" x2="24" y2="250"/>
          <line x1="476" y1="250" x2="486" y2="250"/>
        </g>
        
        <polygon points="250,56 418,153 418,347 250,444 82,347 82,153" 
                 fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.25"/>
        
        {/* Monogram AP in Pure Titanium */}
        <g>
          <path d="M 120,380 L 165,380 L 250,140 L 215,140 Z" fill="url(#tiLight)"/>
          <path d="M 120,380 L 138,380 L 222,140 L 215,140 Z" fill="#ffffff" opacity="0.6"/>
          <path d="M 215,140 L 250,140 L 285,230 L 255,230 Z" fill="url(#tiDark)"/>
          <path d="M 168,268 L 295,268 L 282,298 L 155,298 Z" fill="url(#tiLight)"/>
          
          <path d="M 250,140 L 285,140 L 285,380 L 250,380 Z" fill="url(#tiDark)"/>
          <path d="M 285,140 C 355,140 385,175 385,225 C 385,275 350,305 285,305 L 285,268 C 328,268 348,252 348,225 C 348,195 328,177 285,177 Z" 
                fill="url(#tiLight)"/>
          
          <circle cx="250" cy="140" r="4" fill="#ffffff"/>
        </g>
      </svg>
    );
  }

  // 3. Solar Flare Crimson
  if (preset === 'solar-crimson') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={className}>
        <defs>
          <radialGradient id="solarBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2a0f12"/>
            <stop offset="65%" stopColor="#120507"/>
            <stop offset="100%" stopColor="#050102"/>
          </radialGradient>
          <linearGradient id="solarRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7b54"/>
            <stop offset="40%" stopColor="#ff2e63"/>
            <stop offset="80%" stopColor="#990033"/>
            <stop offset="100%" stopColor="#55001a"/>
          </linearGradient>
          <linearGradient id="solarGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2e63"/>
            <stop offset="60%" stopColor="#ff9900"/>
            <stop offset="100%" stopColor="#ffe600"/>
          </linearGradient>
          <linearGradient id="solarRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7b54"/>
            <stop offset="50%" stopColor="#ff2e63"/>
            <stop offset="100%" stopColor="#ffb703"/>
          </linearGradient>
        </defs>
        <circle cx="250" cy="250" r="240" fill="url(#solarBg)"/>
        <circle cx="250" cy="250" r="238" fill="none" stroke="url(#solarRim)" strokeWidth="2.5"/>
        <circle cx="250" cy="250" r="230" fill="none" stroke="#ff2e63" strokeWidth="1" strokeOpacity="0.2"/>
        
        <polygon points="250,56 418,153 418,347 250,444 82,347 82,153" 
                 fill="none" stroke="#ff2e63" strokeWidth="1.8" strokeOpacity="0.3" strokeDasharray="6 6"/>
        
        {/* Monogram AP in Solar Crimson & Amber */}
        <g>
          <path d="M 120,380 L 165,380 L 250,140 L 215,140 Z" fill="url(#solarGold)"/>
          <path d="M 215,140 L 250,140 L 285,230 L 255,230 Z" fill="url(#solarRed)"/>
          <path d="M 168,268 L 295,268 L 282,298 L 155,298 Z" fill="url(#solarGold)"/>
          
          <path d="M 250,140 L 285,140 L 285,380 L 250,380 Z" fill="#3a0c14"/>
          <path d="M 285,140 C 355,140 385,175 385,225 C 385,275 350,305 285,305 L 285,268 C 328,268 348,252 348,225 C 348,195 328,177 285,177 Z" 
                fill="url(#solarRed)"/>
          
          <circle cx="250" cy="140" r="5" fill="#ffffff"/>
          <ellipse cx="250" cy="140" rx="26" ry="1.5" fill="#ffe600"/>
        </g>
      </svg>
    );
  }

  // Default: Cinematic Gold & Obsidian (Flagship Studio Emblem)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={className}>
      <defs>
        <radialGradient id="goldBgCore" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1c1d24"/>
          <stop offset="65%" stopColor="#0c0d10"/>
          <stop offset="100%" stopColor="#050507"/>
        </radialGradient>
        <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd572" stopOpacity="0.9"/>
          <stop offset="25%" stopColor="#9d7e3a" stopOpacity="0.4"/>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
          <stop offset="75%" stopColor="#6e5726" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#f5c253" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id="goldBrightFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff4cf"/>
          <stop offset="35%" stopColor="#ffcc52"/>
          <stop offset="70%" stopColor="#df9f28"/>
          <stop offset="100%" stopColor="#9e680e"/>
        </linearGradient>
        <linearGradient id="goldDeepFace" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5a3806"/>
          <stop offset="50%" stopColor="#a47118"/>
          <stop offset="100%" stopColor="#e0a734"/>
        </linearGradient>
        <linearGradient id="tiDarkFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#464955"/>
          <stop offset="45%" stopColor="#2a2c35"/>
          <stop offset="100%" stopColor="#14151b"/>
        </linearGradient>
        <linearGradient id="tiLightFacet" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2c35"/>
          <stop offset="60%" stopColor="#5a5e6f"/>
          <stop offset="100%" stopColor="#8b90a6"/>
        </linearGradient>
        <radialGradient id="goldAmbientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb726" stopOpacity="0.35"/>
          <stop offset="40%" stopColor="#ff8c00" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#ff6a00" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Outer Disc */}
      <circle cx="250" cy="250" r="240" fill="url(#goldBgCore)"/>
      <circle cx="250" cy="250" r="239" fill="none" stroke="url(#goldRimGrad)" strokeWidth="2.5"/>
      <circle cx="250" cy="250" r="230" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.07"/>
      <circle cx="250" cy="250" r="226" fill="none" stroke="#000000" strokeWidth="2" strokeOpacity="0.6"/>

      {/* Aperture marks */}
      <g stroke="#ffd572" strokeWidth="1.5" strokeOpacity="0.3">
        <line x1="250" y1="14" x2="250" y2="24"/>
        <line x1="250" y1="476" x2="250" y2="486"/>
        <line x1="14" y1="250" x2="24" y2="250"/>
        <line x1="476" y1="250" x2="486" y2="250"/>
      </g>

      <circle cx="250" cy="245" r="160" fill="url(#goldAmbientGlow)"/>

      {/* Hexagonal Shutter Frame */}
      <polygon points="250,56 418,153 418,347 250,444 82,347 82,153" 
               fill="none" stroke="url(#goldRimGrad)" strokeWidth="1.8" strokeOpacity="0.3" strokeDasharray="8 6"/>

      {/* Interlocking 3D "AP" */}
      <g>
        <path d="M 120,380 L 175,380 L 230,240 L 205,240 Z" fill="url(#tiDarkFacet)"/>
        <path d="M 120,380 L 165,380 L 250,140 L 215,140 Z" fill="url(#goldBrightFace)"/>
        <path d="M 120,380 L 138,380 L 222,140 L 215,140 Z" fill="#fff7d6" opacity="0.6"/>
        <path d="M 215,140 L 250,140 L 285,230 L 255,230 Z" fill="url(#goldDeepFace)"/>
        <path d="M 168,268 L 295,268 L 282,298 L 155,298 Z" fill="url(#goldBrightFace)"/>
        <path d="M 168,268 L 295,268 L 290,274 L 163,274 Z" fill="#fff9e6" opacity="0.7"/>

        <path d="M 250,140 L 285,140 L 285,380 L 250,380 Z" fill="url(#tiLightFacet)"/>
        <path d="M 280,140 L 285,140 L 285,380 L 280,380 Z" fill="#ffffff" opacity="0.4"/>
        <path d="M 285,140 C 355,140 385,175 385,225 C 385,275 350,305 285,305 L 285,268 C 328,268 348,252 348,225 C 348,195 328,177 285,177 Z" 
              fill="url(#goldBrightFace)"/>
        <path d="M 285,140 C 355,140 385,175 385,225 C 385,235 380,240 376,232 C 372,185 345,150 285,147 Z" 
              fill="#ffffff" opacity="0.6"/>
        <path d="M 285,305 C 330,305 365,285 378,250 C 368,280 335,296 285,296 Z" fill="#4d3208"/>

        <circle cx="250" cy="140" r="5" fill="#ffffff"/>
        <ellipse cx="250" cy="140" rx="26" ry="1.5" fill="#fff5d1" opacity="0.9"/>
        <ellipse cx="250" cy="140" rx="1.5" ry="26" fill="#fff5d1" opacity="0.9"/>
      </g>
    </svg>
  );
};
