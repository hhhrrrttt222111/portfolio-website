import { Box } from "@mui/material";
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

const Home = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default Home;
