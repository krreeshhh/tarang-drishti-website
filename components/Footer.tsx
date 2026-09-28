'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-borderlight py-12 text-slate-600 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-borderlight">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <span className="font-display font-extrabold text-base text-charcoal leading-none block">
                TARANG DRISHTI
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                TEAM ODYSSEY_ · ID: 124965
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-md font-sans">
              Helmet-Mounted Zero-Profile Conformal Dual-Band Antenna designed for tactical squad communications in urban CQB environments. Smart India Hackathon 2026.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="badge-tech">TEAM ODYSSEY_</span>
              <span className="badge-tech">TEAM ID: 124965</span>
              <span className="badge-tech badge-tech-success">
                <span className="status-dot"></span> HARDWARE CATEGORY
              </span>
            </div>
          </div>

          {/* Problem Statement Col */}
          <div>
            <div className="font-bold text-charcoal uppercase tracking-wider mb-3">Problem Statement</div>
            <div className="space-y-1.5 text-[11px]">
              <div>• ID: SIH26185</div>
              <div>• Title: Communications in Urban CQB</div>
              <div>• Theme: Robotics and Drones</div>
              <div>• Target: CQB Commando Units</div>
            </div>
          </div>

          {/* Verified Parameters Col */}
          <div>
            <div className="font-bold text-charcoal uppercase tracking-wider mb-3">Verified Parameters</div>
            <div className="space-y-1.5 text-[11px]">
              <div>• UHF: 433–436 MHz (S11 ≈ -10.2 dB)</div>
              <div>• L-Band: ≈ 1.51 GHz (S11 ≈ -18.1 dB)</div>
              <div>• Gain: 7.17 dBi Directional</div>
              <div>• Substrate: Rogers RT/Duroid 5880</div>
              <div>• Isolation: -45 to -90 dB</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 Team Odyssey_ • Smart India Hackathon 2026 • Defence-Tech Innovation
          </div>
          <div className="flex items-center gap-4">
            <span>ATMANIRBHAR BHARAT</span>
            <span>•</span>
            <span>CST STUDIO SUITE VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
