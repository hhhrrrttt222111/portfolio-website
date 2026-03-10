import type { Variants } from "framer-motion";
import { easeOutQuart } from "./easing";

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const dropVariants: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 14,
      mass: 1.4,
      duration: 1.2,
    },
  },
};

export const cordVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const phoneBodyVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
      delay: 0.3,
    },
  },
};

export const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutQuart, delay: 0.9 },
  },
};

export const yearVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.2 },
  },
};

export const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 1.4 },
  },
};

export const grainVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, delay: 0.2 },
  },
};

export const HERO_SWING_CLAMP = 45;
export const HERO_HOVER_SENSITIVITY = 60;
export const HERO_DRAG_SENSITIVITY = 60;
export const HERO_SPRING_CONFIG = { stiffness: 60, damping: 8, mass: 0.8 };
