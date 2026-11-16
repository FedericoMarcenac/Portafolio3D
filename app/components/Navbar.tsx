"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent border-0 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 sm:h-24 flex items-center justify-end pointer-events-auto">
        
        {/* Enlaces de navegación: Inicio, Proyectos, Sobre mí, Contáctame */}
        <nav className="hidden md:flex items-center gap-9 text-sm sm:text-base font-medium tracking-wide">
          <Link
            href="#inicio"
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full"
          >
            Inicio
          </Link>
          <Link
            href="#proyectos"
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full"
          >
            Proyectos
          </Link>
          <Link
            href="#sobre-mi"
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full"
          >
            Sobre mí
          </Link>
          <Link
            href="#contacto"
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full"
          >
            Contáctame
          </Link>
        </nav>

        {/* Botón de menú para celulares */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="p-2 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:opacity-80 transition-opacity"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Menú desplegable para móviles */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-base font-medium border-b border-white/10 pointer-events-auto">
          <Link href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-white py-1">
            Inicio
          </Link>
          <Link href="#proyectos" onClick={() => setMobileMenuOpen(false)} className="text-white py-1">
            Proyectos
          </Link>
          <Link href="#sobre-mi" onClick={() => setMobileMenuOpen(false)} className="text-white py-1">
            Sobre mí
          </Link>
          <Link href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-white py-1">
            Contáctame
          </Link>
        </div>
      )}
    </header>
  );
}
