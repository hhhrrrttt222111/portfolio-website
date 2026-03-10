import { useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import gsap from "gsap";
import landingImage from "@/assets/png/landing-bg-removed.png";
import FlowingBackground from "@/components/ui/FlowingBackground/FlowingBackground";
import {
  landingContainerVariants,
  landingItemVariants,
  landingImageVariants,
  highlightStyle,
} from "@/animations";
import {
  LandingRoot,
  TextContent,
  HeroHeading,
  Subtitle,
  TagLine,
  TagDescription,
  ImageWrapper,
} from "./Landing.styles";

const MotionStack = motion.create(Stack);
const MotionImageWrapper = motion.create(ImageWrapper);

const Landing = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const highlightRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        if (chars.length > 0) {
          gsap.fromTo(
            chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              delay: 0.3,
              ease: "power2.out",
            },
          );
        }
      }

      highlightRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { backgroundSize: "0% 100%" },
            {
              backgroundSize: "100% 100%",
              duration: 0.6,
              delay: 0.8 + index * 0.15,
              ease: "power2.out",
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <LandingRoot>
      <FlowingBackground />
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", position: "relative", zIndex: 1, height: "100%" }}
      >
        <TextContent>
          <MotionStack
            justifyContent="center"
            spacing={4}
            variants={landingContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionStack spacing={2} variants={landingItemVariants}>
              <Subtitle>Hey, I&apos;m a</Subtitle>
              <HeroHeading ref={headingRef}>
                {splitText("Freelance")}
                <Box component="br" sx={{ display: { xs: "block", lg: "none" } }} />
                <Box component="span" sx={{ whiteSpace: { lg: "nowrap" } }}>
                  <span
                    ref={(el) => {
                      highlightRefs.current[0] = el;
                    }}
                    className="highlight"
                    style={highlightStyle}
                  >
                    Software
                  </span>{" "}
                  <span
                    ref={(el) => {
                      highlightRefs.current[1] = el;
                    }}
                    className="highlight"
                    style={highlightStyle}
                  >
                    Developer
                  </span>
                </Box>
              </HeroHeading>
            </MotionStack>

            <MotionStack spacing={1.5} sx={{ maxWidth: 580 }} variants={landingItemVariants}>
              <TagLine>
                Great design should feel <span className="accent">invisible.</span> I build modern,
                scalable web applications that are <span className="accent">fast</span>,{" "}
                <span className="accent">intuitive</span>, and{" "}
                <span className="accent">reliable</span>.
              </TagLine>
              <TagDescription>
                From idea to production, I help turn concepts into high-quality digital products
                using modern web technologies.
              </TagDescription>
            </MotionStack>
          </MotionStack>
        </TextContent>

        <MotionImageWrapper variants={landingImageVariants} initial="hidden" animate="visible">
          <img src={landingImage} alt="Portrait" loading="eager" />
        </MotionImageWrapper>
      </Stack>
    </LandingRoot>
  );
};

export default Landing;
