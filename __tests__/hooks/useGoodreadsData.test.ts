import { renderHook, waitFor } from "@testing-library/react";
import useGoodreadsData from "@/hooks/useGoodreadsData";

const mockBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://example.com/cover.jpg",
    rating: 5,
    avgRating: 4.35,
    readDate: "2025-01-12",
    link: "https://goodreads.com/book/1",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://example.com/cover2.jpg",
    rating: 4,
    avgRating: 4.19,
    readDate: "2025-02-20",
    link: "https://goodreads.com/book/2",
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    }),
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("useGoodreadsData", () => {
  it("starts with loading state", async () => {
    const { result } = renderHook(() => useGoodreadsData());
    expect(result.current.loading).toBe(true);
    expect(result.current.books).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("fetches books from default URL", async () => {
    const { result } = renderHook(() => useGoodreadsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith("/data/books.json");
    expect(result.current.books).toEqual(mockBooks);
    expect(result.current.error).toBeNull();
  });

  it("fetches books from custom URL", async () => {
    const { result } = renderHook(() => useGoodreadsData("/custom/path.json"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith("/custom/path.json");
    expect(result.current.books).toEqual(mockBooks);
  });

  it("handles fetch error", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Network error")),
    );

    const { result } = renderHook(() => useGoodreadsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.books).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("handles non-ok response", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 404 }),
    );

    const { result } = renderHook(() => useGoodreadsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.books).toEqual([]);
    expect(result.current.error).toBe("HTTP 404");
  });

  it("returns correct number of books", async () => {
    const { result } = renderHook(() => useGoodreadsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.books).toHaveLength(2);
  });

  it("cleans up on unmount without updating state", () => {
    const { unmount } = renderHook(() => useGoodreadsData());
    unmount();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
