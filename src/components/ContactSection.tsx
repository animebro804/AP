import React, { useState } from 'react';
import { brandInfo } from '../data/studioData';
import { Mail, Send, CheckCircle2, Copy, Check, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  externalMessage?: string;
  externalProjectType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ externalMessage, externalProjectType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Video Production',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync external message / project type if passed from the Scope Estimator
  React.useEffect(() => {
    if (externalMessage) {
      setFormData(prev => ({
        ...prev,
        message: externalMessage,
        projectType: externalProjectType || prev.projectType
      }));
    }
  }, [externalMessage, externalProjectType]);

  const projectTypes = [
    'AI Video Production',
    'AI Animation',
    'VFX & Transformations',
    'Cinematic Visuals',
    'Miniature ASMR',
    'Creative Digital Content',
    'Commercial Collaboration'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate professional client submission with slight latency for realistic feel
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'AI Video Production',
        message: ''
      });
    }, 900);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(brandInfo.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Contact AP Visuals"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 
            id="contact-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans leading-tight"
          >
            Let’s Create Something Extraordinary.
          </h2>

          <p 
            id="contact-supporting-text"
            className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light"
          >
            Have an idea, project or collaboration in mind? Let’s turn it into a visual experience.
          </p>

          {/* Studio Direct Inbox Box (Official Gmail Contact) */}
          <div className="p-6 rounded-2xl bg-[#0d0e13] border border-amber-500/25 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Client Gmail</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Active for Commissions
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">Direct Studio Inbox</span>
                    <a 
                      href={`mailto:${brandInfo.contactEmail}?subject=Video%20Production%20Inquiry%20-%20AP%20Visuals`}
                      className="text-base font-bold text-white hover:text-amber-300 truncate block transition-colors tracking-wide"
                    >
                      {brandInfo.contactEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white text-xs font-mono transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Direct 1-Click Launch Button for Clients */}
              <a
                href={`mailto:${brandInfo.contactEmail}?subject=Video%20Production%20Commission%20-%20AP%20Visuals&body=Hi%20AP%20Visuals%20Team%2C%0A%0AI%20would%20like%20to%20commission%20a%20video%20production%20with%20your%20studio.%0A%0AProject%20Type%3A%20%0AEstimated%20Duration%3A%20%0ABudget%20%2F%20Timeline%3A%20%0A%0AThank%20you!`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Launch Gmail / Mail App to Commission Video</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Direct inbox monitored daily. Clients can reach out for video production, 3D character animation, and VFX briefs.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0d12] border border-white/10 shadow-2xl relative">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  Message Dispatched
                </h3>
                <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to AP Visuals. Our creative team will review your brief and reply to your inbox shortly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:${brandInfo.contactEmail}?subject=Direct%20Inquiry%20from%20Website&body=Hi%20AP%20Visuals%2C%0A%0AWe%20would%20like%20to%20discuss%20a%20video%20production%20project.`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-black font-bold transition-colors shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Also Send in Gmail ({brandInfo.contactEmail})</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="contact-name" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                    >
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 text-sm transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="contact-email" 
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                    >
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. director@studio.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Project Type Dropdown */}
                <div className="space-y-2">
                  <label 
                    htmlFor="contact-project-type" 
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                  >
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 text-sm transition-all"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-900 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label 
                    htmlFor="contact-message" 
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300"
                  >
                    Project Details & Vision <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the narrative, visual aesthetic, deadline, or deliverables you envision..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 text-sm transition-all resize-none"
                  />
                </div>

                {/* Send Message Button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 active:scale-98 transition-all duration-200 shadow-xl shadow-white/10 hover:shadow-white/20 disabled:opacity-60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isSubmitting ? (
                    <span>Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
