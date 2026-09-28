'use client';

import React from 'react';
import { Info } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <section id="architecture" className="py-16 bg-subtlegray border-b border-borderlight tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
              System Schematic & Feed System
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
              Core RF Architecture
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              End-to-end signal propagation from radiating conformal patches to soldier radio interface.
            </p>
          </div>
        </div>

        <div className="bg-white border border-borderdark p-6 sm:p-10 tech-corner-accent shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center text-center font-mono">
            <div id="diag-patch" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">01 / RADIATOR</span>
              <div className="font-bold text-xs text-charcoal mt-1">UHF + L-Band Patches</div>
              <span className="text-[10px] text-amber-700 block mt-0.5">Copper / PEC</span>
            </div>

            <div className="hidden md:flex justify-center text-slate-400">→</div>

            <div id="diag-substrate" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">02 / SUBSTRATE</span>
              <div className="font-bold text-xs text-charcoal mt-1">Rogers 5880</div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Flexible PTFE</span>
            </div>

            <div className="hidden md:flex justify-center text-slate-400">→</div>

            <div id="diag-amc" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">03 / GROUND</span>
              <div className="font-bold text-xs text-charcoal mt-1">AMC / EBG Metasurface</div>
              <span className="text-[10px] text-emerald-700 block mt-0.5">SAR Shield</span>
            </div>

            <div className="hidden md:flex justify-center text-slate-400">→</div>

            <div id="diag-diplexer" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">04 / FILTER</span>
              <div className="font-bold text-xs text-charcoal mt-1">Diplexer Network</div>
              <span className="text-[10px] text-indigo-700 block mt-0.5">UHF / L Matching</span>
            </div>
          </div>

          <div className="my-6 border-t border-dashed border-borderlight"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center font-mono">
            <div id="diag-coax" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">05 / FEEDLINE</span>
              <div className="font-bold text-xs text-charcoal mt-1">Single RG-316 Coax</div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Liner-Routed</span>
            </div>

            <div className="hidden md:flex justify-center text-slate-400">→</div>

            <div id="diag-breakaway" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">06 / SAFETY</span>
              <div className="font-bold text-xs text-charcoal mt-1">Breakaway RF Connector</div>
              <span className="text-[10px] text-amber-600 block mt-0.5">Quick-Disconnect</span>
            </div>

            <div className="hidden md:flex justify-center text-slate-400">→</div>

            <div id="diag-radio" className="p-3 border border-borderlight bg-white transition-all duration-300">
              <span className="text-[9px] text-slate-400 block uppercase">07 / INTERFACE</span>
              <div className="font-bold text-xs text-charcoal mt-1">Radio / Camera Adapter</div>
              <span className="text-[10px] text-sky-700 block mt-0.5">Field Swappable</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 border border-borderlight text-xs font-mono text-slate-600 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-600" />
              <span>
                Single 50Ω coaxial feed line carries combined UHF & L-band channels via integrated diplexing circuit.
              </span>
            </div>
            <span className="text-slate-400">Diplexer Tooling: CST Circuit Studio</span>
          </div>
        </div>
      </div>
    </section>
  );
};
