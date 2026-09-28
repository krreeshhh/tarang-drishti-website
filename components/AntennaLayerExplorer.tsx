'use client';

import React, { useState } from 'react';
import { Layers, ArrowUp, RefreshCw } from 'lucide-react';
import { HelmetViewerHandle } from './HelmetViewer';

interface AntennaLayerExplorerProps {
  viewerRef?: React.RefObject<HelmetViewerHandle | null>;
}

interface LayerData {
  name: string;
  role: string;
  roleBadgeClass: string;
  desc: string;
  spec: string;
}

const layerDetails: Record<string, LayerData> = {
  copper: {
    name: 'COPPER CONDUCTOR (PEC)',
    role: 'Dual-Element Radiating Patches',
    roleBadgeClass: 'badge-tech-copper',
    desc: 'Top-layer copper microstrip patch (L-band) and planar inverted-F element (UHF) etched or printed on Rogers substrate. Modelled as PEC in CST Studio Suite.',
    spec: 'UHF PIFA: 433-436 MHz (S11 -10.2 dB) | L-Band Patch: 1.51 GHz (S11 -18.1 dB, 7.17 dBi gain)',
  },
  lamination: {
    name: 'LAMINATION LAYER',
    role: 'Protective Wearable Dielectric',
    roleBadgeClass: 'badge-tech-lband',
    desc: 'Ultra-thin, ruggedized conformal top lamination layer providing environmental protection against CQB ballistic impacts, debris, water ingress, and surface abrasion.',
    spec: 'Weatherproof sealed, UV-stabilized, negligible RF insertion loss',
  },
  rogers: {
    name: 'ROGERS RT/DUROID 5880',
    role: 'High-Frequency Flexible Substrate',
    roleBadgeClass: 'badge-tech-uhf',
    desc: 'PTFE composite reinforced with glass microfibers. Selected specifically for low dielectric loss, isotropic permittivity, and mechanical flexural compliance around helmet curves without cracking or delamination.',
    spec: 'Dielectric Constant (εr): 2.20 ± 0.02 | Loss Tangent (tan δ): 0.0009 @ 10 GHz | Thickness: Flexible Laminate',
  },
  amc: {
    name: 'AMC / EBG GROUND PLANE',
    role: 'Metamaterial Head-SAR Shielding Surface',
    roleBadgeClass: 'badge-tech-success',
    desc: 'Artificial Magnetic Conductor / Electromagnetic Bandgap ground structure providing in-phase reflection and zero-tangential surface wave propagation, redirecting radiation upward away from the wearer’s skull.',
    spec: 'Head-SAR Suppression: > 18 dB back-lobe attenuation | Surface-wave suppression bandgap',
  },
  shell: {
    name: 'TACTICAL HELMET SHELL',
    role: 'Ballistic Protection Substructure',
    roleBadgeClass: 'badge-tech',
    desc: 'High-cut modern tactical ballistic helmet (Kevlar/UHMWPE composite). Conformal antenna integrates directly flush onto outer curvature without compromising structural ballistic integrity.',
    spec: 'High-cut ergonomic geometry, ARC rail retention, zero-penetration conformal bonding',
  },
};

