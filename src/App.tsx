import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { CursorFollower, DarkModeToggle, OfflineFallback } from "@/components";
import { useNetwork } from "@/hooks";
import { Home } from "@/pages";

const App = () => {
  const isOnline = useNetwork();

  if (!isOnline) {
    return <OfflineFallback />;
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
      <BrowserRouter>
        <CursorFollower />
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
