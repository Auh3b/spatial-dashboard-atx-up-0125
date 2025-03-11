import {
  Box,
  Checkbox,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { produce } from "immer";
import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLayers, updateLayer } from "../../../store/mapStore";
import useLayerConfig from "../../hooks/useLayerConfig";

export default function Legend() {
  const layers = useSelector((state) => getLayers(state));

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
          {layers &&
            Object.values(layers).map(({ id, ...rest }) => (
              <LegendItem key={id} id={id} {...rest} />
            ))}
        </Grid2>
      </Paper>
    </Box>
  );
}

function LegendItem({ id, name, legend: { visible } }) {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);

  const handleCheck = useCallback(
    (e) => {
      const value = produce(layer, (draft) => {
        draft.legend.visible = e.target.checked;
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer],
  );

  // const handleToggle = useCallback(() => {
  //   if (subs) {
  //     setOpen((prev) => !prev);
  //   }
  // }, [subs]);

  return (
    <Fragment>
      <Grid2
        container
        wrap="nowrap"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ my: 0.25 }}>
        <Grid2 container sx={{}}>
          {/* <Box
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
          </Box> */}
          <Typography sx={{ pl: 1 }} variant={parent ? "caption" : "subtitle2"}>
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
      {/* <Collapse in={open}> */}
      {/* <Grid2 container justifyContent={"end"}>
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
        </Grid2> */}
      {/* </Collapse> */}
    </Fragment>
  );
}
