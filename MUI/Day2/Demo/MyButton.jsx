import { Button, ButtonGroup, CircularProgress, Divider } from "@mui/material";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import YouTubeIcon from "@mui/icons-material/YouTube";
import React from "react";

export default function MyButton() {
  return (
    <div>
      {/* 
            variant
            color
            size
            startIcon={< />}
            endIcon={< />}
        */}
      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>

      <Divider sx={{ m: 2 }} />

      <Button variant="contained" color="primary">
        primary
      </Button>
      <Button variant="contained" color="error">
        error
      </Button>
      <Button variant="contained" color="secondary">
        secondary
      </Button>
      <Button variant="contained" color="success">
        success
      </Button>
      <Button variant="contained" color="warning">
        warning
      </Button>

      <Divider sx={{ m: 2 }} />

      <Button variant="contained" size="small">
        small
      </Button>
      <Button variant="contained" size="medium">
        medium
      </Button>
      <Button variant="contained" size="large">
        large
      </Button>

      <Divider sx={{ m: 2 }} />

      {/* button icons */}
      {/* npm install @mui/icons-material @mui/material @emotion/styled @emotion/react */}
      <Button variant="outlined" startIcon={<AccessAlarmOutlinedIcon />}>
        start icon
      </Button>

      <Divider sx={{ m: 2 }} />

      <Button variant="contained" color="error" endIcon={<DeleteIcon />}>
        Delete
      </Button>

      <Divider sx={{ m: 2 }} />

      {/* pagination */}

      <ButtonGroup variant="contained" color="secondary">
        <Button startIcon={<ArrowBackIosIcon />}>Back</Button>
        <Button variant="outlined">1</Button>
        <Button variant="outlined">2</Button>
        <Button variant="outlined">3</Button>
        <Button endIcon={<NavigateNextIcon />}>next</Button>
      </ButtonGroup>

      <Divider sx={{ m: 2 }} />

      <Button variant="outlined" startIcon={<CircularProgress />} disabled>
        Loading...
      </Button>
      <Divider sx={{ m: 2 }} />

      <Button
        component="a"
        variant="outlined"
        color="error"
        endIcon={<YouTubeIcon />}
        href="https://www.youtube.com/"
        target="_blank"
      >
        Go to youtube
      </Button>
    </div>
  );
}
