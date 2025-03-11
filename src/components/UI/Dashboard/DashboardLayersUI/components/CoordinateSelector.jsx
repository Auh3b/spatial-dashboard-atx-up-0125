import { Box, Grid2, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
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

export default function CoordinateSelector({ id, type, sourceType, source }) {
  const dispatch = useDispatch();
  const isAllowed = useAllowedAttributes(type, attributeId);

  const { layer } = useLayerConfig(id);

  const handleChange = useCallback(
    (attr) => {
      return (e) => {
        const value = produce(layer, (draft) => {
          draft.legend[attr] = e.target.value;
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
    if (source) return source.schema.map((d) => ({ label: d, option: d }));
    return [];
  }, [source]);

  const isGeojson = sourceType === "geojson";

  return (
    <>
      {isAllowed && !isGeojson && (
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
                    disabled={
                      option !== "coordinate" && layer.legend["coordinate"]
                    }
                    value={layer.legend[option]}
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
