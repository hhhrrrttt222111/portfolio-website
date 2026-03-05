import { memo, useReducer, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Book } from "@/types";
import BookCard from "../BookCard/BookCard";
import { GridRoot, EmptyState, EmptyIcon, EmptyTitle, EmptyDescription } from "./BookGrid.styles";

const PAGE_SIZE = 20;

interface BookGridProps {
  books: Book[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
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

function pageReducer(state: number, action: "more" | "reset") {
  return action === "reset" ? PAGE_SIZE : state + PAGE_SIZE;
}

const BookGrid = memo(({ books }: BookGridProps) => {
  const prefersReduced = useReducedMotion();
  const skip = !!prefersReduced;
  const [visibleCount, dispatch] = useReducer(pageReducer, PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const capped = Math.min(visibleCount, books.length);

  useEffect(() => {
    dispatch("reset");
  }, [books]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) dispatch("more");
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [capped, books.length]);

  if (books.length === 0) {
    return (
      <motion.div
        initial={skip ? false : { opacity: 0, y: 20 }}
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

  const visibleBooks = books.slice(0, capped);
  const hasMore = capped < books.length;

  return (
    <div data-testid="book-grid">
      <GridRoot>
        <AnimatePresence mode="popLayout">
          {visibleBooks.map((book, i) => (
            <motion.div
              key={`${book.title}-${book.author}`}
              variants={skip ? undefined : itemVariants}
              initial={skip ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              exit="exit"
              layout
              style={{ height: "100%" }}
              custom={i}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </GridRoot>

      {hasMore && (
        <div
          ref={sentinelRef}
          data-testid="load-more-sentinel"
          style={{ height: 1, width: "100%" }}
        />
      )}
    </div>
  );
});

BookGrid.displayName = "BookGrid";

export default BookGrid;
