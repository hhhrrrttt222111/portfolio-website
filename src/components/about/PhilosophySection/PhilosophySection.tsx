import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Container from "@mui/material/Container";
import { PHILOSOPHY_QUOTE } from "@/constants";
import {
  SectionRoot,
  BackgroundBlob,
  QuoteContainer,
  QuoteDecoration,
  QuoteText,
  QuoteWord,
  QuoteAttribution,
} from "./PhilosophySection.styles";

const PhilosophySection = () => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const words = PHILOSOPHY_QUOTE.split(" ");

  return (
    <SectionRoot ref={sectionRef} data-testid="philosophy-section">
      <BackgroundBlob variant={1} />
      <BackgroundBlob variant={2} />

      <Container maxWidth="md">
        <motion.div style={{ y: skip ? 0 : parallaxY }}>
          <QuoteContainer>
            <motion.div
              initial={skip ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <QuoteDecoration />
            </motion.div>

            <QuoteText>
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={skip ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: i * 0.035,
                  }}
                >
                  <QuoteWord>{word}</QuoteWord>
                </motion.span>
              ))}
            </QuoteText>

            <motion.div
              initial={skip ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <QuoteAttribution>— my design philosophy</QuoteAttribution>
            </motion.div>
          </QuoteContainer>
        </motion.div>
      </Container>
    </SectionRoot>
  );
};

export default PhilosophySection;
