import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { fontFamilies } from "@/theme/theme";

export const FiltersRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(6),
  },
}));

export const SearchField = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    flex: "1 1 240px",
    "& input": {
      width: "100%",
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(5)}`,
      borderRadius: theme.spacing(1.5),
      border: `1px solid ${isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.12)"}`,
      background: isDark ? "rgba(18,38,26,0.4)" : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(12px)",
      color: theme.palette.text.primary,
      fontSize: "0.9rem",
      fontFamily: fontFamilies.body,
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      "&::placeholder": {
        color: theme.palette.text.secondary,
        opacity: 0.6,
      },
      "&:focus": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
      },
    },
    "& .search-icon": {
      position: "absolute",
      left: theme.spacing(1.5),
      top: "50%",
      transform: "translateY(-50%)",
      color: theme.palette.text.secondary,
      opacity: 0.5,
      pointerEvents: "none",
      fontSize: "1.1rem",
    },
  };
});

export const FilterChipGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  alignItems: "center",
}));

export const FilterChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
    borderRadius: theme.spacing(3),
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    userSelect: "none",
    whiteSpace: "nowrap",
    border: `1px solid ${
      active
        ? theme.palette.primary.main
        : isDark
          ? "rgba(102,187,106,0.15)"
          : "rgba(46,125,50,0.12)"
    }`,
    background: active
      ? isDark
        ? `${theme.palette.primary.main}20`
        : `${theme.palette.primary.main}12`
      : "transparent",
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  };
});

export const SortButton = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.75),
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
    borderRadius: theme.spacing(1.5),
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    userSelect: "none",
    whiteSpace: "nowrap",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.12)"}`,
    color: theme.palette.text.secondary,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    "& .sort-arrow": {
      transition: "transform 0.2s",
    },
  };
});

export const ResultCount = styled(Box)(({ theme }) => ({
  fontSize: "0.78rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontFamily: fontFamilies.mono,
  opacity: 0.6,
  marginLeft: "auto",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));
