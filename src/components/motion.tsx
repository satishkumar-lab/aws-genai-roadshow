"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -5% 0px",
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
