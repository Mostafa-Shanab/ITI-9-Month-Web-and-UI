import { Divider, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";

export default function MyTextField() {
  return (
    <div>
      {/* variant ->  filled - outlined - standard
          error
          helperText

           InputProps
            startAdornment
            endAdornment
                <InputAdornment
                    <Icon />
                </InputAdornment>
      */}
      <TextField label="filled" variant="filled" />
      <TextField label="outlined" variant="outlined" />
      <TextField label="standard" variant="standard" fullWidth />

      <Divider sx={{ m: 2 }} />

      <TextField label="password" type="password" />
      <label>
        date
        <TextField type="date" />{" "}
      </label>

      <TextField type="color" />

      <Divider sx={{ m: 2 }} />

      <TextField label="username" />
      <Divider sx={{ m: 2 }} />
      <TextField
        label="username"
        variant="filled"
        error
        helperText="username must not start with numbers"
      />
      <TextField
        label="username"
        variant="outlined"
        error
        helperText="username must not start with numbers"
      />
      <TextField
        label="username"
        variant="standard"
        error
        helperText="username must not start with numbers"
      />

      <Divider sx={{ m: 2 }} />

      <TextField
        variant="outlined"
        label="search"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ m: 2 }} />

      <TextField
        variant="outlined"
        label="search"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ m: 2 }} />

      <TextField
        variant="filled"
        label="search"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon sx={{ mt: 2 }} />
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ m: 2 }} />

      <TextField select label="choose your country" sx={{ width: 200 }}>
        <option value="egypt">egypt</option>
        <option value="ksa">ksa</option>
      </TextField>

      <Divider sx={{ m: 2 }} />

      <TextField label="description" multiline rows={3} />
    </div>
  );
}
