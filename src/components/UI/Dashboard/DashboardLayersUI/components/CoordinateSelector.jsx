import { Box, Grid2, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";
import AttributeWrapper from "./common/AttributeWrapper";
import ValueSelector from "./common/ValueSelector";

const attributeId = ATTRIBUTES.COORDINATES;

const coordinateItems = [
  {
    label: "Coordinate",
    option: "coordinate",
  },
  {
    label: "Latitude",
    option: "latitude",
  },
  {
    label: "Longitude",
    option: "longitude",
  },
];

export default function CoordinateSelector({ id, type }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);
  const datasources = useSelector((state) => state.app.data);

  const { layer } = useLayerConfig(id);

  const handleChange = useCallback(
    (attr) => {
      return (e) => {
        console.log(layer);
        const value = produce(layer, (draft) => {
          if (attr === "latitude") {
            draft.legend.latitude = e.target.value;
          }

          if (attr === "longitude") {
            draft.legend.longitude = e.target.value;
          }

          if (attr === "coordinate") {
            draft.legend.coordinate = e.target.value;
          }
        });
        dispatch(
          updateLayer({
            id,
            value,
          }),
        );
      };
    },
    [layer, id],
  );

  const options = useMemo(() => {
    if (datasources[id])
      return datasources[id].schema.map((d) => ({ label: d, option: d }));
    return [];
  }, [datasources]);

  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <Box>
            {coordinateItems.map(({ label, option }) => (
              <Grid2
                key={label}
                container
                gap={2}
                alignItems={"center"}
                sx={{ my: 0.5 }}
                wrap="nowrap">
                <Grid2 size={6}>
                  <Typography variant="caption">{label}</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <ValueSelector
                    options={options}
                    onChange={handleChange(option)}
                  />
                </Grid2>
              </Grid2>
            ))}
          </Box>
        </AttributeWrapper>
      )}
    </>
  );
}
