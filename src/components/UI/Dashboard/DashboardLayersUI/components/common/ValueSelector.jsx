import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function ValueSelector({ options, value, onChange }) {
  return (
    <FormControl fullWidth size="small">
      <Select size="small" onChange={onChange} value={value}>
        {options.map(({ label, option }) => (
          <MenuItem key={label} value={option}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
