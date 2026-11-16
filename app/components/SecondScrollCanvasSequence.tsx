"use client";

import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 150;

// URL helper for FramesMedios sequence
const getFrameUrl = (index: number) => {
  const pad = String(index).padStart(3, "0");
  return `/FramesMedios/frame_${pad}.jpg`;
};

interface SecondScrollCanvasSequenceProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SecondScrollCanvasSequence({ containerRef }: SecondScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedFramesRef = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Helper to find the nearest available frame while assets load
  const getNearestAvailableFrame = (desiredIndex: number): number => {
    const loaded = loadedFramesRef.current;
    if (loaded.has(desiredIndex)) return desiredIndex;
    if (loaded.size === 0) return 1;

    let closest = 1;
    let minDiff = Infinity;
    for (const idx of loaded) {
      const diff = Math.abs(idx - desiredIndex);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    }
    return closest;
  };

  // Draw frame on canvas with object-fit: cover math and DPR scaling
  const drawFrame = (desiredFrame: number, forceRedraw = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Clamp firmly between 1 and TOTAL_FRAMES (frame 150 remains static at the end)
    const clampedDesired = Math.min(TOTAL_FRAMES, Math.max(1, desiredFrame));
    const frameToUse = getNearestAvailableFrame(clampedDesired);
    const img = imagesRef.current[frameToUse];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (!forceRedraw && lastDrawnFrameRef.current === frameToUse) return;
    lastDrawnFrameRef.current = frameToUse;

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

    // Full-bleed cover calculation preserving original quality, lighting, and aspect ratio
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

    // Redraw immediately after resize
    const target = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
    drawFrame(target, true);
  };

  // Progressive Preloading Pipeline for the Second Sequence
  useEffect(() => {
    let isCancelled = false;

    // 1. High-priority: Load first frame immediately so it is pre-rendered before user scrolls into section
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[1] = firstImg;
      loadedFramesRef.current.add(1);
      drawFrame(1, true);
    };

    // Also load frame 150 early so the final frame is guaranteed ready
    const lastImg = new Image();
    lastImg.src = getFrameUrl(TOTAL_FRAMES);
    lastImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[TOTAL_FRAMES] = lastImg;
      loadedFramesRef.current.add(TOTAL_FRAMES);
    };

    // 2. Progressive preloading:
    // First pass: Keyframes (every 5th frame) to ensure smooth scrubbing
    // Second pass: Remaining in-between frames with controlled concurrency
    const keyframes: number[] = [];
    const remainingFrames: number[] = [];

    for (let i = 2; i < TOTAL_FRAMES; i++) {
      if (i % 5 === 0) {
        keyframes.push(i);
      } else {
        remainingFrames.push(i);
      }
    }

    const queue = [...keyframes, ...remainingFrames];
    const MAX_CONCURRENT = 8;
    let activeDownloads = 0;

    const loadNext = () => {
      if (isCancelled || queue.length === 0) return;

      while (activeDownloads < MAX_CONCURRENT && queue.length > 0) {
        const frameIndex = queue.shift()!;
        activeDownloads++;

        const img = new Image();
        img.src = getFrameUrl(frameIndex);

        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[frameIndex] = img;
          loadedFramesRef.current.add(frameIndex);
          activeDownloads--;

          // If the currently desired frame matches this loaded frame, redraw immediately
          const currentTarget = Math.round(currentFrameRef.current);
          if (Math.abs(currentTarget - frameIndex) <= 1) {
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

  // Independent Scroll Listener: Calculates progress for the second sequence
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      // If the second section has not reached the viewport top yet, stay at frame 1
      if (rect.top > 0) {
        targetFrameRef.current = 1;
        return;
      }

      // Progress begins when rect.top <= 0 and completes at rect.top <= -scrollHeight
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / scrollHeight));

      // 0% -> frame 1, 100% -> frame 150
      // Clamped so once frame 150 is reached, it remains static and never resets
      const target = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = Math.min(TOTAL_FRAMES, Math.max(1, target));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  // Persistent requestAnimationFrame loop for ultra-smooth lerp interpolation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      let current = currentFrameRef.current;

      if (prefersReducedMotion) {
        current = target;
      } else {
        // Apple-level smooth lerp easing factor (0.09)
        const diff = target - current;
        if (Math.abs(diff) < 0.001) {
          current = target;
        } else {
          current += diff * 0.09;
        }
      }

      // Clamp firmly: frame 150 remains static on screen once reached
      current = Math.min(TOTAL_FRAMES, Math.max(1, current));
      currentFrameRef.current = current;

      const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(current)));
      drawFrame(frameIndex);

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    rafIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-black">
      {/* HTML5 Canvas - Segunda secuencia limpia, nítida y fiel a los colores originales de FramesMedios */}
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
