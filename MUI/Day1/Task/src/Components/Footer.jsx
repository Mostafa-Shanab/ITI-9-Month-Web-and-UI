import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0a0a0a",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ color: "#666" }}>
        © 2026 Shanab Spider — Built with Love By{" "}
        <b
          style={{
            color: "#fff",
            letterSpacing: "1px",
            fontWeight: 700,
            fontSize: "44px",
            verticalAlign: "middle",
          }}
        >
          SHANAB
        </b>{" "}
        using MUI
      </Typography>
    </Box>
  );
};

export default Footer;
