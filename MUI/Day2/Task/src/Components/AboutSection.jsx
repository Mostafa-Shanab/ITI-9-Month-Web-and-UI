import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const AboutSection = () => {
  return (
    <Box sx={{ py: 6, px: 2, bgcolor: "#f0f4f8" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="./src/assets/foodBack.jpg"
          alt="About our restaurant"
          sx={{
            maxWidth: "500px",
            maxHeight: "300px",
            borderRadius: "8px",
            display: "block",
          }}
        />

        <Stack direction="column" spacing={2} sx={{ maxWidth: "500px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.8 }}
          >
            We are a family-owned restaurant dedicated to serving delicious,
            high-quality meals made from fresh, locally sourced ingredients. Our
            mission is to provide an unforgettable dining experience for every
            guest.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AboutSection;
