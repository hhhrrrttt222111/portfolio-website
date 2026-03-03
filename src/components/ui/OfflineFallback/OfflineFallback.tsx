import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const OfflineFallback = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        textAlign: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WifiOffIcon sx={{ fontSize: 40, color: "text.secondary" }} />
      </Box>

      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          You&apos;re offline
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 400 }}>
          It looks like you&apos;ve lost your internet connection. Please check your network and try
          again.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OfflineFallback;
