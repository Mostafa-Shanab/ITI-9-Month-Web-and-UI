import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const boxStyle = {
  border: "1px solid black",
  py: 8,
};

const centerBox = {
  display: "flex",
  justifyContent: "center",
};

const autoLayoutBox = {
  bgcolor: "purple",
  width: 300,
  height: 320,
};
export default function MyGrid() {
  return (
    // <Grid container>
    //   {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
    //   {/* child */}
    //   <Grid item xs={12}>
    //     <Box sx={{ ...boxStyle, bgcolor: "red" }}>Header</Box>
    //   </Grid>
    //   {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
    //   <Grid item xs={12} sm={3}>
    //     <Box sx={{ ...boxStyle, bgcolor: "orange" }}>sidebar</Box>
    //   </Grid>
    //   {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
    //   <Grid item xs={12} sm={9}>
    //     <Box sx={{ ...boxStyle, bgcolor: "yellow" , height:400 }}>
    //       <Grid container>
    //         <Grid item xs={12}>
    //           <Box sx={{ ...boxStyle, bgcolor: "green" }}> content1</Box>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <Box sx={{ ...boxStyle, bgcolor: "green" }}> content2</Box>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <Box sx={{ ...boxStyle, bgcolor: "green" }}> content3</Box>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Grid>
    //   {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
    //   <Grid item xs={12}>
    //     <Box sx={{ ...boxStyle, bgcolor: "blue" }}>footer</Box>
    //   </Grid>
    //   {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
    // </Grid>

    <div>
      <Grid container>
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
        {/* child */}
        <Grid item xs={12}>
          <Box sx={{ ...boxStyle, bgcolor: "red" }}>Header</Box>
        </Grid>
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
        <Grid item xs={12} sm={3}>
          <Box sx={{ ...boxStyle, bgcolor: "orange" }}>sidebar</Box>
        </Grid>
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ ...boxStyle, bgcolor: "yellow" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
                <Box sx={{ ...autoLayoutBox }}></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
                <Box sx={{ ...autoLayoutBox }}></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
                <Box sx={{ ...autoLayoutBox }}></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
                <Box sx={{ ...autoLayoutBox }}></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
                <Box sx={{ ...autoLayoutBox }}></Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
        <Grid item xs={12}>
          <Box sx={{ ...boxStyle, bgcolor: "blue" }}>footer</Box>
        </Grid>
        {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
      </Grid>

      {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
      {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
      {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}
      {/* zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz */}

      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
          <Box sx={{ ...autoLayoutBox }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
          <Box sx={{ ...autoLayoutBox }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
          <Box sx={{ ...autoLayoutBox }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
          <Box sx={{ ...autoLayoutBox }}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ ...centerBox }}>
          <Box sx={{ ...autoLayoutBox }}></Box>
        </Grid>
      </Grid>
    </div>
  );
}
