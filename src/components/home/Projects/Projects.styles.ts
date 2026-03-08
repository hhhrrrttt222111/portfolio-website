import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: isDark ? "rgba(4, 12, 6, 0.95)" : "rgba(248, 252, 248, 0.95)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: isDark
        ? `linear-gradient(rgba(102, 187, 106, 0.03) 1px, transparent 1px),
           linear-gradient(90deg, rgba(102, 187, 106, 0.03) 1px, transparent 1px)`
        : `linear-gradient(rgba(46, 125, 50, 0.03) 1px, transparent 1px),
           linear-gradient(90deg, rgba(46, 125, 50, 0.03) 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(14),
    },
  };
});

export const HexagonGrid = styled(Box)({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: 0.25,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 15v22L30 52 0 37V15z' fill='none' stroke='%2366bb6a' stroke-width='0.5'/%3E%3C/svg%3E")`,
  backgroundSize: "60px 52px",
});

export const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(10),
  },
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontSize: "2rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  marginBottom: theme.spacing(2),
  position: "relative",
  display: "inline-block",
  color: theme.palette.text.primary,
  "&::before": {
    content: '"<"',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    fontFamily: fontFamilies.mono,
  },
  "&::after": {
    content: '"/>"',
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    fontFamily: fontFamilies.mono,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  maxWidth: 500,
  margin: "0 auto",
  fontFamily: fontFamilies.mono,
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
}));

export const ProjectsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const ProjectCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    padding: theme.spacing(4),
    background: isDark
      ? "linear-gradient(145deg, rgba(18, 38, 26, 0.8), rgba(10, 20, 14, 0.9))"
      : "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 252, 248, 0.95))",
    borderRadius: theme.spacing(2),
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.1)"}`,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.4s ease",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: -50,
      right: -50,
      width: 100,
      height: 100,
      background: isDark
        ? "radial-gradient(circle, rgba(102, 187, 106, 0.1) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(46, 125, 50, 0.08) 0%, transparent 70%)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
    "&:hover": {
      transform: "translateY(-8px)",
      border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.4)" : "rgba(46, 125, 50, 0.3)"}`,
      boxShadow: isDark
        ? "0 20px 60px rgba(102, 187, 106, 0.15), 0 10px 30px rgba(0, 0, 0, 0.4)"
        : "0 20px 60px rgba(46, 125, 50, 0.12), 0 10px 30px rgba(0, 0, 0, 0.08)",
      "&::before": {
        transform: "scaleX(1)",
      },
      "&::after": {
        opacity: 1,
      },
      "& .project-number": {
        color: theme.palette.primary.main,
        transform: "scale(1.1)",
      },
      "& .github-icon": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  };
});

export const ProjectNumber = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontSize: "3rem",
  fontWeight: 700,
  color: theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.1)",
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(3),
  transition: "all 0.3s ease",
  lineHeight: 1,
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "1.25rem",
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.35rem",
  },
}));

export const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
}));

export const TagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const ProjectTag = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    borderRadius: theme.spacing(0.5),
    fontFamily: fontFamilies.mono,
    fontSize: "0.7rem",
    fontWeight: 500,
    color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
    background: isDark ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.2)" : "rgba(46, 125, 50, 0.15)"}`,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };
});

export const GitHubLink = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
  fontFamily: fontFamilies.mono,
  fontSize: "0.8rem",
  fontWeight: 500,
  opacity: 0.7,
  transform: "translateX(-10px)",
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: "1.2rem",
  },
}));

export const FloatingParticle = styled(Box)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  position: "absolute",
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: theme.palette.primary.main,
  opacity: 0.3,
  animation: `${float} 4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  pointerEvents: "none",
}));

export const CornerDecoration = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 60,
  height: 60,
  border: `2px solid ${theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)"}`,
  pointerEvents: "none",
}));
