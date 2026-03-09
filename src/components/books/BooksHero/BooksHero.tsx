import { memo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  HeroRoot,
  HeroContainer,
  HeroTitle,
  HeroSubtitle,
  BookCount,
  BookCountNumber,
  BookCountLabel,
  InstagramLink,
} from "./BooksHero.styles";

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

const INSTAGRAM_URL = "https://www.instagram.com/bibliosmia.brews/";

const BooksHero = memo(({ bookCount }: BooksHeroProps) => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;

  return (
    <HeroRoot data-testid="books-hero">
      <HeroContainer>
        <motion.div
          variants={containerVariants}
          initial={skip ? false : "hidden"}
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <HeroTitle>My Reading Library</HeroTitle>
          </motion.div>

          <motion.div variants={scaleIn}>
            <BookCount>
              <BookCountNumber>{bookCount}</BookCountNumber>
              <BookCountLabel>books read</BookCountLabel>
            </BookCount>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HeroSubtitle>
              A collection of books that have influenced my thinking and perspective, from software
              engineering and technology to philosophy, psychology, and the deeper ideas that shape
              how we understand people and the world.
            </HeroSubtitle>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <InstagramLink
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram for book updates"
            >
              <InstagramIcon />
              Follow for book updates
            </InstagramLink>
          </motion.div>
        </motion.div>
      </HeroContainer>
    </HeroRoot>
  );
});

BooksHero.displayName = "BooksHero";

export default BooksHero;
