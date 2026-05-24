import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export default function MyCard() {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia component="img" src="spiderman.jpg"></CardMedia>
      <CardContent>
        <Typography variant="h6">Card Title</Typography>
        <Typography variant="body2">Card details here........</Typography>
        <Typography variant="body2">Card details here........</Typography>
        <Typography variant="body2">Card details here........</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Click</Button>
        <Button variant="contained" color="secondary">
          Click
        </Button>
      </CardActions>
    </Card>
  );
}
