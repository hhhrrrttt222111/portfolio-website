import { useState, useCallback } from "react";
import { motion, useReducedMotion, type Variants, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { JOURNEY_MILESTONES } from "@/constants";
import {
  TimelineRoot,
  MobileList,
  MobileVerticalLine,
  MobileItem,
  MobileDot,
  MobileYear,
  MobileTitle,
  MobileDescription,
  TimelineTrack,
  TimelineLine,
  MilestoneNode,
  MilestoneDot,
  MilestoneYear,
  MilestoneTitle,
  TooltipCard,
} from "./JourneyTimeline.styles";

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.5 + i * 0.15,
    },
  }),
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 + i * 0.15 },
  }),
};

const tooltipVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.15 } },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 + i * 0.1 },
  }),
};

const JourneyTimeline = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleHover = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  if (isMobile) {
    return (
      <TimelineRoot data-testid="journey-timeline">
        <motion.div
          initial={skip ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <MobileList>
            <MobileVerticalLine />
            {JOURNEY_MILESTONES.map((milestone, i) => (
              <motion.div key={milestone.year} variants={mobileItemVariants} custom={i}>
                <MobileItem
                  onClick={() => handleToggle(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${milestone.title} - ${milestone.year}`}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleToggle(i);
                    }
                  }}
                >
                  <MobileDot sx={{ transform: activeIndex === i ? "scale(1.3)" : "scale(1)" }} />
                  <MobileYear>{milestone.year}</MobileYear>
                  <MobileTitle>{milestone.title}</MobileTitle>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeIndex === i ? "auto" : 0,
                      opacity: activeIndex === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <MobileDescription>{milestone.description}</MobileDescription>
                  </motion.div>
                </MobileItem>
              </motion.div>
            ))}
          </MobileList>
        </motion.div>
      </TimelineRoot>
    );
  }

  return (
    <TimelineRoot data-testid="journey-timeline">
      <motion.div
        initial={skip ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{ position: "relative" }}
      >
        <TimelineTrack>
          <motion.div
            variants={lineVariants}
            style={{
              position: "absolute",
              top: 20,
              left: "10%",
              right: "10%",
              height: 2,
              transformOrigin: "left center",
            }}
          >
            <TimelineLine />
          </motion.div>

          {JOURNEY_MILESTONES.map((milestone, i) => (
            <MilestoneNode
              key={milestone.year}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={handleLeave}
              onClick={() => handleToggle(i)}
              role="button"
              tabIndex={0}
              aria-label={`${milestone.title} - ${milestone.year}`}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle(i);
                }
              }}
            >
              <motion.div variants={dotVariants} custom={i}>
                <MilestoneDot
                  sx={{
                    transform: activeIndex === i ? "scale(1.4)" : "scale(1)",
                    "&::after": { opacity: activeIndex === i ? 1 : 0 },
                  }}
                />
              </motion.div>

              <motion.div variants={labelVariants} custom={i}>
                <MilestoneYear component="span">{milestone.year}</MilestoneYear>
                <MilestoneTitle>{milestone.title}</MilestoneTitle>
              </motion.div>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                    }}
                  >
                    <TooltipCard>
                      <Typography className="tooltip-text">{milestone.description}</Typography>
                    </TooltipCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </MilestoneNode>
          ))}
        </TimelineTrack>
      </motion.div>
    </TimelineRoot>
  );
};

export default JourneyTimeline;
