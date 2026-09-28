'use client';

import React from 'react';
import { X, Check } from 'lucide-react';

export const ZeroProfileSection: React.FC = () => {
  return (
    <section id="zero-profile" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
            Form Factor Innovation
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Zero Profile. Conformal by Design.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Comparing the operational footprint of legacy protruding vest antennas versus Tarang Drishti’s flush-bonded conformal helmet integration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Legacy Standard */}
          <div className="card-tech border-l-4 border-l-red-500 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-red-600 uppercase">Legacy Standard</span>
              <span className="badge-tech">High Failure Rate</span>
            </div>
            <h3 className="font-display font-bold text-xl text-charcoal mb-4">
              Conventional Vest-Mounted Whip Antenna
            </h3>

            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span><strong>External & Protruding:</strong> 30–50 cm vertical mast extending past soldier shoulders.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span><strong>High Snag Hazard:</strong> Catches on vehicle hatches, door frames, and foliage.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span><strong>Low Mounting Position:</strong> Heavy RF attenuation from wearer&apos;s torso and tactical vest gear.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span><strong>Omnidirectional Bleed:</strong> Uncontrolled horizontal back-lobe increases SIGINT interception.</span>
              </li>
            </ul>

            <div className="bg-red-50/60 border border-red-200 p-3 text-xs font-mono text-red-800">
              Risk: Snapping during fast tactical breach leaves operator without voice comms.
            </div>
          </div>

          {/* Proposed Architecture */}
          <div className="card-tech border-l-4 border-l-emerald-600 p-6 sm:p-8 tech-corner-accent">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase">Proposed Architecture</span>
              <span className="badge-tech badge-tech-success">
                <span className="status-dot"></span> Zero-Profile
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-charcoal mb-4">
              Tarang Drishti Helmet-Integrated Conformal Antenna
            </h3>

            <ul className="space-y-3 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Flush-Mounted:</strong> Follows compound helmet curvature with zero protruding mast.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Zero Snag Risk:</strong> Laminated conformal surface cannot catch on doorways or equipment.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Optimal Elevation:</strong> Mounted at the soldier&apos;s highest physical point for 360° horizon clearance.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Metamaterial Shielding:</strong> AMC ground redirects radiation upward, minimizing operator head exposure.</span>
              </li>
            </ul>

            <div className="bg-emerald-50/80 border border-emerald-200 p-3 text-xs font-mono text-emerald-900">
              Safety Mechanism: Armored breakaway connector detaches under high strain to safeguard operator neck.
            </div>
          </div>
        </div>

        <div className="border border-borderlight bg-subtlegray p-6 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-600"></div>
              <span className="font-bold text-charcoal uppercase">Dimension & Form Factor Integrity</span>
              <span className="text-slate-500">| Conformal Flexible Laminate Structure</span>
            </div>
            <span className="text-slate-500 text-[11px]">
              Designed to follow compound ballistic curvature without surface projection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
