import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const GridRoot = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2.5),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: theme.spacing(3.5),
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: theme.spacing(4),
  },
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: `${theme.spacing(10)} ${theme.spacing(3)}`,
  textAlign: "center",
}));

export const EmptyIcon = styled(Box)(({ theme }) => ({
  fontSize: "3.5rem",
  marginBottom: theme.spacing(2),
  opacity: 0.4,
}));

export const EmptyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.25rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const EmptyDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
  maxWidth: 360,
  lineHeight: 1.6,
}));
