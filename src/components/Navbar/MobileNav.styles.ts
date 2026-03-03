import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const MobileDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "100%",
    maxWidth: 320,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

export const DrawerLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.primary.main,
  letterSpacing: 2,
}));

export const DrawerNavItem = styled(Link)(({ theme }) => ({
  display: "block",
  textDecoration: "none",
  padding: theme.spacing(1.5, 2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const DrawerNavLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const DrawerContactButton = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: 50,
  fontWeight: 600,
  fontSize: "0.95rem",
  paddingTop: 12,
  paddingBottom: 12,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
