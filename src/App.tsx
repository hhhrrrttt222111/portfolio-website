import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { CursorFollower, DarkModeToggle, OfflineFallback, ScrollIndicator } from "@/components";
import Loader from "@/components/Loader/Loader";
import { useDevToolsWarning, useNetwork } from "@/hooks";
import { ScrollToTop } from "@/utils";

const Home = lazy(() => import("@/pages/Home/Home"));
const About = lazy(() => import("@/pages/About/About"));
const Books = lazy(() => import("@/pages/Books/Books"));
const Blogs = lazy(() => import("@/pages/Blogs/Blogs"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

const MINIMUM_LOADER_DURATION_MS = 500;

const App = () => {
  const isOnline = useNetwork();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useDevToolsWarning();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, MINIMUM_LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!isOnline) {
    return <OfflineFallback />;
  }

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <ScrollIndicator />
      <BrowserRouter>
        <ScrollToTop />
        <CursorFollower />
        <DarkModeToggle />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Box>
  );
};

export default App;
