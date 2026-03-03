import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const BlogPreview = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">{/* BlogPreview content */}</Container>
    </Box>
  );
};

export default BlogPreview;
