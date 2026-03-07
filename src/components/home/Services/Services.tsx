import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Services = () => {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        py: { xs: 8, md: 12 },
        bgcolor:
          theme.palette.mode === "dark" ? "rgba(10, 26, 15, 0.4)" : "rgba(241, 248, 233, 0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      })}
    >
      <Container maxWidth="lg">{/* Services content */}</Container>
    </Box>
  );
};

export default Services;
