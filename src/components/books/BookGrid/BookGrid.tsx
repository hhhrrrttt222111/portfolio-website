import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Book } from "@/types";
import BookCard from "../BookCard/BookCard";
import { GridRoot, EmptyState, EmptyIcon, EmptyTitle, EmptyDescription } from "./BookGrid.styles";

interface BookGridProps {
  books: Book[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const BookGrid = memo(({ books }: BookGridProps) => {
  if (books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyState data-testid="empty-state">
          <EmptyIcon>📚</EmptyIcon>
          <EmptyTitle>No books found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or filters to find what you're looking for.
          </EmptyDescription>
        </EmptyState>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="book-grid"
    >
      <GridRoot>
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <motion.div
              key={`${book.title}-${book.author}`}
              variants={itemVariants}
              exit="exit"
              layout
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </GridRoot>
    </motion.div>
  );
});

BookGrid.displayName = "BookGrid";

export default BookGrid;
