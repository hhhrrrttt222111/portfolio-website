import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const TechStack = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">{/* TechStack content */}</Container>
    </Box>
  );
};

export default TechStack;
