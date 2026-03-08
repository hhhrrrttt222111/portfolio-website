import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Navbar, Footer } from "@/components";
import { BLOGS } from "@/constants/blogs";
import BlogSection from "@/components/blogs/BlogSection/BlogSection";
import {
  PageRoot,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  BlogsContainer,
  SectionDivider,
} from "./Blogs.styles";

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const dividerVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Blogs = () => {
  const prefersReduced = useReducedMotion();

  const hackzismBlog = useMemo(() => BLOGS.find((blog) => blog.id === "hackzism"), []);

  const bibliosmiaBlog = useMemo(() => BLOGS.find((blog) => blog.id === "bibliosmia"), []);

  return (
    <PageRoot>
      <Navbar />

      <Box component="header">
        <HeroSection>
          <Container maxWidth="lg">
            <motion.div
              variants={prefersReduced ? undefined : heroVariants}
              initial="hidden"
              animate="visible"
            >
              <HeroTitle>My Blogs</HeroTitle>
              <HeroSubtitle>
                Thoughts on Technology and Literature — exploring the intersection of code and
                creativity through two distinct lenses.
              </HeroSubtitle>
            </motion.div>
          </Container>
        </HeroSection>
      </Box>

      <Box component="main">
        <BlogsContainer>
          {hackzismBlog && <BlogSection blog={hackzismBlog} />}

          <motion.div
            variants={prefersReduced ? undefined : dividerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "contents" }}
          >
            <SectionDivider aria-hidden="true" />
          </motion.div>

          {bibliosmiaBlog && <BlogSection blog={bibliosmiaBlog} />}
        </BlogsContainer>
      </Box>

      <Footer />
    </PageRoot>
  );
};

export default Blogs;
