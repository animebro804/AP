/**
 * ============================================================================
 * AP VISUALS — CENTRALIZED STUDIO CONTENT & ADMIN CONFIGURATION
 * ============================================================================
 * 
 * QUICK EDITING GUIDE FOR BEGINNERS:
 * 
 * 1. TEAM MEMBER PHOTOS & INFO:
 *    -> Jump to `teamMembers` array below (Line ~160).
 *    -> Replace `name`, `role`, `bio`, `image` with your own image URLs, and edit `skills`.
 * 
 * 2. PROJECT THUMBNAILS & VIDEOS:
 *    -> Jump to `projects` array below (Line ~35).
 *    -> Replace `thumbnail` with your image URL.
 *    -> Replace `videoUrl` with your MP4/WebM video URL or YouTube/Vimeo link.
 * 
 * 3. PROJECT DESCRIPTIONS:
 *    -> Edit `title`, `category`, `description`, and `longDescription` in `projects`.
 * 
 * 4. SOCIAL MEDIA LINKS:
 *    -> Jump to `socialLinks` array below (Line ~245).
 *    -> Update the `url` for Instagram, Facebook, YouTube, and TikTok.
 * 
 * 5. CONTACT INFORMATION:
 *    -> Jump to `brandInfo.contactEmail` (Line ~20).
 *    -> Update to your studio's real inbox.
 * 
 * 6. LOGO & BRAND DETAILS:
 *    -> Edit `brandInfo` object at the top for tagline, hero headline, and texts.
 * ============================================================================
 */

import { Project, TeamMember, Service, StatItem, ProcessStep, SocialLink, BrandConfig, VfxBreakdownItem, TechPipelineTool, Testimonial } from '../types';

/**
 * BRAND & STUDIO GENERAL CONFIGURATION
 * [EDIT HERE] Update studio naming, headline, tagline, and contact email.
 */
export const brandInfo: BrandConfig = {
  name: "AP Visuals",
  tagline: "AI • Animation • VFX • Creative Media",
  heroHeadline: "WE CREATE VISUALS\nBEYOND IMAGINATION.",
  heroSupportingText: "AP Visuals is a creative AI production studio transforming ideas into cinematic AI videos, animation, VFX and immersive visual experiences.",
  badge: "AI-POWERED CREATIVE STUDIO",
  aboutHeading: "Where Creativity Meets AI",
  aboutText: "AP Visuals combines creative storytelling with modern AI technology to produce visual content that feels cinematic, imaginative and memorable. Our team experiments with AI animation, VFX, miniature worlds and digital storytelling to turn concepts into engaging visual experiences.",
  contactEmail: "hello@apvisuals.com", // [EDIT HERE: Replace with your actual email address]
  copyrightYear: 2026,
};

/**
 * PORTFOLIO PROJECTS
 * [EDIT HERE: Add, remove, or modify projects]
 * Categories: 'AI VIDEO' | 'ANIMATION' | 'VFX' | 'ASMR' | 'CINEMATIC'
 */
