import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Dropdown = ({ label, value, onChange, options, fullWidth = true }) => {
    return (
        <FormControl  sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
