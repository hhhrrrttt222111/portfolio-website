import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { fontFamilies } from "@/theme/theme";

export const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5, 4),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(2.5, 10),
  },
}));

export const NavbarToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(18, 38, 26, 0.7)" : "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 50,
  padding: theme.spacing(0.5, 2),
  minHeight: 62,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0.5, 3),
    minHeight: 66,
  },
}));

export const Logo = styled(Link)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  letterSpacing: 3,
  textDecoration: "none",
  userSelect: "none",
  fontSize: "1.1rem",
  fontFamily: fontFamilies.heading,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: fontFamilies.body,
  borderRadius: 50,
  padding: theme.spacing(0.75, 2.5),
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const ContactButton = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: fontFamilies.body,
  borderRadius: 50,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 8,
  paddingBottom: 8,
  marginLeft: 8,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const HamburgerButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
