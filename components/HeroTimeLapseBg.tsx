"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Play,
  Pause,
  RotateCcw,
  Clock,
} from "lucide-react";

const TOTAL_FRAMES = 300;

function getFrameUrl(index: number): string {
  const paddedIndex = String(index).padStart(3, "0");
  return `/Hero/ezgif-frame-${paddedIndex}.jpg`;
}

// Convert current 24-hour time to 1..300 frame index
function getFrameIndexFromDate(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalSecondsInDay = hours * 3600 + minutes * 60 + seconds;
  const fraction = totalSecondsInDay / 86400; // 0.0 to 1.0
  const frame = Math.floor(fraction * (TOTAL_FRAMES - 1)) + 1;
  return Math.min(TOTAL_FRAMES, Math.max(1, frame));
}

// Get time string and metadata from frame index (1..300)
function getTimeInfoFromFrame(frame: number): {
  timeStr: string;
  label: string;
  period: "morning" | "noon" | "sunset" | "night";
} {
  const fraction = (frame - 1) / (TOTAL_FRAMES - 1);
  const totalSeconds = Math.round(fraction * 86400);
  const hours24 = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const displayHours = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const timeStr = `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;

  let label = "Morning";
  let period: "morning" | "noon" | "sunset" | "night" = "morning";

  if (hours24 >= 5 && hours24 < 11) {
    label = "Morning Sunrise";
    period = "morning";
  } else if (hours24 >= 11 && hours24 < 16) {
    label = "Midday Sun";
    period = "noon";
  } else if (hours24 >= 16 && hours24 < 19) {
    label = "Golden Sunset";
    period = "sunset";
  } else {
    label = "Starlight Night";
    period = "night";
  }

  return { timeStr, label, period };
}

export default function HeroTimeLapseBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Array storing preloaded Image objects
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const loadedFramesRef = useRef<Set<number>>(new Set());

  // Animation state refs for zero-lag requestAnimationFrame updates
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const isPlayingLoopRef = useRef<boolean>(false);
  const isLiveSyncRef = useRef<boolean>(true);
  const animationFrameIdRef = useRef<number | null>(null);

  // UI state for display
  const [displayFrame, setDisplayFrame] = useState<number>(1);
  const [isLiveSync, setIsLiveSync] = useState<boolean>(true);
  const [isPlayingLoop, setIsPlayingLoop] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Calculate live time target frame
  const updateTargetToLiveTime = useCallback(() => {
    const now = new Date();
    const liveFrame = getFrameIndexFromDate(now);
    targetFrameRef.current = liveFrame;
  }, []);

  // Preload images progressive strategy
  useEffect(() => {
    let isCancelled = false;

    // 1. Initial live target frame
    const now = new Date();
    const liveTarget = getFrameIndexFromDate(now);
    targetFrameRef.current = liveTarget;

    // Load key frames first (frame 1, liveTarget, and 10 evenly spaced frames)
    const priorityIndices = new Set<number>([
      1,
      liveTarget,
      ...Array.from(
        { length: 15 },
        (_, i) => Math.floor((i * (TOTAL_FRAMES - 1)) / 14) + 1,
      ),
    ]);

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index - 1]) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index - 1] = img;
            loadedFramesRef.current.add(index);
            if (index === 1 || index === liveTarget) {
              setIsLoaded(true);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    const loadImagesSequentially = async () => {
      // Step A: Load priority frames first
      const priorityArray = Array.from(priorityIndices);
      await Promise.all(priorityArray.map((idx) => loadSingleFrame(idx)));
      if (!isCancelled) setIsLoaded(true);

      // Step B: Load all remaining frames progressively in background
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        if (!loadedFramesRef.current.has(i)) {
          await loadSingleFrame(i);
        }
      }
    };

    loadImagesSequentially();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Update target time when in Live Sync mode every second
  useEffect(() => {
    if (!isLiveSync) return;

    updateTargetToLiveTime();
    const interval = setInterval(() => {
      if (isLiveSyncRef.current) {
        updateTargetToLiveTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveSync, updateTargetToLiveTime]);

  // Main Canvas Render Loop (60 FPS requestAnimationFrame)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let lastStateUpdate = 0;

    const render = (timestamp: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Update current frame index smoothly
      if (isPlayingLoopRef.current) {
        // Continuous smooth time-lapse video loop playback
        currentFrameRef.current += 0.4; // smooth playback speed
        if (currentFrameRef.current > TOTAL_FRAMES) {
          currentFrameRef.current = 1;
        }
      } else {
        // Smoothly interpolate towards targetFrameRef (Live time or user selected target)
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          // Dynamic interpolation speed (faster if far away e.g. initial load transition)
          const step = Math.min(Math.abs(diff) * 0.08 + 0.2, Math.abs(diff));
          currentFrameRef.current += Math.sign(diff) * step;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const activeFrameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentFrameRef.current)),
      );

      // Find nearest loaded frame if current frame hasn't finished downloading yet
      let renderFrameIndex = activeFrameIndex;
      if (!loadedFramesRef.current.has(renderFrameIndex)) {
        // Find nearest loaded frame
        let closest = 1;
        let minDiff = Infinity;
        loadedFramesRef.current.forEach((idx) => {
          const d = Math.abs(idx - activeFrameIndex);
          if (d < minDiff) {
            minDiff = d;
            closest = idx;
          }
        });
        renderFrameIndex = closest;
      }

      // Draw frame to canvas with object-fit: cover logic
      const img = imagesRef.current[renderFrameIndex - 1];
      if (img && img.complete && img.naturalWidth > 0) {
        const cWidth = canvas.width;
        const cHeight = canvas.height;
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cWidth / cHeight;

        let drawW = cWidth;
        let drawH = cHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          drawH = cWidth / imgAspect;
          offsetY = (cHeight - drawH) / 2;
        } else {
          drawW = cHeight * imgAspect;
          offsetX = (cWidth - drawW) / 2;
        }

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }

      // Throttle React state update for UI info text (every 100ms)
      if (timestamp - lastStateUpdate > 100) {
        setDisplayFrame(activeFrameIndex);
        lastStateUpdate = timestamp;
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle Preset Clicks (Morning, Noon, Sunset, Night)
  const handlePresetSelect = (frame: number) => {
    setIsLiveSync(false);
    isLiveSyncRef.current = false;
    setIsPlayingLoop(false);
    isPlayingLoopRef.current = false;
    targetFrameRef.current = frame;
  };

  // Toggle Live Sync
  const handleToggleLiveSync = () => {
    const newSync = !isLiveSync;
    setIsLiveSync(newSync);
    isLiveSyncRef.current = newSync;

    if (newSync) {
      setIsPlayingLoop(false);
      isPlayingLoopRef.current = false;
      updateTargetToLiveTime();
    }
  };

  // Toggle Video Loop Playback
  const handleTogglePlayLoop = () => {
    const newPlay = !isPlayingLoop;
    setIsPlayingLoop(newPlay);
    isPlayingLoopRef.current = newPlay;

    if (newPlay) {
      setIsLiveSync(false);
      isLiveSyncRef.current = false;
    }
  };

  // Slider change handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frame = parseInt(e.target.value, 10);
    setIsLiveSync(false);
    isLiveSyncRef.current = false;
    setIsPlayingLoop(false);
    isPlayingLoopRef.current = false;
    targetFrameRef.current = frame;
  };

  const timeInfo = getTimeInfoFromFrame(displayFrame);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* HTML5 Canvas Rendering HD Time-Lapse Frames */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transform scale-105 transition-opacity duration-700 ease-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Fallback Static Hero Image until canvas initial frame renders */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
      )}

      {/* Subtle cinematic gradient overlays for optimal text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/10 to-slate-950/60" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent" />

      {/* Floating Interactive Time-of-Day Widget Pill (Right Bottom Corner) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 pointer-events-auto flex flex-col items-end gap-2">
        {/* Time Controller Drawer Popover (Opens Upward) */}
        {showControls && (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/15 p-3.5 rounded-2xl shadow-2xl text-white w-72 text-xs flex flex-col gap-3 animate-fadeIn mb-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Ampara Time-Lapse Mode</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Frame {displayFrame}/{TOTAL_FRAMES}
              </span>
            </div>

            {/* Slider Control */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>06:00 AM</span>
                <span>12:00 PM</span>
                <span>06:00 PM</span>
                <span>12:00 AM</span>
              </div>
              <input
                type="range"
                min={1}
                max={TOTAL_FRAMES}
                value={displayFrame}
                onChange={handleSliderChange}
                className="w-full accent-sky-400 bg-slate-700 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Time Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => handlePresetSelect(76)} // 06:00 AM
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-[10px] text-slate-300"
              >
                <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                <span>Morning</span>
              </button>
              <button
                onClick={() => handlePresetSelect(150)} // 12:00 PM
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-[10px] text-slate-300"
              >
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>Noon</span>
              </button>
              <button
                onClick={() => handlePresetSelect(225)} // 06:00 PM
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-[10px] text-slate-300"
              >
                <Sunset className="w-3.5 h-3.5 text-orange-400" />
                <span>Sunset</span>
              </button>
              <button
                onClick={() => handlePresetSelect(275)} // 10:00 PM
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-[10px] text-slate-300"
              >
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
                <span>Night</span>
              </button>
            </div>

            {/* Mode Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleToggleLiveSync}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-semibold text-[11px] transition-all ${
                  isLiveSync
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Live Time Sync</span>
              </button>

              {/*               <button
                onClick={handleTogglePlayLoop}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-semibold text-[11px] transition-all ${
                  isPlayingLoop
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {isPlayingLoop ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlayingLoop ? "Pause Loop" : "Play Video"}</span>
              </button> */}
            </div>
          </div>
        )}

        {/* Time-of-Day Pill Button (Triggers Drawer) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white shadow-lg text-xs font-semibold transition-all hover:bg-slate-900/95 cursor-pointer">
          <span className="flex items-center gap-1.5 text-sky-400">
            {timeInfo.period === "morning" && (
              <Sunrise className="w-3.5 h-3.5 text-amber-400" />
            )}
            {timeInfo.period === "noon" && (
              <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            )}
            {timeInfo.period === "sunset" && (
              <Sunset className="w-3.5 h-3.5 text-orange-400" />
            )}
            {timeInfo.period === "night" && (
              <Moon className="w-3.5 h-3.5 text-indigo-300" />
            )}
            <span className="font-bold text-white tracking-wide">
              {timeInfo.timeStr}
            </span>
          </span>

          <span className="text-slate-400 font-normal hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">
            {timeInfo.label}
          </span>

          {isLiveSync && (
            <span className="flex items-center gap-1 bg-sky-500/20 text-sky-300 text-[10px] px-2 py-0.5 rounded-full border border-sky-400/30 uppercase tracking-wider font-extrabold ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              Live
            </span>
          )}

          <button
            onClick={() => setShowControls(!showControls)}
            className="ml-1 p-1 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
            title="Time Lapse Controls"
          >
            <Clock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
