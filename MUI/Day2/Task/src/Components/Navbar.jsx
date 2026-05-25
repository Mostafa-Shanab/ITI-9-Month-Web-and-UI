import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "0 16px", md: "16px" },
          backgroundColor: "#212429",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Shanab Restaurant
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {["Home", "Menu", "About", "Contact"].map((link) => (
            <Typography
              key={link}
              sx={{
                color: "white",
                cursor: "pointer",
                "&:hover": { color: "#90caf9" },
              }}
            >
              {link}
            </Typography>
          ))}
        </Stack>
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          ☰{/* <MenuIcon /> */}
        </IconButton>
      </Stack>
    </>
  );
};

export default Navbar;
