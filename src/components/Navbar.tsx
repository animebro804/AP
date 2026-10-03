import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Film, Palette, Mail } from 'lucide-react';
import { LogoCustomizerModal } from './LogoCustomizerModal';
import { brandInfo } from '../data/studioData';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sections = ['home', 'work', 'breakdown', 'services', 'pipeline', 'estimator', 'team', 'reviews', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'VFX Lab', href: '#breakdown', id: 'breakdown' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Pipeline', href: '#pipeline', id: 'pipeline' },
    { label: 'Estimator', href: '#estimator', id: 'estimator' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/80' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Area & Customizer Trigger */}
          <div className="flex items-center gap-2">
            <a 
              id="nav-logo-link"
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-1 -m-1"
            >
              <Logo size="md" showTagline={false} onOpenCustomizer={() => setIsLogoModalOpen(true)} />
            </a>

            <button
              type="button"
              onClick={() => setIsLogoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-amber-300/90 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/50 transition-all shadow-sm active:scale-95"
              title="Change studio logo style or upload custom logo"
            >
              <Palette className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Logo</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-xs xl:text-sm font-medium tracking-wider transition-all duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons: "Email Studio" & "View Our Work" */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${brandInfo.contactEmail}?subject=Video%20Production%20Inquiry%20-%20AP%20Visuals`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title={`Direct email to ${brandInfo.contactEmail}`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">anime.bro804@gmail.com</span>
              <span className="xl:hidden">Hire Us</span>
            </a>

            <a
              id="nav-cta-work-btn"
              href="#work"
              onClick={(e) => handleNavClick(e, 'work')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-200 shadow-md shadow-white/10 hover:shadow-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Film className="w-3.5 h-3.5" />
              <span>View Our Work</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              id="nav-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-drawer"
          className="md:hidden fixed inset-x-0 top-[60px] bg-[#08080a]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`flex items-center justify-between text-base font-medium tracking-wide py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={`mailto:${brandInfo.contactEmail}?subject=Video%20Production%20Inquiry%20-%20AP%20Visuals`}
                className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email: {brandInfo.contactEmail}</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Direct</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLogoModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span>Customize / Upload Logo</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">Edit</span>
              </button>

              <a
                id="mobile-nav-cta-work-btn"
                href="#work"
                onClick={(e) => handleNavClick(e, 'work')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg"
              >
                <Film className="w-4 h-4" />
                <span>View Our Work</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Studio Logo Customizer & Uploader Modal */}
      <LogoCustomizerModal 
        isOpen={isLogoModalOpen} 
        onClose={() => setIsLogoModalOpen(false)} 
      />
    </header>
  );
};
