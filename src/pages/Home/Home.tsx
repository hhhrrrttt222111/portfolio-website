import { useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Navbar,
  Landing,
  HeroSection,
  WhatIDo,
  Services,
  TechStack,
  Projects,
  BlogPreview,
  Contact,
  Footer,
} from "@/components";
import { NetworkVisualization } from "@/components/visualization";

const PageContainer = styled(Box)({
  position: "relative",
  width: "100%",
});

const ContentWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  zIndex: 1,
});

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <PageContainer ref={pageRef} className="page">
      <NetworkVisualization triggerRef={pageRef} />

      <ContentWrapper>
        <Navbar />
        <Landing />
        <HeroSection />
        <WhatIDo />
        <Services />
        <TechStack />
        <Projects />
        <BlogPreview />
        <Contact />
        <Footer />
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;
