import React, { useState, useMemo, useRef } from 'react';
import { Project, ProjectCategory } from '../types';
import { projects } from '../data/studioData';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles, Filter, Film, Maximize2, Radio } from 'lucide-react';

interface WorkPortfolioProps {
  onSelectProject: (project: Project) => void;
}

const FILTER_CATEGORIES: { label: string; value: 'ALL' | ProjectCategory }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'AI VIDEO', value: 'AI VIDEO' },
  { label: 'ANIMATION', value: 'ANIMATION' },
  { label: 'VFX', value: 'VFX' },
  { label: 'ASMR', value: 'ASMR' },
  { label: 'CINEMATIC', value: 'CINEMATIC' },
];

/**
 * Individual Project Video Card with live autoplaying video loop & sound toggle
 */
const ProjectCardItem: React.FC<{
  project: Project;
  onSelectProject: (project: Project) => void;
}> = ({ project, onSelectProject }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <article
      id={`project-card-${project.id}`}
      className="group relative rounded-2xl overflow-hidden bg-[#0d0e13] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-black/80"
    >
      {/* Live Video Media Area */}
      <div 
        className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
        onClick={() => onSelectProject(project)}
      >
        {!hasVideoError ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.thumbnail}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onError={() => setHasVideoError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] via-transparent to-black/30 pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Top Badges: Category & Live Indicator */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-zinc-300 border border-white/15">
            {project.categoryDisplay || project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PLAYING</span>
          </span>
        </div>

        {/* Quick Media Controls Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl shadow-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>

        {/* Bottom Quick Control Bar */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-10">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs backdrop-blur-md border border-white/15 transition-colors pointer-events-auto"
            title={isMuted ? "Click to enable audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Duration Pill */}
          {project.duration && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 backdrop-blur-md text-zinc-400">
              {project.duration}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            className="text-xl font-bold font-sans text-white tracking-tight group-hover:text-amber-400 transition-colors cursor-pointer"
            onClick={() => onSelectProject(project)}
          >
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-2 line-clamp-2 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            {project.aspectRatio || '16:9'} Master
          </span>

          <button
            id={`view-project-btn-${project.id}`}
            type="button"
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-amber-400 group-hover:translate-x-0.5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1 cursor-pointer"
          >
            <span>Watch Fullscreen</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export const WorkPortfolio: React.FC<WorkPortfolioProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | ProjectCategory>('ALL');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const [isFeaturedMuted, setIsFeaturedMuted] = useState(true);
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(true);

  const featuredProjectsList = useMemo(() => {
    return projects.slice(0, 3);
  }, []);

  const activeFeatured = featuredProjectsList[featuredIndex] || projects[0];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') {
      return projects;
    }
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const toggleFeaturedAudio = () => {
    if (featuredVideoRef.current) {
      featuredVideoRef.current.muted = !isFeaturedMuted;
      setIsFeaturedMuted(!isFeaturedMuted);
    }
  };

  const toggleFeaturedPlay = () => {
    if (featuredVideoRef.current) {
      if (featuredVideoRef.current.paused) {
        featuredVideoRef.current.play().then(() => setIsFeaturedPlaying(true)).catch(() => {});
      } else {
        featuredVideoRef.current.pause();
        setIsFeaturedPlaying(false);
      }
    }
  };

  return (
    <section 
      id="work" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Our Work Portfolio"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase mb-3">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Featured Portfolio & Live Video Cinema</span>
          </div>
          <h2 
            id="work-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans"
          >
            Our Work
          </h2>
          <p 
            id="work-subtitle"
            className="text-zinc-400 text-base sm:text-lg mt-2 max-w-xl font-light"
          >
            All videos play live directly on screen. Click any clip to expand in 4K theater mode with audio.
          </p>
        </div>

        {/* Project Counter */}
        <div className="font-mono text-xs text-zinc-400 tracking-wider">
          <span className="text-white font-bold">{filteredProjects.length}</span> of {projects.length} PROJECTS DISPLAYED
        </div>
      </div>

      {/* Featured Master Cinema Player Stage */}
      <div className="mb-14 rounded-3xl overflow-hidden bg-gradient-to-b from-[#14151d] to-[#0c0d12] border border-white/15 shadow-2xl shadow-black">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-black overflow-hidden group">
          <video
            ref={featuredVideoRef}
            key={activeFeatured.videoUrl}
            src={activeFeatured.videoUrl}
            poster={activeFeatured.thumbnail}
            autoPlay
            muted={isFeaturedMuted}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Cinema Stage Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />

          {/* Top Stage Bar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-white border border-white/20">
                MASTER SHOWCASE REEL
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-[11px] font-mono text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>NOW STREAMING</span>
              </span>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15">
              {featuredProjectsList.map((fp, i) => (
                <button
                  key={fp.id}
                  onClick={() => setFeaturedIndex(i)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    featuredIndex === i 
                      ? 'bg-white text-black font-bold shadow' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {fp.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Big Center Play/Pause button on hover */}
          <div 
            onClick={toggleFeaturedPlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
          >
            {!isFeaturedPlaying && (
              <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                <Play className="w-7 h-7 fill-black ml-1" />
              </div>
            )}
          </div>

          {/* Bottom Control Overlay Bar */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-10">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                {activeFeatured.categoryDisplay || activeFeatured.category}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                {activeFeatured.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-light line-clamp-1 mt-1">
                {activeFeatured.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Audio Toggle */}
              <button
                type="button"
                onClick={toggleFeaturedAudio}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 hover:bg-black text-xs font-mono text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                {isFeaturedMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-amber-400" />
                    <span>Click For Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Sound ON</span>
                  </>
                )}
              </button>

              {/* Theater Mode Button */}
              <button
                type="button"
                onClick={() => onSelectProject(activeFeatured)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-xs font-mono text-black font-bold transition-all cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Theater Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div 
        id="portfolio-category-filters"
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.value;
          return (
            <button
              key={cat.value}
              id={`filter-btn-${cat.value.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md shadow-white/10 scale-102'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Portfolio Grid with Active Playing Videos */}
      <div 
        id="portfolio-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {filteredProjects.map((project) => (
          <ProjectCardItem
            key={project.id}
            project={project}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <p className="text-zinc-400 font-mono text-sm">No projects found in this category.</p>
          <button
            type="button"
            onClick={() => setActiveFilter('ALL')}
            className="mt-4 px-4 py-2 rounded-full text-xs font-mono bg-white text-black font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
