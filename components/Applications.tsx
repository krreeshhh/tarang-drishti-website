'use client';

import React, { useState } from 'react';
import { Crosshair, Flame, HardHat, Shield } from 'lucide-react';

export const Applications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('app-cqb');

  return (
    <section id="applications" className="py-16 bg-subtlegray border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Tactical &amp; Dual-Use Impact
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
            Field Applications &amp; Deployment
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Engineered for primary elite CQB forces and dual-use civilian emergency response operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <button
            onClick={() => setActiveTab('app-cqb')}
            className={`app-tab-btn btn-tech ${activeTab === 'app-cqb' ? 'btn-tech-active' : ''}`}
            data-target="app-cqb"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>CQB / TACTICAL OPERATIONS</span>
          </button>
          <button
            onClick={() => setActiveTab('app-emergency')}
            className={`app-tab-btn btn-tech ${activeTab === 'app-emergency' ? 'btn-tech-active' : ''}`}
            data-target="app-emergency"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>EMERGENCY RESPONSE (NDRF)</span>
          </button>
          <button
            onClick={() => setActiveTab('app-industrial')}
            className={`app-tab-btn btn-tech ${activeTab === 'app-industrial' ? 'btn-tech-active' : ''}`}
            data-target="app-industrial"
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>INDUSTRIAL / MINING</span>
          </button>
          <button
            onClick={() => setActiveTab('app-dualuse')}
            className={`app-tab-btn btn-tech ${activeTab === 'app-dualuse' ? 'btn-tech-active' : ''}`}
            data-target="app-dualuse"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>ATMANIRBHAR BHARAT DEFENCE</span>
          </button>
        </div>

        <div className="bg-white border border-borderdark p-6 sm:p-8 tech-corner-accent">
          {/* CQB Panel */}
          {activeTab === 'app-cqb' && (
            <div id="app-cqb" className="app-panel">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="badge-tech badge-tech-uhf text-[10px] mb-2">PRIMARY TARGET UNITS</span>
                  <h3 className="font-display font-bold text-2xl text-charcoal mb-3">
                    NSG, Para-SF, MARCOS &amp; SWAT/QRT Counter-Terror Operations
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Assault teams clearing room-to-room in reinforced concrete hotels, airport terminals, and residential complexes experience continuous high-frequency UHF voice comms without antenna snagging when vaulting barriers or breaching narrow entryways.
                  </p>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Zero Snagging:</strong> Rapid doorway entry without whip entanglement.
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Directional ISR:</strong> Real-time L-band squad video relay to command post.
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 p-4 bg-slate-50 border border-borderlight font-mono text-xs">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">CQB Specifications</span>
                  <div className="mt-2 space-y-1.5 text-slate-700">
                    <div>• Bandwidth: UHF 433M + L-Band 1.51G</div>
                    <div>• Snag Probability: 0% (Flush Laminated)</div>
                    <div>• Quick Release: Spring Breakaway RF</div>
                    <div>• Retrofit: Standard FAST / ACH Helmets</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Panel */}
          {activeTab === 'app-emergency' && (
            <div id="app-emergency" className="app-panel">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="badge-tech badge-tech-copper text-[10px] mb-2">CIVIL PROTECTION</span>
                  <h3 className="font-display font-bold text-2xl text-charcoal mb-3">
                    Firefighters &amp; NDRF Search and Rescue
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    In collapsed structures, tunnels, and thermal smoke environments, external antennas frequently break against fallen debris. Tarang Drishti’s conformal armor withstands high physical abrasion while maintaining life-saving radio links.
                  </p>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Debris Resistance:</strong> Conformal polyurethane lamination resists falling masonry.
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Tunnel Penetration:</strong> UHF band penetrates dense rubble and masonry.
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 p-4 bg-slate-50 border border-borderlight font-mono text-xs">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Disaster Specs</span>
                  <div className="mt-2 space-y-1.5 text-slate-700">
                    <div>• Target: NDRF, State Disaster Response</div>
                    <div>• Sealing: Weatherproof Lamination</div>
                    <div>• Hands-Free: Elevated radiation center</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Industrial Panel */}
          {activeTab === 'app-industrial' && (
            <div id="app-industrial" className="app-panel">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="badge-tech text-[10px] mb-2">CONFINED WORKSPACE</span>
                  <h3 className="font-display font-bold text-2xl text-charcoal mb-3">
                    Deep Underground Mining &amp; Hazardous Industrial Plants
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Personnel operating in confined pipeline crawls, underground coal faces, and chemical storage silos cannot carry whip antennas due to hazardous snagging and spark risks. Conformal antennas integrate flush with industrial safety hard-hats.
                  </p>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Hazardous Workspaces:</strong> Zero snagging inside narrow pipe crawls.
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Telemetry Support:</strong> L-Band data link for wearable biometric sensors.
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 p-4 bg-slate-50 border border-borderlight font-mono text-xs">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Industrial Specs</span>
                  <div className="mt-2 space-y-1.5 text-slate-700">
                    <div>• Hard-Hat Conformal Mount</div>
                    <div>• IS / Intrinsic Safety Pathway</div>
                    <div>• Real-time Worker Telemetry</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dual-Use Defence Panel */}
          {activeTab === 'app-dualuse' && (
            <div id="app-dualuse" className="app-panel">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="badge-tech badge-tech-success text-[10px] mb-2">INDIGENOUS DEFENCE TECH</span>
                  <h3 className="font-display font-bold text-2xl text-charcoal mb-3">
                    Indian Defence Procurement &amp; Atmanirbhar Bharat
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Reduces import dependency on expensive foreign conformal antenna kits. Offers Bharat Electronics Limited (BEL), DRDO labs, and Army Design Bureau an indigenous, patentable RF hardware design manufactured with standard flexible printed circuit techniques.
                  </p>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Indigenous IP:</strong> Designed for Indian Army modern soldier programs.
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-borderlight">
                      <strong>Retrofit Kits:</strong> Compatible with existing Indian ballistic helmets.
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 p-4 bg-slate-50 border border-borderlight font-mono text-xs">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Procurement Alignment</span>
                  <div className="mt-2 space-y-1.5 text-slate-700">
                    <div>• Ministry of Defence / Army Design Bureau</div>
                    <div>• iDEX Grant Non-Dilutive Track</div>
                    <div>• Low BOM Manufacturing Model</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
