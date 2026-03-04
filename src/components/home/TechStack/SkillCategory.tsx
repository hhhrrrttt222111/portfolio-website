import React, { useRef, useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import type { SkillCategory as SkillCategoryType } from "@/constants";
import {
  TerminalWindow,
  TerminalTitleBar,
  DotGroup,
  TerminalTitle,
  TerminalBody,
  CommandLine,
  CategoryLabel,
  SkillBarTrack,
  SkillBarFill,
  SkillName,
  TotalCounter,
} from "./TechStack.styles";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const dustExit = {
  opacity: [1, 0.8, 0],
  scale: [1, 1.04, 0.3],
  filter: ["blur(0px)", "blur(2px)", "blur(12px)"],
  y: [0, -8, 30],
  transition: {
    duration: 0.7,
    ease: [0.36, 0, 0.66, -0.56] as const,
  },
};

const barVariants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: "100%",
    transition: { duration: 1.2, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.5 + i * 0.08, ease: "easeOut" as const },
  }),
};

const SlideUp = React.forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  category: SkillCategoryType;
  index: number;
}

const PARTICLE_COUNT = 14;

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, () => ({
  ix: Math.random(),
  iy: Math.random(),
  ax: Math.random(),
  ay: Math.random(),
  ox: (Math.random() - 0.5) * 160,
  oy: -40 - Math.random() * 80,
  dur: 0.6 + Math.random() * 0.5,
  del: Math.random() * 0.15,
  size: 4 + Math.random() * 6,
}));

const SkillCategory = ({ category, index }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [cardRect, setCardRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCardRect({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowParticles(true);
    setDismissed(true);
  }, []);

  const handleExpand = useCallback(() => setExpanded(true), []);
  const handleCollapse = useCallback(() => setExpanded(false), []);

  const barAlpha = 0.18;
  const fillStyle = (alpha: number) =>
    `linear-gradient(90deg, ${category.accentColor}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}, ${category.accentColor}${Math.round(alpha * 0.5 * 255)
      .toString(16)
      .padStart(2, "0")})`;

  const renderDots = (onClose: () => void, onGreen?: () => void) => (
    <DotGroup>
      <Box
        component="span"
        onClick={onClose}
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "scale(1.35)",
            boxShadow: "0 0 8px rgba(255,95,87,0.5)",
          },
        }}
      />
      <span />
      {onGreen ? (
        <Box
          component="span"
          onClick={onGreen}
          sx={{
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.35)",
              boxShadow: "0 0 8px rgba(40,200,64,0.5)",
            },
          }}
        />
      ) : (
        <span />
      )}
    </DotGroup>
  );

  const renderTerminalContent = (animated: boolean) => (
    <TerminalBody>
      <CommandLine>
        <span className="prompt">$</span>
        {animated ? (
          <motion.span
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {category.command}
          </motion.span>
        ) : (
          <span>{category.command}</span>
        )}
        {animated && !isInView && <span className="cursor" />}
      </CommandLine>

      <CategoryLabel sx={{ color: category.accentColor }}>{category.label}</CategoryLabel>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {category.skills.map((skill, i) => (
          <Box key={skill}>
            <SkillBarTrack>
              <motion.div
                className="skill-fill"
                custom={i}
                variants={prefersReduced ? undefined : barVariants}
                initial={animated ? "hidden" : "visible"}
                animate="visible"
                style={{
                  height: "100%",
                  borderRadius: 8,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: fillStyle(barAlpha),
                  opacity: 0.7,
                  transition: "opacity 0.45s ease, filter 0.45s ease",
                }}
              />
              <SkillBarFill sx={{ width: "100%", background: "transparent" }}>
                <motion.div
                  custom={i}
                  variants={prefersReduced ? undefined : chipVariants}
                  initial={animated ? "hidden" : "visible"}
                  animate="visible"
                  style={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <SkillName>
                    <Box
                      className="skill-dot"
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: category.accentColor,
                        color: category.accentColor,
                        mr: 1,
                        boxShadow: `0 0 6px ${category.accentColor}66`,
                        transition:
                          "transform 0.45s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.45s ease",
                      }}
                    />
                    <span
                      className="skill-label"
                      style={{ transition: "letter-spacing 0.45s ease" }}
                    >
                      {skill}
                    </span>
                  </SkillName>
                </motion.div>
              </SkillBarFill>
            </SkillBarTrack>
          </Box>
        ))}
      </Box>

      <TotalCounter>
        {category.skills.length} {category.skills.length === 1 ? "item" : "items"} found
      </TotalCounter>
    </TerminalBody>
  );

  return (
    <Box ref={ref} sx={{ position: "relative", minHeight: dismissed ? 0 : undefined }}>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            variants={prefersReduced ? undefined : cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            exit={prefersReduced ? { opacity: 0 } : dustExit}
            style={{ position: "relative" }}
          >
            <TerminalWindow
              sx={{
                borderColor: isInView ? `${category.accentColor}22` : undefined,
                transition: "border-color 0.6s ease",
              }}
            >
              <TerminalTitleBar>
                {renderDots(handleClose, handleExpand)}
                <TerminalTitle>{category.label}</TerminalTitle>
              </TerminalTitleBar>
              {renderTerminalContent(true)}
            </TerminalWindow>
          </motion.div>
        )}
      </AnimatePresence>

      {showParticles && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: cardRect.width || "100%",
            height: cardRect.height || 200,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {PARTICLES.map((p, i) => {
            const w = cardRect.width || 300;
            const h = cardRect.height || 200;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1, x: p.ix * w, y: p.iy * h }}
                animate={{ opacity: 0, scale: 0, x: p.ax * w + p.ox, y: p.ay * h + p.oy }}
                transition={{ duration: p.dur, delay: p.del, ease: "easeOut" as const }}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: category.accentColor,
                  boxShadow: `0 0 6px ${category.accentColor}`,
                }}
              />
            );
          })}
        </Box>
      )}

      <Dialog
        open={expanded}
        onClose={handleCollapse}
        maxWidth="sm"
        fullWidth
        slots={{ transition: SlideUp }}
        slotProps={{
          paper: {
            sx: {
              background: "transparent",
              boxShadow: "none",
              overflow: "visible",
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <TerminalWindow
          sx={{
            borderColor: `${category.accentColor}33`,
            boxShadow: `0 24px 80px ${category.accentColor}18, 0 0 1px ${category.accentColor}44`,
          }}
        >
          <TerminalTitleBar>
            {renderDots(handleCollapse)}
            <TerminalTitle>{category.label}</TerminalTitle>
          </TerminalTitleBar>
          {renderTerminalContent(false)}
        </TerminalWindow>
      </Dialog>
    </Box>
  );
};

export default SkillCategory;
