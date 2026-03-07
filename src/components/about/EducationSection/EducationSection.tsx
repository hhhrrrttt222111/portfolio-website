import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "@mui/material/Container";
import { EDUCATION } from "@/constants";
import {
  SectionRoot,
  SectionTitle,
  SectionSubtitle,
  CardsContainer,
  EducationCard,
  CardYearBadge,
  CardLevel,
  CardInstitution,
  CardDegree,
} from "./EducationSection.styles";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      delay: i * 0.15,
    },
  }),
};

const EducationSection = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;

  return (
    <SectionRoot data-testid="education-section">
      <Container maxWidth="lg">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle>Education</SectionTitle>
          <SectionSubtitle>
            The foundation that shaped my thinking and technical skills.
          </SectionSubtitle>
        </motion.div>

        <CardsContainer>
          {EDUCATION.map((edu, i) => {
            const yearLabel =
              edu.endYear === "Present"
                ? `${edu.startYear} — Present`
                : `${edu.startYear} — ${edu.endYear}`;

            return (
              <motion.div
                key={edu.institution}
                variants={cardVariants}
                custom={i}
                initial={skip ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <EducationCard>
                  <CardYearBadge>
                    <span className="year-text">{yearLabel}</span>
                  </CardYearBadge>
                  <CardLevel>{edu.level ?? edu.degree}</CardLevel>
                  <CardInstitution>{edu.institution}</CardInstitution>
                  {edu.degree && edu.level && <CardDegree>{edu.degree}</CardDegree>}
                </EducationCard>
              </motion.div>
            );
          })}
        </CardsContainer>
      </Container>
    </SectionRoot>
  );
};

export default EducationSection;
