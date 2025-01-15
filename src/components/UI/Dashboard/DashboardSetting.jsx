import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
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
    <FormControl>
      <FormLabel>Dark Mode</FormLabel>
      <FormControlLabel
        control={<Switch onChange={handleToggle} checked={darkMode} />}
        label={
          <Typography sx={{ textTransform: "uppercase" }}>{label}</Typography>
        }
      />
    </FormControl>
  );
}

function BasemapChanger() {
  const dispatch = useDispatch();
  const basemapUrl = useSelector((state) => getBasemapUrl(state));
  const handleChange = (_e) => {
    dispatch(setBasemapUrl(_e.target.value));
  };
  return (
    <FormControl>
      <FormLabel>Switch Basemap</FormLabel>
      <Select value={basemapUrl} fullWidth onChange={handleChange}>
        <MenuItem value="satellite-streets-v11">Satellite Streets</MenuItem>
        <MenuItem value="light-v10">Light</MenuItem>
        <MenuItem value="dark-v10">Dark</MenuItem>
        <MenuItem value="satellite-v9">Satellite</MenuItem>
      </Select>
    </FormControl>
  );
}
