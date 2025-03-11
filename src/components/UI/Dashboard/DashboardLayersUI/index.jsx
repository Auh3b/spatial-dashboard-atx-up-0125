import { Box, Button, Divider } from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers, getSelectedLayer } from "../../../../store/mapStore";
import LayerUI from "./LayerUI";
import AddLayerModel from "./components/AddLayerModel";

export default function DashboardLayersUI({ selected, index }) {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(() => Object.values(_layers), [_layers]);
  const selectedLayer = useSelector((state) => getSelectedLayer(state));
  return (
    <Fragment>
      {selected === index && (
        <Box>
          <AddLayerButton />
          <Divider />
          {Boolean(layers.length) &&
            layers.map((d) => (
              <LayerUI key={d.id} {...d} selected={selectedLayer} />
            ))}
        </Box>
      )}
    </Fragment>
  );
}

function AddLayerButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ p: 1 }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        size="small"
        sx={{ display: "block", ml: "auto" }}>
        Add Layer
      </Button>
      <AddLayerModel open={open} onClose={handleClose} />
    </Box>
  );
}
