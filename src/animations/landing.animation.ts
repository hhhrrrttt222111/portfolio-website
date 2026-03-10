import type { Variants } from "framer-motion";
import { easeOutQuart } from "./easing";

export const landingContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const landingItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart,
    },
  },
};

export const landingImageVariants: Variants = {
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

export const highlightStyle = {
  backgroundImage: "linear-gradient(transparent 85%, currentColor 85%)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 0",
  backgroundSize: "0% 100%",
};
