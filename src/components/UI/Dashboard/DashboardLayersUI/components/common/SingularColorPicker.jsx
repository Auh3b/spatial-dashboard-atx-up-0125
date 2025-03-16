import {
  Box,
  ClickAwayListener,
  Grid2,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import {
  deckColorToRgba,
  deckColorToRgbaString,
} from "../../../../../../utils/colorUtils";

export default function SingularColorPicker({ onColorChange, value }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) =>
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  console.log(value, deckColorToRgba(value));
  return (
    <>
      <Box>
        <Grid2 container alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="caption">Color</Typography>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: deckColorToRgbaString(value),
              "&:hover": {
                cursor: "pointer",
              },
              borderRadius: 0.5,
              border: (theme) => `${theme.palette.divider} 1px solid`,
            }}
            onClick={handleClick}
          />
        </Grid2>
      </Box>
      <Popper
        id={crypto.randomUUID().toString()}
        open={open}
        anchorEl={anchorEl}
        placement="bottom">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ p: 0.5, m: 0.5 }}>
            <RgbaColorPicker
              color={deckColorToRgba(value)}
              onChange={onColorChange}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
