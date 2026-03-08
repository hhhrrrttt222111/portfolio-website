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

interface NetworkVisualizationProps {
  triggerRef: React.RefObject<HTMLElement | null>;
}

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
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [triggerRef]);

  return (
    <VisualizationContainer ref={containerRef}>
      <GlowOverlay />
      <SphereNetworkScene progress={progress} isDarkMode={isDarkMode} />
    </VisualizationContainer>
  );
};

export default NetworkVisualization;
