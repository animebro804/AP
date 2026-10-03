import React, { useState, useEffect, useRef } from 'react';
import { teamMembers as defaultTeamMembers } from '../data/studioData';
import { TeamMember } from '../types';
import { 
  Users, Instagram, Youtube, Linkedin, Globe, Upload, Camera, 
  Edit3, RotateCcw, X, Check, Maximize2, Sparkles, SlidersHorizontal,
  Info, Eye, Image as ImageIcon, Plus, Trash2, Lock, Unlock, ShieldCheck,
  Save, Download, Copy, CheckCircle2, AlertCircle, Key
} from 'lucide-react';

interface CustomMemberState extends TeamMember {
  isCustomImage?: boolean;
  imageFit?: 'cover' | 'contain';
}

const STORAGE_KEY = 'ap_visuals_custom_team_v3';
const LOCK_STORAGE_KEY = 'ap_visuals_team_roster_locked';
const PIN_STORAGE_KEY = 'ap_visuals_team_owner_pin';
const DEFAULT_OWNER_PIN = '804'; // Default PIN derived from anime.bro804@gmail.com

/**
 * Resizes high-res photos to crisp max 1200px to ensure
 * smooth rendering and prevent localStorage quota issues, keeping
 * 100% natural original color and zero AI filter/distortion.
 */
