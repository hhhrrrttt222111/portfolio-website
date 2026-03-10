import type { Variants } from "framer-motion";
import { easeOutCubic, easeOutQuart } from "./easing";

export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
};

export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easeOutCubic,
    },
  }),
};

export const imageSlideInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easeOutQuart,
      delay: 0.4,
    },
  },
};
