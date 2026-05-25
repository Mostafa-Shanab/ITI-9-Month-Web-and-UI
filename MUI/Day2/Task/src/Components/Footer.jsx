import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a1a1a", py: 3, px: 2 }}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          © 2025 Shanab Restaurant. All rights reserved. Made By Shanab
        </Typography>

        <Stack direction="row" spacing={2}>
          {["Facebook", "Twitter", "Instagram"].map((social) => (
            <Typography
              key={social}
              variant="body2"
              sx={{
                color: "#90caf9",
                cursor: "pointer",
                "&:hover": { color: "white" },
              }}
            >
              {social}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
