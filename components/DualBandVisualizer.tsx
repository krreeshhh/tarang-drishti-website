'use client';

import React from 'react';

export const DualBandVisualizer: React.FC = () => {
  return (
    <section id="dual-band" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
            Simultaneous Spectrum Operation
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Dual-Band Conformal Architecture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Integrated multi-topology conformal array combining a low-frequency tactical squad voice PIFA with a high-bandwidth L-band microstrip patch on a unified footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Band 1: UHF Element */}
          <div className="card-tech border-t-4 border-t-indigo-600 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-tech badge-tech-uhf">BAND 01 • TACTICAL SQUAD VOICE</span>
              <span className="font-mono text-xs font-bold text-indigo-700">433 – 436 MHz</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-charcoal mb-2">
              UHF Planar Inverted-F Antenna (PIFA)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Engineered specifically to solve human body and wall penetration in dense CQB urban concrete structures. Uses an optimized capacitive top patch with a conductive shorting post to compress resonant length into the curved helmet crown.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 border border-borderlight font-mono text-xs mb-6">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Resonance</span>
                <span className="font-bold text-indigo-700 text-sm">435–436 MHz</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Return Loss (S11)</span>
                <span className="font-bold text-charcoal text-sm">≈ -10.2 dB</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Validation</span>
                <span className="font-bold text-emerald-700 text-xs">CST Validated</span>
              </div>
            </div>
          </div>

          {/* Band 2: L-Band Element */}
          <div className="card-tech border-t-4 border-t-sky-600 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-tech badge-tech-lband">BAND 02 • HIGH-BANDWIDTH ISR</span>
              <span className="font-mono text-xs font-bold text-sky-700">≈ 1.51 GHz</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-charcoal mb-2">
              L-Band Microstrip Patch
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              High-gain directional patch optimized for streaming squad helmet-cam video, drone telemetry links, and soldier positioning signals. Backed by the AMC metasurface to produce a clean directional upward lobe.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 border border-borderlight font-mono text-xs mb-6">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Resonance</span>
                <span className="font-bold text-sky-700 text-sm">≈ 1.51 GHz</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Return Loss (S11)</span>
                <span className="font-bold text-charcoal text-sm">≈ -18.1 dB</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Directional Gain</span>
                <span className="font-bold text-emerald-700 text-sm">≈ 7.17 dBi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-borderdark p-6 bg-slate-50 flex flex-wrap items-center justify-between gap-6 tech-corner-accent">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-700 uppercase">
              <span className="status-dot"></span> Verified Cross-Coupling Isolation
            </div>
            <div className="font-display font-bold text-xl text-charcoal mt-1">
              Inter-Element Isolation S21: -45 dB to -90 dB
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Confirmed across multiple CST Studio Suite configurations. The UHF and L-band elements coexist on the single Rogers RT/Duroid 5880 flexible substrate with near-zero mutual RF degradation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
