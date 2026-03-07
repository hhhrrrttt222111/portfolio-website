import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.6; }
  94% { opacity: 1; }
  96% { opacity: 0.8; }
  97% { opacity: 1; }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: isDark ? "rgba(10, 18, 16, 0.4)" : "rgba(248, 246, 241, 0.5)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: isDark
        ? "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(102,187,106,0.02) 31px, rgba(102,187,106,0.02) 32px)"
        : "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(46,125,50,0.02) 31px, rgba(46,125,50,0.02) 32px)",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(14),
    },
  };
});

export const SectionTitle = styled("h2")(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(1.5),
  fontWeight: 700,
  fontSize: "1.75rem",
  fontFamily: fontFamilies.heading,
  letterSpacing: "-0.02em",
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${flicker} 6s ease-in-out infinite`,
  [theme.breakpoints.up("sm")]: { fontSize: "2rem" },
  [theme.breakpoints.up("md")]: { fontSize: "2.5rem" },
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  maxWidth: 560,
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "0.95rem",
  lineHeight: 1.8,
  fontFamily: fontFamilies.body,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(8),
    fontSize: "1.05rem",
  },
}));

export const BlogGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

export const CardOuter = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    background: isDark ? "rgba(10, 18, 16, 0.85)" : "rgba(255,255,252,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
    cursor: "pointer",
    transition: "all 0.45s cubic-bezier(0.25,0.8,0.25,1)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: 3,
      height: "100%",
      background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      opacity: 0,
      transition: "opacity 0.45s ease",
    },
    "&:hover": {
      transform: "translateY(-4px)",
      borderColor: isDark ? "rgba(102,187,106,0.25)" : "rgba(46,125,50,0.18)",
      boxShadow: isDark
        ? "0 12px 40px rgba(102,187,106,0.08), 0 4px 16px rgba(0,0,0,0.3)"
        : "0 12px 40px rgba(46,125,50,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      "&::before": {
        opacity: 1,
      },
      "& .blog-arrow": {
        opacity: 1,
        transform: "translateX(0)",
      },
      "& .blog-tag": {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    },
  };
});

export const CardInner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
  },
}));

export const BlogTag = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(0.75),
  padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
  display: "inline-block",
  width: "fit-content",
  transition: "border-color 0.45s ease, color 0.45s ease",
}));

export const BlogTitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontSize: "1.05rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.45,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.15rem",
  },
}));

export const BlogDate = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  opacity: 0.7,
}));

export const BlogArrow = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontSize: "0.8rem",
  color: theme.palette.primary.main,
  opacity: 0,
  transform: "translateX(-8px)",
  transition: "opacity 0.45s ease, transform 0.45s ease",
  marginTop: "auto",
}));

export const ViewAllLink = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(6),
    "& a": {
      fontFamily: fontFamilies.body,
      fontSize: "1rem",
      fontWeight: 600,
      color: theme.palette.primary.main,
      textDecoration: "none",
      position: "relative",
      padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
      borderRadius: theme.spacing(1),
      border: `1px solid ${isDark ? "rgba(102,187,106,0.2)" : "rgba(46,125,50,0.15)"}`,
      transition: "all 0.4s ease",
      "&::after": {
        content: '"→"',
        marginLeft: theme.spacing(1),
        display: "inline-block",
        transition: "transform 0.4s ease",
      },
      "&:hover": {
        background: isDark ? "rgba(102,187,106,0.08)" : "rgba(46,125,50,0.05)",
        borderColor: theme.palette.primary.main,
        "&::after": {
          transform: "translateX(4px)",
        },
      },
    },
  };
});
