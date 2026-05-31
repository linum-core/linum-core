"use client";

import { useRef, useCallback } from "react";

const BASE_FREQS = [220, 293, 440, 587] as const;

export function useStringSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const pluck = useCallback((lineIndex: 0 | 1 | 2 | 3, position: number) => {
    const ctx = getCtx();
    const baseFreq = BASE_FREQS[lineIndex];
    const freq = baseFreq * (0.8 + position * 0.4);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.95);
  }, [getCtx]);

  return { pluck };
}
