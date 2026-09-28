'use client';

import React from 'react';
import { WifiOff, AlertTriangle, Radio, CheckCircle, ArrowDownRight } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="overview" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Operational Failure Modes in Urban CQB
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Why Conventional Vest-Mounted Antennas Fall Short
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            National Security Guard (NSG) and Special Forces personnel operating in tight, multi-story urban close-quarters combat encounter severe physical, electromagnetic, and tactical liabilities with legacy vest-mounted whip antennas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="card-tech border-t-4 border-t-red-500">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-red-600">01 / ELECTROMAGNETIC</span>
              <WifiOff className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              RF Performance Failure
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Low antenna mounting on tactical plate carriers causes severe human body shadowing and ground signal attenuation in confined indoor rooms and stairwells.
            </p>
            <div className="font-mono text-xs text-slate-500 bg-slate-50 p-2.5 border border-borderlight">
              Result: Signal fade, dead-zones, and comms blackout during critical tactical breach operations.
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-tech border-t-4 border-t-amber-500">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-amber-600">02 / MECHANICAL</span>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Physical Snagging Hazard
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              External protruding whip antennas snag on doorways, window frames, concertina wire, and vehicle hatches during high-speed room-clearing maneuvers.
            </p>
            <div className="font-mono text-xs text-slate-500 bg-slate-50 p-2.5 border border-borderlight">
              Result: Snapped connectors, severed antenna feeds, and dangerous physical soldier entanglement.
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-tech border-t-4 border-t-slate-700">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-slate-700">03 / TACTICAL SIGINT</span>
              <Radio className="w-5 h-5 text-slate-700" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal mb-2">
              Operational RF Detectability
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Omnidirectional vest radiation bleeds radio energy indiscriminately in all horizontal directions, increasing enemy electronic warfare eavesdropping.
            </p>
            <div className="font-mono text-xs text-slate-500 bg-slate-50 p-2.5 border border-borderlight">
              Result: Electronic footprint detectable by opposing SIGINT / Direction-Finding monitors.
            </div>
          </div>
        </div>

        {/* Engineering Solution Card */}
        <div className="bg-slate-50 border border-borderdark p-6 sm:p-8 tech-corner-accent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Our Engineering Solution
              </div>
              <h3 className="font-display font-bold text-2xl text-charcoal tracking-tight">
                Move the Antenna from Vest to Helmet — Conformal, Protected, and Zero-Profile
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                By elevating the antenna radiation phase center to the soldier’s highest anatomical elevation point (the ballistic helmet) while laminating the radiator conformally flush against the shell, Tarang Drishti eliminates both snag points and body absorption.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <a href="#antenna-3d" className="btn-tech btn-tech-primary w-full sm:w-auto text-center">
                <ArrowDownRight className="w-4 h-4" />
                <span>INSPECT CONFORMAL ARCHITECTURE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
