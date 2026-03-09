import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { fontFamilies } from "@/theme/theme";

export const FiltersRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(6),
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      flex: "1 1 240px",
      width: "auto",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1.5),
      background: isDark ? "rgba(18,38,26,0.4)" : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(12px)",
      fontSize: "0.9rem",
      fontFamily: fontFamilies.body,
      transition: "border-color 0.2s, box-shadow 0.2s",
      "& fieldset": {
        borderColor: isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.12)",
        transition: "border-color 0.2s",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "rgba(102,187,106,0.3)" : "rgba(46,125,50,0.25)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        boxShadow: `0 0 0 3px ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.25, 1.5),
      color: theme.palette.text.primary,
      "&::placeholder": {
        color: theme.palette.text.secondary,
        opacity: 0.6,
      },
    },
    "& .search-icon": {
      color: theme.palette.text.secondary,
      opacity: 0.5,
      fontSize: "1.1rem",
    },
  };
});

export const FilterRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}));

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
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(0.5),
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
    "& .star-icon": {
      fontSize: "0.85rem",
      display: "flex",
    },
  };
});

export const SortButton = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
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
      fontSize: "1rem",
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
