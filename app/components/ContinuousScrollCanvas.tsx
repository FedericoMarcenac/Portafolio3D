"use client";

import React, { useEffect, useRef } from "react";

// Sequence 1: Frames (1 to 140) - Se redujeron los últimos 10 frames según lo solicitado
const SEQ1_COUNT = 140;

// Sequence 2: FramesMedios (continues from frame 002 to 150, skipping 001 to avoid duplication)
const SEQ2_START_FRAME = 2;
const SEQ2_END_FRAME = 150;
const SEQ2_COUNT = SEQ2_END_FRAME - SEQ2_START_FRAME + 1; // 149 frames

// Sequence 3: FramesGato (continues from frame 002 to 119, skipping 001 to avoid duplication)
const SEQ3_START_FRAME = 2;
const SEQ3_END_FRAME = 119;
const SEQ3_COUNT = SEQ3_END_FRAME - SEQ3_START_FRAME + 1; // 118 frames

// Repetición al final de FramesGato: frames 89 a 119 repetidos 2 veces
const SEQ3_LOOP_START = 89;
const SEQ3_LOOP_END = 119;
const SEQ3_LOOP_COUNT = SEQ3_LOOP_END - SEQ3_LOOP_START + 1; // 31 frames (89 a 119)
const SEQ3_TOTAL_LOOPS = 2; // repetidos 2 veces
const SEQ3_REPEAT_FRAMES = SEQ3_LOOP_COUNT * SEQ3_TOTAL_LOOPS; // 62 frames

// Total continuous steps: 150 + 149 + 118 + 62 = 479 frames
const TOTAL_CONTINUOUS_FRAMES = SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT + SEQ3_REPEAT_FRAMES;

