import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { fontFamilies } from "@/theme/theme";

export const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.mode === "dark" ? "rgba(10, 26, 15, 0.8)" : "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: theme.zIndex.drawer,
}));

export const MobileMenuContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  width: "100%",
  maxWidth: 360,
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  display: "flex",
  flexDirection: "column",
  boxShadow:
    theme.palette.mode === "dark"
      ? "-8px 0 32px rgba(0, 0, 0, 0.5)"
      : "-8px 0 32px rgba(0, 0, 0, 0.15)",
  borderLeft: `1px solid ${
    theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.1)"
  }`,
}));

export const MobileMenuHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DrawerLogo = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 700,
  fontSize: "1.25rem",
  color: theme.palette.primary.main,
  letterSpacing: 3,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: "50%",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.1)",
  color: theme.palette.text.primary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.2)" : "rgba(46, 125, 50, 0.2)",
    transform: "rotate(90deg)",
  },
}));

export const MobileMenuContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  overflowY: "auto",
}));

export const NavItemsContainer = styled("nav")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const DrawerNavItem = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 3,
    height: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&:hover::before": {
    height: "60%",
  },
}));

export const DrawerNavLabel = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontWeight: 600,
  fontSize: "1.1rem",
  color: theme.palette.text.primary,
  transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

export const ActiveNavItem = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  width: 3,
  height: "60%",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 2,
  boxShadow: `0 0 8px ${theme.palette.primary.main}`,
}));

export const MobileMenuFooter = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
}));

export const DrawerContactButton = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  borderRadius: 50,
  fontFamily: fontFamilies.body,
  fontWeight: 600,
  fontSize: "1rem",
  padding: theme.spacing(1.75, 0),
  color: theme.palette.primary.contrastText,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: `0 4px 15px ${
    theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.3)" : "rgba(46, 125, 50, 0.3)"
  }`,
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
    boxShadow: `0 6px 20px ${
      theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.4)" : "rgba(46, 125, 50, 0.4)"
    }`,
  },
  "&:hover::before": {
    opacity: 1,
  },
  "& span": {
    position: "relative",
    zIndex: 1,
  },
}));

export const SocialLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));
