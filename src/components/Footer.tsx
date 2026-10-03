import React, { useState } from 'react';
import { Logo } from './Logo';
import { brandInfo, socialLinks } from '../data/studioData';
import { ArrowUp, Instagram, Youtube, Facebook, Palette, Mail } from 'lucide-react';
import { LogoCustomizerModal } from './LogoCustomizerModal';

export const Footer: React.FC = () => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Team', href: '#team' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer 
      id="main-footer"
      className="border-t border-white/[0.08] bg-[#060608] text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Studio Footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-12 border-b border-white/[0.06]">
          {/* Logo & Tagline */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-3">
              <Logo 
                size="lg" 
                showTagline={false} 
                onOpenCustomizer={() => setIsLogoModalOpen(true)} 
              />
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-400 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 transition-colors"
                title="Change or upload studio logo"
              >
                <Palette className="w-2.5 h-2.5 text-amber-400" />
                <span>Customize</span>
              </button>
            </div>
            <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              {brandInfo.tagline}
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Transforming concepts into high-resolution cinematic AI videos, synthetic animation, and impossible VFX.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors self-start lg:self-auto p-2 rounded-lg bg-zinc-900 border border-white/10"
            title="Return to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Copyright & Social Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {brandInfo.copyrightYear} {brandInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <a 
              href={`mailto:${brandInfo.contactEmail}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              title="Direct Email Studio"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{brandInfo.contactEmail}</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-200 transition-colors uppercase text-[11px]"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Logo Customizer Modal */}
      <LogoCustomizerModal 
        isOpen={isLogoModalOpen} 
        onClose={() => setIsLogoModalOpen(false)} 
      />
    </footer>
  );
};
