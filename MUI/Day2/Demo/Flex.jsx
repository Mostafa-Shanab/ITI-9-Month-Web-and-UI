import { Box, Divider, Stack } from "@mui/material";
import React from "react";

export default function Flex() {
  return (
    <div>
      {/* stack -> flexbox helper for one direction (col / row) */}
      {/* main direction -> row
          justify-content -> row
          align-items / align-content -> col */}
      {/* <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="start">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack>
      <Divider sx={{ m: 2 }} />
      <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="center">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack>
      <Divider sx={{ m: 2 }} />
      <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="end">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack>
      <Divider sx={{ m: 2 }} />
      <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="space-between">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack>

      <Divider sx={{ m: 2 }} />
      <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="space-around">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack>

      <Divider sx={{ m: 2 }} />
      <Stack sx={{ bgcolor: "yellow" }} direction="row" justifyContent="space-evenly">
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
      </Stack> */}
      {/* <Stack
        sx={{ bgcolor: "yellow", height: 600 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>

      </Stack> */}

      {/* <Divider sx={{ m: 2 }} /> */}

      {/* <Stack
        sx={{ bgcolor: "yellow", height: 600 }}
        direction="row"
        justifyContent="center"
        alignContent="center"
        flexWrap="wrap"
      >
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "red" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 100, height: 100, bgcolor: "green" }}></Box>

      </Stack> */}

      <Stack
        direction="row"
        justifyContent="center"
        alignContent="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box sx={{ width: 300, height: 350, bgcolor: "red" }}></Box>
        <Box sx={{ width: 300, height: 350, bgcolor: "blue" }}></Box>
        <Box sx={{ width: 300, height: 350, bgcolor: "pink" }}></Box>
        <Box sx={{ width: 300, height: 350, bgcolor: "green" }}></Box>
        <Box sx={{ width: 300, height: 350, bgcolor: "blue" }}></Box>

      </Stack>
    </div>
  );
}
