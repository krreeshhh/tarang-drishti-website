'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { S11Canvas, CouplingCanvas } from './SimulationPlots';

export const SimulationResults: React.FC = () => {
  return (
    <section id="simulation" className="py-16 bg-subtlegray border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Electromagnetic Verification
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
              Simulation Results
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Numerical RF simulation results from CST Studio Suite and Antenna Magus synthesis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-tech badge-tech-success">
              <span className="status-dot"></span> SIMULATION VALIDATED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* UHF Card */}
          <div className="card-tech bg-white border border-borderlight">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-indigo-700 font-bold uppercase">UHF BAND (PIFA)</span>
              <span className="badge-tech badge-tech-uhf text-[10px]">CST VALIDATED</span>
            </div>
            <div className="font-mono font-bold text-2xl text-charcoal">433 – 436 MHz</div>
            <div className="mt-3 space-y-1 font-mono text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Return Loss S11:</span>
                <strong className="text-charcoal">≈ -10.2 dB</strong>
              </div>
              <div className="flex justify-between">
                <span>Conductor:</span>
                <span>Copper (PEC)</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-700 font-bold">Validated</span>
              </div>
            </div>
          </div>

          {/* L-Band Card */}
          <div className="card-tech bg-white border border-borderlight">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-sky-700 font-bold uppercase">L-BAND (PATCH)</span>
              <span className="badge-tech badge-tech-lband text-[10px]">CST VALIDATED</span>
            </div>
            <div className="font-mono font-bold text-2xl text-charcoal">≈ 1.51 GHz</div>
            <div className="mt-3 space-y-1 font-mono text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Return Loss S11:</span>
                <strong className="text-charcoal">≈ -18.1 dB</strong>
              </div>
              <div className="flex justify-between">
                <span>Directional Gain:</span>
                <strong className="text-sky-700">≈ 7.17 dBi</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-700 font-bold">Validated</span>
              </div>
            </div>
          </div>

          {/* Shared Substrate Card */}
          <div className="card-tech bg-white border border-borderlight">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-emerald-700 font-bold uppercase">SHARED SUBSTRATE</span>
              <span className="badge-tech badge-tech-success text-[10px]">COUPLING VALIDATED</span>
            </div>
            <div className="font-mono font-bold text-2xl text-charcoal">-45 to -90 dB</div>
            <div className="mt-3 space-y-1 font-mono text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Isolation S21:</span>
                <strong className="text-charcoal">Up to -90 dB</strong>
              </div>
              <div className="flex justify-between">
                <span>Substrate:</span>
                <span>Rogers 5880</span>
              </div>
              <div className="flex justify-between">
                <span>Interference:</span>
                <span className="text-emerald-700 font-bold">Near-Zero</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* S11 Plot */}
          <div className="card-tech bg-white border border-borderdark p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3 border-b border-borderlight pb-3 font-mono text-xs">
              <span className="font-bold text-charcoal">RETURN LOSS S11 FREQUENCY RESPONSE</span>
              <span className="text-slate-500">CST S-Parameter Solver</span>
            </div>

            <div className="w-full h-[280px] relative">
              <S11Canvas />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Markers: 435.5 MHz (-10.2 dB) • 1510 MHz (-18.1 dB)</span>
              <span className="text-rose-600 font-semibold">-10 dB Standard Limit</span>
            </div>
          </div>

          {/* S21 Coupling Plot */}
          <div className="card-tech bg-white border border-borderdark p-6 tech-corner-accent">
            <div className="flex items-center justify-between mb-3 border-b border-borderlight pb-3 font-mono text-xs">
              <span className="font-bold text-charcoal">SHARED-SUBSTRATE COUPLING S21 ISOLATION</span>
              <span className="text-slate-500">UHF ↔ L-Band Coupling</span>
            </div>

            <div className="w-full h-[280px] relative">
              <CouplingCanvas />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>High Isolation Band: -45 dB to -90 dB across band</span>
              <span className="text-emerald-700 font-semibold">Low Mutual Interference</span>
            </div>
          </div>
        </div>

        {/* Data Disclaimer */}
        <div className="p-3 bg-white border border-borderlight text-xs font-mono text-slate-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Data Disclaimer:</strong> Plots and metrics represent verified electromagnetic simulation results from CST Studio Suite using published material properties (Rogers RT/Duroid 5880). Physical prototype chamber testing is planned in subsequent project phases.
          </span>
        </div>
      </div>
    </section>
  );
};
