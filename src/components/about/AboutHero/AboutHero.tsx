import { motion, useReducedMotion, type Variants } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  HeroRoot,
  BlobContainer,
  FloatingBlob,
  HeroContent,
  HeroHeading,
  HeroSubheading,
  HeroParagraph,
  ReadingNote,
  ScrollCue,
} from "./AboutHero.styles";
import JourneyTimeline from "../JourneyTimeline/JourneyTimeline";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUpDelay: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
  },
};

const scrollCueVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 1.8 },
  },
};

const bounceVariants: Variants = {
  visible: {
    y: [0, 6, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const AboutHero = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;

  return (
    <HeroRoot data-testid="about-hero">
      <BlobContainer>
        <FloatingBlob variant={1} />
        <FloatingBlob variant={2} />
        <FloatingBlob variant={3} />
      </BlobContainer>

      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
        <motion.div
          variants={containerVariants}
          initial={skip ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <HeroContent>
            <motion.div variants={fadeUp}>
              <HeroSubheading>About Me</HeroSubheading>
            </motion.div>

            <motion.div variants={fadeUp}>
              <HeroHeading>Hi, I'm Hemanth. I design thoughtful digital experiences.</HeroHeading>
            </motion.div>

            <motion.div variants={fadeUp}>
              <HeroParagraph>
                I started as a curious kid tinkering with HTML in a school computer lab, and that
                spark never faded. Over the years, I've gone from building toy projects to shipping
                production software — learning that great engineering is equal parts craft, empathy,
                and relentless iteration. Today, I focus on creating interfaces that feel intuitive,
                performant, and genuinely delightful to use.
              </HeroParagraph>
            </motion.div>

            <motion.div variants={fadeUpDelay}>
              <ReadingNote>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  When I'm not coding, you'll find me buried in a book. I'm an avid reader —
                  fiction, non-fiction, philosophy, you name it. I believe reading shapes how I
                  think and build.
                </Typography>
                <Link to="/books" style={{ color: "inherit", textDecoration: "none" }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      "&:hover": { letterSpacing: "0.02em" },
                      transition: "letter-spacing 0.2s",
                    }}
                  >
                    My Reading List
                  </Typography>
                </Link>
              </ReadingNote>
            </motion.div>

            <JourneyTimeline />
          </HeroContent>
        </motion.div>
      </Container>

      <motion.div variants={scrollCueVariants} initial={skip ? false : "hidden"} animate="visible">
        <ScrollCue>
          <motion.div variants={bounceVariants} animate="visible">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span className="scroll-ring" />
              <span className="scroll-dot" />
            </Box>
          </motion.div>
        </ScrollCue>
      </motion.div>
    </HeroRoot>
  );
};

export default AboutHero;
