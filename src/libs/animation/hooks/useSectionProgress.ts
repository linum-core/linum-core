'use client'
import { useState, useEffect, RefObject } from 'react'

export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!ref.current) return
    const onScroll = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const vh = window.innerHeight
      const total = r.height + vh
      const passed = vh - r.top
      setProgress(Math.max(0, Math.min(1, passed / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return progress
}
