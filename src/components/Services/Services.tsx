import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Services = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">{/* Services content */}</Container>
    </Box>
  );
};

export default Services;
