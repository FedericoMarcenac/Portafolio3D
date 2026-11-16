"use client";

import React, { useState } from "react";

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  mainImage: string;
  gallery: { title: string; image: string }[];
  liveUrl: string;
  accentColor: string;
  originClass: string;
  side: "left" | "right";
}

const PROJECTS: Project[] = [
  {
    id: "proj-1",
    number: "01",
    title: "Aether AI",
    subtitle: "Estudio de Difusión Neural",
    description:
      "Plataforma de generación y síntesis visual en sub-segundos con control preciso de iluminación, composición y cámara mediante modelos generativos.",
    technologies: ["React", "TypeScript", "Node.js", "Python"],
    accentColor: "#06b6d4", // Cyan
    originClass: "origin-bottom-right",
    side: "left",
    mainImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    gallery: [
      {
        title: "Canvas Principal",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Editor de Nodos",
        image:
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Inferencia & Métricas",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://github.com",
  },
  {
    id: "proj-2",
    number: "02",
    title: "Krypton Terminal",
    subtitle: "Trading & Mercados Financieros",
    description:
      "Terminal cuantitativo en tiempo real, monitoreo de libros de órdenes y ejecución de transacciones financieras de alta frecuencia.",
    technologies: ["TypeScript", "React", "PostgreSQL", "Docker"],
    accentColor: "#10b981", // Emerald
    originClass: "origin-bottom-left",
    side: "right",
    mainImage:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      {
        title: "Gráficos en Vivo",
        image:
          "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Order Book & Depth",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Gestión de Portafolio",
        image:
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://github.com",
  },
  {
    id: "proj-3",
    number: "03",
    title: "Nova 3D Space",
    subtitle: "Showroom & E-Commerce Espacial",
    description:
      "Experiencia inmersiva con renderizado 3D interactivo en tiempo real, shaders WebGL y configurador dinámico de materiales PBR.",
    technologies: ["Three.js", "React", "JavaScript", "SQLite"],
    accentColor: "#8b5cf6", // Purple
    originClass: "origin-top-right",
    side: "left",
    mainImage:
      "https://images.unsplash.com/photo-1633493106115-6202479f64bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      {
        title: "Visor 3D Interactivo",
        image:
          "https://images.unsplash.com/photo-1633493106115-6202479f64bf?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Configurador PBR",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Checkout Seguro",
        image:
          "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://github.com",
  },
  {
    id: "proj-4",
    number: "04",
    title: "Vortex Cloud",
    subtitle: "Orquestador de Infraestructura",
    description:
      "Panel de control para microservicios distribuidos, trazabilidad de logs en streaming y escalado autónomo de clústeres nativos en la nube.",
    technologies: ["Python", "Docker", "Git", "Playwright"],
    accentColor: "#f59e0b", // Amber
    originClass: "origin-top-left",
    side: "right",
    mainImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    gallery: [
      {
        title: "Topología de Nodos",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Streaming de Logs",
        image:
          "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Telemetría en Vivo",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://github.com",
  },
];

interface ProjectsCardsProps {
  currentFrame: number;
}

export default function ProjectsCards({ currentFrame }: ProjectsCardsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [key: string]: number }>({
    "proj-1": 0,
    "proj-2": 0,
    "proj-3": 0,
    "proj-4": 0,
  });

  // Aparecen progresivamente en los frames de medio (entre frame 190 y 240)
  const START_FRAME = 190;
  const SETTLE_FRAME = 240;

  if (currentFrame < START_FRAME) {
    return null;
  }

  // Progreso progresivo suave de entrada
  const rawProgress = Math.max(0, Math.min(1, (currentFrame - START_FRAME) / (SETTLE_FRAME - START_FRAME)));
  const progress = Math.sin((rawProgress * Math.PI) / 2);

  // Desvanecimiento suave al salir hacia la Fase 3 (FramesGato / sobreMi.txt)
  const FADE_OUT_START = 289;
  const FADE_OUT_END = 305;

  let opacity = progress;
  if (currentFrame > FADE_OUT_START) {
    if (currentFrame >= FADE_OUT_END) {
      return null;
    }
    const exitProgress = 1 - (currentFrame - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START);
    opacity = Math.sin((exitProgress * Math.PI) / 2);
  }

  const toggleSelectCard = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleSelectImage = (projId: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({ ...prev, [projId]: idx }));
  };

  return (
    <div
      className="relative w-full h-full select-none flex items-center justify-center p-2 sm:p-4 lg:p-6"
      style={{
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {/* ========================================================
          SISTEMA DE CABLES CIBERNÉTICOS (CONECTADOS AL NÚCLEO CENTRAL)
          Conectan el núcleo central (500, 300) con los 4 cuadrantes
         ======================================================== */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 hidden sm:block overflow-visible transition-opacity duration-300"
        style={{ opacity: opacity }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="cableGlowWide" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Núcleo Central de Datos */}
          <circle cx="500" cy="300" r="4" fill="rgba(255,255,255,0.45)" />
          <circle cx="500" cy="300" r="16" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />

          {/* Cable Central -> Cuadrante 1 (Arriba Izquierda: ~260, 160) */}
          <path
            d="M 500 300 C 420 270, 340 220, 260 160"
            stroke={selectedId === "proj-1" ? "#06b6d4" : "rgba(255, 255, 255, 0.12)"}
            strokeWidth={selectedId === "proj-1" ? "2" : "1"}
            filter={selectedId === "proj-1" ? "url(#cableGlowWide)" : undefined}
            className="transition-all duration-300"
          />

          {/* Cable Central -> Cuadrante 2 (Arriba Derecha: ~740, 160) */}
          <path
            d="M 500 300 C 580 270, 660 220, 740 160"
            stroke={selectedId === "proj-2" ? "#10b981" : "rgba(255, 255, 255, 0.12)"}
            strokeWidth={selectedId === "proj-2" ? "2" : "1"}
            filter={selectedId === "proj-2" ? "url(#cableGlowWide)" : undefined}
            className="transition-all duration-300"
          />

          {/* Cable Central -> Cuadrante 3 (Abajo Izquierda: ~260, 440) */}
          <path
            d="M 500 300 C 420 330, 340 380, 260 440"
            stroke={selectedId === "proj-3" ? "#8b5cf6" : "rgba(255, 255, 255, 0.12)"}
            strokeWidth={selectedId === "proj-3" ? "2" : "1"}
            filter={selectedId === "proj-3" ? "url(#cableGlowWide)" : undefined}
            className="transition-all duration-300"
          />

          {/* Cable Central -> Cuadrante 4 (Abajo Derecha: ~740, 440) */}
          <path
            d="M 500 300 C 580 330, 660 380, 740 440"
            stroke={selectedId === "proj-4" ? "#f59e0b" : "rgba(255, 255, 255, 0.12)"}
            strokeWidth={selectedId === "proj-4" ? "2" : "1"}
            filter={selectedId === "proj-4" ? "url(#cableGlowWide)" : undefined}
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* ========================================================
          4 CUADRANTES DE PANTALLA COMPLETA (2 columnas x 2 filas)
          Cartas ampliadas en tamaño para máxima presencia y legibilidad
         ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-none sm:grid-rows-2 w-full h-full max-w-[1580px] gap-6 sm:gap-x-12 sm:gap-y-6 lg:gap-x-16 lg:gap-y-8 items-center justify-items-center">
        {PROJECTS.map((proj) => {
          const isSelected = selectedId === proj.id;
          const isOtherSelected = selectedId !== null && !isSelected;
          const currentImgIndex = activeImageIndexes[proj.id] || 0;
          const activeImage = proj.gallery[currentImgIndex]?.image || proj.mainImage;

          // Desplazamiento lateral desde los costados
          const lateralOffset =
            proj.side === "left"
              ? -(1 - progress) * 160
              : (1 - progress) * 160;

          return (
            <div
              key={proj.id}
              style={{
                opacity: Math.max(0, Math.min(1, opacity)),
                transform: `translate3d(${lateralOffset}px, 0, 0)`,
                willChange: "transform, opacity",
              }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Carta Expandible por Click (Agrandada) */}
              <div
                onClick={() => toggleSelectCard(proj.id)}
                className={`relative w-full max-w-[460px] sm:max-w-[530px] lg:max-w-[580px] transition-all duration-300 ease-out cursor-pointer ${proj.originClass} ${
                  isSelected
                    ? "z-50 scale-[1.05] sm:scale-[1.08] shadow-[0_35px_80px_rgba(0,0,0,0.98)]"
                    : isOtherSelected
                    ? "z-10 opacity-30 scale-[0.98] blur-[0.3px]"
                    : "z-10 opacity-100 scale-100 hover:scale-[1.015]"
                }`}
              >
                {/* Contenedor Abierto y Proporcionado */}
                <div
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 flex flex-col gap-3.5 ${
                    isSelected
                      ? "bg-black/92 border border-white/35 shadow-[0_18px_50px_rgba(0,0,0,0.98)]"
                      : "bg-black/50 border border-white/[0.1] hover:border-white/25 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
                  }`}
                >
                  {/* Cabecera abierta técnica */}
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-400 px-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isSelected ? proj.accentColor : "rgba(255,255,255,0.35)",
                          boxShadow: isSelected ? `0 0 10px ${proj.accentColor}` : "none",
                        }}
                      />
                      <span className="tracking-widest uppercase font-medium">PROYECTO // {proj.number}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                        {isSelected ? "[CLICK CERRAR]" : "[CLICK VER]"}
                      </span>
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(null);
                          }}
                          className="w-4.5 h-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs leading-none transition-colors"
                          title="Cerrar"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Imagen Principal (+ tamaño ampliado, h-48 a h-56) */}
                  <div className="relative w-full h-48 sm:h-54 lg:h-56 rounded-xl overflow-hidden bg-zinc-950">
                    <img
                      src={activeImage}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Título integrado sobre el degradado inferior */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3 className="font-mono text-base sm:text-lg font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          {proj.title}
                        </h3>
                        <p className="font-mono text-xs sm:text-[13px] text-zinc-300 font-light tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] line-clamp-1">
                          {proj.subtitle}
                        </p>
                      </div>
                      <span className="text-sm text-white/70 font-mono">
                        {isSelected ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido desplegable POR CLICK */}
                  <div
                    className={`transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
                      isSelected
                        ? "max-h-[360px] opacity-100 pt-1.5"
                        : "max-h-0 opacity-0 pt-0"
                    }`}
                  >
                    {/* Galería de vistas */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400">
                        Vistas secundarias:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {proj.gallery.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleSelectImage(proj.id, idx, e)}
                            className={`relative h-12 rounded-lg overflow-hidden border transition-all ${
                              currentImgIndex === idx
                                ? "border-white ring-1 ring-white/60 scale-102"
                                : "border-white/15 opacity-60 hover:opacity-100"
                            }`}
                            title={item.title}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Descripción técnica */}
                    <p className="text-xs sm:text-[13px] font-light text-zinc-300 leading-relaxed font-sans line-clamp-2">
                      {proj.description}
                    </p>

                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15 font-mono text-[10px] sm:text-[11px] text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Enlace al proyecto */}
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-mono text-xs sm:text-sm font-semibold tracking-wider text-center flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-[0_4px_14px_rgba(255,255,255,0.2)] mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>VISITAR PROYECTO</span>
                      <span>↗</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
