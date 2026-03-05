import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { CursorFollower, DarkModeToggle, OfflineFallback, ScrollIndicator } from "@/components";
import { useNetwork } from "@/hooks";
// import { useDevToolsWarning, useNetwork } from "@/hooks";
import { Home, About } from "@/pages";

const App = () => {
  const isOnline = useNetwork();
  // useDevToolsWarning();

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
      <ScrollIndicator />
      <BrowserRouter>
        <CursorFollower />
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