export const projects: Project[] = [
  {
    id: "ai-cinematic-worlds",
    title: "AI Cinematic Worlds",
    category: "ANIMATION",
    categoryDisplay: "AI Animation",
    description: "Expansive procedural landscapes and alien monolith architectures synthesized through generative neural rendering.",
    longDescription: "A multi-scene cinematic journey through ancient titanium temples and bioluminescent alien flora. Rendered using custom LoRA diffusion workflows blended with high-resolution frame interpolation, atmospheric volumetric fog, and 32-bit HDR color grading.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    // [EDIT HERE: Replace video URL with your actual mp4 or video link]
    videoUrl: "/videos/showreel.mp4",
    externalUrl: "https://youtube.com/@apvisuals_placeholder",
    aspectRatio: "2.39:1",
    duration: "02:14",
    tools: ["Midjourney v6", "ComfyUI", "DaVinci Resolve", "After Effects"],
    featured: true
  },
  {
    id: "miniature-asmr-kitchen",
    title: "Miniature ASMR Kitchen",
    category: "ASMR",
    categoryDisplay: "AI Food Cinema",
    description: "Hypnotic micro-culinary sequences rendered at microscopic depth of field with ultra-tactile sound design.",
    longDescription: "An exploration into simulated fluid dynamics, thermal sizzles, and macro caramelization in a miniature culinary studio. Designed for hypnotic sensory stimulation, featuring synchronized sub-bass foley and hyper-real surface textures.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/nature-macro.mp4",
    externalUrl: "https://instagram.com/apvisuals_placeholder",
    aspectRatio: "16:9",
    duration: "01:30",
    tools: ["Stable Video", "Macro Diffusion", "Ableton Foley Engine"],
    featured: true
  },
  {
    id: "impossible-transformations",
    title: "Impossible Transformations",
    category: "VFX",
    categoryDisplay: "AI VFX",
    description: "Seamless optical metamorphosis turning solid urban structures into fluid obsidian sculptures.",
    longDescription: "Live-action footage augmented with generative neural inpainting. Modern metropolitan glass skyscrapers ripple into flowing metallic liquid, maintaining realistic reflections, parallax tracking, and optical motion blur.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/cinema-vfx.mp4",
    externalUrl: "https://tiktok.com/@apvisuals_placeholder",
    aspectRatio: "16:9",
    duration: "01:45",
    tools: ["NeRF / 3D Gaussians", "ControlNet", "Blender VFX"],
    featured: true
  },
  {
    id: "cinematic-destruction",
    title: "Cinematic Destruction",
    category: "VFX",
    categoryDisplay: "VFX / AI Simulation",
    description: "Hyper-realistic zero-gravity fracture physics mixed with cinematic camera fly-throughs.",
    longDescription: "High-octane visual destruction sequence where concrete monuments disintegrate into geometric dust clouds. Produced using particle simulation guide meshes guided by generative AI style transfer for blockbuster aesthetics.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/showreel.mp4",
    externalUrl: "https://youtube.com/@apvisuals_placeholder",
    aspectRatio: "2.39:1",
    duration: "02:05",
    tools: ["Houdini", "Runway Gen-3", "Nuke"],
    featured: true
  },
  {
    id: "ai-character-stories",
    title: "AI Character Stories",
    category: "ANIMATION",
    categoryDisplay: "AI Animation",
    description: "Emotional character narrative performance driven by consistent generative facial motion capture.",
    longDescription: "Solving the industry problem of temporal character consistency. This narrative short follows an android traveler rediscovering forgotten Earth relics, delivering emotive micro-expressions and cohesive costume detailing across 48 continuous shots.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/cinema-vfx.mp4",
    externalUrl: "https://youtube.com/@apvisuals_placeholder",
    aspectRatio: "16:9",
    duration: "03:10",
    tools: ["Character LoRA", "LivePortrait", "Unreal Engine 5"],
    featured: false
  },
  {
    id: "experimental-visuals",
    title: "Experimental Visuals",
    category: "AI VIDEO",
    categoryDisplay: "Creative AI",
    description: "Abstract non-Euclidean geometry and quantum visual poetry crafted for projection mapping installations.",
    longDescription: "A boundary-pushing audio-visual meditation examining latent space topologies. Mathematical fractal patterns intersect with liquid mercury simulations, reacting directly to an atmospheric ambient synthesizer soundtrack.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/nature-macro.mp4",
    externalUrl: "https://instagram.com/apvisuals_placeholder",
    aspectRatio: "16:9",
    duration: "01:50",
    tools: ["TouchDesigner", "Stable Diffusion SDXL", "Custom Latent Warp"],
    featured: false
  },
  {
    id: "cybernetic-metamorphosis",
    title: "Cybernetic Metamorphosis",
    category: "CINEMATIC",
    categoryDisplay: "Cinematic Visuals",
    description: "High-fashion futuristic bio-mechanic couture transitioning under dramatic studio strobes.",
    longDescription: "Created for a luxury fashion visual campaign. Explores iridescent exoskeleton fabrics and synthetic biology, transitioning organically between carbon fiber, silk chiffon, and glowing luminescence.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/showreel.mp4",
    externalUrl: "https://vimeo.com/apvisuals_placeholder",
    aspectRatio: "2.39:1",
    duration: "01:25",
    tools: ["Midjourney", "Kling AI", "Premiere Pro"],
    featured: false
  },
  {
    id: "miniature-rainforest-macro",
    title: "Dewdrops on Chrono-Leaf",
    category: "ASMR",
    categoryDisplay: "Miniature ASMR",
    description: "Sub-millimeter droplets bouncing in super slow-motion across synthetic botanical organisms.",
    longDescription: "A hyper-focused ASMR micro-documentary showing the crystalline mechanics of simulated organic nature. Audio recorded at 96kHz 24-bit with ultra-binaural microphone arrays.",
    // [EDIT HERE: Replace thumbnail URL]
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/nature-macro.mp4",
    externalUrl: "https://youtube.com/@apvisuals_placeholder",
    aspectRatio: "16:9",
    duration: "02:40",
    tools: ["Kling Video", "Custom Diffusion LoRA", "Spatial Audio"],
    featured: false
  }
];

