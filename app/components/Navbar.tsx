"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (targetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent border-0 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 sm:h-24 flex items-center justify-end pointer-events-auto">
        
        {/* Enlaces de navegación con scroll suave cinemático */}
        <nav className="hidden md:flex items-center gap-9 text-sm sm:text-base font-medium tracking-wide">
          <a
            href="#inicio"
            onClick={(e) => handleScrollTo("inicio", e)}
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full cursor-pointer"
          >
            Inicio
          </a>
          <a
            href="#proyectos"
            onClick={(e) => handleScrollTo("proyectos", e)}
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full cursor-pointer"
          >
            Proyectos
          </a>
          <a
            href="#sobre-mi"
            onClick={(e) => handleScrollTo("sobre-mi", e)}
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full cursor-pointer"
          >
            Sobre mí
          </a>
          <a
            href="#contacto"
            onClick={(e) => handleScrollTo("contacto", e)}
            className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-200 hover:after:w-full cursor-pointer"
          >
            Contáctame
          </a>
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

      {/* Menú desplegable para móviles con scroll suave */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-base font-medium border-b border-white/10 pointer-events-auto">
          <a href="#inicio" onClick={(e) => handleScrollTo("inicio", e)} className="text-white py-1">
            Inicio
          </a>
          <a href="#proyectos" onClick={(e) => handleScrollTo("proyectos", e)} className="text-white py-1">
            Proyectos
          </a>
          <a href="#sobre-mi" onClick={(e) => handleScrollTo("sobre-mi", e)} className="text-white py-1">
            Sobre mí
          </a>
          <a href="#contacto" onClick={(e) => handleScrollTo("contacto", e)} className="text-white py-1">
            Contáctame
          </a>
        </div>
      )}
    </header>
  );
}
