import React from "react";
import { Box } from "@mui/material";

export default function MyBox() {
  return (
    <div>
      {/* box -> div with superpowers (sx styling) */}
      {/* <Box
        sx={{
          width: 200,
          height: 200,
          bgcolor: "red",
          color: "white",
          p: 2,
          m: 2,
          borderRadius:4
        }}
      >
        hello iam box
      </Box> */}

      <Box
        sx={{
          width: { xs: "100%", sm: "75%", md: "50%", lg: "25%" },
          height: { xs: 600, sm: 500, md: 400, lg: 300 },
          bgcolor: {xs: "blue" , sm:"red" , md:"yellow" , lg:"green"},
        }}
      >
        Responsive Box
      </Box>
    </div>
  );
}
