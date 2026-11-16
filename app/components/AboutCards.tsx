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
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Three.js", logo: "https://cdn.simpleicons.org/threedotjs/white" },
  { name: "WebGL", logo: "https://cdn.simpleicons.org/webgl/990000" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "GSAP", logo: "https://cdn.simpleicons.org/greensock/88CE02" },
  { name: "HTML5 Canvas", logo: "https://cdn.simpleicons.org/html5/E34F26" },
];

const BACKEND_TECHS: TechBadge[] = [
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/white" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "REST APIs", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "GraphQL", logo: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Microservicios", logo: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "Auth & JWT", logo: "https://cdn.simpleicons.org/jsonwebtokens/white" },
];

const DATABASE_TECHS: TechBadge[] = [
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Redis", logo: "https://cdn.simpleicons.org/redis/FF4438" },
  { name: "SQLite", logo: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "Prisma ORM", logo: "https://cdn.simpleicons.org/prisma/white" },
];

const DEVOPS_TECHS: TechBadge[] = [
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
  { name: "AWS Cloud", logo: "https://cdn.simpleicons.org/amazonwebservices/FF9900" },
  { name: "Linux", logo: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
];

const getBasePath = (): string => {
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/Portafolio3D")) {
      return "/Portafolio3D";
    }
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/Portafolio3D" : "");
};