export const AntennaLayerExplorer: React.FC<AntennaLayerExplorerProps> = ({ viewerRef }) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('rogers');
  const [isExploded, setIsExploded] = useState<boolean>(false);

  const handleSelectLayer = (key: string) => {
    setSelectedLayer(key);
    setIsExploded(true);
    if (viewerRef?.current) {
      viewerRef.current.setExploded(true);
    }
  };

  const handleToggleExplode = (explode: boolean) => {
    setIsExploded(explode);
    if (viewerRef?.current) {
      viewerRef.current.setExploded(explode);
    }
  };

  const current = layerDetails[selectedLayer] || layerDetails.rogers;

  return (
    <section id="antenna-3d" className="py-16 bg-subtlegray border-b border-borderlight tech-dot-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs font-bold text-sky-700 uppercase tracking-widest block mb-1">
              Conformal Stack Fabrication
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
              Interactive Antenna Layer Stack
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore the multi-layer dielectric, conductive, and metamaterial assembly engineered to adhere to the compound helmet curve.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleExplode(!isExploded)}
              className="btn-tech text-xs flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>{isExploded ? 'COLLAPSE TO FLUSH MOUNT' : 'EXPLODE 3D LAYERS'}</span>
            </button>
            <a
              href="#hero"
              className="btn-tech btn-tech-primary text-xs flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>VIEW 3D HELMET</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Vertical Layer Hierarchy */}
          <div className="lg:col-span-5 space-y-3">
            {/* 01 Copper */}
            <div
              className={`layer-card p-4 bg-white border border-borderlight hover:border-charcoal cursor-pointer transition-all ${
                selectedLayer === 'copper' ? 'border-slate-900 bg-slate-50 tech-corner-accent' : ''
              }`}
              onClick={() => handleSelectLayer('copper')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  TOP LAYER • CONDUCTOR
                </span>
                <span className="font-mono text-xs text-slate-400">01</span>
              </div>
              <div className="font-display font-bold text-base text-charcoal mt-1">
                Copper Conductor Patches (PEC)
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">
                Dual radiating elements: UHF PIFA (433 MHz) + L-Band microstrip patch (1.51 GHz) responsible for electromagnetic coupling.
              </div>
            </div>

            <div className="flex justify-center text-slate-400 font-mono text-xs">↓</div>

            {/* 02 Lamination */}
            <div
              className={`layer-card p-4 bg-white border border-borderlight hover:border-charcoal cursor-pointer transition-all ${
                selectedLayer === 'lamination' ? 'border-slate-900 bg-slate-50 tech-corner-accent' : ''
              }`}
              onClick={() => handleSelectLayer('lamination')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-sky-700 font-bold uppercase tracking-wider">
                  ENCAPSULATION
                </span>
                <span className="font-mono text-xs text-slate-400">02</span>
              </div>
              <div className="font-display font-bold text-base text-charcoal mt-1">
                Conformal Lamination Layer
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">
                Ultra-thin protective fluoropolymer barrier sealing against moisture, abrasion, and CQB debris.
              </div>
            </div>

            <div className="flex justify-center text-slate-400 font-mono text-xs">↓</div>

            {/* 03 Rogers 5880 */}
            <div
              className={`layer-card p-4 bg-white border border-borderlight hover:border-charcoal cursor-pointer transition-all ${
                selectedLayer === 'rogers' ? 'border-slate-900 bg-slate-50 tech-corner-accent' : ''
              }`}
              onClick={() => handleSelectLayer('rogers')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-indigo-700 font-bold uppercase tracking-wider">
                  FLEXIBLE DIELECTRIC
                </span>
                <span className="font-mono text-xs text-slate-400">03</span>
              </div>
              <div className="font-display font-bold text-base text-charcoal mt-1">
                Rogers RT/Duroid 5880 Substrate
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">
                Flexible PTFE micro-composite with ultra-low loss tangent (tan δ = 0.0009) and isotropic εr = 2.20.
              </div>
            </div>

            <div className="flex justify-center text-slate-400 font-mono text-xs">↓</div>

            {/* 04 AMC */}
            <div
              className={`layer-card p-4 bg-white border border-borderlight hover:border-charcoal cursor-pointer transition-all ${
                selectedLayer === 'amc' ? 'border-slate-900 bg-slate-50 tech-corner-accent' : ''
              }`}
              onClick={() => handleSelectLayer('amc')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  METASURFACE SHIELD
                </span>
                <span className="font-mono text-xs text-slate-400">04</span>
              </div>
              <div className="font-display font-bold text-base text-charcoal mt-1">
                AMC / EBG Ground Plane
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">
                Artificial Magnetic Conductor grid reflecting rear-directed RF energy outward, suppressing head SAR.
              </div>
            </div>

            <div className="flex justify-center text-slate-400 font-mono text-xs">↓</div>

            {/* 05 Shell */}
            <div
              className={`layer-card p-4 bg-white border border-borderlight hover:border-charcoal cursor-pointer transition-all ${
                selectedLayer === 'shell' ? 'border-slate-900 bg-slate-50 tech-corner-accent' : ''
              }`}
              onClick={() => handleSelectLayer('shell')}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                  STRUCTURAL BASE
                </span>
                <span className="font-mono text-xs text-slate-400">05</span>
              </div>
              <div className="font-display font-bold text-base text-charcoal mt-1">
                Ballistic Tactical Helmet Shell
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">
                High-cut Kevlar/UHMWPE ballistic structure providing zero-profile conformal surface integration.
              </div>
            </div>
          </div>

          {/* Right: Layer Function Inspector Panel */}
          <div className="lg:col-span-7">
            <div className="card-tech bg-white border border-borderdark p-6 sm:p-8 tech-corner-accent sticky top-24">
              <div className="flex items-center justify-between border-b border-borderlight pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    Active Layer Analysis
                  </span>
                  <h3 id="layer-detail-name" className="font-display font-bold text-xl sm:text-2xl text-charcoal mt-0.5">
                    {current.name}
                  </h3>
                </div>
                <span id="layer-detail-role" className={`badge-tech ${current.roleBadgeClass} text-[11px]`}>
                  {current.role}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Technical Rationale & Function
                </h4>
                <p id="layer-detail-desc" className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {current.desc}
                </p>
              </div>

              <div className="bg-slate-50 border border-borderlight p-4 font-mono text-xs space-y-2 mb-6">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Material & RF Specifications
                </div>
                <div id="layer-detail-spec" className="text-slate-800 font-semibold leading-relaxed">
                  {current.spec}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-borderlight">
                <button
                  onClick={() => handleToggleExplode(!isExploded)}
                  className="btn-tech text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isExploded ? 'Reset to Flush Mount' : 'Explode in 3D Viewer'}</span>
                </button>

                <a
                  href="#hero"
                  className="btn-tech btn-tech-primary text-xs flex items-center gap-1.5"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Inspect 3D Helmet View</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
