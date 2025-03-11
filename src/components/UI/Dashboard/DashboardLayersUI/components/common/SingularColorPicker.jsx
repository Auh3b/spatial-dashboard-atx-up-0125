import { Box, Grid2, Paper, Popper, Typography } from "@mui/material";
import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import { deckColorToRgba } from "../../../../../../utils/colorUtils";

export default function SingularColorPicker({ onColorChange, value }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) =>
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  const open = Boolean(anchorEl);
  return (
    <>
      <Box>
        <Typography variant="caption">Color</Typography>
        <Grid2
          container
          alignItems={"center"}
          gap={2}
          sx={{
            px: 2,
            py: 1,
            "&:hover": {
              cursor: "pointer",
            },
            borderRadius: 0.5,
            border: (theme) => `${theme.palette.divider} 1px solid`,
          }}
          onClick={handleClick}>
          <Box sx={{ width: 10, height: 10, backgroundColor: value }} />
          <Typography variant="caption">{value}</Typography>
        </Grid2>
      </Box>
      <Popper
        id={crypto.randomUUID().toString()}
        open={open}
        anchorEl={anchorEl}
        placement="top">
        <Paper sx={{ position: "absolute", top: 32, p: 1 }}>
          <RgbaColorPicker
            value={deckColorToRgba(value)}
            onChange={onColorChange}
          />
        </Paper>
      </Popper>
    </>
  );
}
