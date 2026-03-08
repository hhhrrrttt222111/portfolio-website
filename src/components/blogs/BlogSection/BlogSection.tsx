import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Lottie from "lottie-react";
import type { Blog } from "@/constants/blogs";
import BlogCard from "../BlogCard/BlogCard";
import {
  SectionWrapper,
  HackerBackground,
  LiteraryBackground,
  TerminalGlow,
  WarmGlow,
  SectionHeader,
  SectionTitle,
  SectionTagline,
  SectionDescription,
  TopicsContainer,
  TopicTag,
  PostsGrid,
  VisitBlogButton,
  FloatingParticle,
  HackerLottiePosition,
  LiteraryLottiePosition,
  ButtonContainer,
} from "./BlogSection.styles";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const hackerAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 300,
  h: 300,
  nm: "Cyber Network",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [30], e: [60] },
            { t: 45, s: [60], e: [30] },
            { t: 90, s: [30] },
          ],
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 90, s: [360] },
          ],
        },
        p: { a: 0, k: [150, 150, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [110, 110] },
            { t: 45, s: [110, 110], e: [100, 100] },
            { t: 90, s: [100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "el",
          s: { a: 0, k: [100, 100] },
          p: { a: 0, k: [0, 0] },
        },
        {
          ty: "st",
          c: { a: 0, k: [0, 1, 0.25, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 2 },
        },
      ],
    },
  ],
};

const bookAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 300,
  h: 300,
  nm: "Book",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Book Shape",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-5], e: [5] },
            { t: 60, s: [5], e: [-5] },
            { t: 120, s: [-5] },
          ],
        },
        p: { a: 0, k: [150, 150, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [105, 105] },
            { t: 60, s: [105, 105], e: [100, 100] },
            { t: 120, s: [100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [80, 100] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 5 },
        },
        {
          ty: "st",
          c: { a: 0, k: [0.83, 0.65, 0.46, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.83, 0.65, 0.46, 0.1] },
          o: { a: 0, k: 30 },
        },
      ],
    },
  ],
};

interface BlogSectionProps {
  blog: Blog;
}

const BlogSection = ({ blog }: BlogSectionProps) => {
  const prefersReduced = useReducedMotion();
  const isHacker = blog.theme === "hacker";

  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
      })),
    [],
  );

  const handleVisitBlog = () => {
    window.open(blog.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      variants={prefersReduced ? undefined : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Box component="section" aria-labelledby={`${blog.id}-title`}>
        <SectionWrapper variant={blog.theme}>
          {isHacker ? <HackerBackground /> : <LiteraryBackground />}
          {isHacker ? <TerminalGlow /> : <WarmGlow />}

          {particles.map((particle) => (
            <FloatingParticle key={particle.id} delay={particle.delay} variant={blog.theme} />
          ))}

          {isHacker ? (
            <HackerLottiePosition>
              <Lottie
                animationData={hackerAnimation}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </HackerLottiePosition>
          ) : (
            <LiteraryLottiePosition>
              <Lottie
                animationData={bookAnimation}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </LiteraryLottiePosition>
          )}

          <Container maxWidth="lg">
            <motion.div variants={prefersReduced ? undefined : headerVariants}>
              <SectionHeader variant={blog.theme}>
                <SectionTitle variant={blog.theme} id={`${blog.id}-title`}>
                  {blog.name}
                </SectionTitle>
                <SectionTagline blogVariant={blog.theme}>{blog.tagline}</SectionTagline>
                <SectionDescription blogVariant={blog.theme}>{blog.description}</SectionDescription>
                <TopicsContainer variant={blog.theme}>
                  {blog.topics.map((topic) => (
                    <TopicTag key={topic} variant={blog.theme}>
                      {topic}
                    </TopicTag>
                  ))}
                </TopicsContainer>
              </SectionHeader>
            </motion.div>

            <PostsGrid>
              {blog.posts.map((post, index) => (
                <BlogCard key={post.id} post={post} variant={blog.theme} index={index} />
              ))}
            </PostsGrid>

            <ButtonContainer variant={blog.theme}>
              <VisitBlogButton
                blogVariant={blog.theme}
                onClick={handleVisitBlog}
                endIcon={<OpenInNewIcon />}
                aria-label={`Visit ${blog.name} blog`}
              >
                {isHacker ? "$ visit_blog" : "Visit Full Blog"}
              </VisitBlogButton>
            </ButtonContainer>
          </Container>
        </SectionWrapper>
      </Box>
    </motion.div>
  );
};

export default BlogSection;
