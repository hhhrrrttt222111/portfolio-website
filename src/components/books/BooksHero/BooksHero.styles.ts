import { styled, keyframes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { fontFamilies } from "@/theme/theme";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.3); }
  50% { box-shadow: 0 0 30px rgba(76, 175, 80, 0.5); }
`;

export const HeroRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
    background: isDark
      ? "radial-gradient(ellipse 100% 80% at 50% 20%, rgba(16,45,25,0.8) 0%, #0a1a0f 70%)"
      : "radial-gradient(ellipse 100% 80% at 50% 20%, rgba(200,230,201,0.5) 0%, #f1f8e9 70%)",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(10),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  };
});

export const HeroContainer = styled("div")({
  maxWidth: 900,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

export const HeroTitle = styled("h1")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    fontFamily: fontFamilies.heading,
    fontWeight: 700,
    fontSize: "2rem",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    backgroundImage: isDark
      ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.light} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 50%, ${theme.palette.primary.dark} 100%)`,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${shimmer} 6s linear infinite`,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.75rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.25rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.75rem",
    },
  };
});

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontSize: "0.95rem",
  lineHeight: 1.75,
  color: theme.palette.text.secondary,
  maxWidth: 650,
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.05rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.15rem",
  },
}));

export const BookCount = styled("div")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
    padding: theme.spacing(1.25, 3),
    borderRadius: theme.spacing(4),
    marginBottom: theme.spacing(4.5),
    background: isDark
      ? "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(129, 199, 132, 0.1) 100%)"
      : "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(200, 230, 201, 0.3) 100%)",
    border: `1.5px solid ${isDark ? "rgba(76, 175, 80, 0.4)" : "rgba(76, 175, 80, 0.35)"}`,
    boxShadow: isDark
      ? "0 4px 24px rgba(76, 175, 80, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      : "0 4px 24px rgba(76, 175, 80, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
    animation: `${glow} 3s ease-in-out infinite`,
    transition: "all 0.3s ease",
    "&:hover": {
      animation: `${pulse} 0.6s ease-in-out`,
      transform: "scale(1.02)",
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1.5, 3.5),
      gap: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
    },
  };
});

export const BookCountNumber = styled("span")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    fontSize: "1.5rem",
    fontWeight: 700,
    fontFamily: fontFamilies.mono,
    backgroundImage: isDark
      ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.75rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
});

export const BookCountLabel = styled("span")(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 500,
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  letterSpacing: "0.02em",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.95rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
}));

export const InstagramLink = styled(Link)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(1.25, 2.5),
    borderRadius: theme.spacing(3),
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: fontFamilies.body,
    textDecoration: "none",
    color: isDark ? "#fff" : theme.palette.primary.dark,
    background: isDark
      ? "linear-gradient(135deg, rgba(131, 58, 180, 0.2) 0%, rgba(253, 29, 29, 0.2) 50%, rgba(252, 176, 69, 0.2) 100%)"
      : "linear-gradient(135deg, rgba(131, 58, 180, 0.1) 0%, rgba(253, 29, 29, 0.1) 50%, rgba(252, 176, 69, 0.1) 100%)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(131, 58, 180, 0.3)"}`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      background: isDark
        ? "linear-gradient(135deg, rgba(131, 58, 180, 0.35) 0%, rgba(253, 29, 29, 0.35) 50%, rgba(252, 176, 69, 0.35) 100%)"
        : "linear-gradient(135deg, rgba(131, 58, 180, 0.2) 0%, rgba(253, 29, 29, 0.2) 50%, rgba(252, 176, 69, 0.2) 100%)",
      boxShadow: "0 4px 20px rgba(131, 58, 180, 0.3)",
      textDecoration: "none",
    },
    "& svg": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1.5, 3),
      fontSize: "1rem",
      "& svg": {
        fontSize: "1.3rem",
      },
    },
  };
});
