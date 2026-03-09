import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import InputAdornment from "@mui/material/InputAdornment";
import {
  FiltersRoot,
  StyledTextField,
  FilterRow,
  FilterChipGroup,
  FilterChip,
  SortButton,
  ResultCount,
} from "./BookFilters.styles";

export type SortOrder = "newest" | "oldest";

interface BookFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  ratingFilter: number | null;
  onRatingFilterChange: (rating: number | null) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  resultCount: number;
  totalCount: number;
}

const RATING_OPTIONS = [5, 4, 3];

const BookFilters = memo(
  ({
    search,
    onSearchChange,
    ratingFilter,
    onRatingFilterChange,
    sortOrder,
    onSortOrderChange,
    resultCount,
    totalCount,
  }: BookFiltersProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FiltersRoot data-testid="book-filters">
          <StyledTextField
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search books"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FilterRow>
            <FilterChipGroup>
              <FilterChip
                active={ratingFilter === null}
                onClick={() => onRatingFilterChange(null)}
                role="button"
                tabIndex={0}
                aria-label="Show all ratings"
              >
                All
              </FilterChip>
              {RATING_OPTIONS.map((r) => (
                <FilterChip
                  key={r}
                  active={ratingFilter === r}
                  onClick={() => onRatingFilterChange(ratingFilter === r ? null : r)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Filter by ${r} stars`}
                >
                  {r}
                  <StarIcon className="star-icon" />
                </FilterChip>
              ))}
            </FilterChipGroup>

            <SortButton
              onClick={() => onSortOrderChange(sortOrder === "newest" ? "oldest" : "newest")}
              role="button"
              tabIndex={0}
              aria-label={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"} first`}
            >
              {sortOrder === "newest" ? "Newest" : "Oldest"}
              <ArrowDownwardIcon
                className="sort-arrow"
                style={{ transform: sortOrder === "oldest" ? "rotate(180deg)" : "none" }}
              />
            </SortButton>
          </FilterRow>

          <AnimatePresence mode="wait">
            <motion.div
              key={resultCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ResultCount>
                {resultCount === totalCount
                  ? `${totalCount} books`
                  : `${resultCount} of ${totalCount}`}
              </ResultCount>
            </motion.div>
          </AnimatePresence>
        </FiltersRoot>
      </motion.div>
    );
  },
);

BookFilters.displayName = "BookFilters";

export default BookFilters;
