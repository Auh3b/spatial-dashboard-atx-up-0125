import {
  Box,
  Divider,
  Grid2,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  Collapse,
} from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLegend, updateLegend } from "../../../store/mapStore";
import { ChevronRight, KeyboardArrowDown } from "@mui/icons-material";

export default function Legend() {
  const dispatch = useDispatch();
  const legend = useSelector((state) => getLegend(state));
  const handleCheck = useCallback(
    ({ id, parent, visible }) => {
      dispatch(updateLegend({ id, value: { id, parent, visible } }));
    },
    [legend],
  );
  console.log(legend);
  return (
    <Box
      sx={{
        position: "absolute",
        right: 16,
        bottom: 16,
        zIndex: (theme) => theme.zIndex.modal,
      }}>
      <Paper sx={{ minWidth: 200, pb: 1 }}>
        <Grid2 container direction={"column"}>
          <Typography variant="overline" sx={{ px: 2 }}>
            Legend
          </Typography>
          <Divider flexItem sx={{ mb: 1 }} />
          {legend &&
            Object.values(legend).map(({ id, ...rest }) => (
              <LegendItem
                key={id}
                id={id}
                {...rest}
                checked={false}
                onCheck={handleCheck}
              />
            ))}
        </Grid2>
      </Paper>
    </Box>
  );
}

function LegendItem({
  id,
  name,
  visible,
  onCheck,
  subs = undefined,
  parent = undefined,
}) {
  const [open, setOpen] = useState(false);

  const handleCheck = useCallback(
    (e) => {
      onCheck({ id, parent, visible: e.target.checked });
    },
    [parent, id],
  );

  const handleToggle = useCallback(() => {
    if (subs) {
      setOpen((prev) => !prev);
    }
  }, [subs]);

  return (
    <Fragment>
      <Grid2
        container
        wrap="nowrap"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ my: 0.25 }}>
        <Grid2 container sx={{}}>
          <Box
            sx={{
              mx: !subs && !parent ? 0.5 : "unset",
              minWidth: !subs && !parent ? 24 : "unset",
              minWheight: !subs && !parent ? 24 : "unset",
            }}>
            {subs && (
              <IconButton
                disableRipple
                onClick={handleToggle}
                sx={{
                  py: 0,
                }}
                size="small">
                {open ? <KeyboardArrowDown /> : <ChevronRight />}
              </IconButton>
            )}
          </Box>
          <Typography variant={parent ? "caption" : "subtitle2"}>
            {name}
          </Typography>
        </Grid2>
        <Checkbox
          disableRipple
          size="small"
          checked={visible}
          onChange={handleCheck}
          sx={{ py: 0, placeSelf: "flex-end" }}
        />
      </Grid2>
      <Collapse in={open}>
        <Grid2 container justifyContent={"end"}>
          {subs && <Divider flexItem orientation="vertical" sx={{ px: 1 }} />}
          {subs && (
            <Box flexGrow={1} pl={2}>
              {Object.values(subs).map((value) => (
                <LegendItem
                  key={value.id}
                  {...value}
                  parent={id}
                  onCheck={onCheck}
                />
              ))}
            </Box>
          )}
        </Grid2>
      </Collapse>
    </Fragment>
  );
}
