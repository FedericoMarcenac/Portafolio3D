"use client";

import React, { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ContinuousScrollCanvas from "./components/ContinuousScrollCanvas";
import ProjectsCards from "./components/ProjectsCards";
import AboutCards from "./components/AboutCards";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Frame actual del canvas continuo (1 a 479)
  const [globalFrame, setGlobalFrame] = useState<number>(1);

  return (
    <div className="relative bg-black text-[#f4f4f6] selection:bg-white/20 selection:text-white">
      
      {/* 1. Navbar 100% transparente sin título y con enlaces personalizados */}
      <Navbar />

      {/* 2. Sección Principal Continua: 1500vh de scroll para unir las secuencias y la repetición cinemática */}
      <section
        ref={scrollContainerRef}
        className="relative w-full"
        style={{ height: "1500vh" }}
      >
        {/* Anclas de navegación interna sincronizadas con las 3 fases */}
        <div id="inicio" className="absolute top-0 pointer-events-none" />
        <div id="proyectos" className="absolute top-[30%] pointer-events-none" />
        <div id="sobre-mi" className="absolute top-[61%] pointer-events-none" />

        {/* Sticky Pinned Viewport: 100% fijado en pantalla a lo largo de toda la experiencia */}
        <div
          className="sticky top-0 w-full overflow-hidden flex flex-col justify-between"
          style={{ height: "100vh" }}
        >
          
          {/* Canvas Único Continuo: Frames (1-140) -> FramesMedios (2-150) -> FramesGato (2-119) + 2 Repeticiones (89-119) */}
          <ContinuousScrollCanvas
            containerRef={scrollContainerRef}
            onPhaseChange={setGlobalFrame}
          />

          {/* Espacio superior para permitir la visualización limpia del canvas */}
          <div className="w-full pt-20 pointer-events-none" />

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
              Incluye las cartas abiertas animadas desde el eje X positivo y la repetición de frames
             ======================================================== */}
          <div
            className={`absolute inset-0 z-10 w-full h-full pointer-events-none flex flex-col justify-between transition-opacity duration-700 ${
              globalFrame > 289 ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Espacio superior para el navbar */}
            <div className="w-full pt-14 sm:pt-16" />

            {/* Centro con las cartas abiertas (Formación Académica, Foto Perfil, Tecnologías) proporcionadas */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pointer-events-auto my-auto">
              <AboutCards currentFrame={globalFrame} />
            </div>

            {/* Parte inferior: Título pequeño sobreMi.txt libre sin cuadrante de fondo */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 flex items-end justify-between select-none">
              
              {/* Título pequeño: sobreMi.txt con contorno pixelado y color neón violeta */}
              <div className="flex flex-col items-start gap-1 font-mono">
                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase flex items-center gap-1.5 pixel-outline-white">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.9)]" />
                  <span className="text-zinc-200 font-semibold">SECTION // ABOUT</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold tracking-wider pixel-text-violet lowercase">
                  sobreMi.txt
                </h2>
              </div>

              {/* Indicador de sección activa libre */}
              <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 pixel-outline-white">
                <span className="text-violet-400 font-bold">[</span>
                <span className="text-zinc-200 font-medium">ABOUT ME // STORY</span>
                <span className="text-violet-400 font-bold">]</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Pie de página minimalista técnico */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-light text-zinc-500 bg-black">
        <div className="flex items-center gap-3">
          <span>PORTAFOLIO.TXT</span>
          <span>•</span>
          <span>DESARROLLO WEB & CREATIVO</span>
          <span>•</span>
          <span>2026</span>
        </div>
        <div className="flex items-center gap-5 text-zinc-400">
          <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
          <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
          <a href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contáctame</a>
        </div>
      </footer>

    </div>
  );
}
