import type { Variants } from "framer-motion";
import { easeOutCubic, easeOutQuart } from "./easing";

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
      ease: easeOutCubic,
    },
  },
};

export const activeIndicatorVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const underlineVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "50%", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

export const snackbarVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOutQuart,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

export const paperPlaneVariants: Variants = {
  initial: { scale: 0, rotate: -45, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [-45, 0, 15],
    opacity: [0, 1, 1],
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  fly: {
    x: [0, 100, 300],
    y: [0, -150, -400],
    rotate: [15, 25, 45],
    opacity: [1, 1, 0],
    scale: [1, 0.8, 0.3],
    transition: { duration: 1.2, ease: "easeIn" as const, delay: 0.3 },
  },
};

export const loaderContainerVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

export const loaderProgressVariants = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: 200 },
};
