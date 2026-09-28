'use client';

import React from 'react';

export const FutureEnhancements: React.FC = () => {
  return (
    <section id="future" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Evolutionary Roadmap
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Beyond Dual-Band Communication
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Modular expansions planned for the conformal flexible laminate structure as part of future soldier-systems integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="w-8 h-8 bg-sky-50 border border-sky-300 text-sky-700 flex items-center justify-center font-mono font-bold text-xs mb-4">
              01
            </div>
            <h4 className="font-display font-bold text-base text-charcoal mb-2">
              GPS / Positioning Element
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Addition of NavIC / GPS L1 element as a 3rd resonant band etched onto the same flexible substrate for squad location tracking.
            </p>
            <span className="font-mono text-[10px] text-sky-700 font-bold block">
              Triple-Band Architecture
            </span>
          </div>

          {/* Card 2 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="w-8 h-8 bg-indigo-50 border border-indigo-300 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs mb-4">
              02
            </div>
            <h4 className="font-display font-bold text-base text-charcoal mb-2">
              Integrated Audio Pickup
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Piezoelectric bone-conduction audio transducers embedded directly into the lower conformal rim for discrete hands-free radio comms.
            </p>
            <span className="font-mono text-[10px] text-indigo-700 font-bold block">
              Acoustic Co-Integration
            </span>
          </div>

          {/* Card 3 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="w-8 h-8 bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs mb-4">
              03
            </div>
            <h4 className="font-display font-bold text-base text-charcoal mb-2">
              High-Bandwidth Video Codec
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Optimized L-band throughput supporting real-time H.265 tactical streaming from NVG / helmet night-vision camera direct to HQ.
            </p>
            <span className="font-mono text-[10px] text-emerald-700 font-bold block">
              Low-Latency ISR Feed
            </span>
          </div>

          {/* Card 4 */}
          <div className="card-tech bg-white border border-borderlight p-6 tech-corner-accent">
            <div className="w-8 h-8 bg-slate-100 border border-slate-300 text-slate-800 flex items-center justify-center font-mono font-bold text-xs mb-4">
              04
            </div>
            <h4 className="font-display font-bold text-base text-charcoal mb-2">
              Soldier-System Wearable Hub
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Universal intra-soldier short-range wireless or magnetic quick-connect linking helmet antenna directly to tactical vest battery and radio hub.
            </p>
            <span className="font-mono text-[10px] text-slate-700 font-bold block">
              Integrated Soldier Grid
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
