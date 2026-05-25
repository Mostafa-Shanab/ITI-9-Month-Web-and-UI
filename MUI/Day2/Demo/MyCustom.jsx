import { Button, Divider, TextField } from "@mui/material";
import React from "react";

export default function MyCustom() {
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          bgcolor: "black",
          color: "red",
          borderRadius: 3,
          "&:hover": {
            bgcolor: "red",
            color: "black",
          },
        }}
      >
        custom button
      </Button>

      <Divider sx={{ m: 2 }} />

      <TextField
        label="custom input"
        sx={{
          mt: 3,
          "& .MuiOutlinedInput-root": {
            "&fieldset": {
              borderColor: "red",
            },
            "&:hover fieldset": {
                borderColor: "red"
            }
          },
        }}
      />
    </div>
  );
}
