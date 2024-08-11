import React, { useState } from "react";
import { Slider, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
 
const CreditScoreSlider = styled(Slider)(({ theme }) => ({
  color: "#e0e0e0",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    opacity: 0,
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#4caf50",
    border: "2px solid #4caf50",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#4caf50",
    color: "#fff",
    transformOrigin: "bottom",
    transform: "translate(-50%, -100%)",
    "&:before": { display: "none" },
    "& > *": {
      transform: "rotate(0deg)",
    },
  },
}));
 
const CustomSlider = ({onRangeChange}) => {
  const [value, setValue] = useState(720);
 
  const MIN = 600;
  const MAX = 850;
  const STEP = 19;
 
  const marks = Array.from(
    { length: Math.floor((MAX - MIN) / STEP) + 1 },
    (_, index) => ({
      value: MIN + index * STEP,
      label: "",
    })
  );
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const rangeMin=newValue
    const rangeMax=Math.min(newValue + 19, MAX);
    onRangeChange(rangeMin,rangeMax)
  };
 
  const rangeStart = value;
  const rangeEnd = Math.min(value + 19, MAX);
 
  return (
    <Box sx={{ width: 300, margin: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Credit score range
      </Typography>
      <CreditScoreSlider
        value={value}
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={null}
        marks={marks}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2">{MIN}</Typography>
        <Typography variant="body2">{MAX}</Typography>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {`${rangeStart} - ${rangeEnd}`}
      </Typography>
    </Box>
  );
};
 
export default CustomSlider;