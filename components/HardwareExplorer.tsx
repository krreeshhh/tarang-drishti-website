'use client';

import React, { useState } from 'react';

interface ComponentData {
  title: string;
  desc: string;
}

const hwComponents: Record<string, ComponentData> = {
  'hw-shell': {
    title: 'Kevlar / UHMWPE Ballistic Helmet Shell',
    desc: 'High-cut ergonomic tactical shell providing NIJ Level IIIA ballistic protection while serving as the curved conformal mounting surface.',
  },
  'hw-uhf': {
    title: 'UHF PIFA Conformal Element',
    desc: 'Planar Inverted-F Antenna engineered for 433–436 MHz tactical squad voice/data communications. Simulation validated at S11 = -10.2 dB.',
  },
  'hw-lband': {
    title: 'L-Band Microstrip Patch Element',
    desc: 'Directional microstrip patch radiating at ≈ 1.51 GHz with 7.17 dBi gain for high-bandwidth telemetry and ISR video links. S11 = -18.1 dB.',
  },
  'hw-rogers': {
    title: 'Rogers RT/Duroid 5880 Substrate',
    desc: 'Flexible high-frequency PTFE substrate with lowest loss tangent (tan δ = 0.0009), mechanically compliant with compound helmet curvatures.',
  },
  'hw-amc': {
    title: 'AMC / EBG Ground Metamaterial',
    desc: 'Artificial Magnetic Conductor grid reflecting rear-directed RF energy outward, suppressing head SAR and isolating the wearer from radiation.',
  },
  'hw-lamination': {
    title: 'Protective Conformal Lamination',
    desc: 'Environmental polyurethane/fluoropolymer sealing membrane preventing moisture intrusion, snag abrasion, and chemical degradation.',
  },
  'hw-coax': {
    title: 'RG-316 Flexible Coaxial Cable',
    desc: 'Shielded conformable 50-ohm RF feedline routed tightly within ARC rail retention grooves to eliminate snag loops.',
  },
  'hw-breakaway': {
    title: 'Breakaway Quick-Disconnect Connector',
    desc: 'Gold-plated spring-release RF connector mounted at lower rear rim. Detaches instantly under snag tension, preventing soldier injury or neck trauma.',
  },
  'hw-adapter': {
    title: 'Field-Swappable Radio / Camera Adapter',
    desc: 'Modular interface cable connecting the helmet feed to handheld tactical radios (Motorola, Harris, Thales) or body-worn cameras.',
  },
};

