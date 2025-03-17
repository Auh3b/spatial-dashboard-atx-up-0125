import * as icons from "@mui/icons-material";
import { Autocomplete, Grid2, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ATTRIBUTES } from "../../../../../data/layerConfig";
import { updateLayer } from "../../../../../store/mapStore";
import {
  iconToDataUrl,
  seperateCamelCase,
} from "../../../../../utils/axillaryUtils";
import AttributeWrapper from "../../../../common/AttributeWrapper";
import NumberInput from "../../../../common/NumberInput";
import TextInput from "../../../../common/TextInput";
import useLayerConfig from "../../../../hooks/useLayerConfig";
import useAllowedAttributes from "../hooks/useAllowedAttributes";

const attributeId = ATTRIBUTES.ICON;
export default function IconAttrChanger({ id, type }) {
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
  const handleSizeChange = useCallback(
    (size) => {
      const value = produce(layer, (draft) => {
        draft.legend.size = size;
      });
      dispatch(
        updateLayer({
          id,
          value,
        }),
      );
    },
    [layer, id],
  );

  const handleIconPresetChange = useCallback(
    (_e, presetAttr) => {
      const preset = iconToDataUrl(presetAttr.icon);
      const value = produce(layer, (draft) => {
        draft.legend.iconPreset = preset;
      });
      dispatch(updateLayer({ id, value }));
    },
    [layer, id],
  );

  return (
    <>
      {isAllowed && (
        <AttributeWrapper title={attributeId}>
          <TextInput
            title={"Icon"}
            value={layer.legend.icon || ""}
            onChange={handleChange("icon")}
          />
          <NumberInput
            title={"Icon Size"}
            min={5}
            step={10}
            max={Infinity}
            labelFormat=".0f"
            value={layer.legend.size || 5}
            onChange={handleSizeChange}
          />
          <IconSelector
            value={layer.legend.iconPreset || ""}
            onChange={handleIconPresetChange}
          />
          {/* <TextInput
            title={"Icon Atlas"}
            value={layer.legend.iconAtlas || ""}
            onChange={handleChange("iconAtlas")}
          />
          <TextInput
            title={"Icon Mapping"}
            value={layer.legend.iconMapping || ""}
            onChange={handleChange("iconMapping")}
          /> */}
        </AttributeWrapper>
      )}
    </>
  );
}

const iconOptions = Object.entries(icons)
  .filter(
    ([id]) => id.search(/.*(Filled|Outlined|Sharp|TwoTone|Rounded)$/gm) === -1,
  )
  .map(([value, icon]) => ({
    value,
    icon,
    label: seperateCamelCase(value),
  }));

function IconSelector({ value, onChange }) {
  return (
    <Autocomplete
      id="icon-selector"
      getOptionLabel={(option) => option.label}
      size="small"
      options={iconOptions}
      onChange={onChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Grid2 container gap={2} alignItems={"center"}>
            {<option.icon size={"small"} />}{" "}
            <Typography variant="caption">{option.label}</Typography>
          </Grid2>
        </li>
      )}
      renderInput={(params) => {
        return <TextField {...params} label="Icons" />;
      }}
    />
  );
}