export default function AboutCards({ currentFrame }: AboutCardsProps) {
  // Comienza a aparecer en la fase 3 (a partir de frame 320) y se asienta suavemente
  const START_FRAME = 320;
  const SETTLE_FRAME = 395;

  if (currentFrame < START_FRAME) {
    return null;
  }

  // Progreso suave de entrada (0 a 1)
  const rawProgress = Math.max(0, Math.min(1, (currentFrame - START_FRAME) / (SETTLE_FRAME - START_FRAME)));
  const progress = 1 - Math.pow(1 - rawProgress, 3);
  const opacity = Math.min(1, Math.max(0, progress * 1.15));

  // Desplazamiento desde el eje X positivo (desde la derecha hacia el centro)
  const baseOffset = (1 - progress) * 220; // en píxeles

  return (
    <div
      className="w-full max-w-6xl lg:max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6 pointer-events-auto select-none transition-all duration-300"
      style={{
        opacity: opacity,
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {/* =========================================================================
          BLOQUE 1: FORMACIÓN ACADÉMICA (Transparente con un toque sutil de opacidad)
         ========================================================================= */}
      <div
        style={{
          transform: `translate3d(${baseOffset}px, 0, 0)`,
          willChange: "transform, opacity",
        }}
        className="w-full rounded-2xl bg-black/28 backdrop-blur-sm border border-white/[0.12] hover:border-violet-400/35 p-4 sm:p-6 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
      >
        {/* Cabecera Técnica */}
        <div className="flex items-center justify-between gap-3 pb-2.5 mb-3.5 border-b border-white/[0.12] font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.9)]" />
            <span className="text-sm sm:text-base font-bold tracking-wider text-white">
              FORMACIÓN_ACADÉMICA // EDUCATION.TXT
            </span>
          </div>
          <span className="text-[11px] text-violet-300/90 font-mono tracking-widest uppercase">
            [ REGISTRO ACADÉMICO OFICIAL ]
          </span>
        </div>

        {/* 3 Columnas Ampliadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 font-sans">
          
          {/* Columna 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-violet-400 font-semibold">[GRADO SUPERIOR]</span>
              <span className="text-zinc-400">2022 — PRESENTE</span>
            </div>
            <h4 className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
              Ingeniería / Lic. en Sistemas
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-light line-clamp-2">
              Formación universitaria en diseño de algoritmos, computación gráfica y sistemas distribuidos.
            </p>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-cyan-400 font-semibold">[ESPECIALIZACIÓN]</span>
              <span className="text-zinc-400">CERTIFICADO</span>
            </div>
            <h4 className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
              Arquitectura Web & 3D
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-light line-clamp-2">
              Entrenamiento avanzado en WebGL, Three.js, Canvas HTML5, Shaders GLSL y ecosistema React/Next.js.
            </p>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
              <span className="text-amber-400 font-semibold">[INFRAESTRUCTURA]</span>
              <span className="text-zinc-400">PROFESIONAL</span>
            </div>
            <h4 className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
              Sistemas Cloud & DevOps
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed font-light line-clamp-2">
              Microservicios con Docker, CI/CD, bases de datos optimizadas y optimización de Core Web Vitals.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          FILA INFERIOR: CARTA 2 (FOTO) + CARTA 3 (TECNOLOGÍAS CON LOGOS)
         ========================================================================= */}
      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch">
        
        {/* =======================================================================
            CARTA 2: FOTO DE PERFIL
           ======================================================================= */}
        <div
          style={{
            transform: `translate3d(${baseOffset * 1.25}px, 0, 0)`,
            willChange: "transform, opacity",
          }}
          className="w-full sm:w-[300px] lg:w-[340px] shrink-0 rounded-2xl bg-black/28 backdrop-blur-sm border border-white/[0.12] hover:border-violet-400/35 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.12] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
              <span className="font-bold text-white tracking-wider">DEV // PERFIL</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ONLINE</span>
          </div>

          {/* Visor de Foto PNG */}
          <div className="relative w-full h-44 sm:h-52 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={`${getBasePath()}/profile.png`}
              alt="Foto de Perfil"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 w-full h-full object-contain object-bottom z-10 filter drop-shadow-[0_10px_22px_rgba(192,132,252,0.4)]"
            />

            {/* Placeholder holográfico */}
            <div className="flex flex-col items-center justify-center gap-2.5 p-3 text-center z-0">
              <div className="w-16 h-16 rounded-full border border-dashed border-violet-400/50 flex items-center justify-center shadow-[0_0_18px_rgba(192,132,252,0.3)]">
                <svg
                  className="w-8 h-8 text-violet-300/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="font-mono text-center">
                <span className="text-xs text-white font-bold block">FOTO_PERFIL.PNG</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">
                  public/profile.png
                </span>
              </div>
            </div>
          </div>

          {/* Bio Proporcionada */}
          <div className="mt-3 flex flex-col gap-2 font-mono">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Desarrollador Full Stack & 3D
              </h3>
              <p className="text-xs text-violet-300/90 font-light">
                Experiencias web interactivas y código limpio
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-400 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="tracking-wider uppercase font-semibold">DISPONIBLE PARA PROYECTOS</span>
            </div>

            <div className="pt-2 border-t border-white/[0.12] flex items-center justify-between text-[11px] text-zinc-400">
              <span>UBICACIÓN:</span>
              <span className="text-white font-medium">ARGENTINA // REMOTO</span>
            </div>
          </div>
        </div>

        {/* =======================================================================
            CARTA 3: TECNOLOGÍAS QUE DOMINO CON LOGOS
           ======================================================================= */}
        <div
          style={{
            transform: `translate3d(${baseOffset * 1.45}px, 0, 0)`,
            willChange: "transform, opacity",
          }}
          className="flex-1 rounded-2xl bg-black/28 backdrop-blur-sm border border-white/[0.12] hover:border-cyan-400/35 p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between gap-3 pb-2.5 mb-3.5 border-b border-white/[0.12] font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span className="text-sm sm:text-base font-bold tracking-wider text-white">
                TECNOLOGÍAS QUE DOMINO // TECH_STACK.LOG
              </span>
            </div>
            <span className="text-[11px] text-cyan-300 font-mono tracking-widest uppercase">
              [ 24+ STACK ]
            </span>
          </div>

          {/* Grilla 2x2 de Tecnologías con imágenes de logos oficiales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 font-mono">
            
            {/* Categoría 1: Frontend & 3D */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-cyan-400 font-bold tracking-wider">
                <span>01 // FRONTEND & 3D</span>
                <span className="text-zinc-500 font-normal">AVANZADO</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {FRONTEND_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-sm text-zinc-100 border border-white/[0.12] hover:border-cyan-400 hover:text-cyan-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-3.5 h-3.5 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 2: Backend & APIs */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold tracking-wider">
                <span>02 // BACKEND & SERVICIOS</span>
                <span className="text-zinc-500 font-normal">SÓLIDO</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {BACKEND_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-sm text-zinc-100 border border-white/[0.12] hover:border-emerald-400 hover:text-emerald-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-3.5 h-3.5 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 3: Bases de Datos & Caché */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-violet-400 font-bold tracking-wider">
                <span>03 // BASES DE DATOS</span>
                <span className="text-zinc-500 font-normal">OPTIMIZADO</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DATABASE_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-sm text-zinc-100 border border-white/[0.12] hover:border-violet-400 hover:text-violet-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-3.5 h-3.5 object-contain shrink-0 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Categoría 4: Herramientas & Cloud */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold tracking-wider">
                <span>04 // DEVOPS & HERRAMIENTAS</span>
                <span className="text-zinc-500 font-normal">PRODUCCIÓN</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEVOPS_TECHS.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-black/35 backdrop-blur-sm text-zinc-100 border border-white/[0.12] hover:border-amber-400 hover:text-amber-200 transition-all group"
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      loading="lazy"
                      className="w-3.5 h-3.5 object-contain shrink-0 group-hover:scale-110 transition-transform"
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
          <div className="mt-3.5 pt-2.5 border-t border-white/[0.12] flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-cyan-400">⚡</span> ALTO RENDIMIENTO & CÓDIGO LIMPIO
            </span>
            <span className="text-zinc-200 font-semibold">[READY TO SHIP]</span>
          </div>
        </div>

      </div>
    </div>
  );
}
