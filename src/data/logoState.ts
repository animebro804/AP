// Studio Brand & Logo State Management

export type LogoPresetId = 'cinematic-gold' | 'cyber-prism' | 'titanium-mono' | 'solar-crimson';

export interface LogoPreset {
  id: LogoPresetId;
  name: string;
  subtitle: string;
  badgeColor: string;
  description: string;
}

export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: 'cinematic-gold',
    name: 'Cinematic Gold & Obsidian',
    subtitle: 'Official AAA Studio Emblem',
    badgeColor: 'from-amber-400 to-yellow-600',
    description: 'Polished champagne gold and brushed titanium facets with lens aperture markings and optical starburst.'
  },
  {
    id: 'cyber-prism',
    name: 'Cyber Neon Prism',
    subtitle: 'Sci-Fi & Anime Visuals',
    badgeColor: 'from-cyan-400 to-indigo-500',
    description: 'Vibrant neon cyan, violet, and electric amber isometric geometry for futuristic animation and synth VFX.'
  },
  {
    id: 'titanium-mono',
    name: 'Titanium Chiseled Monogram',
    subtitle: 'Ultra-Minimalist Executive',
    badgeColor: 'from-zinc-300 to-zinc-500',
    description: 'Brushed aerospace titanium and matte obsidian with razor-sharp geometric cuts and negative space.'
  },
  {
    id: 'solar-crimson',
    name: 'Solar Flare Crimson',
    subtitle: 'Cinematic Action & Drama',
    badgeColor: 'from-rose-500 to-amber-500',
    description: 'Deep molten ruby and incandescent orange flare with high-contrast cinematic anamorphic styling.'
  }
];

const STORAGE_KEY_PRESET = 'ap_visuals_logo_preset';
const STORAGE_KEY_CUSTOM = 'ap_visuals_custom_logo_data';

// Helper to get active preset
export function getSavedLogoPreset(): LogoPresetId {
  if (typeof window === 'undefined') return 'cinematic-gold';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRESET);
    if (saved && (saved === 'cinematic-gold' || saved === 'cyber-prism' || saved === 'titanium-mono' || saved === 'solar-crimson')) {
      return saved as LogoPresetId;
    }
  } catch {
    // Ignore storage restrictions
  }
  return 'cinematic-gold';
}

// Helper to get custom logo
export function getSavedCustomLogo(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY_CUSTOM);
  } catch {
    return null;
  }
}

// Helper to save preset
export function saveLogoPreset(presetId: LogoPresetId) {
  try {
    localStorage.setItem(STORAGE_KEY_PRESET, presetId);
    window.dispatchEvent(new CustomEvent('ap-logo-changed', { 
      detail: { preset: presetId, custom: getSavedCustomLogo() } 
    }));
  } catch {
    // Ignore
  }
}

// Helper to save custom logo data URL
export function saveCustomLogo(dataUrl: string | null) {
  try {
    if (dataUrl) {
      localStorage.setItem(STORAGE_KEY_CUSTOM, dataUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_CUSTOM);
    }
    window.dispatchEvent(new CustomEvent('ap-logo-changed', { 
      detail: { preset: getSavedLogoPreset(), custom: dataUrl } 
    }));
  } catch {
    // Ignore
  }
}
