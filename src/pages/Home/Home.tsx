import {
  Navbar,
  HeroSection,
  Services,
  TechStack,
  Projects,
  BlogPreview,
  Footer,
  CursorFollower,
} from "../../components";

const Home = () => {
  return (
    <>
      <CursorFollower />
      <Navbar />
      <HeroSection />
      <Services />
      <TechStack />
      <Projects />
      <BlogPreview />
      <Footer />
    </>
  );
};

export default Home;
