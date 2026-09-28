'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-borderlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
        {/* Brand & Team Odyssey_ Logo */}
        <a href="#hero" className="flex items-center gap-3 text-decoration-none shrink-0 group">
          <img
            src="/team_logo.png"
            alt="Odyssey_ Team Logo"
            style={{ height: '64px' }}
            className="w-auto object-contain hover:opacity-90 transition-opacity"
          />
          <div className="h-6 w-px bg-borderlight hidden sm:block"></div>
          <div className="whitespace-nowrap">
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-charcoal leading-none block">
              TARANG DRISHTI
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 tracking-wider uppercase block mt-1">
              SIH26185 • HARDWARE • ODYSSEY_
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono font-medium text-slate-600">
          <a href="#antenna-3d" className="nav-link">3D Explorer</a>
          <a href="#dual-band" className="nav-link">Dual-Band</a>
          <a href="#architecture" className="nav-link">Architecture</a>
          <a href="#zero-profile" className="nav-link">Zero-Profile</a>
          <a href="#amc-ebg" className="nav-link">AMC/EBG</a>
          <a href="#simulation" className="nav-link">Simulation</a>
          <a href="#timeline" className="nav-link">Roadmap</a>
          <a href="#references" className="nav-link">Research</a>
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-btn"
            onClick={toggleMobileMenu}
            className="lg:hidden btn-tech p-2"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-charcoal" />
            ) : (
              <Menu className="w-5 h-5 text-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Slide-Down Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-borderlight bg-white px-6 py-4 space-y-3 font-mono text-xs">
          <a
            href="#antenna-3d"
            onClick={closeMobileMenu}
            className="block py-2 text-charcoal font-semibold border-b border-slate-100"
          >
            → 3D HELMET & ANTENNA
          </a>
          <a
            href="#dual-band"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → DUAL-BAND (UHF + L-BAND)
          </a>
          <a
            href="#architecture"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → CORE ARCHITECTURE
          </a>
          <a
            href="#zero-profile"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → ZERO-PROFILE CONCEPT
          </a>
          <a
            href="#amc-ebg"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → AMC / EBG METASURFACE
          </a>
          <a
            href="#simulation"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → CST SIMULATION RESULTS
          </a>
          <a
            href="#challenges"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → TECHNICAL CHALLENGES
          </a>
          <a
            href="#timeline"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600 border-b border-slate-100"
          >
            → DEVELOPMENT STATUS (45%)
          </a>
          <a
            href="#references"
            onClick={closeMobileMenu}
            className="block py-2 text-slate-600"
          >
            → RESEARCH & CITATIONS
          </a>
        </div>
      )}
    </header>
  );
};
