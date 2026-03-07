import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import landingImage from "@/assets/png/landing-bg-removed.png";
import FlowingBackground from "@/components/ui/FlowingBackground/FlowingBackground";
import {
  LandingRoot,
  HeroHeading,
  Subtitle,
  TagLine,
  TagDescription,
  ImageWrapper,
} from "./Landing.styles";

const Landing = () => {
  return (
    <LandingRoot>
      <FlowingBackground />
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", position: "relative", zIndex: 1, height: "100%" }}
      >
        <Stack justifyContent="center" spacing={4} sx={{ flex: 1, maxWidth: { md: 560 } }}>
          <Stack spacing={2}>
            <Subtitle>Hey, I&apos;m a</Subtitle>
            <HeroHeading>
              Creative <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
              <span className="highlight">Director</span>
            </HeroHeading>
          </Stack>

          <Stack spacing={1.5} sx={{ maxWidth: 380 }}>
            <TagLine>
              Great design should feel <span className="accent">invisible.</span>
            </TagLine>
            <TagDescription>
              From logo to language, I build brands that connect and convert.
            </TagDescription>
          </Stack>
        </Stack>

        <ImageWrapper>
          <img src={landingImage} alt="Portrait" loading="eager" />
        </ImageWrapper>
      </Stack>
    </LandingRoot>
  );
};

export default Landing;
