import { useMemo } from "react";
import Container from "@mui/material/Container";
import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK } from "@/constants";
import {
  SectionRoot,
  ScanlineOverlay,
  SectionTitle,
  SectionSubtitle,
  MasonryGrid,
} from "./TechStack.styles";
import SkillCategory from "./SkillCategory";

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const TechStack = () => {
  const prefersReduced = useReducedMotion();

  const totalSkills = useMemo(
    () => TECH_STACK.reduce((sum, cat) => sum + cat.skills.length, 0),
    [],
  );

  return (
    <SectionRoot component="section" data-testid="tech-stack">
      <ScanlineOverlay />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <SectionTitle variant="h2" component="h2">
              {">"} Tech Stack
            </SectionTitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <SectionSubtitle>
              {totalSkills} tools & technologies across {TECH_STACK.length} domains.
              <br />
              Here&apos;s what powers my builds.
            </SectionSubtitle>
          </motion.div>
        </motion.div>

        <MasonryGrid>
          {TECH_STACK.map((category, index) => (
            <SkillCategory key={category.id} category={category} index={index} />
          ))}
        </MasonryGrid>
      </Container>
    </SectionRoot>
  );
};

export default TechStack;
