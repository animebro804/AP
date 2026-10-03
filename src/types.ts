/**
 * AP Visuals — Type Definitions
 * Structured interfaces for all projects, team members, services, and studio content.
 */

export type ProjectCategory = 
  | 'AI VIDEO'
  | 'ANIMATION'
  | 'VFX'
  | 'ASMR'
  | 'CINEMATIC';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryDisplay: string; // e.g. "AI Animation", "AI Food Cinema", "VFX / AI Simulation"
  description: string;
  longDescription: string;
  thumbnail: string;
  videoUrl: string; // Direct mp4 or placeholder video stream
  externalUrl?: string; // Optional social media link (YouTube, Instagram, Vimeo, etc.)
  aspectRatio?: '16:9' | '9:16' | '2.39:1';
  duration?: string;
  tools?: string[];
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  socialLinks: {
    platform: 'instagram' | 'x' | 'linkedin' | 'youtube' | 'artstation';
    url: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'video' | 'film' | 'sparkles' | 'wand' | 'mic' | 'layers';
  tags: string[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  detail?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  description: string;
  detailPoints: string[];
}

export interface SocialLink {
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'TikTok';
  handle: string;
  url: string;
  followerHighlight?: string;
}

export interface VfxBreakdownItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  tags: string[];
  specs: {
    engine: string;
    resolution: string;
    framerate: string;
    leadArtist: string;
  };
}

export interface TechPipelineTool {
  name: string;
  category: 'Generative AI' | '3D & VFX' | 'Post-Production' | 'Audio & Foley';
  description: string;
  badge: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  projectType: string;
  rating: number;
  avatar?: string;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  badge: string;
  aboutHeading: string;
  aboutText: string;
  contactEmail: string;
  copyrightYear: number;
}
