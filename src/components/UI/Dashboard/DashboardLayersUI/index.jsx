import { Box, Button, Divider } from "@mui/material";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLayers,
  getSelectedLayer,
  removeSelectedLayer,
  setSelectedLayer,
} from "../../../../store/mapStore";
import LayerUI from "./LayerUI";
import AddLayerModal from "./components/AddLayerModal";

export default function DashboardLayersUI({ selected, index }) {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(
    () => Object.values(_layers).filter((d) => !d?.system),
    [_layers],
  );
  const selectedLayer = useSelector((state) => getSelectedLayer(state));
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (id) => {
      return () => {
        if (selectedLayer !== id) {
          dispatch(setSelectedLayer(id));
          return;
        }
        dispatch(removeSelectedLayer());
        // dispatch(removeFilteredData());
        // dispatch(setDrawingProps(null));
      };
    },
    [selectedLayer],
  );

  const handleDelete = (id) => {
    return () => dispatch(removeLayer({ id }));
  };

  return (
    <Fragment>
      {selected === index && (
        <Box>
          <AddLayerButton />
          <Divider />
          {Boolean(layers.length) &&
            layers.map((d) => (
              <LayerUI
                key={d.id}
                {...d}
                selected={selectedLayer}
                onDelete={handleDelete(d.id)}
                onClick={handleClick(d.id)}
              />
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
      <AddLayerModal open={open} onClose={handleClose} />
    </Box>
  );
}
