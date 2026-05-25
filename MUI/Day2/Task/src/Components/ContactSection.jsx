import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ContactSection = () => {
  return (
    <Box sx={{ py: 6, px: 2, bgcolor: "#fafafa" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Contact Us
      </Typography>

      <Stack spacing={3}>
        <TextField label="Name" variant="outlined" fullWidth />

        <TextField label="Email" variant="outlined" type="email" fullWidth />

        <TextField
          select
          label="Subject"
          variant="outlined"
          fullWidth
          defaultValue=""
        >
          <MenuItem value="" disabled>
            Select a subject
          </MenuItem>
          <MenuItem value="reservation">Make a Reservation</MenuItem>
          <MenuItem value="feedback">Give Feedback</MenuItem>
          <MenuItem value="inquiry">General Inquiry</MenuItem>
          <MenuItem value="complaint">File a Complaint</MenuItem>
        </TextField>

        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={5}
          fullWidth
        />

        <Button
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            alignSelf: "flex-start",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactSection;
