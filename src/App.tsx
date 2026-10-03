/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from './types';
import { projects } from './data/studioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { WorkPortfolio } from './components/WorkPortfolio';
import { VfxBreakdownSection } from './components/VfxBreakdownSection';
import { ServicesSection } from './components/ServicesSection';
import { TechPipelineSection } from './components/TechPipelineSection';
import { ScopeEstimatorSection } from './components/ScopeEstimatorSection';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AudioVisualizerDock } from './components/AudioVisualizerDock';

export default function App() {
  // Currently active project for detail modal display
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Injected inquiry spec for Contact form
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [inquiryProjectType, setInquiryProjectType] = useState<string>('AI Video Production');

  // Smooth scroll handler helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open the primary showreel in the modal
  const handleWatchShowreel = () => {
    // Select the first featured project (AI Cinematic Worlds) as the showreel showcase
    const showreelProject = projects.find(p => p.featured) || projects[0];
    setSelectedProject(showreelProject);
  };

  // Handle transferring project scope from Estimator into Contact form
  const handleApplySpecToContact = (specSummary: string, projectType: string) => {
    setInquiryMessage(specSummary);
    setInquiryProjectType(projectType);
    scrollToSection('contact');
  };

  // Handle project inquiry from within ProjectModal
  const handleCommissionFromModal = (projectName: string) => {
    setInquiryMessage(`Hello AP Visuals team,\n\nI reviewed your project "${projectName}" and would like to commission a similar visual production with your team. Please share your availability and consultation details.`);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 selection:bg-zinc-800 selection:text-white flex flex-col antialiased">
      {/* Sticky Header & Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onExploreWork={() => scrollToSection('work')}
          onMeetTeam={() => scrollToSection('team')}
          onWatchReel={handleWatchShowreel}
        />

        {/* 2. Stats Strip */}
        <StatsStrip />

        {/* 3. Portfolio: Our Work */}
        <WorkPortfolio 
          onSelectProject={(project) => setSelectedProject(project)} 
        />

        {/* 4. VFX Breakdown & AI Transformation Lab (Interactive Before/After Slider) */}
        <VfxBreakdownSection />

        {/* 5. Services: What We Create */}
        <ServicesSection />

        {/* 6. Tech Pipeline & Proprietary Toolchain */}
        <TechPipelineSection />

        {/* 7. Interactive Production Scope & Quote Estimator */}
        <ScopeEstimatorSection 
          onApplySpecToContact={handleApplySpecToContact}
        />

        {/* 8. Process: Our Creative Process */}
        <ProcessSection />

        {/* 9. Team: Meet The Team */}
        <TeamSection />

        {/* 10. Client Reviews & Industry Recognition */}
        <TestimonialsSection />

        {/* 11. About: Where Creativity Meets AI */}
        <AboutSection />

        {/* 12. Social Channels: Follow Our Visual Journey */}
        <SocialSection />

        {/* 13. Contact Section */}
        <ContactSection 
          externalMessage={inquiryMessage}
          externalProjectType={inquiryProjectType}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Audio Engine & Quick Jump Dock */}
      <AudioVisualizerDock onNavigate={scrollToSection} />

      {/* Project Video Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onCommission={handleCommissionFromModal}
      />
    </div>
  );
}
