import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = ({ label, value, onChange, options, fullWidth = true }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
       
        {
            Object.entries(options).map(([key,value])=>(
                <MenuItem key={key} value={value}>
                {key}
              </MenuItem> 
            ))
        }
      </Select>
    </FormControl>
  );
};

export default Dropdown;
