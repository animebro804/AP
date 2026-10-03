import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  Palette,
  ShieldAlert,
  Image as ImageIcon 
} from 'lucide-react';
import { 
  LogoPresetId, 
  LOGO_PRESETS, 
  getSavedLogoPreset, 
  getSavedCustomLogo, 
  saveLogoPreset, 
  saveCustomLogo 
} from '../data/logoState';
import { LogoEmblem } from './LogoEmblem';

interface LogoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({ isOpen, onClose }) => {
  const [activePreset, setActivePreset] = useState<LogoPresetId>(getSavedLogoPreset());
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(getSavedCustomLogo());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectPreset = (presetId: LogoPresetId) => {
    setActivePreset(presetId);
    setCustomLogoUrl(null);
    saveLogoPreset(presetId);
    saveCustomLogo(null);
    showToast(`Logo style updated to "${LOGO_PRESETS.find(p => p.id === presetId)?.name}"!`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (PNG, SVG, JPG, or WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('File size exceeds 5MB. Please upload a smaller logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomLogoUrl(result);
        saveCustomLogo(result);
        showToast('Custom logo uploaded & applied across all sections!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleResetDefault = () => {
    setActivePreset('cinematic-gold');
    setCustomLogoUrl(null);
    saveLogoPreset('cinematic-gold');
    saveCustomLogo(null);
    showToast('Reset to default official AP Visuals gold emblem.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Studio Logo & Brand Manager</h2>
              <p className="text-xs text-zinc-400">Choose a professional studio aesthetic or upload your custom logo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Notification Toast */}
          {toastMessage && (
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Current Live Preview Banner */}
          <div className="p-4 rounded-xl bg-[#14151c] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-xl shadow-black/80 bg-black flex items-center justify-center p-1">
                <LogoEmblem preset={activePreset} customLogoUrl={customLogoUrl} className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {customLogoUrl ? 'Custom Uploaded Logo' : LOGO_PRESETS.find(p => p.id === activePreset)?.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold text-white tracking-widest font-sans">AP</span>
                  <span className="text-xs font-light text-zinc-300 tracking-widest font-sans">VISUALS</span>
                  <span className="text-[10px] text-zinc-500 font-mono">• Live Studio Preview</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleResetDefault}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
                title="Reset to default official logo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Section 1: Professional Studio Styles */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Choose Professional Studio Style</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOGO_PRESETS.map((preset) => {
                const isCurrent = !customLogoUrl && activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`relative text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 group ${
                      isCurrent 
                        ? 'bg-amber-500/10 border-amber-400/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-400/30' 
                        : 'bg-zinc-900/60 border-white/10 hover:border-white/20 hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/15 bg-black shadow-md p-0.5 group-hover:scale-105 transition-transform">
                      <LogoEmblem preset={preset.id} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate">{preset.name}</span>
                        {isCurrent && (
                          <div className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{preset.subtitle}</p>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Upload Your Custom Logo */}
          <div className="pt-2 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span>Or Upload Your Custom Logo (Apna Logo Lagayein)</span>
            </h3>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-amber-400 bg-amber-500/10' 
                  : 'border-white/15 hover:border-white/30 bg-zinc-900/40 hover:bg-zinc-900/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-zinc-300">
                <Upload className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-xs font-semibold text-white">
                Click to browse or drag & drop your logo image
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Supports PNG with transparency, SVG, WEBP, or high-res JPG (Max 5MB)
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Logo From Device</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            Changes apply instantly to Navbar, Hero, and Footer.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
