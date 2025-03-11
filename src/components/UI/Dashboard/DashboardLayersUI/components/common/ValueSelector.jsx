import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function ValueSelector({
  disabled = false,
  options,
  value,
  onChange,
}) {
  return (
    <FormControl fullWidth size="small">
      <Select
        disabled={disabled}
        size="small"
        onChange={onChange}
        value={value}>
        <MenuItem value={""}>Select Option</MenuItem>
        {options.map(({ label, option }) => (
          <MenuItem key={label} value={option}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
