"use client";

import React from "react";

interface AboutCardsProps {
  currentFrame: number;
}

interface TechBadge {
  name: string;
  logo: string;
}

const FRONTEND_TECHS: TechBadge[] = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "HTML5", logo: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", logo: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "Sass/SCSS", logo: "https://cdn.simpleicons.org/sass/CC6699" },
  { name: "Bootstrap", logo: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "Three.js", logo: "https://cdn.simpleicons.org/threedotjs/white" },
];

const BACKEND_TECHS: TechBadge[] = [
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/white" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "REST APIs", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
];

const DATABASE_TECHS: TechBadge[] = [
  { name: "SQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "SQLite", logo: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "Prisma ORM", logo: "https://cdn.simpleicons.org/prisma/white" },
];

const SUPPORT_DEVOPS_TECHS: TechBadge[] = [
  { name: "Soporte IT / Hardware", logo: "https://cdn.simpleicons.org/windows/0078D4" },
  { name: "Redes & Wi-Fi", logo: "https://cdn.simpleicons.org/cisco/1BA0D7" },
  { name: "Excel (Avanzado)", logo: "https://cdn.simpleicons.org/microsoftexcel/217346" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
];

const getBasePath = (): string => {
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0].toLowerCase() === "portafolio3d") {
      return `/${segments[0]}`;
    }
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/Portafolio3D" : "");
};

