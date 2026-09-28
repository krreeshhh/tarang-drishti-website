'use client';

import React from 'react';
import { Cpu, Layers, ShieldAlert, Zap } from 'lucide-react';

export const ChallengeExplorer: React.FC = () => {
  return (
    <section id="challenges" className="py-16 bg-subtlegray border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Risk Management &amp; Engineering Rigor
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Technical Challenges &amp; Mitigation Strategies
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Addressing the electromagnetic, mechanical, and human-factor constraints inherent to conformal wearable military RF design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenge 1 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="badge-tech badge-tech-copper">CHALLENGE 01 • ELECTROMAGNETIC</span>
              <Cpu className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Conformal Bending Detuning
            </h3>
            <div className="mb-4">
              <span className="font-mono text-xs font-bold text-red-600 block mb-0.5">TECHNICAL RISK:</span>
              <p className="text-xs text-slate-600 leading-normal">
                Bending planar microstrip patches onto curved helmet surfaces shifts resonant frequency away from target bands due to effective dielectric path distortion.
              </p>
            </div>
            <div className="bg-slate-50 p-3 border border-borderlight">
              <span className="font-mono text-xs font-bold text-emerald-700 block mb-0.5">ENGINEERING STRATEGY:</span>
              <p className="text-xs text-slate-700 leading-normal">
                Model and simulate the geometry directly onto compound curved helmet mesh in CST Studio Suite; optimize reactive capacitive loading stubs to pre-compensate for bending curvature.
              </p>
            </div>
          </div>

          {/* Challenge 2 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="badge-tech badge-tech-uhf">CHALLENGE 02 • MECHANICAL &amp; RF</span>
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Dual-Band Integration on Curved Footprint
            </h3>
            <div className="mb-4">
              <span className="font-mono text-xs font-bold text-red-600 block mb-0.5">TECHNICAL RISK:</span>
              <p className="text-xs text-slate-600 leading-normal">
                Large physical wavelength of UHF (433 MHz ≈ 69 cm free space) vs L-band (1.5 GHz) creates acute space constraints and mutual electromagnetic cross-coupling.
              </p>
            </div>
            <div className="bg-slate-50 p-3 border border-borderlight">
              <span className="font-mono text-xs font-bold text-emerald-700 block mb-0.5">ENGINEERING STRATEGY:</span>
              <p className="text-xs text-slate-700 leading-normal">
                Deploy topologically separated elements (PIFA for UHF, microstrip patch for L-band) sharing a single flexible Rogers substrate; achieved validated inter-element isolation of -45 to -90 dB.
              </p>
            </div>
          </div>

          {/* Challenge 3 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="badge-tech badge-tech-success">CHALLENGE 03 • SAFETY &amp; SAR</span>
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Operator Head RF Exposure (SAR)
            </h3>
            <div className="mb-4">
              <span className="font-mono text-xs font-bold text-red-600 block mb-0.5">TECHNICAL RISK:</span>
              <p className="text-xs text-slate-600 leading-normal">
                Close proximity of radiating conductor to soldier cranium risks high Specific Absorption Rate (SAR) and signal degradation through lossy biological tissue coupling.
              </p>
            </div>
            <div className="bg-slate-50 p-3 border border-borderlight">
              <span className="font-mono text-xs font-bold text-emerald-700 block mb-0.5">ENGINEERING STRATEGY:</span>
              <p className="text-xs text-slate-700 leading-normal">
                Integrate AMC/EBG metamaterial ground plane beneath radiating elements to introduce high-impedance surface reflection; suppresses backlobe toward head while directing energy upward/outward.
              </p>
            </div>
          </div>

          {/* Challenge 4 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3">
              <span className="badge-tech">CHALLENGE 04 • OPERATIONAL ERGONOMICS</span>
              <Zap className="w-4 h-4 text-charcoal" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Cable Snagging &amp; Operator Safety
            </h3>
            <div className="mb-4">
              <span className="font-mono text-xs font-bold text-red-600 block mb-0.5">TECHNICAL RISK:</span>
              <p className="text-xs text-slate-600 leading-normal">
                An external RF coaxial feedline connecting helmet to body-worn radio could snag on obstacles, causing neck trauma, soldier entanglement, or cable rupture.
              </p>
            </div>
            <div className="bg-slate-50 p-3 border border-borderlight">
              <span className="font-mono text-xs font-bold text-emerald-700 block mb-0.5">ENGINEERING STRATEGY:</span>
              <p className="text-xs text-slate-700 leading-normal">
                Route RG-316 coax flush along ARC rail retention channels; terminate at helmet nape with a calibrated spring-release breakaway quick-disconnect RF connector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
