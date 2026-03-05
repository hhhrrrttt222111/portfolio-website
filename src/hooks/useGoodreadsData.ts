import { useEffect, useReducer } from "react";
import type { Book } from "@/types";

interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
}

type Action = { type: "FETCH_SUCCESS"; books: Book[] } | { type: "FETCH_ERROR"; error: string };

const initialState: State = { books: [], loading: true, error: null };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { books: action.books, loading: false, error: null };
    case "FETCH_ERROR":
      return { books: [], loading: false, error: action.error };
  }
}

const useGoodreadsData = (url = "/data/books.json"): State => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Book[]) => {
        if (!cancelled) dispatch({ type: "FETCH_SUCCESS", books: data });
      })
      .catch((err: Error) => {
        if (!cancelled) dispatch({ type: "FETCH_ERROR", error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
};

export default useGoodreadsData;
