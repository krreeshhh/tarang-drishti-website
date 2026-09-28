'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const DevelopmentTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Project Maturity Gauge
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
              Current Development Status
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hardware project lifecycle tracking from CST synthesis to ballistic integration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-300 font-mono text-emerald-900 text-right">
              <span className="text-[10px] block uppercase text-emerald-700">Overall Maturity</span>
              <span className="font-extrabold text-xl leading-none">45% COMPLETED</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="w-full bg-slate-100 h-3 border border-borderlight relative overflow-hidden">
            <div className="bg-charcoal h-full transition-all duration-1000" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-slate-400 mt-2">
            <span>CONCEPT (0%)</span>
            <span className="text-emerald-700 font-bold">CURRENT: 45% (SIMULATION VALIDATED)</span>
            <span>FIELD-DEPLOYED (100%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stage 1 */}
          <div className="card-tech bg-emerald-50/50 border-emerald-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-emerald-800">STAGE 01</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Standalone UHF Element</h4>
            <p className="text-xs text-slate-600 mt-1">
              CST Studio Suite simulation of 435 MHz PIFA with return loss S11 = -10.2 dB.
            </p>
            <span className="badge-tech badge-tech-success text-[10px] mt-3">✓ Simulation Validated</span>
          </div>

          {/* Stage 2 */}
          <div className="card-tech bg-emerald-50/50 border-emerald-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-emerald-800">STAGE 02</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Standalone L-Band Element</h4>
            <p className="text-xs text-slate-600 mt-1">
              Microstrip patch simulated at 1.51 GHz with S11 = -18.1 dB and 7.17 dBi gain.
            </p>
            <span className="badge-tech badge-tech-success text-[10px] mt-3">✓ Simulation Validated</span>
          </div>

          {/* Stage 3 */}
          <div className="card-tech bg-emerald-50/50 border-emerald-300">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-emerald-800">STAGE 03</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Shared Substrate Coupling</h4>
            <p className="text-xs text-slate-600 mt-1">
              Inter-element isolation between UHF and L-band validated at -45 to -90 dB.
            </p>
            <span className="badge-tech badge-tech-success text-[10px] mt-3">✓ Coupling Validated</span>
          </div>

          {/* Stage 4 */}
          <div className="card-tech bg-sky-50/40 border-sky-300 tech-corner-accent">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-sky-800">STAGE 04</span>
              <span className="status-dot"></span>
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">AMC / EBG Metasurface</h4>
            <p className="text-xs text-slate-600 mt-1">
              Metamaterial unit cell synthesis in CST for in-phase reflection &amp; backlobe suppression.
            </p>
            <span className="badge-tech badge-tech-lband text-[10px] mt-3">→ Next Design Phase</span>
          </div>

          {/* Stage 5 */}
          <div className="card-tech opacity-75">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-slate-500">STAGE 05</span>
              <span className="font-mono text-[10px] text-slate-400">PLANNED</span>
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Helmet-Conformal Optimization</h4>
            <p className="text-xs text-slate-600 mt-1">
              Curved finite-difference modeling to compensate for conformal frequency detuning.
            </p>
            <span className="badge-tech text-[10px] mt-3 text-slate-400">→ Future</span>
          </div>

          {/* Stage 6 */}
          <div className="card-tech opacity-75">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-slate-500">STAGE 06</span>
              <span className="font-mono text-[10px] text-slate-400">PLANNED</span>
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Prototype Fabrication</h4>
            <p className="text-xs text-slate-600 mt-1">
              Screen printing / copper etching on flexible Rogers RT/Duroid 5880 sheets.
            </p>
            <span className="badge-tech text-[10px] mt-3 text-slate-400">→ Future</span>
          </div>

          {/* Stage 7 */}
          <div className="card-tech opacity-75">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-slate-500">STAGE 07</span>
              <span className="font-mono text-[10px] text-slate-400">PLANNED</span>
            </div>
            <h4 className="font-display font-bold text-sm text-charcoal">Head Phantom &amp; SAR Testing</h4>
            <p className="text-xs text-slate-600 mt-1">
              Dosimetric SAR testing using IEEE/IEC standard head liquid phantom chamber.
            </p>
            <span className="badge-tech text-[10px] mt-3 text-slate-400">→ Future</span>
          </div>

          {/* Stage 8 - Defence Roadmap */}
          <div className="card-tech bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                DEFENCE ROADMAP
              </span>
              <h4 className="font-display font-bold text-sm text-white mt-1">iDEX / DRDO TDF Path</h4>
              <p className="text-xs text-slate-300 mt-1">
                Positioned for non-dilutive defense innovation grants under Atmanirbhar Bharat.
              </p>
            </div>
            <div className="font-mono text-[11px] text-emerald-400 mt-3">Team Odyssey_</div>
          </div>
        </div>
      </div>
    </section>
  );
};