/**
 * TEAM MEMBERS
 * [EDIT HERE: Replace team member information, portraits, and social links]
 */
export const teamMembers: TeamMember[] = [
  {
    id: "website-owner",
    name: "Website Owner",
    role: "Founder & Creative Director",
    bio: "Leading the creative vision, studio direction, and pioneering cinematic visual storytelling at AP Visuals.",
    // [IMAGE: Website Owner portrait]
    image: "/team/website-owner.jpg",
    skills: ["Creative Direction", "Studio Leadership", "Visual Storytelling", "Cinematography"],
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/apvisuals_placeholder" },
      { platform: "x", url: "https://x.com/apvisuals_placeholder" },
      { platform: "linkedin", url: "https://linkedin.com/in/apvisuals_placeholder" }
    ]
  },
  {
    id: "muhammad-sabtain",
    name: "Muhammad Sabtain",
    role: "Lead Scriptwriter & Narrative Architect",
    bio: "Crafting foundational narratives, cinematic scripts, and intricate prompt architectures that bring imaginative concepts to life.",
    // [IMAGE: Muhammad Sabtain portrait]
    image: "/team/muhammad-sabtain.jpg",
    skills: ["Scripting", "Narrative Architecture", "Creative Writing", "Prompt Engineering"],
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/sabtain_placeholder" },
      { platform: "linkedin", url: "https://linkedin.com/in/sabtain_placeholder" },
      { platform: "x", url: "https://x.com/sabtain_placeholder" }
    ]
  },
  {
    id: "muhammad-abubakar",
    name: "Muhammad AbuBakar",
    role: "Lead AI & 3D Animator",
    bio: "Breathing life into visual concepts through high-speed frame synthesis, fluid character motion, and cinematic animations.",
    // [IMAGE: Muhammad AbuBakar portrait]
    image: "/team/muhammad-abubakar.jpg",
    skills: ["Animation", "Camera Choreography", "Motion Synthesis", "VFX Dynamics"],
    socialLinks: [
      { platform: "youtube", url: "https://youtube.com/@abubakar_placeholder" },
      { platform: "instagram", url: "https://instagram.com/abubakar_placeholder" },
      { platform: "artstation", url: "https://artstation.com/abubakar_placeholder" }
    ]
  },
  {
    id: "team-member-4",
    name: "Team Member 4",
    role: "Lead VFX & Compositing Specialist",
    bio: "Executing precision CGI rotoscoping, camera tracking, and seamless integration between physical plates and AI visuals.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    skills: ["CGI Compositing", "VFX Grading", "Neural Inpainting", "Unreal Engine"],
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/apvisuals_placeholder" },
      { platform: "linkedin", url: "https://linkedin.com/in/apvisuals_placeholder" },
      { platform: "artstation", url: "https://artstation.com/apvisuals_placeholder" }
    ]
  },
  {
    id: "team-member-5",
    name: "Team Member 5",
    role: "Sound Designer & Audio Foley Artist",
    bio: "Sculpting immersive binaural soundscapes, punchy cinema audio textures, and custom synthesizer scores.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    skills: ["Sound Design", "Audio Foley", "Spatial Mixing", "Audio Mastering"],
    socialLinks: [
      { platform: "youtube", url: "https://youtube.com/@apvisuals_placeholder" },
      { platform: "instagram", url: "https://instagram.com/apvisuals_placeholder" },
      { platform: "x", url: "https://x.com/apvisuals_placeholder" }
    ]
  },
  {
    id: "team-member-6",
    name: "Team Member 6",
    role: "Post-Production & Colorist",
    bio: "Fine-tuning Hollywood anamorphic color grades, lens distortion calibration, and frame-accurate editorial pacing.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
    skills: ["Color Grading", "DaVinci Resolve", "Post-Production", "Mastering 4K"],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/apvisuals_placeholder" },
      { platform: "instagram", url: "https://instagram.com/apvisuals_placeholder" },
      { platform: "x", url: "https://x.com/apvisuals_placeholder" }
    ]
  }
];

