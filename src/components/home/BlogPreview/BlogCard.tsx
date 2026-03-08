import { motion, useReducedMotion } from "framer-motion";
import type { LegacyBlogPost } from "@/constants";
import {
  CardOuter,
  CardInner,
  BlogTag,
  BlogTitle,
  BlogDate,
  BlogArrow,
} from "./BlogPreview.styles";

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

interface Props {
  post: LegacyBlogPost;
  index: number;
}

const BlogCard = ({ post, index }: Props) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      custom={index}
      variants={prefersReduced ? undefined : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReduced ? undefined : { scale: 1.01 }}
      style={{ perspective: 600 }}
    >
      <CardOuter
        {...{ component: "a", href: post.url, target: "_blank", rel: "noopener noreferrer" }}
        sx={{ textDecoration: "none", display: "block" }}
      >
        <CardInner>
          <BlogTag className="blog-tag">{post.tag}</BlogTag>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogDate>{post.date}</BlogDate>
          <BlogArrow className="blog-arrow">read article →</BlogArrow>
        </CardInner>
      </CardOuter>
    </motion.div>
  );
};

export default BlogCard;
