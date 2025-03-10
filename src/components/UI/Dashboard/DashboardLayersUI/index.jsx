import { Box } from "@mui/material";
import React, { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { getLayers, getSelectedLayer } from "../../../../store/mapStore";
import LayerUI from "./LayerUI";

export default function DashboardLayersUI({ selected, index }) {
  const _layers = useSelector((state) => getLayers(state));
  const layers = useMemo(() => Object.values(_layers), [_layers]);
  const selectedLayer = useSelector((state) => getSelectedLayer(state));
  return (
    <Fragment>
      {selected === index && (
        <Box>
          {Boolean(layers.length) &&
            layers.map((d) => (
              <LayerUI key={d.id} {...d} selected={selectedLayer} />
            ))}
        </Box>
      )}
    </Fragment>
  );
}
