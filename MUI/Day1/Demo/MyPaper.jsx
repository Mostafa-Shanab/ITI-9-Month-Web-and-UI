import { Divider , Typography } from "@mui/material";
import  Paper from "@mui/material/Paper";
import React from "react";

export default function MyPaper() {
  return (
    <div>
      <Paper elevation={3}>
        <Typography variant="h2">Card Title</Typography>
        <Typography variant="body1">Card desc</Typography>
      </Paper>

      <Divider sx={{ m: 2 }} />

      <Paper elevation={12}>
        <Typography variant="h2">Card Title</Typography>
        <Typography variant="body1">Card desc</Typography>
      </Paper>

      <Divider sx={{ m: 2 }} />

      <Paper elevation={24}>
        <Typography variant="h2">Card Title</Typography>
        <Typography variant="body1">Card desc</Typography>
      </Paper>

      <Divider sx={{ m: 2 }} />
    </div>
  );
}
