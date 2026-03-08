import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { fontFamilies } from "@/theme/theme";

interface NavbarRootProps {
  scrolled?: boolean;
}

export const NavbarRoot = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<NavbarRootProps>(({ theme, scrolled }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1.5, 2),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2, 4),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(2, 10),
  },
  ...(scrolled && {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(1.5, 4),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(1.5, 10),
    },
  }),
}));

export const NavbarToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<NavbarRootProps>(({ theme, scrolled }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? scrolled
        ? "rgba(18, 38, 26, 0.85)"
        : "rgba(18, 38, 26, 0.6)"
      : scrolled
        ? "rgba(255, 255, 255, 0.85)"
        : "rgba(255, 255, 255, 0.6)",
  backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
  WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? scrolled
        ? "rgba(102, 187, 106, 0.15)"
        : "rgba(255, 255, 255, 0.08)"
      : scrolled
        ? "rgba(46, 125, 50, 0.15)"
        : "rgba(0, 0, 0, 0.06)"
  }`,
  borderRadius: 50,
  padding: theme.spacing(0.5, 2),
  minHeight: 58,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: scrolled
    ? theme.palette.mode === "dark"
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(102, 187, 106, 0.1)"
      : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(46, 125, 50, 0.05)"
    : "none",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0.5, 3),
    minHeight: 62,
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
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
  "&:hover": {
    color: theme.palette.primary.light,
    transform: "scale(1.02)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: "100%",
    height: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transform: "scaleX(0)",
    transformOrigin: "center",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: 1,
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },
}));

export const NavLinksContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export const NavLinkWrapper = styled("div")({
  position: "relative",
});

export const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: fontFamilies.body,
  borderRadius: 50,
  padding: theme.spacing(0.75, 2.5),
  position: "relative",
  zIndex: 1,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const NavLinkUnderline = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 4,
  left: "50%",
  transform: "translateX(-50%)",
  height: 2,
  borderRadius: 1,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  pointerEvents: "none",
}));

export const ActiveIndicator = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 50,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.12)",
  border: `1px solid ${
    theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.3)" : "rgba(46, 125, 50, 0.25)"
  }`,
  pointerEvents: "none",
}));

export const ActiveNavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: fontFamilies.body,
  borderRadius: 50,
  padding: theme.spacing(0.75, 2.5),
  position: "relative",
  zIndex: 1,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const ContactButton = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  fontFamily: fontFamilies.body,
  borderRadius: 50,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 10,
  paddingBottom: 10,
  marginLeft: 12,
  color: theme.palette.primary.contrastText,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: `0 4px 15px ${theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.3)" : "rgba(46, 125, 50, 0.3)"}`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    opacity: 0,
    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.4)" : "rgba(46, 125, 50, 0.4)"}`,
  },
  "&:hover::before": {
    opacity: 1,
  },
  "& span": {
    position: "relative",
    zIndex: 1,
  },
}));

export const HamburgerButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 44,
  height: 44,
  borderRadius: "50%",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.1)",
    transform: "scale(1.05)",
  },
}));

export const HamburgerIconWrapper = styled(Box)({
  width: 24,
  height: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

export const HamburgerLine = styled(Box)(({ theme }) => ({
  width: 20,
  height: 2,
  backgroundColor: theme.palette.text.primary,
  borderRadius: 1,
  position: "absolute",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));
