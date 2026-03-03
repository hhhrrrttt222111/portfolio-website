import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

interface Blob {
  id: number;
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
}

const FlowingBackground = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const blobs: Blob[] = [
    {
      id: 1,
      size: 500,
      x: "10%",
      y: "15%",
      color: isDark ? "rgba(102, 187, 106, 0.18)" : "rgba(46, 125, 50, 0.17)",
      duration: 20,
      delay: 0,
    },
    {
      id: 2,
      size: 400,
      x: "65%",
      y: "60%",
      color: isDark ? "rgba(128, 203, 196, 0.16)" : "rgba(0, 137, 123, 0.16)",
      duration: 25,
      delay: 2,
    },
    {
      id: 3,
      size: 350,
      x: "80%",
      y: "10%",
      color: isDark ? "rgba(165, 214, 167, 0.15)" : "rgba(76, 175, 80, 0.15)",
      duration: 22,
      delay: 4,
    },
    {
      id: 4,
      size: 300,
      x: "30%",
      y: "70%",
      color: isDark ? "rgba(77, 182, 172, 0.16)" : "rgba(0, 105, 92, 0.15)",
      duration: 18,
      delay: 1,
    },
    {
      id: 5,
      size: 250,
      x: "50%",
      y: "30%",
      color: isDark ? "rgba(102, 187, 106, 0.14)" : "rgba(46, 125, 50, 0.14)",
      duration: 28,
      delay: 3,
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          style={{
            position: "absolute",
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}

      {/* Subtle grain overlay for texture */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: isDark ? 0.03 : 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </Box>
  );
};

export default FlowingBackground;
