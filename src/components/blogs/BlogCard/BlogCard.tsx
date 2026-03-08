import { motion, useReducedMotion, type Variants } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { BlogPost } from "@/constants/blogs";
import {
  CardWrapper,
  ScanlineEffect,
  CardTitle,
  CardExcerpt,
  CardMeta,
  CardDate,
  CardReadingTime,
  CardTagsContainer,
  CardTag,
  ReadArticleButton,
} from "./BlogCard.styles";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

interface BlogCardProps {
  post: BlogPost;
  variant: "hacker" | "literary";
  index: number;
}

const BlogCard = ({ post, variant, index }: BlogCardProps) => {
  const prefersReduced = useReducedMotion();
  const isHacker = variant === "hacker";

  const handleClick = () => {
    window.open(post.url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      custom={index}
      variants={prefersReduced ? undefined : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
    >
      <CardWrapper
        variant={variant}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="article"
        tabIndex={0}
        aria-label={`Read article: ${post.title}`}
      >
        {isHacker && <ScanlineEffect className="card-scanline" />}

        <CardMeta>
          <CardDate blogVariant={variant}>{post.date}</CardDate>
          <CardReadingTime blogVariant={variant}>
            <AccessTimeIcon sx={{ fontSize: "0.8rem" }} />
            {post.readingTime}
          </CardReadingTime>
        </CardMeta>

        <CardTitle blogVariant={variant}>{post.title}</CardTitle>

        <CardExcerpt blogVariant={variant}>{post.excerpt}</CardExcerpt>

        <CardTagsContainer>
          {post.tags.slice(0, 3).map((tag) => (
            <CardTag key={tag} variant={variant}>
              {tag}
            </CardTag>
          ))}
        </CardTagsContainer>

        <ReadArticleButton variant={variant} className="read-article-btn">
          {isHacker ? "$ read_article" : "Read Article"}
          <ArrowForwardIcon />
        </ReadArticleButton>
      </CardWrapper>
    </motion.div>
  );
};

export default BlogCard;
