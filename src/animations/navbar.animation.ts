import type { Variants } from "framer-motion";
import { easeOutCubic } from "./easing";

export const navItemVariants: Variants = {
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

export const logoVariants: Variants = {
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

export const ctaVariants: Variants = {
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

export const navbarRootVariants = {
  initial: { y: -100 },
  animate: { y: 0 },
};

export const activeIndicatorVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const navLinkUnderlineVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "50%", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

export const getHamburgerLineVariants = (isOpen: boolean) => ({
  top: {
    rotate: isOpen ? 45 : 0,
    y: isOpen ? 0 : -6,
  },
  middle: {
    opacity: isOpen ? 0 : 1,
    scaleX: isOpen ? 0 : 1,
  },
  bottom: {
    rotate: isOpen ? -45 : 0,
    y: isOpen ? 0 : 6,
  },
});
