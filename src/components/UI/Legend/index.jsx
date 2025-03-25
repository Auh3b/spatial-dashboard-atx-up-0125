import {
  Box,
  Checkbox,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { produce } from "immer";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLayers, updateLayer } from "../../../store/mapStore";
import useLayerConfig from "../../hooks/useLayerConfig";
import { LayersOutlined, LayersTwoTone } from "@mui/icons-material";

export default function Legend() {
  const [ancholEl, setAncholEl] = useState(null);
  const open = Boolean(ancholEl);
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

  const handleOpen = (e) =>
    setAncholEl((prev) => (prev ? null : e.currentTarget));

  return (
    <Fragment>
      <Box
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          zIndex: (theme) => theme.zIndex.modal,
        }}
      >
        <Paper>
          <IconButton onClick={handleOpen} color='primary'>
            {open ? <LayersTwoTone /> : <LayersOutlined />}
          </IconButton>
        </Paper>
      </Box>
      <Popper
        anchorEl={ancholEl}
        open={open}
        placement='left-end'
        sx={{ zIndex: (theme) => theme.zIndex.modal }}
        modifiers={[{ name: "arrow", enabled: true }]}
      >
        <Paper sx={{ minWidth: 200, pb: 1, mr: 2 }}>
          <Grid2 container direction={"column"}>
            <Typography variant='overline' sx={{ px: 2 }}>
              Legend
            </Typography>
            <Divider flexItem sx={{ mb: 1 }} />
            {layers &&
              Object.values(layers).map(({ id, ...rest }) => (
                <LegendItem key={id} id={id} {...rest} />
              ))}
          </Grid2>
        </Paper>
      </Popper>
    </Fragment>
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
    [layer]
  );

  return (
    <Fragment>
      <Grid2
        container
        wrap='nowrap'
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ my: 0.25 }}
      >
        <Grid2 container sx={{}}>
          <Typography sx={{ pl: 1 }} variant={parent ? "caption" : "subtitle2"}>
            {name}
          </Typography>
        </Grid2>
        <Checkbox
          disableRipple
          size='small'
          checked={visible}
          onChange={handleCheck}
          sx={{ py: 0, placeSelf: "flex-end" }}
        />
      </Grid2>
    </Fragment>
  );
}
