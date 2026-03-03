import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        backdropFilter: "none",
        borderBottom: "none",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4, lg: 12 } }}>
        <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700 }}>
          Portfolio
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
