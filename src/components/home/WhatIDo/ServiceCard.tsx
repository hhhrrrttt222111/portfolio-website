import { useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { WhatIDoCard } from "@/constants";
import { GlassCard, CardTitle, CardDescription, AccentBar, IconWrapper } from "./WhatIDo.styles";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface TiltState {
  rotateX: number;
  rotateY: number;
}

const ServiceCard = ({ card }: { card: WhatIDoCard }) => {
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setTilt({
        rotateX: ((y - centerY) / centerY) * -8,
        rotateY: ((x - centerX) / centerX) * 8,
      });
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <motion.div
        variants={cardVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
      >
        <GlassCard>
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <IconWrapper>
              <card.Icon />
            </IconWrapper>
          </motion.div>

          <CardTitle variant="h6">{card.title}</CardTitle>
          <CardDescription variant="body2">{card.description}</CardDescription>
          <AccentBar className="accent-bar" />
        </GlassCard>
      </motion.div>
    </Grid>
  );
};

export default ServiceCard;
