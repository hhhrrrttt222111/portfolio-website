import { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Navbar, Footer } from "@/components";
import BooksHero from "@/components/books/BooksHero/BooksHero";
import BookFilters, { type SortOrder } from "@/components/books/BookFilters/BookFilters";
import BookGrid from "@/components/books/BookGrid/BookGrid";
import type { Book } from "@/types";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
      .catch(() => setBooks([]));
  }, []);

  const handleSearchChange = useCallback((value: string) => setSearch(value), []);
  const handleRatingChange = useCallback((r: number | null) => setRatingFilter(r), []);
  const handleSortChange = useCallback((o: SortOrder) => setSortOrder(o), []);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = books.filter((book) => {
      if (query) {
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor) return false;
      }
      if (ratingFilter !== null && book.rating !== ratingFilter) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      const dateA = a.readDate || "";
      const dateB = b.readDate || "";
      return sortOrder === "newest" ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    });

    return result;
  }, [books, search, ratingFilter, sortOrder]);

  return (
    <Box>
      <Navbar />
      <BooksHero bookCount={books.length} />
      <Box
        component="section"
        sx={(theme) => ({
          py: 6,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0a1a0f 0%, #0d2018 50%, #0a1a0f 100%)"
              : "linear-gradient(180deg, #f1f8e9 0%, #e8f0e0 50%, #f1f8e9 100%)",
          minHeight: "50vh",
          [theme.breakpoints.up("md")]: {
            py: 8,
          },
        })}
      >
        <Container maxWidth="lg">
          <BookFilters
            search={search}
            onSearchChange={handleSearchChange}
            ratingFilter={ratingFilter}
            onRatingFilterChange={handleRatingChange}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortChange}
            resultCount={filteredBooks.length}
            totalCount={books.length}
          />
          <BookGrid books={filteredBooks} />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Books;
