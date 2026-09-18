'use client';

import { useEffect } from 'react';

/**
 * AdaptivePerformanceManager (Android/Mobile 3-Tier Optimization)
 * Detects client hardware capability and thermal/FPS degradation.
 * Sets `document.body.setAttribute('data-perf-tier', 'high' | 'medium' | 'low')`
 * to dynamically deactivate heavy backdrop-filters, box-shadows, and complex particle effects
 * on budget devices (e.g. Samsung Galaxy A04 / Redmi Note 12).
 */
export function AdaptivePerformanceManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Initial hardware heuristics
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-ignore deviceMemory is available in Chrome/Chromium Android
    const memory = navigator.deviceMemory || 4;

    let tier: 'high' | 'medium' | 'low' = 'high';

    if (cores <= 2 || memory <= 2) {
      tier = 'low';
    } else if (cores <= 4 || memory <= 4) {
      tier = 'medium';
    }

    document.body.setAttribute('data-perf-tier', tier);

    // 2. Battery status check if available
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery: any) => {
        if (battery.level <= 0.2 && !battery.charging) {
          document.body.setAttribute('data-perf-tier', 'low');
        }
      }).catch(() => {});
    }

    // 3. Lightweight runtime FPS probe (first 60 frames)
    let frameCount = 0;
    let lastTime = performance.now();
    let slowFrames = 0;
    let animId: number;

    const probe = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Frame time > 25ms corresponds to < 40 FPS
      if (delta > 25) {
        slowFrames++;
      }

      frameCount++;
      if (frameCount < 60) {
        animId = requestAnimationFrame(probe);
      } else {
        // If > 20% of initial frames were slow, downgrade tier
        if (slowFrames > 12) {
          const currentTier = document.body.getAttribute('data-perf-tier');
          if (currentTier === 'high') {
            document.body.setAttribute('data-perf-tier', 'medium');
          } else if (currentTier === 'medium') {
            document.body.setAttribute('data-perf-tier', 'low');
          }
        }
      }
    };

    animId = requestAnimationFrame(probe);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return null;
}
