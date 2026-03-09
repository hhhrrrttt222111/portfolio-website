import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { motion, useReducedMotion } from "framer-motion";
import { BLOG_POSTS, type LegacyBlogPost } from "@/constants";
import {
  SectionRoot,
  SectionTitle,
  SectionSubtitle,
  BlogGrid,
  ViewAllLink,
} from "./BlogPreview.styles";
import BlogCard from "./BlogCard";

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const BlogPreview = () => {
  const prefersReduced = useReducedMotion();

  return (
    <SectionRoot data-testid="blog-preview">
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={prefersReduced ? undefined : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <SectionTitle>From the Desk</SectionTitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <SectionSubtitle>
              Musings on cybersecurity, hacking tools, and the books that shaped my thinking. Here
              are a few recent pieces.
            </SectionSubtitle>
          </motion.div>
        </motion.div>

        <BlogGrid>
          {BLOG_POSTS.map((post: LegacyBlogPost, index: number) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </BlogGrid>

        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
        >
          <ViewAllLink>
            <Link to="/blog">
              <span>View all articles</span>
            </Link>
          </ViewAllLink>
        </motion.div>
      </Container>
    </SectionRoot>
  );
};

export default BlogPreview;