/**
 * STUDIO SERVICES (WHAT WE CREATE)
 * [EDIT HERE: Update services offered]
 */
export const services: Service[] = [
  {
    id: "ai-video",
    title: "AI Video Production",
    description: "End-to-end cinematic AI video creation for high-impact brand campaigns, music videos, and visionary visual releases.",
    iconName: "video",
    tags: ["High Resolution", "Consistent Style", "Narrative Direction"]
  },
  {
    id: "ai-animation",
    title: "AI Animation",
    description: "Stylized characters, complex motion dynamics, and animated shorts crafted with generative deep-learning models.",
    iconName: "film",
    tags: ["Frame Consistency", "Character LoRA", "Fluid Motion"]
  },
  {
    id: "vfx-transformations",
    title: "VFX & Transformations",
    description: "Augmenting reality with surreal optical illusions, liquid material simulations, and futuristic structural morphs.",
    iconName: "sparkles",
    tags: ["Neural Inpainting", "3D Tracking", "Photoreal FX"]
  },
  {
    id: "cinematic-visuals",
    title: "Cinematic Visuals",
    description: "Widescreen epic compositions featuring atmospheric volumetric light, analog film grain, and rich anamorphic lenses.",
    iconName: "wand",
    tags: ["2.39:1 Anamorphic", "HDR Mastering", "Color Science"]
  },
  {
    id: "miniature-asmr",
    title: "Miniature ASMR",
    description: "Hypnotic micro-world cinematography with spatial, tactile audio tailored for viral engagement and sensory immersion.",
    iconName: "mic",
    tags: ["Macro Optics", "Spatial Binaural", "Viral Retention"]
  },
  {
    id: "creative-digital-content",
    title: "Creative Digital Content",
    description: "Platform-optimized visual assets, dynamic 9:16 social drops, and experimental media installations for vanguard brands.",
    iconName: "layers",
    tags: ["Cross-Platform", "Social First", "Avant-Garde"]
  }
];

/**
 * STUDIO STATS
 * [EDIT HERE: Update statistics displayed in the strip]
 */
export const stats: StatItem[] = [
  {
    id: "stat-projects",
    value: "100+",
    label: "Creative Projects",
    detail: "Delivered with cinematic distinction"
  },
  {
    id: "stat-experiments",
    value: "50+",
    label: "Visual Experiments",
    detail: "Proprietary AI research tests"
  },
  {
    id: "stat-views",
    value: "10K+",
    label: "Content Views",
    detail: "Across digital & social feeds"
  },
  {
    id: "stat-ideas",
    value: "24/7",
    label: "Creative Ideas",
    detail: "Nonstop generation & refinement"
  }
];

/**
 * CREATIVE PROCESS
 * [EDIT HERE: Update the 4-step creative pipeline]
 */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "IDEA",
    summary: "We develop the concept.",
    description: "Deconstructing the core artistic vision, drafting visual moodboards, style frames, and defining custom prompt architectures.",
    detailPoints: ["Concept & Moodboard", "Style Frame Exploration", "Prompt Architecture Setup"]
  },
  {
    step: "02",
    title: "CREATE",
    summary: "We generate and build the visual content.",
    description: "Synthesizing base assets via custom trained diffusion pipelines, choreographing motion paths, and orchestrating initial rendering.",
    detailPoints: ["Neural Generation", "Motion Path Choreography", "High-Def Upscaling"]
  },
  {
    step: "03",
    title: "REFINE",
    summary: "We polish the animation, VFX, sound and cinematic details.",
    description: "Frame-by-frame artifact cleanup, optical compositing, temporal smoothing, color grading, and tactile foley/sound design.",
    detailPoints: ["Temporal Smoothing", "VFX & Compositing", "Binaural & Film Foley"]
  },
  {
    step: "04",
    title: "PUBLISH",
    summary: "We prepare the final content for social platforms and digital media.",
    description: "Exporting optimized multi-aspect ratios (16:9, 9:16, 2.39:1) mastered for high-bitrate streaming and digital premieres.",
    detailPoints: ["Multi-Aspect Delivery", "Platform Mastering", "Client Hand-off & Release"]
  }
];

