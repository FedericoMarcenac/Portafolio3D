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

const getBasePath = (): string => {
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0].toLowerCase() === "portafolio3d") {
      return `/${segments[0]}`;
    }
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/Portafolio3D" : "");
};

const getProjects = (basePath: string): Project[] => [
  {
    id: "proj-1",
    number: "01",
    title: "Primer Portafolio Web",
    subtitle: "Mi Primer Portafolio Personal // v1",
    description:
      "Mi primer sitio web de presentación personal desarrollado en los inicios de mi trayectoria. Cuenta con maquetación semántica estructurada, diseño adaptativo y exposición de mis primeros trabajos y metas.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    accentColor: "#06b6d4", // Cyan
    originClass: "origin-bottom-right",
    side: "left",
    mainImage: `${basePath}/projects/fedepagina.png`,
    gallery: [
      {
        title: "Página Principal",
        image: `${basePath}/projects/fedepagina.png`,
      },
      {
        title: "Estructura Web",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Diseño Responsivo",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://federicomarcenac.github.io/fedePagina/index.html",
  },
  {
    id: "proj-2",
    number: "02",
    title: "Sitio Web Ettonazzem",
    subtitle: "Portal Comercial & Catálogo // Negocio Familiar",
    description:
      "Desarrollo web comercial para el negocio familiar de cerrajería integral del automotor y venta de repuestos. Incluye catálogo organizado de productos, secciones informativas de servicios y contacto directo.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    accentColor: "#10b981", // Emerald
    originClass: "origin-bottom-left",
    side: "right",
    mainImage: `${basePath}/projects/ettonazzem.png`,
    gallery: [
      {
        title: "Portada Comercial",
        image: `${basePath}/projects/ettonazzem.png`,
      },
      {
        title: "Catálogo de Productos",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Taller & Servicios",
        image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://federicomarcenac.github.io/paginaEttonazzem/index.html",
  },
  {
    id: "proj-3",
    number: "03",
    title: "Portafolio Federico Marcenac",
    subtitle: "Portafolio Personal Interactivo",
    description:
      "Portafolio interactivo enfocado en diseño moderno, animaciones fluidas, arquitectura modular de secciones para proyectos y experiencia de usuario depurada con soporte multidispositivo.",
    technologies: ["React", "JavaScript", "CSS Modules", "GitHub Pages"],
    accentColor: "#8b5cf6", // Purple
    originClass: "origin-top-right",
    side: "left",
    mainImage: `${basePath}/projects/portafolio-marcenac.png`,
    gallery: [
      {
        title: "Vista General",
        image: `${basePath}/projects/portafolio-marcenac.png`,
      },
      {
        title: "Módulos & Proyectos",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Diseño & UI/UX",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://federicomarcenac.github.io/PortafolioFedericoMarcenac/",
  },
  {
    id: "proj-4",
    number: "04",
    title: "Studio Vanguard Arq",
    subtitle: "Estudio de Arquitectura & Diseño Espacial",
    description:
      "Plataforma conceptual de alta gama para estudio de arquitectura contemporánea. Galería inmersiva de proyectos residenciales, renders 3D minimalistas, visualización de planos y tipografía editorial elegante.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Three.js"],
    accentColor: "#f59e0b", // Amber
    originClass: "origin-top-left",
    side: "right",
    mainImage: `${basePath}/projects/arquitectura.jpg`,
    gallery: [
      {
        title: "Render Residencial",
        image: `${basePath}/projects/arquitectura.jpg`,
      },
      {
        title: "Planos & Concepto",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Espacios & Materiales",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    liveUrl: "https://github.com/FedericoMarcenac",
  },
];

interface ProjectsCardsProps {
  currentFrame: number;
}

export default function ProjectsCards({ currentFrame }: ProjectsCardsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [key: string]: number }>({
    "proj-1": 0,
    "proj-2": 0,
    "proj-3": 0,
    "proj-4": 0,
  });

  const basePath = getBasePath();
  const projects = getProjects(basePath);

  const scrollToProject = (id: string, index: number) => {
    setActiveMobileIndex(index);
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  // Aparecen progresivamente en los frames de medio (entre frame 140 y 289)
  const START_FRAME = 145;
  const SETTLE_FRAME = 210;

  if (currentFrame < START_FRAME) {
    return null;
  }

  // Progreso progresivo suave de entrada
  const rawProgress = Math.max(0, Math.min(1, (currentFrame - START_FRAME) / (SETTLE_FRAME - START_FRAME)));
  const progress = Math.sin((rawProgress * Math.PI) / 2);

  // Desvanecimiento suave al salir hacia la Fase 3
  const FADE_OUT_START = 275;
  const FADE_OUT_END = 295;

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
      className="relative w-full h-full select-none flex flex-col items-center justify-center p-1 sm:p-4 lg:p-6"
      style={{
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {/* ========================================================
          SELECTOR RÁPIDO PARA CELULARES (Oculto en Desktop)
         ======================================================== */}
      <div className="sm:hidden flex items-center justify-center gap-2 mb-2 z-30">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => scrollToProject(proj.id, idx)}
            className={`font-mono text-[11px] px-2.5 py-1 rounded-full border transition-all ${
              activeMobileIndex === idx
                ? "bg-white/20 text-white border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                : "bg-black/50 text-zinc-400 border-white/10 hover:border-white/30"
            }`}
          >
            {proj.number}
          </button>
        ))}
      </div>

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
          4 CUADRANTES DE PANTALLA COMPLETA (Desktop 2x2, Celular carrusel deslizable con snap)
          Visual de alta calidad: bordes nítidos, filtros de contraste,
          chips elegantes y proporciones ampliadas
         ======================================================== */}
      <div
        onScroll={(e) => {
          const target = e.currentTarget;
          const scrollLeft = target.scrollLeft;
          const cardWidth = target.offsetWidth * 0.85;
          if (cardWidth > 0) {
            const idx = Math.min(projects.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
            if (idx !== activeMobileIndex) {
              setActiveMobileIndex(idx);
            }
          }
        }}
        className="flex sm:grid grid-cols-1 sm:grid-cols-2 grid-rows-none sm:grid-rows-2 w-full max-h-[75dvh] sm:max-h-none overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none no-scrollbar max-w-[1580px] gap-4 sm:gap-x-12 sm:gap-y-6 lg:gap-x-16 lg:gap-y-8 items-center justify-start sm:justify-items-center px-4 sm:px-0 py-2"
      >
        {projects.map((proj) => {
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
              ref={(el) => {
                cardRefs.current[proj.id] = el;
              }}
              style={{
                opacity: Math.max(0, Math.min(1, opacity)),
                transform: `translate3d(${lateralOffset}px, 0, 0)`,
                willChange: "transform, opacity",
              }}
              className="relative w-[84vw] max-w-[340px] shrink-0 snap-center sm:w-full sm:max-w-[480px] sm:shrink sm:snap-align-none flex items-center justify-center group"
            >
              {/* Carta Expandible por Click */}
              <div
                onClick={() => toggleSelectCard(proj.id)}
                className={`relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[600px] transition-all duration-300 ease-out cursor-pointer ${proj.originClass} ${
                  isSelected
                    ? "z-50 scale-[1.03] sm:scale-[1.08] shadow-[0_35px_80px_rgba(0,0,0,0.98)]"
                    : isOtherSelected
                    ? "z-10 opacity-30 scale-[0.98] blur-[0.3px]"
                    : "z-10 opacity-100 scale-100 hover:scale-[1.02]"
                }`}
              >
                {/* Contenedor con efecto cristal templado y sombra de profundidad */}
                <div
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 p-4 sm:p-5 lg:p-6 flex flex-col gap-3.5 ${
                    isSelected
                      ? "bg-black/92 border border-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.98)]"
                      : "bg-black/45 border border-white/15 hover:border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  {/* Cabecera abierta técnica */}
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-400 px-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isSelected ? proj.accentColor : proj.accentColor,
                          boxShadow: `0 0 10px ${proj.accentColor}`,
                        }}
                      />
                      <span className="tracking-widest uppercase font-semibold text-zinc-200">
                        PROYECTO // {proj.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                        {isSelected ? "[CERRAR]" : "[VER DETALLES]"}
                      </span>
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(null);
                          }}
                          className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs leading-none transition-colors"
                          title="Cerrar"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Imagen Principal en Alta Definición (+ contraste y nitidez) */}
                  <div className="relative w-full h-44 sm:h-58 lg:h-64 rounded-xl overflow-hidden bg-zinc-950 border border-white/15 shadow-inner group-hover:border-white/30 transition-colors">
                    <img
                      src={activeImage}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Borde interior sutil */}
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />

                    {/* Degradado cinematográfico para máxima legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-transparent pointer-events-none" />

                    {/* Título integrado sobre el degradado inferior */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3 className="font-mono text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)]">
                          {proj.title}
                        </h3>
                        <p className="font-mono text-xs sm:text-[13px] text-zinc-300 font-light tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] line-clamp-1 mt-0.5">
                          {proj.subtitle}
                        </p>
                      </div>
                      <span className="text-sm font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/90 border border-white/20">
                        {isSelected ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido desplegable POR CLICK */}
                  <div
                    className={`transition-all duration-300 overflow-y-auto no-scrollbar flex flex-col gap-3.5 ${
                      isSelected
                        ? "max-h-[290px] sm:max-h-[380px] opacity-100 pt-1.5"
                        : "max-h-0 opacity-0 pt-0"
                    }`}
                  >
                    {/* Galería de vistas */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400">
                        Vistas y capturas secundarias:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {proj.gallery.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleSelectImage(proj.id, idx, e)}
                            className={`relative h-13 rounded-lg overflow-hidden border transition-all ${
                              currentImgIndex === idx
                                ? "border-white ring-2 ring-white/60 scale-102"
                                : "border-white/15 opacity-65 hover:opacity-100 hover:border-white/35"
                            }`}
                            title={item.title}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover filter contrast-[1.02]"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Descripción técnica */}
                    <p className="text-xs sm:text-[13px] font-light text-zinc-300 leading-relaxed font-sans line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 font-mono text-[10px] sm:text-[11px] text-zinc-100 transition-colors"
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
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-white to-zinc-200 text-black font-mono text-xs sm:text-sm font-bold tracking-wider text-center flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_4px_18px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.4)] mt-1"
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
