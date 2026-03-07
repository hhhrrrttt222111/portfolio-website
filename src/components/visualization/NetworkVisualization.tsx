import { useRef, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-expect-error - JSX file for Three.js compatibility
import SphereNetworkScene from "./SphereNetworkScene.jsx";

gsap.registerPlugin(ScrollTrigger);

const VisualizationContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100vh",
  zIndex: 0,
  pointerEvents: "none",
  background:
    theme.palette.mode === "dark"
      ? "radial-gradient(ellipse at 50% 50%, #0a1a0f 0%, #061209 100%)"
      : "radial-gradient(ellipse at 50% 50%, #e8f5e9 0%, #c8e6c9 100%)",
}));

const StageIndicator = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  zIndex: 100,
  [theme.breakpoints.down("md")]: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface NetworkVisualizationProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

interface StageDotProps {
  active: boolean;
  isCurrentStage: boolean;
}

const StageDot = ({ active, isCurrentStage }: StageDotProps) => {
  const theme = useTheme();

  return (
    <motion.div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: active
          ? theme.palette.primary.main
          : theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
        boxShadow: active
          ? theme.palette.mode === "dark"
            ? `0 0 10px ${theme.palette.primary.main}99`
            : `0 0 10px ${theme.palette.primary.main}66`
          : "none",
      }}
      animate={{
        scale: isCurrentStage ? [1, 1.4, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: isCurrentStage ? Infinity : 0,
      }}
    />
  );
};

const GlowOverlay = () => {
  const theme = useTheme();

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(ellipse at 50% 50%, rgba(102, 187, 106, 0.15) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(46, 125, 50, 0.1) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const NetworkVisualization = ({ triggerRef }: NetworkVisualizationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const newProgress = self.progress;
          setProgress(newProgress);

          let stage = 0;
          if (newProgress >= 0.75) stage = 3;
          else if (newProgress >= 0.5) stage = 2;
          else if (newProgress >= 0.25) stage = 1;

          setCurrentStage(stage);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [triggerRef]);

  return (
    <>
      <VisualizationContainer ref={containerRef}>
        <GlowOverlay />
        <SphereNetworkScene progress={progress} isDarkMode={isDarkMode} />
      </VisualizationContainer>

      <StageIndicator>
        {[0, 1, 2, 3].map((stage) => (
          <StageDot
            key={stage}
            active={currentStage >= stage}
            isCurrentStage={currentStage === stage}
          />
        ))}
      </StageIndicator>
    </>
  );
};

export default NetworkVisualization;
