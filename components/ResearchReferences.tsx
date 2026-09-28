'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResearchReferences: React.FC = () => {
  return (
    <section id="references" className="py-16 bg-subtlegray border-b border-borderlight font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Academic &amp; Technical Foundation
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal tracking-tight font-sans">
            Research Citations &amp; Literature
          </h2>
          <p className="text-slate-600 text-xs mt-1">
            Peer-reviewed articles and tactical specifications informing Tarang Drishti’s conformal RF design.
          </p>
        </div>

        <div className="space-y-3">
          {/* Reference 1 */}
          <div className="p-4 bg-white border border-borderlight flex flex-wrap items-center justify-between gap-3 hover:border-charcoal transition-colors">
            <div>
              <div className="font-bold text-charcoal">1. Ultra-wideband Conformal Helmet Antenna</div>
              <div className="text-[11px] text-slate-500">IEEE Transactions on Antennas and Propagation • Document ID: 926116</div>
            </div>
            <a
              href="https://ieeexplore.ieee.org/document/926116"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech text-[10px] py-1 px-3"
            >
              <span>IEEE XPLORE</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Reference 2 */}
          <div className="p-4 bg-white border border-borderlight flex flex-wrap items-center justify-between gap-3 hover:border-charcoal transition-colors">
            <div>
              <div className="font-bold text-charcoal">2. Design of Helmet-Mounted Dual-Band Conformal Antenna for Military Applications</div>
              <div className="text-[11px] text-slate-500">Springer Chapter • DOI: 10.1007/978-981-99-1312-1_10</div>
            </div>
            <a
              href="https://link.springer.com/chapter/10.1007/978-981-99-1312-1_10"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech text-[10px] py-1 px-3"
            >
              <span>SPRINGER LINK</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Reference 3 */}
          <div className="p-4 bg-white border border-borderlight flex flex-wrap items-center justify-between gap-3 hover:border-charcoal transition-colors">
            <div>
              <div className="font-bold text-charcoal">3. Military UHF Body-Worn Antennas for Armoured Vests</div>
              <div className="text-[11px] text-slate-500">ResearchGate / IEEE Wearable Antennas Publication 224153952</div>
            </div>
            <a
              href="https://www.researchgate.net/publication/224153952_Military_UHF_body-worn_antennas_for_armored_vests"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech text-[10px] py-1 px-3"
            >
              <span>RESEARCHGATE</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Reference 4 */}
          <div className="p-4 bg-white border border-borderlight flex flex-wrap items-center justify-between gap-3 hover:border-charcoal transition-colors">
            <div>
              <div className="font-bold text-charcoal">4. Research Progress on Helmet Antenna in Individual Soldier Communication System</div>
              <div className="text-[11px] text-slate-500">Journal of Electronics &amp; Information Technology • DOI: 10.11999/JEIT220613</div>
            </div>
            <a
              href="https://jeit.ac.cn/article/doi/10.11999/JEIT220613?pageType=en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech text-[10px] py-1 px-3"
            >
              <span>JEIT ARTICLE</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Reference 5 */}
          <div className="p-4 bg-white border border-borderlight flex flex-wrap items-center justify-between gap-3 hover:border-charcoal transition-colors">
            <div>
              <div className="font-bold text-charcoal">5. Tactical &amp; Defence Antenna Expert Specifications</div>
              <div className="text-[11px] text-slate-500">Indian Defence RF Connectors, Military SIGINT &amp; Relays • Antenna Experts India</div>
            </div>
            <a
              href="https://www.antennaexperts.in/enquiry.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tech text-[10px] py-1 px-3"
            >
              <span>ANTENNA EXPERTS</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
