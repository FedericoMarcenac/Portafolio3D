"use client";

import React, { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ContinuousScrollCanvas from "./components/ContinuousScrollCanvas";
import ProjectsCards from "./components/ProjectsCards";
import AboutCards from "./components/AboutCards";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Frame actual del canvas continuo (1 a 479)
  const [globalFrame, setGlobalFrame] = useState<number>(1);

  return (
    <div className="relative bg-black text-[#f4f4f6] selection:bg-white/20 selection:text-white">
      
      {/* 1. Navbar 100% transparente sin título y con enlaces personalizados */}
      <Navbar />

      {/* 2. Sección Principal Continua: 950vh de scroll para 557 frames continuos (Frames + FramesMedios + FramesGato + FramesSalto) */}
      <section
        ref={scrollContainerRef}
        className="relative w-full"
        style={{ height: "950vh" }}
      >
        {/* Anclas de navegación interna calibradas */}
        <div id="inicio" className="absolute top-0 pointer-events-none" />
        <div id="proyectos" className="absolute top-[35%] pointer-events-none" />
        <div id="sobre-mi" className="absolute top-[65%] pointer-events-none" />
        <div id="contacto" className="absolute top-[96%] pointer-events-none" />

        {/* Sticky Pinned Viewport: 100% fijado en pantalla a lo largo de toda la experiencia */}
        <div
          className="sticky top-0 w-full overflow-hidden flex flex-col justify-between"
          style={{ height: "100vh" }}
        >
          
          {/* Canvas Único Continuo: Frames (1-140) -> FramesMedios (2-150) -> FramesGato (2-119) + Repeticiones */}
          <ContinuousScrollCanvas
            containerRef={scrollContainerRef}
            onPhaseChange={setGlobalFrame}
          />

          {/* Espacio superior para permitir la visualización limpia del navbar */}
          <div className="w-full pt-16 sm:pt-20 pointer-events-none" />

          {/* ========================================================
              FASE 1 (Frames 1 a 140): Portada con portafolio.txt
             ======================================================== */}
          <div
            className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 flex items-end justify-between pointer-events-none select-none transition-opacity duration-700 ${
              globalFrame <= 140 ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Título portafolio.txt libre sin cuadrante de fondo, con color neón y contorno pixelado */}
            <div className="flex flex-col items-start gap-1 font-mono">
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase flex items-center gap-1.5 pixel-outline-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span className="text-zinc-200 font-semibold">INDEX // HOME</span>
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider pixel-text-emerald lowercase">
                portafolio.txt
              </h1>
            </div>

            {/* Indicador de scroll libre */}
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 pixel-outline-white">
              <span className="text-emerald-400 font-bold">[</span>
              <span className="text-zinc-200 font-medium">SCROLL TO EXPLORE</span>
              <span className="text-emerald-400 font-bold">]</span>
            </div>
          </div>

          {/* ========================================================
              FASE 2 (FramesMedios, 141 a 289): Sección de Proyectos con proyectos.txt
             ======================================================== */}
          <div
            className={`absolute inset-0 z-10 w-full h-full pointer-events-none flex flex-col justify-between transition-opacity duration-700 ${
              globalFrame > 140 && globalFrame <= 289 ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Espacio superior para el navbar */}
            <div className="w-full pt-14 sm:pt-16" />

            {/* Centro con los 4 cuadrantes de pantalla completa */}
            <div className="flex-1 w-full h-full flex items-center justify-center pointer-events-auto overflow-visible px-4 sm:px-8 lg:px-12 pb-4">
              <ProjectsCards currentFrame={globalFrame} />
            </div>

            {/* Parte inferior: Título pequeño proyectos.txt libre sin cuadrante de fondo */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 flex items-end justify-between select-none">
              
              {/* Título pequeño: proyectos.txt con contorno pixelado y color neón cian */}
              <div className="flex flex-col items-start gap-1 font-mono">
                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase flex items-center gap-1.5 pixel-outline-white">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                  <span className="text-zinc-200 font-semibold">SECTION // WORK</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider pixel-text-cyan lowercase">
                  proyectos.txt
                </h2>
              </div>

              {/* Indicador de sección activa libre */}
              <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 pixel-outline-white">
                <span className="text-cyan-400 font-bold">[</span>
                <span className="text-zinc-200 font-medium">FEATURED PROJECTS</span>
                <span className="text-cyan-400 font-bold">]</span>
              </div>

            </div>

          </div>

          {/* ========================================================
              FASE 3 (FramesGato, > 289): Sección Sobre Mí con sobreMi.txt
              Y TRANSICIÓN CINEMÁTICA HACIA CONTACTO (contacto.txt)
             ======================================================== */}
          <div
            className={`absolute inset-0 z-10 w-full h-full pointer-events-none flex flex-col justify-between transition-opacity duration-700 ${
              globalFrame > 289 ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Espacio superior para el navbar */}
            <div className="w-full pt-10 sm:pt-14" />

            {/* Centro con las cartas de Sobre Mí y Contacto superpuestas con transición suave */}
            <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pointer-events-auto">
              
              {/* Cartas Sobre Mí (Visibles entre frames 310 y 420, fade out hacia 445) */}
              <div className="w-full flex items-center justify-center">
                <AboutCards currentFrame={globalFrame} />
              </div>

              {/* Sección de Contacto (Aparece a partir de frame 420, 100% activa > 445) */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
                <ContactSection currentFrame={globalFrame} />
              </div>

            </div>

            {/* Parte inferior: Título dinámico (sobreMi.txt -> contacto.txt al entrar en frame 126 de FramesSalto) */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-8 flex items-end justify-between select-none">
              
              {/* Título pequeño con cambio de color y texto dinámico */}
              <div className="flex flex-col items-start gap-1 font-mono transition-all duration-300">
                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase flex items-center gap-1.5 pixel-outline-white">
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${
                      globalFrame >= 533
                        ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                        : "bg-violet-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]"
                    }`}
                  />
                  <span className="text-zinc-200 font-semibold">
                    {globalFrame >= 533 ? "SECTION // CONTACT" : "SECTION // ABOUT"}
                  </span>
                </span>
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider lowercase transition-all duration-500 ${
                    globalFrame >= 533 ? "pixel-text-emerald" : "pixel-text-violet"
                  }`}
                >
                  {globalFrame >= 533 ? "contacto.txt" : "sobreMi.txt"}
                </h2>
              </div>

              {/* Indicador de sección activa */}
              <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 pixel-outline-white">
                <span
                  className={`font-bold transition-colors duration-500 ${
                    globalFrame >= 533 ? "text-emerald-400" : "text-violet-400"
                  }`}
                >
                  [
                </span>
                <span className="text-zinc-200 font-medium">
                  {globalFrame >= 533 ? "GET IN TOUCH" : "ABOUT ME // STORY"}
                </span>
                <span
                  className={`font-bold transition-colors duration-500 ${
                    globalFrame >= 533 ? "text-emerald-400" : "text-violet-400"
                  }`}
                >
                  ]
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Pie de página minimalista técnico */}
      <footer id="contacto-footer" className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-light text-zinc-500 bg-black">
        <div className="flex items-center gap-3">
          <span>PORTAFOLIO.TXT</span>
          <span>•</span>
          <span className="text-zinc-300 font-medium">FEDERICO MARCENAC</span>
          <span>•</span>
          <span className="text-emerald-400">BAHÍA BLANCA, ARG</span>
        </div>
        <div className="flex items-center gap-5 text-zinc-400">
          <a
            href="https://linkedin.com/in/federico-marcenac-546ab228b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors cursor-pointer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/FedericoMarcenac"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors cursor-pointer"
          >
            GitHub
          </a>
          <a
            href="mailto:federicomarcenac14@gmail.com"
            className="text-violet-300 hover:text-white transition-colors cursor-pointer"
          >
            federicomarcenac14@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
