import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(50px, -40px) rotate(2deg); }
  66% { transform: translate(-30px, 25px) rotate(-1deg); }
`;

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-40px, 30px) rotate(-2deg); }
  66% { transform: translate(35px, -20px) rotate(1deg); }
`;

const lineGrow = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    position: "relative",
    overflow: "hidden",
    background: isDark
      ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(8,21,16,0.9) 0%, #0a1a0f 80%)"
      : "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(241,248,233,0.9) 0%, #e8f0e0 80%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(24),
      paddingBottom: theme.spacing(24),
      minHeight: "80vh",
    },
  };
});

export const BackgroundBlob = styled(Box)<{ variant: 1 | 2 }>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const config =
    variant === 1
      ? { size: 450, top: "15%", left: "5%", animation: drift1, duration: "24s" }
      : { size: 350, top: "45%", left: "70%", animation: drift2, duration: "28s" };

  return {
    position: "absolute",
    width: config.size,
    height: config.size,
    borderRadius: "50%",
    background: isDark
      ? `radial-gradient(circle, rgba(102,187,106,0.07) 0%, rgba(128,203,196,0.03) 40%, transparent 70%)`
      : `radial-gradient(circle, rgba(46,125,50,0.06) 0%, rgba(0,137,123,0.03) 40%, transparent 70%)`,
    filter: "blur(100px)",
    animation: `${config.animation} ${config.duration} ease-in-out infinite`,
    pointerEvents: "none",
    top: config.top,
    left: config.left,
    [theme.breakpoints.down("sm")]: {
      width: config.size * 0.4,
      height: config.size * 0.4,
    },
  };
});

export const QuoteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  maxWidth: 720,
  textAlign: "center",
  padding: `0 ${theme.spacing(3)}`,
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.up("md")]: {
    maxWidth: 820,
  },
}));

export const QuoteDecoration = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: 60,
    height: 2,
    margin: `0 auto ${theme.spacing(4)}`,
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    borderRadius: 1,
    transformOrigin: "center",
    animation: `${lineGrow} 1s ease-out 0.5s both`,
    opacity: isDark ? 0.5 : 0.4,
  };
});

export const QuoteText = styled("blockquote")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "1.5rem",
  lineHeight: 1.65,
  color: theme.palette.text.primary,
  letterSpacing: "-0.01em",
  fontStyle: "italic",
  margin: 0,
  padding: 0,
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.85rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
    lineHeight: 1.5,
  },
}));

export const QuoteWord = styled("span")(({ theme }) => ({
  display: "inline-block",
  marginRight: theme.spacing(0.75),
}));

export const QuoteAttribution = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontSize: "0.85rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontFamily: fontFamilies.mono,
  letterSpacing: "0.05em",
  opacity: 0.6,
}));
