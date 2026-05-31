"use client";

import { useRef, useCallback, useEffect } from "react";

// [blue-thick, red-thick, blue-thin, red-thin] — harp-like frequencies
const BASE_FREQS = [220, 293, 440, 587] as const;

export function useStringSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  const getCtx = useCallback(async (): Promise<AudioContext> => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  /**
   * Toca o som de uma corda.
   * @param lineIndex 0=blue-thick 1=red-thick 2=blue-thin 3=red-thin
   * @param position 0→1 da esquerda para direita (modula pitch ±20%)
   */
  const pluck = useCallback(async (lineIndex: 0 | 1 | 2 | 3, position: number) => {
    const p = Math.max(0, Math.min(1, position));
    const ctx = await getCtx();
    const baseFreq = BASE_FREQS[lineIndex];
    const freq = baseFreq * (0.8 + p * 0.4);

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