export default function AboutCards({ currentFrame }: AboutCardsProps) {
  // Visibilidad exacta según especificación:
  // - Frames < 310: Invisible (proyectos activos)
  // - Frames 310–360: Entrada cinematográfica en Fase 3 (FramesGato)
  // - Frames 360–486: Completamente visible y activo (incluye el inicio de FramesSalto)
  // - Frames 486–495: Desvanecimiento suave para desaparecer exactamente en frame_088 de FramesSalto (global 495)
  // - Frames >= 495: Completamente invisible (salto libre y limpio)
  let opacity = 0;
  if (currentFrame < 310) {
    opacity = 0;
  } else if (currentFrame >= 310 && currentFrame < 360) {
    const p = (currentFrame - 310) / (360 - 310);
    opacity = Math.sin((p * Math.PI) / 2);
  } else if (currentFrame >= 360 && currentFrame <= 486) {
    opacity = 1.0;
  } else if (currentFrame > 486 && currentFrame <= 495) {
    const p = (currentFrame - 486) / (495 - 486);
    opacity = Math.max(0, 1 - Math.sin((p * Math.PI) / 2));
  } else {
    opacity = 0;
  }

  return (
    <div
      className="w-full max-w-7xl xl:max-w-[1420px] mx-auto flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch select-none transition-opacity duration-200"
      style={{
        opacity: opacity,
        pointerEvents: opacity > 0.1 ? "auto" : "none",
        visibility: opacity > 0 ? "visible" : "hidden",
      }}
    >
      {/* =======================================================================
          COLUMNA IZQUIERDA: CARTA DE PERFIL CON FOTO
          Agrandada ~20%, más transparente (base glassmorphic) y foto adaptada 3:4
         ======================================================================= */}
      <div
        className="w-full md:w-[360px] lg:w-[390px] shrink-0 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-violet-400/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
            <span className="font-bold text-white tracking-wider">DEV // PERFIL</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">ONLINE</span>
        </div>

        {/* Visor de Foto Real - Proporción 3:4 agrandada un ~20% */}
        <div className="relative w-full max-w-[225px] sm:max-w-[245px] mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-black/30 border border-white/20 shadow-md group">
          <img
            src={`${getBasePath()}/profile.jpg`}
            alt="Federico Marcenac"
            className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.01] transition-transform duration-500 group-hover:scale-105"
          />
          {/* Borde interior sutil */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15 pointer-events-none" />
        </div>

        {/* Bio Real del CV */}
        <div className="mt-3.5 flex flex-col gap-2 font-mono">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Federico Marcenac
            </h3>
            <p className="text-xs sm:text-[13px] text-violet-300/90 font-light mt-0.5">
              Programación • Soporte IT • Help Desk
            </p>
          </div>

          <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
            Estudiante de Programación (UTN) con sólida experiencia práctica en soporte técnico, diagnóstico de hardware/software, redes y desarrollo web.
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="tracking-wider uppercase font-semibold">DISPONIBLE // FULL-TIME</span>
          </div>

          {/* Ubicación y Enlaces */}
          <div className="pt-2.5 border-t border-white/10 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>UBICACIÓN:</span>
              <span className="text-white font-medium">Bahía Blanca, ARG</span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <a
                href="https://linkedin.com/in/federico-marcenac-546ab228b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-center text-zinc-200 hover:text-white border border-white/10 transition-colors text-[11px] uppercase font-semibold tracking-wider"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/FedericoMarcenac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-center text-zinc-200 hover:text-white border border-white/10 transition-colors text-[11px] uppercase font-semibold tracking-wider"
              >
                GitHub
              </a>
              <a
                href="mailto:federicomarcenac14@gmail.com"
                className="flex-1 py-1.5 px-2 rounded-md bg-violet-500/20 hover:bg-violet-500/35 text-center text-violet-200 hover:text-white border border-violet-400/30 transition-colors text-[11px] uppercase font-semibold tracking-wider"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          COLUMNA DERECHA:
          1. FORMACIÓN ACADÉMICA (Arriba, UTN + Coderhouse)
          2. HABILIDADES & STACK TÉCNICO (Abajo)
          Ambas cartas base más transparentes y con ~20% más amplitud
         ======================================================================= */}
      <div className="flex-1 flex flex-col gap-4 lg:gap-5 justify-between">
        
        {/* CARTA 1: FORMACIÓN ACADÉMICA (Base transparente con contraste legible) */}
        <div
          className="w-full rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-violet-400/40 p-5 sm:p-6 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        >
          {/* Cabecera Técnica */}
          <div className="flex items-center justify-between gap-3 pb-2.5 mb-3 border-b border-white/10 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white">
                FORMACIÓN_ACADÉMICA // EDUCATION.TXT
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-violet-300/90 font-mono tracking-widest uppercase">
              [ REGISTRO ACADÉMICO ]
            </span>
          </div>

          {/* 2 Columnas de Formación (UTN y Coderhouse) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            
            {/* UTN FRBB */}
            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-emerald-400 font-semibold">[CARRERA EN CURSO]</span>
                <span className="text-zinc-400">2024 — ACTUALIDAD</span>
              </div>
              <h4 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                Tecnicatura Univ. en Programación
              </h4>
              <div className="font-mono text-xs text-violet-300/90 font-medium">
                UTN — Facultad Regional Bahía Blanca
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light">
                Desarrollo de software, algoritmos, bases de datos y metodologías ágiles. Finalización estimada: Febrero 2027.
              </p>
            </div>

            {/* Coderhouse */}
            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <span className="text-cyan-400 font-semibold">[CERTIFICACIONES]</span>
                <span className="text-zinc-400">2022 — 2023</span>
              </div>
              <h4 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                Desarrollo Web, Backend & Ciberseguridad
              </h4>
              <div className="font-mono text-xs text-cyan-300/90 font-medium">
                Coderhouse
              </div>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light">
                Formación práctica en ecosistema web moderno, arquitectura backend con Node.js/Express, bases de datos y seguridad.
              </p>
            </div>

          </div>
        </div>

        {/* CARTA 2: HABILIDADES & STACK TÉCNICO (Base transparente y amplitud aumentada) */}
        <div
          className="w-full flex-1 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-cyan-400/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between gap-3 pb-2.5 mb-3 border-b border-white/10 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white">
                HABILIDADES & STACK TÉCNICO // TECH_STACK.LOG
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-cyan-300 font-mono tracking-widest uppercase">
              [ STACK REAL ]
            </span>
          </div>

          {/* Grilla 2x2 de Tecnologías con logos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 font-mono">
            
            {/* Categoría 1: Frontend & Web */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-cyan-400 font-bold tracking-wider">
                <span>01 // DESARROLLO WEB & FRONTEND</span>
                <span className="text-zinc-500 font-normal">SÓLIDO</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {FRONTEND_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-black/40 backdrop-blur-sm text-zinc-100 border border-white/10 hover:border-cyan-400 hover:text-cyan-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-4 h-4 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 2: Soporte IT, Redes & Hardware */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-400 font-bold tracking-wider">
                <span>02 // SOPORTE IT, REDES & HERRAMIENTAS</span>
                <span className="text-zinc-500 font-normal">EXPERIENCIA</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {SUPPORT_DEVOPS_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-black/40 backdrop-blur-sm text-zinc-100 border border-white/10 hover:border-emerald-400 hover:text-emerald-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-4 h-4 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 3: Backend & Programación */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-violet-400 font-bold tracking-wider">
                <span>03 // BACKEND & PROGRAMACIÓN</span>
                <span className="text-zinc-500 font-normal">APIs & LÓGICA</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {BACKEND_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-black/40 backdrop-blur-sm text-zinc-100 border border-white/10 hover:border-violet-400 hover:text-violet-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-4 h-4 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 4: Bases de Datos */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-amber-400 font-bold tracking-wider">
                <span>04 // BASES DE DATOS</span>
                <span className="text-zinc-500 font-normal">SQL & PERSISTENCIA</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {DATABASE_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-black/40 backdrop-blur-sm text-zinc-100 border border-white/10 hover:border-amber-400 hover:text-amber-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-4 h-4 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Pie */}
          <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">●</span> 6+ AÑOS EN NEGOCIO FAMILIAR (ETTONAZZEM)
            </span>
            <span className="text-zinc-200 font-semibold">[PROACTIVO & RESOLUTIVO]</span>
          </div>
        </div>

      </div>
    </div>
  );
}
