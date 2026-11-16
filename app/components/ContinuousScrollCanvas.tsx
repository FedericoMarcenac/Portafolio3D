"use client";

import React, { useEffect, useRef } from "react";

// Sequence 1: Frames (1 to 140)
const SEQ1_COUNT = 140;

// Sequence 2: FramesMedios (2 to 150)
const SEQ2_START_FRAME = 2;
const SEQ2_END_FRAME = 150;
const SEQ2_COUNT = SEQ2_END_FRAME - SEQ2_START_FRAME + 1; // 149 frames

// Sequence 3: FramesGato (2 to 119)
const SEQ3_START_FRAME = 2;
const SEQ3_END_FRAME = 119;
const SEQ3_COUNT = SEQ3_END_FRAME - SEQ3_START_FRAME + 1; // 118 frames

// Sequence 4: FramesSalto (1 to 150) - Secuencia cinemática de salto hacia contacto
const SEQ4_START_FRAME = 1;
const SEQ4_END_FRAME = 150;
const SEQ4_COUNT = SEQ4_END_FRAME - SEQ4_START_FRAME + 1; // 150 frames

// Total continuo de frames: 140 + 149 + 118 + 150 = 557 frames
const TOTAL_CONTINUOUS_FRAMES = SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT + SEQ4_COUNT;

// Detección dinámica de Base Path para GitHub Pages (/Portafolio3D) y localhost ("")
const getBasePath = (): string => {
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0].toLowerCase() === "portafolio3d") {
      return `/${segments[0]}`;
    }
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/Portafolio3D" : "");
};

// Resuelve la URL y datos de secuencia para cualquier índice global (1 a 557)
export const getFrameData = (
  globalIndex: number
): { url: string; sequence: 1 | 2 | 3 | 4; localIndex: number } => {
  const basePath = getBasePath();
  if (globalIndex <= SEQ1_COUNT) {
    const pad = String(globalIndex).padStart(3, "0");
    return {
      url: `${basePath}/Frames/frame_${pad}.jpg`,
      sequence: 1,
      localIndex: globalIndex,
    };
  } else if (globalIndex <= SEQ1_COUNT + SEQ2_COUNT) {
    const offset = globalIndex - SEQ1_COUNT - 1; // 0, 1, 2...
    const secondFrameNumber = Math.min(SEQ2_END_FRAME, SEQ2_START_FRAME + offset);
    const pad = String(secondFrameNumber).padStart(3, "0");
    return {
      url: `${basePath}/FramesMedios/frame_${pad}.jpg`,
      sequence: 2,
      localIndex: secondFrameNumber,
    };
  } else if (globalIndex <= SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT) {
    const offset = globalIndex - (SEQ1_COUNT + SEQ2_COUNT) - 1; // 0, 1, 2...
    const thirdFrameNumber = Math.min(SEQ3_END_FRAME, SEQ3_START_FRAME + offset);
    const pad = String(thirdFrameNumber).padStart(3, "0");
    return {
      url: `${basePath}/FramesGato/frame_${pad}.jpg`,
      sequence: 3,
      localIndex: thirdFrameNumber,
    };
  } else {
    const offset = globalIndex - (SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT) - 1; // 0, 1, 2...
    const fourthFrameNumber = Math.min(SEQ4_END_FRAME, SEQ4_START_FRAME + offset);
    const pad = String(fourthFrameNumber).padStart(3, "0");
    return {
      url: `${basePath}/FramesSalto/frame_${pad}.jpg`,
      sequence: 4,
      localIndex: fourthFrameNumber,
    };
  }
};

interface ContinuousScrollCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPhaseChange?: (currentGlobalFrame: number) => void;
}