export const HardwareExplorer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('hw-rogers');

  const current = hwComponents[activeComponent] || hwComponents['hw-rogers'];

  return (
    <section id="hardware" className="py-16 bg-white border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Bill of Materials (BOM) &amp; Modules
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Hardware Component Explorer
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Hover or click any subsystem component to inspect its engineering specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 01 Shell */}
            <div
              id="hw-shell"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-shell' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-shell')}
              onClick={() => setActiveComponent('hw-shell')}
            >
              <span className="text-[9px] text-slate-400 block">01 / SHELL</span>
              <div className="font-bold text-charcoal mt-1">Helmet Shell</div>
              <div className="text-[11px] text-slate-500 mt-1">Kevlar / UHMWPE</div>
            </div>

            {/* 02 UHF */}
            <div
              id="hw-uhf"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-uhf' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-uhf')}
              onClick={() => setActiveComponent('hw-uhf')}
            >
              <span className="text-[9px] text-indigo-600 block">02 / PIFA</span>
              <div className="font-bold text-charcoal mt-1">UHF PIFA</div>
              <div className="text-[11px] text-slate-500 mt-1">433 – 436 MHz</div>
            </div>

            {/* 03 L-Band */}
            <div
              id="hw-lband"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-lband' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-lband')}
              onClick={() => setActiveComponent('hw-lband')}
            >
              <span className="text-[9px] text-sky-600 block">03 / PATCH</span>
              <div className="font-bold text-charcoal mt-1">L-Band Patch</div>
              <div className="text-[11px] text-slate-500 mt-1">1.51 GHz (7.17 dBi)</div>
            </div>

            {/* 04 Rogers */}
            <div
              id="hw-rogers"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-rogers' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-rogers')}
              onClick={() => setActiveComponent('hw-rogers')}
            >
              <span className="text-[9px] text-slate-400 block">04 / SUBSTRATE</span>
              <div className="font-bold text-charcoal mt-1">Rogers 5880</div>
              <div className="text-[11px] text-slate-500 mt-1">Flexible PTFE</div>
            </div>

            {/* 05 AMC */}
            <div
              id="hw-amc"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-amc' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-amc')}
              onClick={() => setActiveComponent('hw-amc')}
            >
              <span className="text-[9px] text-emerald-600 block">05 / SHIELD</span>
              <div className="font-bold text-charcoal mt-1">AMC / EBG Ground</div>
              <div className="text-[11px] text-slate-500 mt-1">Metamaterial Grid</div>
            </div>

            {/* 06 Lamination */}
            <div
              id="hw-lamination"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-lamination' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-lamination')}
              onClick={() => setActiveComponent('hw-lamination')}
            >
              <span className="text-[9px] text-slate-400 block">06 / TOP COAT</span>
              <div className="font-bold text-charcoal mt-1">Lamination Layer</div>
              <div className="text-[11px] text-slate-500 mt-1">Polymer Seal</div>
            </div>

            {/* 07 Coax */}
            <div
              id="hw-coax"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-coax' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-coax')}
              onClick={() => setActiveComponent('hw-coax')}
            >
              <span className="text-[9px] text-slate-400 block">07 / FEED</span>
              <div className="font-bold text-charcoal mt-1">RG-316 Coaxial</div>
              <div className="text-[11px] text-slate-500 mt-1">Shielded 50Ω Cable</div>
            </div>

            {/* 08 Breakaway */}
            <div
              id="hw-breakaway"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-breakaway' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-breakaway')}
              onClick={() => setActiveComponent('hw-breakaway')}
            >
              <span className="text-[9px] text-amber-600 block">08 / CONNECTOR</span>
              <div className="font-bold text-charcoal mt-1">Breakaway RF</div>
              <div className="text-[11px] text-slate-500 mt-1">Quick-Disconnect</div>
            </div>

            {/* 09 Adapter */}
            <div
              id="hw-adapter"
              className={`hw-card p-3 bg-white border border-borderlight hover:border-charcoal cursor-pointer font-mono text-xs ${
                activeComponent === 'hw-adapter' ? 'border-slate-900 bg-slate-50' : ''
              }`}
              onMouseEnter={() => setActiveComponent('hw-adapter')}
              onClick={() => setActiveComponent('hw-adapter')}
            >
              <span className="text-[9px] text-slate-400 block">09 / INTERFACE</span>
              <div className="font-bold text-charcoal mt-1">Radio Adapter</div>
              <div className="text-[11px] text-slate-500 mt-1">Field-Swappable</div>
            </div>
          </div>

          <div className="lg:col-span-5 card-tech bg-slate-50 border border-borderdark p-6 tech-corner-accent">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Subsystem Specification
            </span>
            <h3 id="hw-detail-title" className="font-display font-bold text-xl text-charcoal mt-1 mb-3">
              {current.title}
            </h3>
            <p id="hw-detail-desc" className="text-slate-600 text-sm leading-relaxed mb-6">
              {current.desc}
            </p>

            <div className="pt-4 border-t border-borderlight flex items-center justify-between text-xs font-mono text-slate-500">
              <span>LOW BOM COST • MIL-STD COMPLIANT</span>
              <a href="#antenna-3d" className="text-charcoal font-bold hover:underline">
                VIEW IN 3D →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
