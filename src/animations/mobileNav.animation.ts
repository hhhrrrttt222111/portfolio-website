import type { Variants } from "framer-motion";
import { easeOutCubic } from "./easing";

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeOutCubic, delay: 0.1 },
  },
};

export const menuVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

export const mobileHeaderVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
};

export const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
};

export const mobileFooterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutCubic, delay: 0.2 },
  },
};

export const activeNavIndicatorVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
