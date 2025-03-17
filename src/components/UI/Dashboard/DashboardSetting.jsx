import {
  Box,
  FormControlLabel,
  Grid2,
  MenuItem,
  Select,
  Switch,
  Typography,
  useColorScheme,
} from "@mui/material";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATIC_LAYER_NAMES } from "../../../data/layerConfig";
import { getDarkMode, setDarkMode } from "../../../store/appStore";
import {
  getBasemapUrl,
  getFilteredData,
  getSelectedLayer,
  setBasemapUrl,
} from "../../../store/mapStore";
import AttributeWrapper from "../../common/AttributeWrapper";
import useLayerConfig from "../../hooks/useLayerConfig";
import LayerUI from "./DashboardLayersUI/LayerUI";
import ColorPicker from "./DashboardLayersUI/components/ColorPicker";
import StrokeChanger from "./DashboardLayersUI/components/StrokeChanger";

export default function DashboardSetting({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Box p={1}>
          <Grid2 container direction={"column"}>
            <DarkModeToggleSwitch />
            <BasemapChanger />
            <DrawLayerAttributes />
            <ResultsLayerAttributes />
          </Grid2>
        </Box>
      )}
    </Fragment>
  );
}

function DarkModeToggleSwitch() {
  const { setMode } = useColorScheme();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => getDarkMode(state));
  const label = darkMode ? "on" : "off";

  const handleToggle = useCallback(() => {
    dispatch(setDarkMode());
  }, [darkMode]);

  useEffect(() => {
    setMode(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AttributeWrapper title={"system"}>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        wrap="nowrap"
        gap={2}>
        <Grid2 size={6}>
          <Typography variant="caption">Dark Mode</Typography>
        </Grid2>
        <FormControlLabel
          control={
            <Switch size="small" onChange={handleToggle} checked={darkMode} />
          }
          label={
            <Typography sx={{ textTransform: "uppercase" }}>{label}</Typography>
          }
        />
      </Grid2>
    </AttributeWrapper>
  );
}

function BasemapChanger() {
  const dispatch = useDispatch();
  const basemapUrl = useSelector((state) => getBasemapUrl(state));
  const handleChange = (_e) => {
    dispatch(setBasemapUrl(_e.target.value));
  };
  return (
    <AttributeWrapper title={"Map"}>
      <Grid2
        container
        alignItems={"center"}
        wrap="nowrap"
        gap={2}
        justifyContent={"space-between"}>
        <Grid2 size={6}>
          <Typography variant="caption">Basemap</Typography>
        </Grid2>
        <Select
          size="small"
          value={basemapUrl}
          fullWidth
          onChange={handleChange}>
          <MenuItem value="satellite-streets-v11">Satellite Streets</MenuItem>
          <MenuItem value="light-v10">Light</MenuItem>
          <MenuItem value="dark-v10">Dark</MenuItem>
          <MenuItem value="satellite-v9">Satellite</MenuItem>
        </Select>
      </Grid2>
    </AttributeWrapper>
  );
}

function DrawLayerAttributes() {
  const id = STATIC_LAYER_NAMES.DRAWING_LAYER;
  const { layer } = useLayerConfig(id);
  return (
    <AttributeWrapper title={"Draw Layer"}>
      <ColorPicker id={id} type={layer.type} />
      <StrokeChanger
        wrapperProps={{ divider: false }}
        id={id}
        type={layer.type || ""}
      />
    </AttributeWrapper>
  );
}

function ResultsLayerAttributes() {
  const id = STATIC_LAYER_NAMES.OVERLAY_RESULTS_LAYER;
  const { layer } = useLayerConfig(id);
  const selectedLayer = useSelector((state) => getSelectedLayer(state));
  const filterData = useSelector((state) => getFilteredData(state));
  return (
    <Fragment>
      {selectedLayer && filterData && (
        <AttributeWrapper title={"Filtered Results Layer"}>
          <LayerUI {...layer} noHeader divider={false} />
        </AttributeWrapper>
      )}
    </Fragment>
  );
}
