import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(./src/assets/foodBack.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.45)",
        }}
      />

      <Stack
        direction="column"
        spacing={2}
        sx={{ zIndex: 1, textAlign: "center", px: 2 }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Welcome to Our Restaurant
        </Typography>

        <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
          Delicious food served with love
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "4px",
            }}
          >
            View Menu
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection;
