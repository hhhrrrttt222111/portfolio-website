import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

export const HeroRoot = styled("section")(({ theme }) => ({
  height: "50vh",
  minHeight: 400,
  position: "relative",
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(18, 38, 26, 0.4)" : "rgba(245, 241, 235, 0.5)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  paddingBottom: theme.spacing(4),
}));

export const PendulumAnchor = styled(Box)({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1,
});

export const HeroContent = styled(Box)({
  position: "absolute",
  bottom: "20%",
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1,
  textAlign: "center",
});

export const PhoneWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
});

export const CordSvg = styled("svg")({
  width: 4,
  height: 140,
  display: "block",
});

export const PhoneIcon = styled(Box)({
  fontSize: 0,
  lineHeight: 0,
  "& svg": {
    width: 64,
    height: 64,
  },
});

export const HeroTitle = styled("h1")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 700,
  fontSize: "2.5rem",
  color: theme.palette.text.primary,
  marginTop: theme.spacing(3),
  letterSpacing: "-0.03em",
  margin: 0,
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4.5rem",
  },
}));

export const YearText = styled("span")(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontWeight: 400,
  fontSize: "1.25rem",
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
}));

export const TitleRow = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  gap: 12,
});

export const SubtitleText = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontWeight: 400,
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
  textTransform: "lowercase",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.85rem",
  },
}));

export const GrainOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  opacity: 0.04,
  pointerEvents: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: 128,
});

export const VignetteOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    theme.palette.mode === "dark"
      ? "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)"
      : "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)",
}));
