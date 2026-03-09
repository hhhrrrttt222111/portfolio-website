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
  fr: 60,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  nm: "Cyber Matrix",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Outer Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [40], e: [80] },
            { t: 90, s: [80], e: [40] },
            { t: 180, s: [40] },
          ],
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 180, s: [360] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [115, 115] },
            { t: 90, s: [115, 115], e: [100, 100] },
            { t: 180, s: [100, 100] },
          ],
        },
      },
      shapes: [
        { ty: "el", s: { a: 0, k: [180, 180] }, p: { a: 0, k: [0, 0] } },
        {
          ty: "st",
          c: { a: 0, k: [0, 1, 0.25, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
          lc: 2,
          lj: 2,
          d: [
            { n: "d", nm: "dash", v: { a: 0, k: 20 } },
            { n: "g", nm: "gap", v: { a: 0, k: 10 } },
            {
              n: "o",
              nm: "offset",
              v: {
                a: 1,
                k: [
                  { t: 0, s: [0], e: [100] },
                  { t: 180, s: [100] },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Inner Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [60], e: [100] },
            { t: 90, s: [100], e: [60] },
            { t: 180, s: [60] },
          ],
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [360], e: [0] },
            { t: 180, s: [0] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [90, 90] },
            { t: 90, s: [90, 90], e: [100, 100] },
            { t: 180, s: [100, 100] },
          ],
        },
      },
      shapes: [
        { ty: "el", s: { a: 0, k: [120, 120] }, p: { a: 0, k: [0, 0] } },
        { ty: "st", c: { a: 0, k: [0, 1, 0.25, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 } },
      ],
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Core Pulse",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [30], e: [70] },
            { t: 45, s: [70], e: [30] },
            { t: 90, s: [30], e: [70] },
            { t: 135, s: [70], e: [30] },
            { t: 180, s: [30] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [130, 130] },
            { t: 45, s: [130, 130], e: [100, 100] },
            { t: 90, s: [100, 100], e: [130, 130] },
            { t: 135, s: [130, 130], e: [100, 100] },
            { t: 180, s: [100, 100] },
          ],
        },
      },
      shapes: [
        { ty: "el", s: { a: 0, k: [60, 60] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0, 1, 0.25, 0.3] }, o: { a: 0, k: 30 } },
        { ty: "st", c: { a: 0, k: [0, 1, 0.25, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 } },
      ],
    },
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Data Lines 1",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [80] },
            { t: 30, s: [80], e: [80] },
            { t: 60, s: [80], e: [0] },
            { t: 90, s: [0] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
      },
      shapes: [
        { ty: "rc", d: 1, s: { a: 0, k: [4, 80] }, p: { a: 0, k: [0, -100] }, r: { a: 0, k: 2 } },
        { ty: "fl", c: { a: 0, k: [0, 1, 0.25, 1] }, o: { a: 0, k: 100 } },
        {
          ty: "rp",
          c: { a: 0, k: 8 },
          o: { a: 0, k: 0 },
          tr: {
            r: { a: 0, k: 45 },
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            a: { a: 0, k: [0, 0] },
            so: { a: 0, k: 100 },
            eo: { a: 0, k: 100 },
          },
        },
      ],
    },
  ],
};

const bookAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  nm: "Open Book",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Left Page",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-8], e: [0] },
            { t: 90, s: [0], e: [-8] },
            { t: 180, s: [-8] },
          ],
        },
        p: { a: 0, k: [170, 200, 0] },
        a: { a: 0, k: [40, 0, 0] },
      },
      shapes: [
        { ty: "rc", d: 1, s: { a: 0, k: [80, 120] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 3 } },
        { ty: "fl", c: { a: 0, k: [0.96, 0.94, 0.9, 1] }, o: { a: 0, k: 100 } },
        { ty: "st", c: { a: 0, k: [0.83, 0.65, 0.46, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 } },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Right Page",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [8], e: [0] },
            { t: 90, s: [0], e: [8] },
            { t: 180, s: [8] },
          ],
        },
        p: { a: 0, k: [230, 200, 0] },
        a: { a: 0, k: [-40, 0, 0] },
      },
      shapes: [
        { ty: "rc", d: 1, s: { a: 0, k: [80, 120] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 3 } },
        { ty: "fl", c: { a: 0, k: [0.98, 0.96, 0.92, 1] }, o: { a: 0, k: 100 } },
        { ty: "st", c: { a: 0, k: [0.83, 0.65, 0.46, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2 } },
      ],
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Book Spine",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [200, 200, 0] },
      },
      shapes: [
        { ty: "rc", d: 1, s: { a: 0, k: [12, 130] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 2 } },
        { ty: "fl", c: { a: 0, k: [0.55, 0.35, 0.2, 1] }, o: { a: 0, k: 100 } },
      ],
    },
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Floating Stars",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [80] },
            { t: 45, s: [80], e: [80] },
            { t: 135, s: [80], e: [0] },
            { t: 180, s: [0] },
          ],
        },
        p: {
          a: 1,
          k: [
            { t: 0, s: [200, 200, 0], e: [200, 120, 0] },
            { t: 90, s: [200, 120, 0], e: [200, 200, 0] },
            { t: 180, s: [200, 200, 0] },
          ],
        },
        s: {
          a: 1,
          k: [
            { t: 0, s: [60, 60], e: [100, 100] },
            { t: 90, s: [100, 100], e: [60, 60] },
            { t: 180, s: [60, 60] },
          ],
        },
      },
      shapes: [
        {
          ty: "sr",
          sy: 1,
          pt: { a: 0, k: 5 },
          p: { a: 0, k: [0, 0] },
          or: { a: 0, k: 15 },
          ir: { a: 0, k: 7 },
          r: { a: 0, k: 0 },
        },
        { ty: "fl", c: { a: 0, k: [1, 0.85, 0.4, 1] }, o: { a: 0, k: 100 } },
        {
          ty: "rp",
          c: { a: 0, k: 5 },
          o: { a: 0, k: 0 },
          tr: {
            p: { a: 0, k: [50, 0] },
            r: { a: 0, k: 0 },
            s: { a: 0, k: [80, 80] },
            a: { a: 0, k: [0, 0] },
            so: { a: 0, k: 100 },
            eo: { a: 0, k: 100 },
          },
        },
      ],
    },
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: "Warm Glow",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [20], e: [50] },
            { t: 90, s: [50], e: [20] },
            { t: 180, s: [20] },
          ],
        },
        p: { a: 0, k: [200, 180, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], e: [120, 120] },
            { t: 90, s: [120, 120], e: [100, 100] },
            { t: 180, s: [100, 100] },
          ],
        },
      },
      shapes: [
        { ty: "el", s: { a: 0, k: [200, 200] }, p: { a: 0, k: [0, 0] } },
        {
          ty: "gf",
          o: { a: 0, k: 100 },
          s: { a: 0, k: [0, 0] },
          e: { a: 0, k: [100, 0] },
          t: 2,
          g: {
            p: 3,
            k: {
              a: 0,
              k: [
                0, 1, 0.72, 0.3, 0.5, 0.83, 0.65, 0.46, 1, 0.83, 0.65, 0.46, 0, 0.5, 0.5, 0.3, 0.5,
                0.15, 1, 0,
              ],
            },
          },
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
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: i * 0.6,
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
      <Box component="section" aria-labelledby={`${blog.id}-title`} height={"100%"}>
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
                autoPlay
                style={{ width: "100%", height: "100%" }}
              />
            </HackerLottiePosition>
          ) : (
            <LiteraryLottiePosition>
              <Lottie
                animationData={bookAnimation}
                loop
                autoPlay
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
