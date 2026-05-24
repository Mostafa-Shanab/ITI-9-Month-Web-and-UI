import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MyAlert from "./MyAlert";

const Navbar = () => {
  return (
    <>
      <MyAlert />
      <Paper
        elevation={4}
        square // removes Paper's default border-radius
        component="nav"
        sx={{
          backgroundColor: "#d32f2f", // SpiderMan red
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography sx={{ fontSize: "24px" }}>🕷️</Typography>
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: 700, letterSpacing: "1px" }}
          >
            Shanab Spider
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* <Chip
            label="v2.0"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#d32f2f",
              fontWeight: 700,
              fontSize: "11px",
            }}
          /> */}
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
