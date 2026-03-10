import { useMemo } from "react";
import Container from "@mui/material/Container";
import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK } from "@/constants";
import { sectionHeaderVariants, sectionItemVariants } from "@/animations";
import {
  SectionRoot,
  ScanlineOverlay,
  SectionTitle,
  SectionSubtitle,
  MasonryGrid,
} from "./TechStack.styles";
import SkillCategory from "./SkillCategory";

const TechStack = () => {
  const prefersReduced = useReducedMotion();

  const totalSkills = useMemo(
    () => TECH_STACK.reduce((sum, cat) => sum + cat.skills.length, 0),
    [],
  );

  return (
    <SectionRoot data-testid="tech-stack">
      <ScanlineOverlay />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={prefersReduced ? undefined : sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={prefersReduced ? undefined : sectionItemVariants}>
            <SectionTitle>{">"} Tech Stack</SectionTitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : sectionItemVariants}>
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
