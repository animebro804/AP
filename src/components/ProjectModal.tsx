import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize, ExternalLink, Sparkles, Share2, Check, RefreshCw, AlertCircle, Link as LinkIcon, RotateCcw } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onCommission?: (projectName: string) => void;
}

/**
 * Helper to identify and parse video sources (YouTube, Vimeo, direct MP4/WebM)
 */
function parseVideoSource(url: string): { type: 'youtube' | 'vimeo' | 'mp4'; src: string; embedUrl?: string } {
  if (!url || typeof url !== 'string') {
    return { type: 'mp4', src: '/videos/showreel.mp4' };
  }

  const cleanUrl = url.trim();

  // YouTube match: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = cleanUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      src: cleanUrl,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    };
  }

  // Vimeo match: vimeo.com/123456789
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      src: cleanUrl,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`
    };
  }

  return { type: 'mp4', src: cleanUrl };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onCommission }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>('');
  const [showUrlEditor, setShowUrlEditor] = useState(false);

  // Sync active video url when project changes
  useEffect(() => {
    if (project) {
      setActiveVideoUrl(project.videoUrl || '/videos/showreel.mp4');
      setVideoError(false);
      setIsPlaying(true);
      setCurrentTime(0);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (project) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  const parsedSource = parseVideoSource(activeVideoUrl);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setActiveVideoUrl(customUrlInput.trim());
      setVideoError(false);
      setShowUrlEditor(false);
    }
  };

  const handleResetToShowreel = () => {
    setActiveVideoUrl('/videos/showreel.mp4');
    setVideoError(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        id="project-modal-container"
        className="relative w-full max-w-5xl bg-[#0e0f14] border border-white/15 rounded-2xl shadow-2xl shadow-black overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#0a0a0f]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/15">
              {project.categoryDisplay || project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Project Preview • {project.duration || '02:00'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-custom-url-btn"
              type="button"
              onClick={() => setShowUrlEditor(!showUrlEditor)}
              className="px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5 border border-white/10"
              title="Test custom video or YouTube URL"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Change Video URL</span>
            </button>
            <button
              id="modal-share-btn"
              type="button"
              onClick={handleCopyShare}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Custom URL Form Banner */}
        {showUrlEditor && (
          <form 
            onSubmit={handleApplyCustomUrl}
            className="px-5 py-3 bg-zinc-900 border-b border-white/10 flex flex-col sm:flex-row items-center gap-2.5"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="Paste MP4 URL, WebM, or YouTube video link..."
                className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-white/20 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-colors shrink-0"
              >
                Load Video
              </button>
              <button
                type="button"
                onClick={handleResetToShowreel}
                className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-colors shrink-0"
                title="Reset to local demo showreel"
              >
                Reset
              </button>
            </div>
          </form>
        )}

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {parsedSource.type === 'youtube' || parsedSource.type === 'vimeo' ? (
            /* YouTube / Vimeo Embedded Player */
            <iframe
              src={parsedSource.embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : videoError ? (
            /* Fallback State if direct stream encounters an error */
            <div className="flex flex-col items-center justify-center p-6 text-center text-zinc-300 max-w-md">
              <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">Video Stream Notice</h4>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                The external video link could not be loaded directly. You can switch to our studio showcase reel or enter a YouTube/MP4 URL.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetToShowreel}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Play Studio Reel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlEditor(true)}
                  className="px-3 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-all border border-white/10"
                >
                  Enter URL
                </button>
              </div>
            </div>
          ) : (
            /* Direct HTML5 Video Player */
            <>
              <video
                key={parsedSource.src}
                ref={videoRef}
                src={parsedSource.src}
                poster={project.thumbnail}
                className="w-full h-full object-cover cursor-pointer"
                autoPlay
                playsInline
                muted={isMuted}
                loop
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  console.warn('Video failed to load from:', parsedSource.src);
                  setVideoError(true);
                }}
              />

              {/* Central Play/Pause Watermark Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                    <Play className="w-7 h-7 fill-black ml-1" />
                  </div>
                </div>
              )}

              {/* Video Control Bar Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                {/* Timeline Progress Slider */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:h-1.5 transition-all"
                  aria-label="Video scrubber"
                />

                <div className="flex items-center justify-between text-xs font-mono text-zinc-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 text-white hover:text-zinc-300 transition-colors focus:outline-none"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 text-white hover:text-zinc-300 transition-colors focus:outline-none flex items-center gap-1.5"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-amber-400" />
                          <span className="text-[10px] text-amber-300 font-semibold">Click to Unmute</span>
                        </>
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <span>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play().catch(() => {});
                        }
                      }}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="hidden sm:inline text-zinc-400 text-[11px]">
                      4K MASTER
                    </span>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-1 text-white hover:text-zinc-300 transition-colors"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Project Metadata Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 
                id="modal-project-title"
                className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight"
              >
                {project.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Category: <span className="text-zinc-200 font-medium">{project.categoryDisplay}</span>
              </p>
            </div>

            {project.externalUrl && (
              <a
                id="modal-external-link-btn"
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-zinc-200 bg-zinc-800 hover:bg-zinc-700 hover:text-white border border-white/10 transition-colors self-start"
              >
                <span>Watch on Social</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Project Overview
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">
              {project.description}
            </p>
            {project.longDescription && (
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.longDescription}
              </p>
            )}
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs font-mono">
            <div>
              <span className="text-zinc-400 block uppercase tracking-widest text-[10px]">Aspect Ratio</span>
              <span className="text-white font-semibold mt-0.5 block">{project.aspectRatio || '16:9'}</span>
            </div>
            <div>
              <span className="text-zinc-400 block uppercase tracking-widest text-[10px]">Runtime</span>
              <span className="text-white font-semibold mt-0.5 block">{project.duration || '02:00'}</span>
            </div>
            <div>
              <span className="text-zinc-400 block uppercase tracking-widest text-[10px]">Output Quality</span>
              <span className="text-white font-semibold mt-0.5 block">4K ProRes Master</span>
            </div>
            <div>
              <span className="text-zinc-400 block uppercase tracking-widest text-[10px]">Audio</span>
              <span className="text-white font-semibold mt-0.5 block">32-Bit Spatial Binaural</span>
            </div>
          </div>

          {/* Production Tooling Badges */}
          {project.tools && project.tools.length > 0 && (
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                Production Pipeline & Generative Models
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-300 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              {/* Team Credits */}
              <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-400 flex flex-wrap items-center gap-4">
                <span>Director: <span className="text-zinc-200">Website Owner</span></span>
                <span>Script: <span className="text-zinc-200">Muhammad Sabtain</span></span>
                <span>Animation: <span className="text-zinc-200">Muhammad AbuBakar</span></span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                if (onCommission) {
                  onCommission(project.title);
                }
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inquire About A Project Like This</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider py-2 transition-colors"
            >
              Close Showcase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
