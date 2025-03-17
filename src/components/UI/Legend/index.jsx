import {
  Box,
  Checkbox,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { produce } from "immer";
import React, { Fragment, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLayers, updateLayer } from "../../../store/mapStore";
import useLayerConfig from "../../hooks/useLayerConfig";

export default function Legend() {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(() => {
    const output = {};
    for (let layerId in _layers) {
      if (_layers[layerId]?.showInLegend) {
        output[layerId] = _layers[layerId];
      }
    }
    return output;
  }, [_layers]);

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

  return (
    <Fragment>
      <Grid2
        container
        wrap="nowrap"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ my: 0.25 }}>
        <Grid2 container sx={{}}>
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
    </Fragment>
  );
}
