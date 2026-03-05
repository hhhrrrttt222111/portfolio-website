import { memo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "@mui/material/Container";
import { HeroRoot, HeroTitle, HeroSubtitle, BookCount } from "./BooksHero.styles";

interface BooksHeroProps {
  bookCount: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const BooksHero = memo(({ bookCount }: BooksHeroProps) => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;

  return (
    <HeroRoot component="section" data-testid="books-hero">
      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial={skip ? false : "hidden"}
          animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <motion.div variants={fadeUp}>
            <BookCount>{bookCount} books read</BookCount>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HeroTitle variant="h1" component="h1">
              My Reading Library
            </HeroTitle>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HeroSubtitle>
              A collection of books that have shaped my thinking — from software craft to
              philosophy, psychology, and everything in between.
            </HeroSubtitle>
          </motion.div>
        </motion.div>
      </Container>
    </HeroRoot>
  );
});

BooksHero.displayName = "BooksHero";

export default BooksHero;
