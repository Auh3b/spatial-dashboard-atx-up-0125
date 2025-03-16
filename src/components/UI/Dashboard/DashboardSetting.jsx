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
import { getDarkMode, setDarkMode } from "../../../store/appStore";
import { getBasemapUrl, setBasemapUrl } from "../../../store/mapStore";

export default function DashboardSetting({ selected, index }) {
  return (
    <Fragment>
      {selected === index && (
        <Box p={2}>
          <Grid2 container direction={"column"} gap={2}>
            <DarkModeToggleSwitch />
            <BasemapChanger />
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
  );
}

function BasemapChanger() {
  const dispatch = useDispatch();
  const basemapUrl = useSelector((state) => getBasemapUrl(state));
  const handleChange = (_e) => {
    dispatch(setBasemapUrl(_e.target.value));
  };
  return (
    <Grid2
      container
      alignItems={"center"}
      wrap="nowrap"
      gap={2}
      justifyContent={"space-between"}>
      <Grid2 size={6}>
        <Typography variant="caption">Basemap</Typography>
      </Grid2>
      <Select size="small" value={basemapUrl} fullWidth onChange={handleChange}>
        <MenuItem value="satellite-streets-v11">Satellite Streets</MenuItem>
        <MenuItem value="light-v10">Light</MenuItem>
        <MenuItem value="dark-v10">Dark</MenuItem>
        <MenuItem value="satellite-v9">Satellite</MenuItem>
      </Select>
    </Grid2>
  );
}
