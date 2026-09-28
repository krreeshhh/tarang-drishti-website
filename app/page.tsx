'use client';

import React, { useRef } from 'react';
import {
  Navbar,
  HeroSection,
  ProblemSolution,
  AntennaLayerExplorer,
  DualBandVisualizer,
  ArchitectureDiagram,
  ZeroProfileSection,
  AMCVisualizer,
  SimulationResults,
  DevelopmentTimeline,
  ChallengeExplorer,
  HardwareExplorer,
  Applications,
  FutureEnhancements,
  ResearchReferences,
  Footer,
  HelmetViewerHandle,
} from '@/components';

export default function Home() {
  const viewerRef = useRef<HelmetViewerHandle>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection viewerRef={viewerRef} />
      <ProblemSolution />
      <AntennaLayerExplorer viewerRef={viewerRef} />
      <DualBandVisualizer />
      <ArchitectureDiagram />
      <ZeroProfileSection />
      <AMCVisualizer />
      <SimulationResults />
      <DevelopmentTimeline />
      <ChallengeExplorer />
      <HardwareExplorer />
      <Applications />
      <FutureEnhancements />
      <ResearchReferences />
      <Footer />
    </main>
  );
}