export default function ContinuousScrollCanvas({
  containerRef,
  onPhaseChange,
}: ContinuousScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cache para Secuencia 1 (Frames, 1 a 140)
  const imagesSeq1 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ1_COUNT + 1).fill(null));
  const loadedSeq1 = useRef<Set<number>>(new Set());

  // Cache para Secuencia 2 (FramesMedios, 2 a 150)
  const imagesSeq2 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ2_END_FRAME + 1).fill(null));
  const loadedSeq2 = useRef<Set<number>>(new Set());

  // Cache para Secuencia 3 (FramesGato, 2 a 119)
  const imagesSeq3 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ3_END_FRAME + 1).fill(null));
  const loadedSeq3 = useRef<Set<number>>(new Set());

  // Cache para Secuencia 4 (FramesSalto, 1 a 150)
  const imagesSeq4 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ4_END_FRAME + 1).fill(null));
  const loadedSeq4 = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnGlobalRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Obtiene la imagen cargada más cercana para evitar parpadeos o pantallas en negro
  const getImageForGlobalIndex = (globalIndex: number): HTMLImageElement | null => {
    const { sequence, localIndex } = getFrameData(globalIndex);

    if (sequence === 1) {
      if (loadedSeq1.current.has(localIndex)) {
        return imagesSeq1.current[localIndex];
      }
      if (loadedSeq1.current.size > 0) {
        let closest = 1;
        let minDiff = Infinity;
        for (const idx of loadedSeq1.current) {
          const diff = Math.abs(idx - localIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
        return imagesSeq1.current[closest];
      }
      return null;
    } else if (sequence === 2) {
      if (loadedSeq2.current.has(localIndex)) {
        return imagesSeq2.current[localIndex];
      }
      if (loadedSeq2.current.size > 0) {
        let closest = SEQ2_START_FRAME;
        let minDiff = Infinity;
        for (const idx of loadedSeq2.current) {
          const diff = Math.abs(idx - localIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
        return imagesSeq2.current[closest];
      }
      if (loadedSeq1.current.has(SEQ1_COUNT)) {
        return imagesSeq1.current[SEQ1_COUNT];
      }
      return null;
    } else if (sequence === 3) {
      if (loadedSeq3.current.has(localIndex)) {
        return imagesSeq3.current[localIndex];
      }
      if (loadedSeq3.current.size > 0) {
        let closest = SEQ3_START_FRAME;
        let minDiff = Infinity;
        for (const idx of loadedSeq3.current) {
          const diff = Math.abs(idx - localIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
        return imagesSeq3.current[closest];
      }
      if (loadedSeq2.current.has(SEQ2_END_FRAME)) {
        return imagesSeq2.current[SEQ2_END_FRAME];
      }
      return null;
    } else {
      if (loadedSeq4.current.has(localIndex)) {
        return imagesSeq4.current[localIndex];
      }
      if (loadedSeq4.current.size > 0) {
        let closest = SEQ4_START_FRAME;
        let minDiff = Infinity;
        for (const idx of loadedSeq4.current) {
          const diff = Math.abs(idx - localIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closest = idx;
          }
        }
        return imagesSeq4.current[closest];
      }
      if (loadedSeq3.current.has(SEQ3_END_FRAME)) {
        return imagesSeq3.current[SEQ3_END_FRAME];
      }
      return null;
    }
  };

  // Renderizado en canvas con DPR scaling y encuadre cover
  const drawFrame = (desiredGlobalFrame: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedGlobal = Math.min(TOTAL_CONTINUOUS_FRAMES, Math.max(1, desiredGlobalFrame));
    const img = getImageForGlobalIndex(clampedGlobal);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (!forceRedraw && lastDrawnGlobalRef.current === clampedGlobal) return;
    lastDrawnGlobalRef.current = clampedGlobal;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redimensionamiento
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const target = Math.min(
      TOTAL_CONTINUOUS_FRAMES,
      Math.max(1, Math.round(currentFrameRef.current))
    );
    drawFrame(target, true);
  };

  // Pre-carga progresiva de las 4 secuencias
  useEffect(() => {
    let isCancelled = false;

    // 1. Alta prioridad: Frame 1 de Secuencia 1 para render inicial instantáneo
    const firstImg = new Image();
    firstImg.src = getFrameData(1).url;
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesSeq1.current[1] = firstImg;
      loadedSeq1.current.add(1);
      drawFrame(1, true);
    };

    // 2. Carga prioritaria de puntos frontera clave:
    // Frame 140 de Seq 1
    const endSeq1Img = new Image();
    endSeq1Img.src = getFrameData(SEQ1_COUNT).url;
    endSeq1Img.onload = () => {
      if (isCancelled) return;
      imagesSeq1.current[SEQ1_COUNT] = endSeq1Img;
      loadedSeq1.current.add(SEQ1_COUNT);
    };

    // Frame 2 de Seq 2
    const startSeq2Img = new Image();
    startSeq2Img.src = getFrameData(SEQ1_COUNT + 1).url;
    startSeq2Img.onload = () => {
      if (isCancelled) return;
      imagesSeq2.current[SEQ2_START_FRAME] = startSeq2Img;
      loadedSeq2.current.add(SEQ2_START_FRAME);
    };

    // Frame 150 de Seq 2
    const endSeq2Img = new Image();
    endSeq2Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT).url;
    endSeq2Img.onload = () => {
      if (isCancelled) return;
      imagesSeq2.current[SEQ2_END_FRAME] = endSeq2Img;
      loadedSeq2.current.add(SEQ2_END_FRAME);
    };

    // Frame 2 de Seq 3 (FramesGato)
    const startSeq3Img = new Image();
    startSeq3Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + 1).url;
    startSeq3Img.onload = () => {
      if (isCancelled) return;
      imagesSeq3.current[SEQ3_START_FRAME] = startSeq3Img;
      loadedSeq3.current.add(SEQ3_START_FRAME);
    };

    // Frame 119 de Seq 3
    const endSeq3Img = new Image();
    endSeq3Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT).url;
    endSeq3Img.onload = () => {
      if (isCancelled) return;
      imagesSeq3.current[SEQ3_END_FRAME] = endSeq3Img;
      loadedSeq3.current.add(SEQ3_END_FRAME);
    };

    // Frame 1 de Seq 4 (FramesSalto)
    const startSeq4Img = new Image();
    startSeq4Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT + 1).url;
    startSeq4Img.onload = () => {
      if (isCancelled) return;
      imagesSeq4.current[1] = startSeq4Img;
      loadedSeq4.current.add(1);
    };

    // Frame 88 de Seq 4 (Desaparición de Sobre Mí)
    const f88Seq4Img = new Image();
    f88Seq4Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT + 88).url;
    f88Seq4Img.onload = () => {
      if (isCancelled) return;
      imagesSeq4.current[88] = f88Seq4Img;
      loadedSeq4.current.add(88);
    };

    // Frame 126 de Seq 4 (Aparición de Contacto)
    const f126Seq4Img = new Image();
    f126Seq4Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT + 126).url;
    f126Seq4Img.onload = () => {
      if (isCancelled) return;
      imagesSeq4.current[126] = f126Seq4Img;
      loadedSeq4.current.add(126);
    };

    // Frame 150 de Seq 4 (Final de salto)
    const endSeq4Img = new Image();
    endSeq4Img.src = getFrameData(TOTAL_CONTINUOUS_FRAMES).url;
    endSeq4Img.onload = () => {
      if (isCancelled) return;
      imagesSeq4.current[SEQ4_END_FRAME] = endSeq4Img;
      loadedSeq4.current.add(SEQ4_END_FRAME);
    };

    // 3. Cola de pre-carga en segundo plano para las 4 secuencias
    const queue: { sequence: 1 | 2 | 3 | 4; localIndex: number; url: string }[] = [];
    const basePath = getBasePath();

    // Keyframes
    for (let i = 2; i < SEQ1_COUNT; i += 4) {
      queue.push({
        sequence: 1,
        localIndex: i,
        url: `${basePath}/Frames/frame_${String(i).padStart(3, "0")}.jpg`,
      });
    }
    for (let i = SEQ2_START_FRAME + 1; i < SEQ2_END_FRAME; i += 4) {
      queue.push({
        sequence: 2,
        localIndex: i,
        url: `${basePath}/FramesMedios/frame_${String(i).padStart(3, "0")}.jpg`,
      });
    }
    for (let i = SEQ3_START_FRAME + 1; i < SEQ3_END_FRAME; i += 4) {
      queue.push({
        sequence: 3,
        localIndex: i,
        url: `${basePath}/FramesGato/frame_${String(i).padStart(3, "0")}.jpg`,
      });
    }
    for (let i = SEQ4_START_FRAME + 1; i < SEQ4_END_FRAME; i += 4) {
      queue.push({
        sequence: 4,
        localIndex: i,
        url: `${basePath}/FramesSalto/frame_${String(i).padStart(3, "0")}.jpg`,
      });
    }

    // Frames restantes
    for (let i = 2; i < SEQ1_COUNT; i++) {
      if (i % 4 !== 0) {
        queue.push({
          sequence: 1,
          localIndex: i,
          url: `${basePath}/Frames/frame_${String(i).padStart(3, "0")}.jpg`,
        });
      }
    }
    for (let i = SEQ2_START_FRAME + 1; i < SEQ2_END_FRAME; i++) {
      if (i % 4 !== 0) {
        queue.push({
          sequence: 2,
          localIndex: i,
          url: `${basePath}/FramesMedios/frame_${String(i).padStart(3, "0")}.jpg`,
        });
      }
    }
    for (let i = SEQ3_START_FRAME + 1; i < SEQ3_END_FRAME; i++) {
      if (i % 4 !== 0) {
        queue.push({
          sequence: 3,
          localIndex: i,
          url: `${basePath}/FramesGato/frame_${String(i).padStart(3, "0")}.jpg`,
        });
      }
    }
    for (let i = SEQ4_START_FRAME + 1; i < SEQ4_END_FRAME; i++) {
      if (i % 4 !== 0) {
        queue.push({
          sequence: 4,
          localIndex: i,
          url: `${basePath}/FramesSalto/frame_${String(i).padStart(3, "0")}.jpg`,
        });
      }
    }

    const MAX_CONCURRENT = 8;
    let activeDownloads = 0;

    const loadNext = () => {
      if (isCancelled || queue.length === 0) return;

      while (activeDownloads < MAX_CONCURRENT && queue.length > 0) {
        const item = queue.shift()!;
        activeDownloads++;

        const img = new Image();
        img.src = item.url;

        img.onload = () => {
          if (isCancelled) return;
          if (item.sequence === 1) {
            imagesSeq1.current[item.localIndex] = img;
            loadedSeq1.current.add(item.localIndex);
          } else if (item.sequence === 2) {
            imagesSeq2.current[item.localIndex] = img;
            loadedSeq2.current.add(item.localIndex);
          } else if (item.sequence === 3) {
            imagesSeq3.current[item.localIndex] = img;
            loadedSeq3.current.add(item.localIndex);
          } else {
            imagesSeq4.current[item.localIndex] = img;
            loadedSeq4.current.add(item.localIndex);
          }

          activeDownloads--;

          const currentTarget = Math.round(currentFrameRef.current);
          const currentData = getFrameData(currentTarget);
          if (
            currentData.sequence === item.sequence &&
            Math.abs(currentData.localIndex - item.localIndex) <= 1
          ) {
            drawFrame(currentTarget, true);
          }

          loadNext();
        };

        img.onerror = () => {
          if (isCancelled) return;
          activeDownloads--;
          loadNext();
        };
      }
    };

    loadNext();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Window resize & orientation handling
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Continuous Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / scrollHeight));

      const target = 1 + progress * (TOTAL_CONTINUOUS_FRAMES - 1);
      targetFrameRef.current = Math.min(TOTAL_CONTINUOUS_FRAMES, Math.max(1, target));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  // Persistent requestAnimationFrame loop para LERP continuo ultra suave
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      let current = currentFrameRef.current;

      if (prefersReducedMotion) {
        current = target;
      } else {
        const diff = target - current;
        if (Math.abs(diff) < 0.001) {
          current = target;
        } else {
          current += diff * 0.12;
        }
      }

      current = Math.min(TOTAL_CONTINUOUS_FRAMES, Math.max(1, current));
      currentFrameRef.current = current;

      const frameIndex = Math.min(TOTAL_CONTINUOUS_FRAMES, Math.max(1, Math.round(current)));
      drawFrame(frameIndex);

      if (onPhaseChange) {
        onPhaseChange(frameIndex);
      }

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    rafIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onPhaseChange]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