/**
 * SOCIAL MEDIA ACCOUNTS
 * [EDIT HERE: Update with your real social media links]
 * (These placeholders are clearly marked for your replacement)
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    handle: "@apvisuals.studio",
    url: "https://instagram.com/apvisuals_placeholder", // [REPLACE WITH REAL LINK]
    followerHighlight: "Reels & Behind-the-Scenes"
  },
  {
    platform: "YouTube",
    handle: "AP Visuals Studio",
    url: "https://youtube.com/@apvisuals_placeholder", // [REPLACE WITH REAL LINK]
    followerHighlight: "4K Cinematic Showreels"
  },
  {
    platform: "TikTok",
    handle: "@apvisuals",
    url: "https://tiktok.com/@apvisuals_placeholder", // [REPLACE WITH REAL LINK]
    followerHighlight: "Micro ASMR & AI Experiments"
  },
  {
    platform: "Facebook",
    handle: "AP Visuals Creative",
    url: "https://facebook.com/apvisuals_placeholder", // [REPLACE WITH REAL LINK]
    followerHighlight: "Studio News & Case Studies"
  }
];

/**
 * VFX BREAKDOWN & TRANSFORMATION LAB
 * Interactive before/after showcase data demonstrating AI pipeline fidelity
 */
export const vfxBreakdowns: VfxBreakdownItem[] = [
  {
    id: "cyberpunk-vfx",
    title: "Neural Volumetric Synthesis",
    subtitle: "Raw Practical Plate -> High-Fidelity Cyberpunk Metropolis",
    description: "Taking standard live capture and integrating neural volumetric haze, dynamic neon reflections, holographic signs, and rain dissipation shaders.",
    beforeImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    beforeLabel: "Base Plate / Prompt Layout",
    afterLabel: "Master AI Composite (ACEScc)",
    tags: ["Neural Relighting", "Optical Raytracing", "Particle Systems", "Anamorphic Flares"],
    specs: {
      engine: "ComfyUI + Kling + Nuke",
      resolution: "3840 x 2160 (4K UHD)",
      framerate: "60 FPS Temporal Lock",
      leadArtist: "Website Owner & AbuBakar"
    }
  },
  {
    id: "sci-fi-animation",
    title: "Cinematic Character & World Generation",
    subtitle: "Narrative Scripting Blockout -> Photorealistic Sci-Fi Sequence",
    description: "Developing complex character choreography from Muhammad Sabtain's screenplay through AI latent diffusion and 3D camera mapping by Muhammad AbuBakar.",
    beforeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    beforeLabel: "Screenplay Wireframe & 3D Clay",
    afterLabel: "Final Frame Synthesis",
    tags: ["Character Rigging", "Prompt Architecture", "Subsurface Scattering", "Depth Inpainting"],
    specs: {
      engine: "Runway Gen-3 + Unreal Engine 5",
      resolution: "4096 x 1716 (2.39:1 Cinema)",
      framerate: "24 FPS Anamorphic",
      leadArtist: "Muhammad Sabtain & AbuBakar"
    }
  },
  {
    id: "miniature-asmr",
    title: "Macro Miniature ASMR Transformation",
    subtitle: "Macro Scale Model -> Hyper-Tactile Audio-Visual Symphony",
    description: "Synthesizing ultra-close micro-textures, liquid viscosity, and sub-millimeter lighting combined with bespoke binaural Foley audio.",
    beforeImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    beforeLabel: "Base Macro Geometry",
    afterLabel: "Tactile ASMR Master",
    tags: ["Micro Fluid Dynamics", "Binaural Spatial Audio", "Macro Depth of Field", "Photoreal Textures"],
    specs: {
      engine: "Stable Diffusion XL + Blender",
      resolution: "2160 x 3840 (9:16 Vertical)",
      framerate: "60 FPS Ultra Smooth",
      leadArtist: "Website Owner (Direction)"
    }
  }
];

