import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const CustomRadioComponent = ({ label, value, onChange, options }) => {
    
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
      row
       aria-labelledby="demo-controlled-radio-buttons-group"
       name="controlled-radio-buttons-group"
       value={value}
       onChange={onChange}
      >
        {Object.entries(options).map(([key, value]) => (
          <FormControlLabel 
            key={key} 
            value={value} 
            control={<Radio sx={{ '&.Mui-checked': { color: "#449d48" } }} />}

            label={key} 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioComponent;
