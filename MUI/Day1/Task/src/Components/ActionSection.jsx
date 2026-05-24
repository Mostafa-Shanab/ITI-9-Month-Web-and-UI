import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ActionSection = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e91e8c 0%, #673ab7 100%)",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          marginBottom: "28px",
          fontSize: { xs: "1.6rem", md: "2.2rem" },
        }}
      >
        Ready to build something awesome?
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#111",
          color: "#fff",
          fontWeight: 700,
          paddingX: "36px",
          paddingY: "14px",
          fontSize: "16px",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        JOIN NOW
      </Button>
    </Box>
  );
};

export default ActionSection;
