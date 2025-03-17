import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

export default function ValueSelector({
  disabled = false,
  label = undefined,
  options = [],
  value = "",
  onChange = undefined,
}) {
  return (
    <FormControl fullWidth>
      <Typography variant="caption">{label}</Typography>
      <Select
        size="small"
        disabled={disabled}
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
