import type { Variants } from "framer-motion";
import { easeOutQuart } from "./easing";

export const aboutContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const aboutFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutQuart },
  },
};

export const aboutFadeUpDelayVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
  },
};

export const scrollCueVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 1.8 },
  },
};

export const bounceVariants: Variants = {
  visible: {
    y: [0, 6, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};
