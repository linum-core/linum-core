"use client";

import { useRef, useCallback, useEffect } from "react";

// tensioned bass harp strings: E2, A2, D3, G3
const BASE_FREQS = [82, 110, 146, 196] as const;

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
    // lowpass filter rounds off the sawtooth → warm, woody harp body
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(700, ctx.currentTime);
    filter.Q.setValueAtTime(1.4, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.9);
  }, [getCtx]);

  return { pluck };
}
