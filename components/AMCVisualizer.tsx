'use client';

import React from 'react';
import { PolarPatternCanvas } from './SimulationPlots';

export const AMCVisualizer: React.FC = () => {
  return (
    <section id="amc-ebg" className="py-16 bg-white border-b border-borderlight tech-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Metamaterial Electromagnetic Shielding
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight mb-4">
              Directed Radiation with AMC / EBG
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Conventional antennas mounted near the human head face severe radiation absorption (SAR) and frequency detuning. Tarang Drishti integrates an <strong>Artificial Magnetic Conductor (AMC) / Electromagnetic Bandgap (EBG)</strong> metasurface layer between the antenna and the helmet shell.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-borderlight">
                <div className="font-mono font-bold text-xs text-charcoal mb-1">
                  UPWARD / OUTWARD DIRECTED RADIATION
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  AMC/EBG integration is intended to control the radiation environment around the wearer, reflecting electromagnetic waves in-phase into the upper hemisphere toward communication relays.
                </p>
              </div>

              <div className="p-4 bg-white border border-borderlight">
                <div className="font-mono font-bold text-xs text-emerald-700 mb-1">
                  SAFETY VALIDATION PATHWAY
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Head-SAR evaluation is part of the safety validation pathway. Simulation against CST SAM Head Phantom models ensures compliance with occupational RF exposure limits.
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900">
              <strong>Technical Note:</strong> Head-SAR evaluation and full phantom dosimetry is part of the ongoing design validation pathway; final certification will be conducted during prototype lab testing.
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="card-tech bg-white border border-borderdark p-6 tech-corner-accent">
              <div className="flex items-center justify-between mb-4 border-b border-borderlight pb-3 font-mono text-xs">
                <span className="font-bold text-charcoal">FARFIELD RADIATION PATTERN (POLAR CUT)</span>
                <span className="text-sky-700 font-semibold">CST Farfield Analyzer</span>
              </div>

              <div className="w-full h-[320px] relative">
                <PolarPatternCanvas />
              </div>

              <div className="mt-4 pt-3 border-t border-borderlight flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
                <span>MAIN LOBE: UPWARD ZENITH (+7.17 dBi)</span>
                <span className="text-emerald-700 font-semibold">BACKLOBE NULL: SUPPRESSED &gt; 18 dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
