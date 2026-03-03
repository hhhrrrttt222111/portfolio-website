import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">{/* HeroSection content */}</Container>
    </Box>
  );
};

export default HeroSection;
