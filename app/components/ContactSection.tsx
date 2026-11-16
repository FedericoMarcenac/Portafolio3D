"use client";

import React, { useState } from "react";

interface ContactSectionProps {
  currentFrame: number;
}

export default function ContactSection({ currentFrame }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  // Aparece recién en el frame_126 de FramesSalto (global frame 533 = 407 + 126)
  // - Frames < 533: Completamente invisible (0)
  // - Frames 533–542: Aparición cinematográfica suave
  // - Frames >= 542 (hasta el final de FramesSalto, frame 150 / global 557): Totalmente visible y activo
  let opacity = 0;
  if (currentFrame < 533) {
    opacity = 0;
  } else if (currentFrame >= 533 && currentFrame <= 542) {
    const p = (currentFrame - 533) / (542 - 533);
    opacity = Math.sin((p * Math.PI) / 2);
  } else {
    opacity = 1.0;
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText("federicomarcenac14@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto flex flex-col gap-5 sm:gap-6 select-none transition-opacity duration-200"
      style={{
        opacity: opacity,
        pointerEvents: opacity > 0.25 ? "auto" : "none",
        visibility: opacity > 0 ? "visible" : "hidden",
      }}
    >
      {/* =======================================================================
          CARTA PRINCIPAL DE CONTACTO (Basada exactamente en contacto.txt)
         ======================================================================= */}
      <div className="w-full rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-emerald-400/40 p-6 sm:p-8 flex flex-col gap-6 shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
        
        {/* Cabecera Técnica */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span className="font-bold text-white tracking-widest uppercase">
              CONTACTO // FEDERICO MARCENAC
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>DISPONIBILIDAD INMEDIATA • FULL-TIME</span>
          </div>
        </div>

        {/* Título y Mensaje extraído de contacto.txt */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-white tracking-wide">
            Hablemos de tu próximo proyecto.
          </h3>
          <p className="text-sm sm:text-base text-violet-300 font-mono font-light">
            Programador & Técnico en Soporte IT / Help Desk
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mt-2">
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans italic">
              &ldquo;Abierto a nuevas oportunidades laborales, desarrollo de proyectos de software y soporte técnico integral. ¡Conectemos!&rdquo;
            </p>
            <span className="block mt-1 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              — contacto.txt
            </span>
          </div>
        </div>

        {/* Grilla de Canales de Contacto Directo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 font-mono text-xs">
          
          {/* Canal 1: Correo Electrónico */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-emerald-400/50 transition-colors flex flex-col justify-between gap-3 group">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span className="text-emerald-400 font-semibold uppercase">01 // EMAIL DIRECTO</span>
              <span>RESPUESTA RÁPIDA</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-wide break-all">
              federicomarcenac14@gmail.com
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="mailto:federicomarcenac14@gmail.com"
                className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-200 hover:text-white border border-emerald-400/30 text-center font-semibold text-[11px] tracking-wider transition-colors"
              >
                ENVIAR EMAIL ↗
              </a>
              <button
                onClick={handleCopyEmail}
                className="py-1.5 px-3 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] text-zinc-200 hover:text-white border border-white/15 text-[11px] font-semibold tracking-wider transition-colors"
                title="Copiar email al portapapeles"
              >
                {copied ? "✓ COPIADO" : "COPIAR"}
              </button>
            </div>
          </div>

          {/* Canal 2: LinkedIn */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-cyan-400/50 transition-colors flex flex-col justify-between gap-3 group">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span className="text-cyan-400 font-semibold uppercase">02 // LINKEDIN</span>
              <span>RED PROFESIONAL</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-wide">
              Federico Marcenac
            </div>
            <a
              href="https://linkedin.com/in/federico-marcenac-546ab228b"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-200 hover:text-white border border-cyan-400/30 text-center font-semibold text-[11px] tracking-wider transition-colors"
            >
              VER PERFIL EN LINKEDIN ↗
            </a>
          </div>

          {/* Canal 3: GitHub */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-violet-400/50 transition-colors flex flex-col justify-between gap-3 group">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span className="text-violet-400 font-semibold uppercase">03 // GITHUB</span>
              <span>REPOSITORIOS & CÓDIGO</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-wide">
              @FedericoMarcenac
            </div>
            <a
              href="https://github.com/FedericoMarcenac"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 rounded-lg bg-violet-500/20 hover:bg-violet-500/35 text-violet-200 hover:text-white border border-violet-400/30 text-center font-semibold text-[11px] tracking-wider transition-colors"
            >
              EXPLORAR GITHUB ↗
            </a>
          </div>

          {/* Canal 4: Ubicación & Modalidad */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-amber-400/50 transition-colors flex flex-col justify-between gap-3 group">
            <div className="flex items-center justify-between text-zinc-400 text-[11px]">
              <span className="text-amber-400 font-semibold uppercase">04 // UBICACIÓN & MODALIDAD</span>
              <span>ARGENTINA</span>
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                Bahía Blanca, Buenos Aires
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Remoto • Híbrido • Presencial
              </div>
            </div>
            <div className="py-1.5 px-3 rounded-lg bg-white/[0.06] text-zinc-300 text-center font-semibold text-[11px] tracking-wider border border-white/10">
              ZONA HORARIA: UTC-3 (ART)
            </div>
          </div>

        </div>

        {/* Pie Técnico */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">●</span> FORMACIÓN UTN FRBB & NEGOCIO FAMILIAR
          </span>
          <span className="text-zinc-300 font-medium">
            [ READY TO COLLABORATE ]
          </span>
        </div>

      </div>
    </div>
  );
}
