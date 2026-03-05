import { memo, useState } from "react";
import { motion } from "framer-motion";
import type { Book } from "@/types";
import {
  CardRoot,
  CoverWrapper,
  CoverImage,
  CoverPlaceholder,
  CardContent,
  CardTitle,
  CardAuthor,
  CardMeta,
  RatingContainer,
  StarIcon,
  ReadDate,
} from "./BookCard.styles";

const StarSvg = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface BookCardProps {
  book: Book;
}

const BookCard = memo(({ book }: BookCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <CardRoot
        data-testid="book-card"
        onClick={() => window.open(book.link, "_blank", "noopener,noreferrer")}
        role="link"
        aria-label={`${book.title} by ${book.author} on Goodreads`}
      >
        <CoverWrapper>
          {!imgError && book.cover ? (
            <CoverImage
              src={book.cover}
              alt={`Cover of ${book.title}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s" }}
            />
          ) : (
            <CoverPlaceholder>
              <span className="placeholder-icon">📖</span>
            </CoverPlaceholder>
          )}
        </CoverWrapper>

        <CardContent>
          <CardTitle>{book.title}</CardTitle>
          <CardAuthor>{book.author}</CardAuthor>

          <CardMeta>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= book.rating}>
                  <StarSvg filled={star <= book.rating} />
                </StarIcon>
              ))}
            </RatingContainer>
            {book.readDate && <ReadDate>{formatDate(book.readDate)}</ReadDate>}
          </CardMeta>
        </CardContent>
      </CardRoot>
    </motion.div>
  );
});

BookCard.displayName = "BookCard";

export default BookCard;
