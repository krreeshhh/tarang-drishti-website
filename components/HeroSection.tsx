'use client';

import React, { useState, useRef } from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { HelmetViewer, HelmetViewerHandle } from './HelmetViewer';

interface HeroSectionProps {
  viewerRef?: React.RefObject<HelmetViewerHandle | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ viewerRef: externalViewerRef }) => {
  const internalViewerRef = useRef<HelmetViewerHandle>(null);
  const viewerRef = externalViewerRef || internalViewerRef;

  const [activeBand, setActiveBand] = useState<'all' | 'uhf' | 'lband'>('all');
  const [rfPathStatus, setRfPathStatus] = useState<string | null>(null);

  const handleBandSwitch = (band: 'all' | 'uhf' | 'lband') => {
    setActiveBand(band);
    if (viewerRef.current) {
      viewerRef.current.setBand(band);
    }
  };

  const handleReset = () => {
    setActiveBand('all');
    if (viewerRef.current) {
      viewerRef.current.resetView();
    }
  };

  const telemetryData = {
    all: {
      band: 'DUAL-BAND ACTIVE',
      freq: '433M + 1.51G',
      s11: '-10.2 / -18.1 dB',
      gain: '≈ 7.17 dBi',
      ground: 'AMC / EBG',
    },
    uhf: {
      band: 'UHF TACTICAL',
      freq: '433 – 436 MHz',
      s11: '≈ -10.2 dB',
      gain: 'Standard Dipole Equiv.',
      ground: 'AMC / EBG',
    },
    lband: {
      band: 'L-BAND HIGH-BW',
      freq: '≈ 1.51 GHz (1510 MHz)',
      s11: '≈ -18.1 dB',
      gain: '≈ 7.17 dBi Directional',
      ground: 'AMC / EBG',
    },
  };

  const currentTelemetry = telemetryData[activeBand];

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:py-16 tech-grid-bg border-b border-borderlight overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Technical Metadata Ribbon with Team Logo */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-borderlight/80 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-tech font-bold">TEAM ODYSSEY_ #124965</span>
            <span className="badge-tech">SIH26185 • HARDWARE</span>
            <span className="badge-tech">ROBOTICS & DRONES</span>
            <span className="badge-tech badge-tech-success">
              <span className="status-dot"></span> 45% SIMULATION VALIDATED
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-500">
            <span>SUBSTRATE: ROGERS RT/DUROID 5880</span>
            <span>•</span>
            <span>DUAL-BAND: 433 MHz + 1.51 GHz</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Title & Key Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 mb-3 tracking-wider uppercase">
              <span className="w-2 h-2 bg-charcoal"></span> Advanced Wearable RF Hardware
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.08] mb-4">
              TARANG<br />DRISHTI
            </h1>

            <div className="font-mono text-base sm:text-lg font-semibold text-sky-700 mb-4 tracking-tight">
              Zero-Profile Conformal Dual-Band Helmet Antenna
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              A helmet-integrated communication antenna designed for reliable RF performance in urban CQB environments. Replacing failure-prone vest whip antennas with a ballistic-conformal radiating array engineered with CST Studio Suite simulation validation.
            </p>

            {/* Core Metrics Badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="p-3 bg-white border border-borderlight">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">UHF PIFA Element</span>
                <div className="font-mono font-bold text-sm text-indigo-600 mt-0.5">433 – 436 MHz</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">S11 ≈ -10.2 dB</div>
              </div>

              <div className="p-3 bg-white border border-borderlight">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">L-Band Patch Element</span>
                <div className="font-mono font-bold text-sm text-sky-600 mt-0.5">≈ 1.51 GHz</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">S11 ≈ -18.1 dB | 7.17 dBi</div>
              </div>

              <div className="p-3 bg-white border border-borderlight">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">Flexible Substrate</span>
                <div className="font-mono font-bold text-xs text-charcoal mt-0.5">ROGERS RT 5880</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Low-Loss PTFE Composite</div>
              </div>

              <div className="p-3 bg-white border border-borderlight">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">Metasurface Shield</span>
                <div className="font-mono font-bold text-xs text-emerald-700 mt-0.5">AMC / EBG GROUND</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Redirects SAR from Head</div>
              </div>
            </div>

            {/* Compliance & Team Note */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500 border-t border-borderlight pt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Team Odyssey_ • Target: NSG, Para-SF, CQB Tactical Units</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Ballistic Helmet Viewport */}
          <div className="lg:col-span-7 relative">
            <div className="bg-white border border-borderdark shadow-lg relative tech-corner-accent">
              {/* Canvas HUD Header */}
              <div className="p-3.5 bg-slate-50 border-b border-borderlight flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-charcoal">3D CONFORMAL HELMET VIEWER</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">WebGL Three.js Core</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>DRAG 360° • SCROLL ZOOM • INTERACTIVE HUD</span>
                </div>
              </div>

              {/* 3D Canvas Viewport */}
              <div className="relative w-full overflow-hidden" id="canvas-wrapper" style={{ height: '540px', minHeight: '480px' }}>
                <HelmetViewer
                  ref={viewerRef}
                  activeBand={activeBand}
                  onRFTraceComplete={() => {
                    setTimeout(() => setRfPathStatus(null), 4000);
                  }}
                />

                {/* Projected 3D HUD Markers Overlay */}
                <div id="hud-overlay" className="absolute inset-0 pointer-events-none z-10"></div>

                {/* Top Left Overlay: Telemetry Readout */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-borderdark p-3 max-w-[240px] shadow-sm z-20 pointer-events-none font-mono">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Active State</div>
                  <div id="telemetry-band" className="font-bold text-xs text-charcoal mt-0.5">
                    {currentTelemetry.band}
                  </div>
                  <div className="mt-2 space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Freq:</span>
                      <span id="telemetry-freq" className="font-semibold text-charcoal">
                        {currentTelemetry.freq}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">S11:</span>
                      <span id="telemetry-s11" className="font-semibold text-emerald-700">
                        {currentTelemetry.s11}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Gain:</span>
                      <span id="telemetry-gain" className="font-semibold text-sky-700">
                        {currentTelemetry.gain}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Ground:</span>
                      <span className="font-semibold text-emerald-700">{currentTelemetry.ground}</span>
                    </div>
                  </div>
                </div>

                {/* Top Right Controls: Reset Only */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <button
                    id="btn-reset-view"
                    onClick={handleReset}
                    className="btn-tech text-[11px] py-1.5 px-2.5 bg-white/95"
                    title="Reset Camera View"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">RESET</span>
                  </button>
                </div>

                {/* Bottom Center: Dual-Band Selector Buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-borderdark p-1.5 flex items-center gap-1 shadow-md">
                  <button
                    id="btn-band-all"
                    onClick={() => handleBandSwitch('all')}
                    className={`btn-tech text-xs py-1 px-3 ${activeBand === 'all' ? 'btn-tech-active' : ''}`}
                  >
                    DUAL-BAND
                  </button>
                  <button
                    id="btn-band-uhf"
                    onClick={() => handleBandSwitch('uhf')}
                    className={`btn-tech text-xs py-1 px-3 ${activeBand === 'uhf' ? 'btn-tech-active' : ''}`}
                  >
                    UHF • 433 MHz
                  </button>
                  <button
                    id="btn-band-lband"
                    onClick={() => handleBandSwitch('lband')}
                    className={`btn-tech text-xs py-1 px-3 ${activeBand === 'lband' ? 'btn-tech-active' : ''}`}
                  >
                    L-BAND • 1.5 GHz
                  </button>
                </div>

                {/* RF Path Status Toast */}
                {rfPathStatus && (
                  <div
                    id="rf-path-status"
                    className="absolute bottom-16 left-4 right-4 bg-charcoal text-white font-mono text-[11px] p-2.5 border-l-4 border-sky-400 z-30 shadow-lg animate-pulse"
                  >
                    {rfPathStatus}
                  </div>
                )}
              </div>

              {/* Canvas Technical Footer Bar */}
              <div className="p-3 bg-white border-t border-borderlight flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-4">
                  <span>CONFORMAL FLUSH MOUNT: ZERO-PROFILE</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">BREAKAWAY RF CONNECTOR ARMORED</span>
                </div>
                <div className="text-[11px] text-slate-400 font-semibold">
                  TEAM ODYSSEY_ • SIH 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
