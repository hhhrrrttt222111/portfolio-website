import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

export const HeroContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "12%",
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1,
  textAlign: "center",
  padding: theme.spacing(0, 2),
}));

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

export const NameText = styled("h1")(({ theme }) => ({
  fontFamily: fontFamilies.display,
  fontWeight: 400,
  fontSize: "3.5rem",
  fontStyle: "italic",
  letterSpacing: "-0.03em",
  color: theme.palette.text.primary,
  margin: 0,
  lineHeight: 0.95,
  [theme.breakpoints.up("sm")]: {
    fontSize: "5.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "7rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "8rem",
  },
}));

export const RoleText = styled("span")(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontWeight: 400,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  display: "inline-block",
  padding: theme.spacing(0.75, 2),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 100,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.7rem",
    padding: theme.spacing(1, 2.5),
  },
}));

export const TitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(3),
  },
}));

export const HeroTitle = styled("span")(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontWeight: 400,
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  letterSpacing: "0.05em",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
}));

export const Divider = styled("span")(({ theme }) => ({
  width: 40,
  height: 1,
  backgroundColor: theme.palette.text.secondary,
  opacity: 0.4,
  [theme.breakpoints.up("sm")]: {
    width: 60,
  },
}));

export const YearText = styled("span")(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontWeight: 400,
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  letterSpacing: "0.05em",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
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
