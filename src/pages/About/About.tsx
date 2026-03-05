import Box from "@mui/material/Box";
import {
  Navbar,
  Footer,
  AboutHero,
  EducationSection,
  ExperienceTimeline,
  PhilosophySection,
} from "@/components";

const About = () => {
  return (
    <Box>
      <Navbar />
      <AboutHero />
      <EducationSection />
      <ExperienceTimeline />
      <PhilosophySection />
      <Footer />
    </Box>
  );
};

export default About;
