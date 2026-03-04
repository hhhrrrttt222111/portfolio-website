import { motion, useScroll, useSpring } from "framer-motion";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ScrollIndicator = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: theme.zIndex.appBar + 1,
      }}
    >
      <Box
        component={motion.div}
        style={{ scaleX }}
        sx={{
          height: "100%",
          transformOrigin: "0%",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
          borderRadius: "0 2px 2px 0",
          boxShadow: `0 0 8px ${theme.palette.primary.main}40, 0 0 4px ${theme.palette.secondary.main}60`,
        }}
      />
    </Box>
  );
};

export default ScrollIndicator;
