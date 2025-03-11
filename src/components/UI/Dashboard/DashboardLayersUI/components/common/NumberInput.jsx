import { Grid2, TextField, Typography } from "@mui/material";
import React from "react";

export default function NumberInput({ title, value, onChange }) {
  return (
    <Grid2 container alignItems={"center"} gap={1} wrap="nowrap" sx={{ my: 1 }}>
      <Grid2 size={12}>
        <Typography variant="caption">{title}</Typography>
      </Grid2>
      <TextField type="number" size="small" value={value} onChange={onChange} />
    </Grid2>
  );
}