/**
 * STUDIO TECH STACK & PRODUCTION PIPELINE
 */
export const techPipelineTools: TechPipelineTool[] = [
  {
    name: "Runway Gen-3 Alpha & Kling AI",
    category: "Generative AI",
    description: "Next-generation video synthesis models optimized for hyper-real camera physics, temporal consistency, and cinematic lighting control.",
    badge: "Motion & Camera",
    features: ["Sub-second frame continuity", "Anamorphic motion blur", "Zero-flicker latent rendering", "Dynamic prompt guidance"]
  },
  {
    name: "Custom ComfyUI Node Graphs",
    category: "Generative AI",
    description: "Proprietary multi-pass neural pipelines combining ControlNet, Depth-to-Video, IP-Adapter, and latent upscalers for unmatched creative precision.",
    badge: "Proprietary Architecture",
    features: ["Custom checkpoint merging", "Depth & normal pass guidance", "Temporal optical flow locks", "Direct 4K upscaling"]
  },
  {
    name: "Unreal Engine 5.4 & Blender",
    category: "3D & VFX",
    description: "Real-time virtual production environments, geometric camera tracking, and procedural scene generation serving as deterministic anchors.",
    badge: "Virtual Production",
    features: ["Lumen global illumination", "Nanite virtualized geometry", "Camera trajectory projection", "Clay pass generation"]
  },
  {
    name: "DaVinci Resolve Studio & Nuke",
    category: "Post-Production",
    description: "Industry-standard ACES color pipeline, optical flow frame interpolation, neural inpainting, and fine particle compositing.",
    badge: "Color & Mastering",
    features: ["ACEScc color management", "Optical flow 60FPS smoothing", "Artifact neural removal", "Cinema DCI-P3 delivery"]
  },
  {
    name: "Spatial Foley & Binaural ASMR Lab",
    category: "Audio & Foley",
    description: "Micro-acoustics engineering, psychoacoustic sub-bass frequencies, and 3D binaural spatial soundscapes that magnify visual immersion.",
    badge: "Immersive Audio",
    features: ["8D binaural field recording", "Micro-textural ASMR foley", "Dynamic frequency balancing", "Dolby Atmos compatible"]
  }
];

/**
 * CLIENT REVIEWS & INDUSTRY RECOGNITION
 */
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote: "AP Visuals achieved what standard CGI studios quoted 3 months for in just 10 days. The cinematic depth, camera motion, and lighting in our teaser were breathtaking.",
    author: "Julian Vance",
    role: "Global Creative Lead",
    company: "Vanguard Media Group",
    projectType: "Sci-Fi Brand Teaser",
    rating: 5
  },
  {
    id: "test-2",
    quote: "The miniature ASMR visuals they crafted for our luxury beverage launch went viral with over 8M views. The tactile realism and sound design stopped thumbs instantly.",
    author: "Sophia Sterling",
    role: "Brand Director",
    company: "Aura Botanicals",
    projectType: "Tactile ASMR Campaign",
    rating: 5
  },
  {
    id: "test-3",
    quote: "Working with Sabtain on narrative scripting and AbuBakar on animation was seamless. AP Visuals bridges genuine storytelling with boundary-pushing AI technology.",
    author: "Marc Renard",
    role: "Executive Producer",
    company: "Cinematic Wave Records",
    projectType: "Animated Music Video",
    rating: 5
  },
  {
    id: "test-4",
    quote: "Their before-and-after workflow is proof that AI visual production has matured into an art form. AP Visuals is at the very frontier of this creative revolution.",
    author: "Elena Rostov",
    role: "Head of Digital Production",
    company: "NextGen Creatives",
    projectType: "Commercial VFX Transformation",
    rating: 5
  }
];

