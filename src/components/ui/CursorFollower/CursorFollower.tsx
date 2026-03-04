import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Particle {
  id: number;
  x: number;
  y: number;
}

const RING_SIZE = 30;
const DOT_SIZE = 8;
const PARTICLE_LIFETIME = 600;
const PARTICLE_SPAWN_INTERVAL = 40;

const CursorFollower = () => {
  const theme = useTheme();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastSpawn = useRef(0);
  const [visible, setVisible] = useState(false);

  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const snappyConfig = { damping: 30, stiffness: 400 };

  const ringX = useSpring(mouseX, smoothConfig);
  const ringY = useSpring(mouseY, smoothConfig);
  const dotX = useSpring(mouseX, snappyConfig);
  const dotY = useSpring(mouseY, snappyConfig);

  const ringScale = useSpring(1, { damping: 15, stiffness: 300 });
  const dotScale = useSpring(1, { damping: 15, stiffness: 300 });

  const ringRotate = useTransform(ringX, (v) => (v % 360) * 0.05);

  const spawnParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < PARTICLE_SPAWN_INTERVAL) return;
    lastSpawn.current = now;

    const id = particleId.current++;
    setParticles((prev) => [...prev.slice(-12), { id, x, y }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, PARTICLE_LIFETIME);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      spawnParticle(e.clientX, e.clientY);
    };

    const onDown = () => {
      setIsClicking(true);
      ringScale.set(0.75);
      dotScale.set(1.8);
    };

    const onUp = () => {
      setIsClicking(false);
      ringScale.set(1);
      dotScale.set(1);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='pointer']",
      );
      setIsHoveringInteractive(!!interactive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [isTouch, mouseX, mouseY, spawnParticle, ringScale, dotScale]);

  useEffect(() => {
    if (isHoveringInteractive) {
      ringScale.set(1.5);
      dotScale.set(0.5);
    } else if (!isClicking) {
      ringScale.set(1);
      dotScale.set(1);
    }
  }, [isHoveringInteractive, isClicking, ringScale, dotScale]);

  if (isTouch) return null;

  const glowColor = isDark ? `${primary}66` : `${secondary}44`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Trailing particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: PARTICLE_LIFETIME / 1000, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: p.x - 3,
              top: p.y - 3,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring with gradient border */}
      <motion.div
        style={{
          position: "absolute",
          top: -RING_SIZE / 2,
          left: -RING_SIZE / 2,
          translateX: ringX,
          translateY: ringY,
          scale: ringScale,
          rotate: ringRotate,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "50%",
          border: `2px solid transparent`,
          background: `linear-gradient(${isDark ? "#0a0a1a" : "#f5f5f5"}, ${isDark ? "#0a0a1a" : "#f5f5f5"}) padding-box, linear-gradient(135deg, ${primary}, ${secondary}) border-box`,
          boxShadow: `0 0 15px 2px ${glowColor}`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          position: "absolute",
          top: -DOT_SIZE / 2,
          left: -DOT_SIZE / 2,
          translateX: dotX,
          translateY: dotY,
          scale: dotScale,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${primary}, ${secondary})`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      />
    </div>
  );
};

export default CursorFollower;
