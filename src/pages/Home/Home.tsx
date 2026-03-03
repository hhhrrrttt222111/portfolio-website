import { Box } from "@mui/material";
import {
  Navbar,
  Landing,
  HeroSection,
  Services,
  TechStack,
  Projects,
  BlogPreview,
  Footer,
} from "../../components";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Landing />
      <HeroSection />
      <Services />
      <TechStack />
      <Projects />
      <BlogPreview />
      <Footer />
    </Box>
  );
};

export default Home;
