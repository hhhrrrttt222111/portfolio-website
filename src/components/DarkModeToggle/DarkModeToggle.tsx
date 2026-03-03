import { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../context";

const StyledToggleButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.fab,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(["background-color", "color", "box-shadow"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[8],
  },
}));

const DarkModeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <StyledToggleButton onClick={toggleColorMode} aria-label="toggle dark mode" size="large">
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </StyledToggleButton>
  );
};

export default DarkModeToggle;
