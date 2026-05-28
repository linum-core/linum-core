"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp } from "@/src/libs/animation/animations";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: fadeInUp.hidden,
        visible: {
          ...(fadeInUp.visible as object),
          transition: {
            ...((fadeInUp.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }}
      className={className}>
      {children}
    </motion.div>
  );
}
