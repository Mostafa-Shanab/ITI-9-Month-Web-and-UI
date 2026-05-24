// import { Typography } from '@mui/material'
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function MyTypography() {
  return (
    <div>
      {/* 
            component  -> actual HTML render Tag
            variant    -> visual style
            align
            color
            noWrap
        */}
      <Typography component="h1" variant="h2">
        Heading
      </Typography>

      <Typography component="h3" variant="h3" align="center" color="secondary">
        center text
      </Typography>

      {/* text types  */}

      <Typography variant="body1">normal paragraph</Typography>
      <Typography variant="body2">lighter text</Typography>
      <Typography variant="body2">lighter text</Typography>
      <Typography variant="body2">lighter text</Typography>
      <Typography variant="caption">small caption</Typography>
      <Typography variant="caption">small caption</Typography>
      <Typography variant="caption">small caption</Typography>

      <Divider />

      {/* links */}

      <Typography component="a" href="https://www.youtube.com/" target="_blank">
        {" "}
        Go to youtube
      </Typography>

      <Divider />

      {/* inline */}

      <Typography component="span" color="primary">
        Inline text
      </Typography>
      <Typography component="span" color="error">
        Inline text
      </Typography>
      <Typography component="span" color="secondary">
        Inline text
      </Typography>

      <Divider />

      <Typography noWrap sx={{width:200}}>
        this is a very long text Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aut, iure eveniet est rerum ducimus corporis ad
        possimus voluptatem dolore nisi voluptates ea, tempore delectus nam
        praesentium molestias temporibus ipsum placeat!
      </Typography>
    </div>
  );
}
