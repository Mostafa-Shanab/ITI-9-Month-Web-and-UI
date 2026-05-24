import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const FeaturesSection = ({ features }) => {
  return (
    <Paper
      elevation={24}
      sx={{
        backgroundColor: "#0075fe",
        padding: "32px 24px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: "24px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {features.map((feature) => (
          <Box
            key={feature.id}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              py: 2,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: 700, marginBottom: "6px" }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.85)" }}
            >
              {feature.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default FeaturesSection;
