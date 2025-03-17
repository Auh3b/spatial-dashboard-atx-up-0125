import { Grid2, TextField, Typography } from "@mui/material";
import React from "react";

export default function TextInput({ title, value, onChange }) {
  return (
    <Grid2
      my={1}
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
      wrap="nowrap">
      <Grid2 size={6}>
        <Typography variant="caption">{title}</Typography>
      </Grid2>
      <TextField size="small" value={value} onChange={onChange} />
    </Grid2>
  );
}
