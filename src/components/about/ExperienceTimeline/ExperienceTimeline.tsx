import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { EXPERIENCES } from "@/constants";
import {
  SectionRoot,
  SectionTitle,
  SectionSubtitle,
  TimelineGrid,
  CenterLine,
  LeftColumn,
  RightColumn,
  CardWrapper,
  TimelineDot,
  TimelineCard,
  CardTitle,
  CardCompany,
  CardDate,
  CardDescription,
} from "./ExperienceTimeline.styles";

const leftCardVariants: Variants = {
  hidden: { opacity: 0, x: -40, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const rightCardVariants: Variants = {
  hidden: { opacity: 0, x: 40, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const mobileCardVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const ExperienceTimeline = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const { leftItems, rightItems } = useMemo(() => {
    const left = EXPERIENCES.filter((_, i) => i % 2 === 0);
    const right = EXPERIENCES.filter((_, i) => i % 2 === 1);
    return { leftItems: left, rightItems: right };
  }, []);

  return (
    <SectionRoot ref={containerRef} data-testid="experience-section">
      <Container maxWidth="lg">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle>Experience</SectionTitle>
          <SectionSubtitle>
            A timeline of roles where I've grown, shipped, and learned.
          </SectionSubtitle>
        </motion.div>

        <TimelineGrid>
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              transformOrigin: "top center",
              scaleY: skip ? 1 : lineScaleY,
              pointerEvents: "none",
            }}
          >
            <CenterLine />
          </motion.div>

          {isDesktop ? (
            <>
              <LeftColumn>
                {leftItems.map((exp) => (
                  <motion.div
                    key={`${exp.company}-${exp.dateRange}`}
                    variants={leftCardVariants}
                    initial={skip ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <CardWrapper>
                      <TimelineDot side="left" />
                      <TimelineCard>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardCompany>{exp.company}</CardCompany>
                        <CardDate>{exp.dateRange}</CardDate>
                        <CardDescription>{exp.description}</CardDescription>
                      </TimelineCard>
                    </CardWrapper>
                  </motion.div>
                ))}
              </LeftColumn>

              <RightColumn>
                {rightItems.map((exp) => (
                  <motion.div
                    key={`${exp.company}-${exp.dateRange}`}
                    variants={rightCardVariants}
                    initial={skip ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <CardWrapper>
                      <TimelineDot side="right" />
                      <TimelineCard>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardCompany>{exp.company}</CardCompany>
                        <CardDate>{exp.dateRange}</CardDate>
                        <CardDescription>{exp.description}</CardDescription>
                      </TimelineCard>
                    </CardWrapper>
                  </motion.div>
                ))}
              </RightColumn>
            </>
          ) : (
            <div>
              {EXPERIENCES.map((exp) => (
                <motion.div
                  key={`${exp.company}-${exp.dateRange}`}
                  variants={mobileCardVariants}
                  initial={skip ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <CardWrapper>
                    <TimelineDot />
                    <TimelineCard>
                      <CardTitle>{exp.title}</CardTitle>
                      <CardCompany>{exp.company}</CardCompany>
                      <CardDate>{exp.dateRange}</CardDate>
                      <CardDescription>{exp.description}</CardDescription>
                    </TimelineCard>
                  </CardWrapper>
                </motion.div>
              ))}
            </div>
          )}
        </TimelineGrid>
      </Container>
    </SectionRoot>
  );
};

export default ExperienceTimeline;
