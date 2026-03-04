import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL_LINKS } from "@/constants";
import {
  FooterRoot,
  WaveContainer,
  FooterContent,
  SocialGrid,
  SocialIconButton,
  CopyrightText,
} from "./Footer.styles";

const WAVE_PATHS = [
  "M0,64 C320,120 640,20 960,80 C1280,140 1600,40 1920,96 L1920,0 L0,0 Z",
  "M0,80 C320,30 640,130 960,60 C1280,10 1600,110 1920,50 L1920,0 L0,0 Z",
  "M0,48 C320,100 640,10 960,72 C1280,130 1600,30 1920,88 L1920,0 L0,0 Z",
];

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const Footer = () => {
  const theme = useTheme();
  const prefersReduced = useReducedMotion();
  const isDark = theme.palette.mode === "dark";

  const waveColor = isDark
    ? ["rgba(102, 187, 106, 0.03)", "rgba(0, 137, 123, 0.02)", "rgba(102, 187, 106, 0.015)"]
    : ["rgba(46, 125, 50, 0.03)", "rgba(0, 137, 123, 0.02)", "rgba(46, 125, 50, 0.015)"];

  return (
    <FooterRoot component="footer" data-testid="footer">
      <WaveContainer>
        <svg
          viewBox="0 0 1920 160"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          {WAVE_PATHS.map((basePath, i) => (
            <motion.path
              key={i}
              d={basePath}
              fill={waveColor[i]}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      d: [basePath, WAVE_PATHS[(i + 1) % WAVE_PATHS.length], basePath],
                    }
              }
              transition={
                prefersReduced
                  ? undefined
                  : {
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          ))}
        </svg>
      </WaveContainer>

      <FooterContent>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
          >
            <SocialGrid>
              {SOCIAL_LINKS.map((link) => (
                <motion.div
                  key={link.name}
                  variants={prefersReduced ? undefined : iconVariants}
                  whileHover={prefersReduced ? undefined : { y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Tooltip title={link.name} arrow>
                    <SocialIconButton
                      {...{
                        component: "a",
                        href: link.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }}
                      aria-label={link.name}
                    >
                      <link.Icon />
                    </SocialIconButton>
                  </Tooltip>
                </motion.div>
              ))}
            </SocialGrid>
          </motion.div>

          <CopyrightText>
            &copy; {new Date().getFullYear()} Hemanth R. All rights reserved.
          </CopyrightText>
        </Container>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;
