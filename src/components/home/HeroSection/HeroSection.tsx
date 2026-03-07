import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, type Variants } from "framer-motion";
import {
  HeroRoot,
  PendulumAnchor,
  HeroContent,
  PhoneWrapper,
  CordSvg,
  PhoneIcon,
  HeroTitle,
  YearText,
  TitleRow,
  SubtitleText,
  GrainOverlay,
  VignetteOverlay,
} from "./HeroSection.styles";

const SWING_CLAMP = 45;
const HOVER_SENSITIVITY = 60;
const DRAG_SENSITIVITY = 60;
const SPRING_CONFIG = { stiffness: 60, damping: 8, mass: 0.8 };

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const dropVariants: Variants = {
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

const cordVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const phoneBodyVariants: Variants = {
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

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 },
  },
};

const yearVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.2 },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 1.4 },
  },
};

const grainVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, delay: 0.2 },
  },
};

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const getCurrentYear = () => new Date().getFullYear();

const HeroSection = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;

  const swingTarget = useMotionValue(0);
  const swingRotate = useSpring(swingTarget, SPRING_CONFIG);

  const sectionRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  const onSectionMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (skip || dragging.current) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const delta = e.clientX - centerX;
      const halfWidth = rect.width / 2;
      swingTarget.set(clamp((delta / halfWidth) * HOVER_SENSITIVITY, -SWING_CLAMP, SWING_CLAMP));
    },
    [skip, swingTarget],
  );

  const onSectionMouseLeave = useCallback(() => {
    if (!dragging.current) {
      swingTarget.set(0);
    }
  }, [swingTarget]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (skip) return;
      dragging.current = true;
      dragStartX.current = e.clientX;
      setGrabbing(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [skip],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || skip) return;
      const delta = e.clientX - dragStartX.current;
      swingTarget.set(clamp((delta / 100) * DRAG_SENSITIVITY, -SWING_CLAMP, SWING_CLAMP));
    },
    [skip, swingTarget],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    setGrabbing(false);
    swingTarget.set(0);
  }, [swingTarget]);

  return (
    <HeroRoot
      data-testid="hero-section"
      ref={sectionRef}
      onMouseMove={onSectionMouseMove}
      onMouseLeave={onSectionMouseLeave}
    >
      <motion.div
        variants={containerVariants}
        initial={skip ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <PendulumAnchor>
          <motion.div variants={dropVariants}>
            <motion.div
              style={{
                transformOrigin: "top center",
                rotate: swingRotate,
                cursor: grabbing ? "grabbing" : "grab",
                touchAction: "none",
                userSelect: "none",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <PhoneWrapper>
                <motion.div variants={cordVariants} style={{ transformOrigin: "top center" }}>
                  <CordSvg viewBox="0 0 4 140" aria-hidden="true">
                    <path
                      d="M2 0 C0 10, 4 20, 2 30 C0 40, 4 50, 2 60 C0 70, 4 80, 2 90 C0 100, 4 110, 2 120 C0 130, 4 140, 2 140"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                  </CordSvg>
                </motion.div>

                <motion.div variants={phoneBodyVariants}>
                  <PhoneIcon>
                    <HeroIcon />
                  </PhoneIcon>
                </motion.div>
              </PhoneWrapper>
            </motion.div>
          </motion.div>
        </PendulumAnchor>

        {/* Text content — pushed to the bottom */}
        <HeroContent>
          <TitleRow>
            <motion.div variants={titleVariants}>
              <HeroTitle>portfólio</HeroTitle>
            </motion.div>
            <motion.div variants={yearVariants}>
              <YearText>{getCurrentYear()}</YearText>
            </motion.div>
          </TitleRow>

          <motion.div variants={subtitleVariants}>
            <SubtitleText>[ Hemanth R ]</SubtitleText>
          </motion.div>
        </HeroContent>

        <motion.div variants={grainVariants}>
          <GrainOverlay />
        </motion.div>
        <VignetteOverlay />
      </motion.div>
    </HeroRoot>
  );
};

const HeroIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 470 470"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M445,115c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5H285c-4.143,0-7.5,3.357-7.5,7.5v100 c0,4.143,3.357,7.5,7.5,7.5h22.5v62.5h-145V115H185c4.143,0,7.5-3.357,7.5-7.5V7.5c0-4.143-3.357-7.5-7.5-7.5H25 c-4.143,0-7.5,3.357-7.5,7.5v100c0,4.143,3.357,7.5,7.5,7.5h22.5v240H25c-4.143,0-7.5,3.357-7.5,7.5v100c0,4.143,3.357,7.5,7.5,7.5 h160c4.143,0,7.5-3.357,7.5-7.5v-100c0-4.143-3.357-7.5-7.5-7.5h-22.5v-62.5h145V355H285c-4.143,0-7.5,3.357-7.5,7.5v100 c0,4.143,3.357,7.5,7.5,7.5h160c4.143,0,7.5-3.357,7.5-7.5v-100c0-4.143-3.357-7.5-7.5-7.5h-22.5V115H445z M415,370h22.5v85h-145 v-85H315c4.143,0,7.5-3.357,7.5-7.5V285c0-4.143-3.357-7.5-7.5-7.5H155c-4.143,0-7.5,3.357-7.5,7.5v77.5c0,4.143,3.357,7.5,7.5,7.5 h22.5v85h-145v-85H55c4.143,0,7.5-3.357,7.5-7.5v-255c0-4.143-3.357-7.5-7.5-7.5H32.5V15h145v85H155c-4.143,0-7.5,3.357-7.5,7.5 V185c0,4.143,3.357,7.5,7.5,7.5h160c4.143,0,7.5-3.357,7.5-7.5v-77.5c0-4.143-3.357-7.5-7.5-7.5h-22.5V15h145v85H415 c-4.143,0-7.5,3.357-7.5,7.5v255C407.5,366.643,410.857,370,415,370z" />
    <path d="M422.5,77.5v-40c0-4.143-3.357-7.5-7.5-7.5H315c-4.143,0-7.5,3.357-7.5,7.5v40c0,4.143,3.357,7.5,7.5,7.5h22.5v122.5H185 c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h160c4.143,0,7.5-3.357,7.5-7.5V77.5c0-4.143-3.357-7.5-7.5-7.5h-22.5V45h85v25H385 c-4.143,0-7.5,3.357-7.5,7.5v255c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5V85H415C419.143,85,422.5,81.643,422.5,77.5z" />
    <path d="M392.5,362.5c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v30c0,4.143,3.357,7.5,7.5,7.5h22.5v25h-85v-25H345 c4.143,0,7.5-3.357,7.5-7.5V255c0-4.143-3.357-7.5-7.5-7.5H125c-4.143,0-7.5,3.357-7.5,7.5v137.5c0,4.143,3.357,7.5,7.5,7.5h22.5 v25h-85v-25H85c4.143,0,7.5-3.357,7.5-7.5v-315c0-4.143-3.357-7.5-7.5-7.5H62.5V45h85v25H125c-4.143,0-7.5,3.357-7.5,7.5V215 c0,4.143,3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5h-22.5V85H155c4.143,0,7.5-3.357,7.5-7.5v-40 c0-4.143-3.357-7.5-7.5-7.5H55c-4.143,0-7.5,3.357-7.5,7.5v40c0,4.143,3.357,7.5,7.5,7.5h22.5v300H55c-4.143,0-7.5,3.357-7.5,7.5 v40c0,4.143,3.357,7.5,7.5,7.5h100c4.143,0,7.5-3.357,7.5-7.5v-40c0-4.143-3.357-7.5-7.5-7.5h-22.5V262.5h205V385H315 c-4.143,0-7.5,3.357-7.5,7.5v40c0,4.143,3.357,7.5,7.5,7.5h100c4.143,0,7.5-3.357,7.5-7.5v-40c0-4.143-3.357-7.5-7.5-7.5h-22.5 V362.5z" />
  </svg>
);

export default HeroSection;
