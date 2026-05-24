import Alert from "@mui/material/Alert";

const MyAlert = () => {
  return (
    <Alert
      severity="info"
      sx={{
        borderRadius: 0, // No rounded corners
        backgroundColor: "#1565c0",
        color: "#fff",
        justifyContent: "center",
        "& .MuiAlert-icon": { color: "#fff" }, // Override the default icon color
      }}
    >
      🕸️ Shanab Spider v2.0 is now live — new hero animations &amp; dark themes
      available!
    </Alert>
  );
};

export default MyAlert;