// Helper to resolve the image source for any continuous index (1 to 479)
const getFrameData = (
  globalIndex: number
): { url: string; sequence: 1 | 2 | 3; localIndex: number } => {
  if (globalIndex <= SEQ1_COUNT) {
    const pad = String(globalIndex).padStart(3, "0");
    return {
      url: `/Frames/frame_${pad}.jpg`,
      sequence: 1,
      localIndex: globalIndex,
    };
  } else if (globalIndex <= SEQ1_COUNT + SEQ2_COUNT) {
    const offset = globalIndex - SEQ1_COUNT - 1; // 0, 1, 2...
    const secondFrameNumber = Math.min(SEQ2_END_FRAME, SEQ2_START_FRAME + offset);
    const pad = String(secondFrameNumber).padStart(3, "0");
    return {
      url: `/FramesMedios/frame_${pad}.jpg`,
      sequence: 2,
      localIndex: secondFrameNumber,
    };
  } else if (globalIndex <= SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT) {
    const offset = globalIndex - (SEQ1_COUNT + SEQ2_COUNT) - 1; // 0, 1, 2...
    const thirdFrameNumber = Math.min(SEQ3_END_FRAME, SEQ3_START_FRAME + offset);
    const pad = String(thirdFrameNumber).padStart(3, "0");
    return {
      url: `/FramesGato/frame_${pad}.jpg`,
      sequence: 3,
      localIndex: thirdFrameNumber,
    };
  } else {
    // Repetición 2 veces de los frames 89 al 119
    const repeatOffset = globalIndex - (SEQ1_COUNT + SEQ2_COUNT + SEQ3_COUNT) - 1; // 0, 1, 2...
    const loopIndex = repeatOffset % SEQ3_LOOP_COUNT;
    const thirdFrameNumber = Math.min(SEQ3_LOOP_END, SEQ3_LOOP_START + loopIndex);
    const pad = String(thirdFrameNumber).padStart(3, "0");
    return {
      url: `/FramesGato/frame_${pad}.jpg`,
      sequence: 3,
      localIndex: thirdFrameNumber,
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

  // Cache for Sequence 1 (1 to 150)
  const imagesSeq1 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ1_COUNT + 1).fill(null));
  const loadedSeq1 = useRef<Set<number>>(new Set());

  // Cache for Sequence 2 (2 to 150)
  const imagesSeq2 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ2_END_FRAME + 1).fill(null));
  const loadedSeq2 = useRef<Set<number>>(new Set());

  // Cache for Sequence 3 (2 to 119)
  const imagesSeq3 = useRef<(HTMLImageElement | null)[]>(new Array(SEQ3_END_FRAME + 1).fill(null));
  const loadedSeq3 = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnGlobalRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Helper to retrieve the closest loaded image element for seamless fallback
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
    } else {
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
      // Fallback within sequence 2 to avoid flashes
      if (loadedSeq2.current.has(SEQ2_END_FRAME)) {
        return imagesSeq2.current[SEQ2_END_FRAME];
      }
      return null;
    }
  };

  // Draw frame on canvas with object-fit: cover math and DPR scaling
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

    // Full-bleed cover calculation
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

  // Resize canvas according to device pixel ratio
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

  // Preloading Pipeline for all 3 Sequences
  useEffect(() => {
    let isCancelled = false;

    // 1. High-priority: Load Frame 1 of Sequence 1 immediately for instant 0ms first render
    const firstImg = new Image();
    firstImg.src = getFrameData(1).url;
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesSeq1.current[1] = firstImg;
      loadedSeq1.current.add(1);
      drawFrame(1, true);
    };

    // 2. Early load boundary frames for zero gap:
    // Frame 150 of Seq 1
    const endSeq1Img = new Image();
    endSeq1Img.src = getFrameData(SEQ1_COUNT).url;
    endSeq1Img.onload = () => {
      if (isCancelled) return;
      imagesSeq1.current[SEQ1_COUNT] = endSeq1Img;
      loadedSeq1.current.add(SEQ1_COUNT);
    };

    // Frame 2 of Seq 2 (exact continuation of seq 1)
    const startSeq2Img = new Image();
    startSeq2Img.src = getFrameData(SEQ1_COUNT + 1).url;
    startSeq2Img.onload = () => {
      if (isCancelled) return;
      imagesSeq2.current[SEQ2_START_FRAME] = startSeq2Img;
      loadedSeq2.current.add(SEQ2_START_FRAME);
    };

    // Frame 150 of Seq 2
    const endSeq2Img = new Image();
    endSeq2Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT).url;
    endSeq2Img.onload = () => {
      if (isCancelled) return;
      imagesSeq2.current[SEQ2_END_FRAME] = endSeq2Img;
      loadedSeq2.current.add(SEQ2_END_FRAME);
    };

    // Frame 2 of Seq 3 (exact continuation of seq 2, skipping duplicate 1)
    const startSeq3Img = new Image();
    startSeq3Img.src = getFrameData(SEQ1_COUNT + SEQ2_COUNT + 1).url;
    startSeq3Img.onload = () => {
      if (isCancelled) return;
      imagesSeq3.current[SEQ3_START_FRAME] = startSeq3Img;
      loadedSeq3.current.add(SEQ3_START_FRAME);
    };

    // Frame 119 of Seq 3 (the final frozen frame)
    const endSeq3Img = new Image();
    endSeq3Img.src = getFrameData(TOTAL_CONTINUOUS_FRAMES).url;
    endSeq3Img.onload = () => {
      if (isCancelled) return;
      imagesSeq3.current[SEQ3_END_FRAME] = endSeq3Img;
      loadedSeq3.current.add(SEQ3_END_FRAME);
    };

    // 3. Progressive preloader queue for remaining frames
    const keyframesSeq1: number[] = [];
    const remainingSeq1: number[] = [];
    for (let i = 2; i < SEQ1_COUNT; i++) {
      if (i % 5 === 0) keyframesSeq1.push(i);
      else remainingSeq1.push(i);
    }

    const keyframesSeq2: number[] = [];
    const remainingSeq2: number[] = [];
    for (let i = SEQ2_START_FRAME + 1; i < SEQ2_END_FRAME; i++) {
      if (i % 5 === 0) keyframesSeq2.push(i);
      else remainingSeq2.push(i);
    }

    const keyframesSeq3: number[] = [];
    const remainingSeq3: number[] = [];
    for (let i = SEQ3_START_FRAME + 1; i < SEQ3_END_FRAME; i++) {
      if (i % 4 === 0) keyframesSeq3.push(i);
      else remainingSeq3.push(i);
    }

    const queue: { sequence: 1 | 2 | 3; localIndex: number; url: string }[] = [];

    // Keyframes
    keyframesSeq1.forEach((idx) => {
      queue.push({
        sequence: 1,
        localIndex: idx,
        url: `/Frames/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

    keyframesSeq2.forEach((idx) => {
      queue.push({
        sequence: 2,
        localIndex: idx,
        url: `/FramesMedios/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

    keyframesSeq3.forEach((idx) => {
      queue.push({
        sequence: 3,
        localIndex: idx,
        url: `/FramesGato/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

    // In-between
    remainingSeq1.forEach((idx) => {
      queue.push({
        sequence: 1,
        localIndex: idx,
        url: `/Frames/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

    remainingSeq2.forEach((idx) => {
      queue.push({
        sequence: 2,
        localIndex: idx,
        url: `/FramesMedios/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

    remainingSeq3.forEach((idx) => {
      queue.push({
        sequence: 3,
        localIndex: idx,
        url: `/FramesGato/frame_${String(idx).padStart(3, "0")}.jpg`,
      });
    });

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
          } else {
            imagesSeq3.current[item.localIndex] = img;
            loadedSeq3.current.add(item.localIndex);
          }

          activeDownloads--;

          // Redraw if this frame is currently active
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

      // 0% -> global frame 1 (Frames/frame_001.jpg)
      // 100% -> global frame 417 (FramesGato/frame_119.jpg, completely static)
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

  // Persistent requestAnimationFrame loop for ultra-smooth continuous lerp
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
          current += diff * 0.088;
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
