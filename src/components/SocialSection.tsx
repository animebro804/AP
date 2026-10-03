import React from 'react';
import { socialLinks } from '../data/studioData';
import { Instagram, Youtube, Facebook, ArrowUpRight, Radio } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-white" />;
      case 'YouTube':
        return <Youtube className="w-5 h-5 text-white" />;
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-white" />;
      case 'TikTok':
        // Custom TikTok style glyph
        return (
          <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      default:
        return <ArrowUpRight className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section 
      id="socials" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-label="Social Media Channels"
    >
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#101118] to-[#0a0b10] border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Studio Transmissions</span>
            </div>
            <h2 
              id="social-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans"
            >
              Follow Our Visual Journey
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-lg font-light">
              Daily AI visual experiments, behind-the-scenes workflow breakdowns, and full 4K cinematic showreels.
            </p>
          </div>

          {/* Social Media Link Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full lg:w-auto">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                id={`social-link-${social.platform.toLowerCase()}`}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col p-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-white/30 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title={`Follow AP Visuals on ${social.platform} (Placeholder link)`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-black/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getSocialIcon(social.platform)}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>

                <span className="text-sm font-bold text-white font-sans tracking-wide">
                  {social.platform}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 mt-0.5 truncate">
                  {social.handle}
                </span>
                {social.followerHighlight && (
                  <span className="text-[10px] text-zinc-500 font-mono mt-2 pt-2 border-t border-white/5 truncate">
                    {social.followerHighlight}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