function processImageFile(file: File, maxWidth = 1200, quality = 0.9): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please upload a valid image file.'));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth && img.height <= maxWidth) {
          return resolve(result);
        }

        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const TeamSection: React.FC = () => {
  const [team, setTeam] = useState<CustomMemberState[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged: CustomMemberState[] = [];
          defaultTeamMembers.forEach((defaultMember) => {
            const match = parsed.find((p: CustomMemberState) => p.id === defaultMember.id);
            merged.push(match ? { ...defaultMember, ...match } : defaultMember);
          });
          parsed.forEach((customMember: CustomMemberState) => {
            if (!merged.some(m => m.id === customMember.id)) {
              merged.push(customMember);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.warn('Could not read custom team from localStorage', e);
    }
    return defaultTeamMembers;
  });

  // Locking & Protection State: Defaults to locked if user previously saved & locked
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    try {
      const savedLock = localStorage.getItem(LOCK_STORAGE_KEY);
      // If user saved lock previously, respect it; otherwise allow initial setup
      return savedLock === 'true';
    } catch {
      return false;
    }
  });

  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_OWNER_PIN;
    } catch {
      return DEFAULT_OWNER_PIN;
    }
  });

  // Modal & Edit State
  const [editingMember, setEditingMember] = useState<CustomMemberState | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [previewLightbox, setPreviewLightbox] = useState<{ url: string; title: string } | null>(null);
  const [dragOverMemberId, setDragOverMemberId] = useState<string | null>(null);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [copiedBackup, setCopiedBackup] = useState(false);

  // Hidden File input ref for quick card upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadMemberIdRef = useRef<string | null>(null);

  // Sync to localStorage
  const saveTeamState = (newTeam: CustomMemberState[]) => {
    setTeam(newTeam);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTeam));
    } catch (e) {
      console.warn('Could not save team state to localStorage', e);
    }
  };

  const notify = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 4000);
  };

  // Lock Roster
  const handleLockRoster = () => {
    setIsLocked(true);
    try {
      localStorage.setItem(LOCK_STORAGE_KEY, 'true');
    } catch {}
    notify('🔒 Team Roster Locked & Protected! All profiles are now permanent and safe from any visitor changes.');
  };

  // Unlock Roster with PIN
  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === ownerPin || enteredPin.trim() === DEFAULT_OWNER_PIN) {
      setIsLocked(false);
      try {
        localStorage.setItem(LOCK_STORAGE_KEY, 'false');
      } catch {}
      setPinModalOpen(false);
      setEnteredPin('');
      setPinError(null);
      notify('🔓 Admin Edit Mode Unlocked! You can now edit photos, bios, and names.');
    } else {
      setPinError(`Incorrect PIN. Default owner PIN is ${DEFAULT_OWNER_PIN}.`);
    }
  };

  // Quick Direct Upload Handler: Loads photo and OPENS the Save Modal so user can review & save
  const handleDirectUploadClick = (memberId: string) => {
    if (isLocked) {
      setPinModalOpen(true);
      return;
    }
    activeUploadMemberIdRef.current = memberId;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const memberId = activeUploadMemberIdRef.current;
    if (!file || !memberId) return;

    try {
      const dataUrl = await processImageFile(file);
      const target = team.find(m => m.id === memberId);
      if (target) {
        // Open edit modal directly with this photo so user can adjust details and hit SAVE!
        setEditingMember({
          ...target,
          image: dataUrl,
          isCustomImage: true,
          imageFit: target.imageFit || 'cover'
        });
        setIsAddingNew(false);
        notify(`Photo loaded! Review name & bio, then click "Save Member (Mehfooz Karein)".`);
      }
    } catch (err: any) {
      alert(err?.message || 'Failed to upload photo.');
    }
  };

  // Drag and Drop Handler: Also opens the save modal so user can confirm
  const handleDrop = async (e: React.DragEvent, memberId: string) => {
    e.preventDefault();
    setDragOverMemberId(null);
    if (isLocked) {
      notify('Roster is currently locked. Click "Unlock to Edit" with PIN 804 to change photos.');
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await processImageFile(file);
      const target = team.find(m => m.id === memberId);
      if (target) {
        setEditingMember({
          ...target,
          image: dataUrl,
          isCustomImage: true,
          imageFit: target.imageFit || 'cover'
        });
        setIsAddingNew(false);
        notify(`Photo dropped! Review details and click "Save Member (Mehfooz Karein)".`);
      }
    } catch (err: any) {
      alert(err?.message || 'Failed to process dropped image.');
    }
  };

  // Reset member to default photo
  const handleResetMember = (memberId: string) => {
    if (isLocked) return;
    const defaultData = defaultTeamMembers.find((m) => m.id === memberId);
    if (!defaultData) return;

    const updated: CustomMemberState[] = team.map((m) => {
      if (m.id === memberId) {
        return {
          ...defaultData,
          isCustomImage: false,
          imageFit: 'cover' as const
        };
      }
      return m;
    });

    saveTeamState(updated);
    if (editingMember?.id === memberId) {
      setEditingMember({ ...defaultData, isCustomImage: false, imageFit: 'cover' as const });
    }
    notify(`Reset ${defaultData.name} to default photo.`);
  };

  // Delete a custom added member
  const handleDeleteMember = (memberId: string) => {
    if (isLocked) return;
    const member = team.find(m => m.id === memberId);
    if (window.confirm(`Are you sure you want to remove "${member?.name || 'this member'}" from the team?`)) {
      const updated = team.filter(m => m.id !== memberId);
      saveTeamState(updated);
      notify(`Removed ${member?.name || 'member'} from team.`);
    }
  };

  // Save changes from Edit Modal
  const handleSaveModal = (updatedMember: CustomMemberState) => {
    const exists = team.some(m => m.id === updatedMember.id);
    let updated: CustomMemberState[];
    if (exists) {
      updated = team.map((m) => (m.id === updatedMember.id ? updatedMember : m));
    } else {
      updated = [...team, updatedMember];
    }
    saveTeamState(updated);
    setEditingMember(null);
    setIsAddingNew(false);
    notify(`✅ Profile and photo saved permanently for ${updatedMember.name}!`);
  };

  // Open "Add New Member" dialog
  const handleOpenAddMember = () => {
    if (isLocked) {
      setPinModalOpen(true);
      return;
    }
    const newId = `team-member-${Date.now()}`;
    const newMember: CustomMemberState = {
      id: newId,
      name: "New Team Member",
      role: "Visual Artist & Creator",
      bio: "Crafting cutting-edge visuals, neural storytelling, and creative direction.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      skills: ["Visual FX", "AI Production", "Creativity"],
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "linkedin", url: "https://linkedin.com" }
      ],
      isCustomImage: false,
      imageFit: 'cover'
    };
    setEditingMember(newMember);
    setIsAddingNew(true);
  };

  // Copy team data backup
  const handleCopyBackup = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(team, null, 2));
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2500);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5" />;
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section 
      id="team" 
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20"
      aria-label="Meet The Team"
    >
      {/* Hidden global file input for instant card uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Floating Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-zinc-950 border border-emerald-500/60 text-white text-xs font-mono shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>Creative Collective • {team.length} Members</span>
            {isLocked ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Protected (Locked)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/15 text-amber-300 border border-amber-500/40">
                <Edit3 className="w-3 h-3" />
                <span>Admin Edit Mode</span>
              </span>
            )}
          </div>
          
          <h2 
            id="team-heading"
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans"
          >
            Meet The Team
          </h2>
          <p 
            id="team-subtitle"
            className="text-zinc-400 text-base sm:text-lg mt-2 max-w-2xl font-light"
          >
            Creative squad behind AP Visuals. Upload your original photos and save your bio—locked and secured from any unauthorized changes.
          </p>
        </div>

        {/* Action Controls Header */}
        <div className="flex flex-wrap items-center gap-3">
          {isLocked ? (
            /* Locked State: Visitors cannot edit, owner can unlock with PIN */
            <div className="flex items-center gap-2.5">
              <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-emerald-500/25 flex items-center gap-2 text-xs font-mono text-emerald-300">
                <Lock className="w-3.5 h-3.5" />
                <span>Roster Protected • No Changes Allowed</span>
              </div>
              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                title="Unlock to edit photos or bios (PIN: 804)"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Owner Unlock</span>
              </button>
            </div>
          ) : (
            /* Unlocked Edit State: Owner can add members, save and lock */
            <div className="flex flex-wrap items-center gap-2.5">
              {/* SAVE & LOCK ROSTER BUTTON */}
              <button
                type="button"
                onClick={handleLockRoster}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
                title="Save and lock all team profiles so no one can change them"
              >
                <Lock className="w-4 h-4" />
                <span>Save & Lock Roster (Mehfooz & Lock)</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddMember}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-xs transition-colors"
                title="Export or backup team data code"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Mode Instructional Banner */}
      {!isLocked && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-amber-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Owner Editing Mode:</strong> Aap apni real image upload karein aur bio likhein. Image select hotay hi <strong>Save ka option</strong> aayega. Kaam complete honay par <strong>"Save & Lock Roster"</strong> button daba dein taake koi aur change na kar sakay.
            </span>
          </div>
          <button
            type="button"
            onClick={handleLockRoster}
            className="px-3 py-1 rounded-lg bg-amber-400 text-black font-bold text-[11px] uppercase tracking-wider shrink-0 hover:bg-amber-300 transition-colors"
          >
            Lock Now
          </button>
        </div>
      )}

      {/* Team Members Grid — Fully Responsive 3-Columns Layout for 6 Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {team.map((member, index) => {
          const isDragging = dragOverMemberId === member.id;
          const isCover = member.imageFit !== 'contain';
          const isCoreThree = index < 3;

          return (
            <div
              key={member.id}
              id={`team-member-card-${member.id}`}
              onDragOver={(e) => {
                if (!isLocked) {
                  e.preventDefault();
                  setDragOverMemberId(member.id);
                }
              }}
              onDragLeave={() => setDragOverMemberId(null)}
              onDrop={(e) => handleDrop(e, member.id)}
              className={`group relative rounded-2xl overflow-hidden bg-[#0d0e13] border transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-black ${
                isDragging 
                  ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]' 
                  : 'border-white/[0.08] hover:border-white/25'
              }`}
            >
              {/* Profile Photo Area — Pure, Clean, Unfiltered Display */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className={`w-full h-full transition-transform duration-500 ease-out ${
                    isCover ? 'object-cover object-top group-hover:scale-103' : 'object-contain p-2'
                  }`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';
                  }}
                />

                {/* Drag Overlay feedback (only when unlocked) */}
                {!isLocked && isDragging && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-30">
                    <Upload className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
                    <span className="text-white font-mono text-xs font-bold uppercase tracking-wider">
                      Drop Image Here
                    </span>
                    <span className="text-zinc-400 text-[10px] font-mono mt-1">
                      Direct photo upload & save
                    </span>
                  </div>
                )}

                {/* Top Badge: Custom Image Status or Default */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
                  {member.isCustomImage ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                      Verified Photo
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/70 text-zinc-400 border border-white/10 backdrop-blur-md">
                      Member #{index + 1}
                    </span>
                  )}
                </div>

                {/* Social Links floating overlay on card */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  {member.socialLinks && member.socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/20 transition-colors"
                      aria-label={`${member.name} on ${s.platform}`}
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>

                {/* Overlay Action Buttons:
                    - In LOCKED mode: ONLY show high-res full preview lightbox button (visitors cannot edit).
                    - In UNLOCKED mode: show Upload Photo, Lightbox, Settings, and Delete.
                */}
                <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  {!isLocked ? (
                    <>
                      {/* Upload Photo Button */}
                      <button
                        type="button"
                        onClick={() => handleDirectUploadClick(member.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-black/85 hover:bg-black text-white text-xs font-mono font-medium backdrop-blur-md border border-white/20 hover:border-amber-400/50 transition-all shadow-lg cursor-pointer"
                        title="Upload your own picture from phone or computer"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload & Save</span>
                      </button>

                      {/* View Full Lightbox */}
                      <button
                        type="button"
                        onClick={() => setPreviewLightbox({ url: member.image, title: member.name })}
                        className="p-2 rounded-xl bg-black/85 hover:bg-black text-zinc-300 hover:text-white text-xs backdrop-blur-md border border-white/20 transition-colors"
                        title="View full image in high resolution"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Customize / Edit Modal */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingMember(member);
                        }}
                        className="p-2 rounded-xl bg-black/85 hover:bg-black text-zinc-300 hover:text-white text-xs backdrop-blur-md border border-white/20 transition-colors"
                        title="Edit Name, Role, Image Fit, or Bio"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>

                      {/* Remove Button for optional members */}
                      {!isCoreThree && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white text-xs backdrop-blur-md border border-rose-500/30 transition-colors"
                          title="Delete this team member card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  ) : (
                    /* Locked View: Visitor can only view high-res image */
                    <button
                      type="button"
                      onClick={() => setPreviewLightbox({ url: member.image, title: member.name })}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-black/75 hover:bg-black/90 text-zinc-200 hover:text-white text-xs font-mono backdrop-blur-md border border-white/10 hover:border-white/30 transition-all shadow-md"
                      title="View full portrait"
                    >
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      <span>View Full Portrait</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Details — Clean, below photo, no overlapping gradient on face */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#0d0e13]">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                      {member.name}
                    </h3>
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingMember(member);
                        }}
                        className="text-zinc-400 hover:text-amber-400 p-1 rounded transition-colors"
                        title="Edit member name/role"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="text-xs font-mono tracking-wider uppercase text-amber-400 mt-1">
                    {member.role}
                  </div>

                  <p className="text-zinc-300 text-sm mt-3 leading-relaxed font-light">
                    “{member.bio}”
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills && member.skills.map((skill, sIdx) => {
                      const isPrimary = sIdx === 0;
                      return (
                        <span
                          key={skill}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider ${
                            isPrimary
                              ? 'bg-white/15 text-white font-semibold border border-white/30'
                              : 'bg-zinc-900 text-zinc-400 border border-white/[0.05]'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Customize Character / Member Details with Prominent Save Button */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          isNew={isAddingNew}
          onClose={() => {
            setEditingMember(null);
            setIsAddingNew(false);
          }}
          onSave={handleSaveModal}
          onReset={() => handleResetMember(editingMember.id)}
        />
      )}

      {/* LIGHTBOX: View Full Resolution Unfiltered Image */}
      {previewLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setPreviewLightbox(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-zinc-900/90 text-xs font-mono">
              <span className="text-white font-bold">{previewLightbox.title} • Full Resolution Portrait</span>
              <button
                type="button"
                onClick={() => setPreviewLightbox(null)}
                className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black overflow-auto">
              <img
                src={previewLightbox.url}
                alt={previewLightbox.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="px-5 py-3 border-t border-white/10 bg-zinc-900/90 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Original unedited photo without AI distortion or age alterations</span>
              <button
                type="button"
                onClick={() => setPreviewLightbox(null)}
                className="px-3 py-1 rounded bg-white text-black font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Owner PIN Unlock Dialog */}
      {pinModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPinModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#0e0f14] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Owner Admin Unlock</span>
              </div>
              <button
                type="button"
                onClick={() => setPinModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Enter your owner PIN to unlock team profile editing. Once unlocked, you can upload photos, change bios, and re-lock when finished.
            </p>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Owner Security PIN (Default: 804)
                </label>
                <input
                  type="password"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Enter PIN..."
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white font-mono text-center tracking-widest focus:outline-none focus:border-amber-400"
                />
                {pinError && (
                  <p className="text-rose-400 text-xs font-mono mt-1.5">{pinError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Unlock Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Team Data Backup & Code Export */}
      {exportModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setExportModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0c0d12] border border-white/20 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Team Data Permanent Backup</h3>
              </div>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Aap ke team members ka tamam data (photos, names, roles, bios) yahan JSON format mein maujood hai. Aap isay copy kar ke mehfooz rakh sakte hain:
            </p>

            <div className="flex-1 overflow-auto bg-black p-4 rounded-xl border border-white/10 text-[11px] font-mono text-zinc-300 select-all max-h-80">
              <pre>{JSON.stringify(team, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
              <span className="text-xs font-mono text-zinc-400">
                {team.length} members loaded in storage
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyBackup}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  {copiedBackup ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedBackup ? 'Copied to Clipboard!' : 'Copy Backup JSON'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/**
 * Modal to edit character photo, name, role, bio, and display fit
 * with clear and prominent SAVE action
 */
interface EditMemberModalProps {
  member: CustomMemberState;
  isNew?: boolean;
  onClose: () => void;
  onSave: (member: CustomMemberState) => void;
  onReset: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, isNew, onClose, onSave, onReset }) => {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [bio, setBio] = useState(member.bio);
  const [image, setImage] = useState(member.image);
  const [skillsStr, setSkillsStr] = useState((member.skills || []).join(', '));
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>(member.imageFit || 'cover');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const dataUrl = await processImageFile(file);
      setImage(dataUrl);
    } catch (err: any) {
      alert(err?.message || 'Could not process image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setImage(urlInput.trim());
      setUrlInput('');
    }
  };

  const handleSave = () => {
    const parsedSkills = skillsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    onSave({
      ...member,
      name: name.trim() || member.name,
      role: role.trim() || member.role,
      bio: bio.trim() || member.bio,
      skills: parsedSkills.length > 0 ? parsedSkills : member.skills,
      image,
      imageFit,
      isCustomImage: image !== defaultTeamMembers.find(m => m.id === member.id)?.image
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-xl bg-[#0f1016] border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0f]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold font-sans text-white">
              {isNew ? 'Add New Team Member' : 'Edit Member Profile & Bio'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Photo Preview & Upload Controls */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-zinc-950/70 border border-white/10">
            <div className="relative w-28 h-36 rounded-lg overflow-hidden bg-black border border-white/20 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src={image}
                alt="Preview"
                className={`w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
                Photo Ready
              </span>
            </div>

            <div className="flex-1 space-y-3 w-full">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 block mb-1">
                  Step 1: Set Profile Photo
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Apne phone ya computer se direct picture upload karein. Natural colors and zero age distortion guaranteed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono transition-colors cursor-pointer shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Processing...' : 'Upload Real Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageFit(imageFit === 'cover' ? 'contain' : 'cover')}
                  className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                  title="Toggle between fill and complete photo without crop"
                >
                  Fit: <span className="text-amber-400 font-bold uppercase">{imageFit}</span>
                </button>
              </div>

              {/* Or paste URL */}
              <form onSubmit={handleApplyUrl} className="flex items-center gap-2 pt-1">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={!urlInput.trim()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-xs font-mono border border-white/10 transition-colors"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Member Name and Role Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-300 block mb-1.5">
                Full Name (Asli Naam) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Website Owner / Muhammad Sabtain / Your Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-300 block mb-1.5">
                Role & Title (Designation) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founder & Creative Director / Senior 3D Animator"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-300 block mb-1.5">
                Profile Bio & Tagline (Aap Ka Bio) <span className="text-amber-400">*</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Write your creative story, bio, or studio mission..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1.5">
                Skills (separated by commas)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="e.g. Creative Direction, Video Editing, AI Animation"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer with CLEAR & PROMINENT SAVE ACTION */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0a0a0f]">
          {!isNew ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile & Photo (Mehfooz Karein)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
