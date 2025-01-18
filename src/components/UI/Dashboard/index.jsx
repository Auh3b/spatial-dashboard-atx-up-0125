import { Grid2 } from "@mui/material";
import React from "react";
import DashboardPanel from "./DashboardPanel";
import MapWrapper from "../../MapWrapper";
import useGeoWorker from "../../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../../workers/geoWorker/methods/methodUtils";
import useCompareEffect from "../../hooks/useCompareEffect";
import { dequal } from "dequal";
import { useDispatch } from "react-redux";
import { setBatchData } from "../../../store/appStore";
import queue from "../../../data/queue";

const name = METHOD_NAMES.FETCH_DATA;

export default function index() {
  const { isLoading, data } = useGeoWorker({ name, params: { queue } });
  const dispatch = useDispatch();
  useCompareEffect(
    () => {
      if (!isLoading && data) {
        dispatch(setBatchData(data));
      }
    },
    [isLoading, data],
    dequal,
  );
  return (
    <Grid2 container sx={{ width: "100%", height: "100%" }}>
      <DashboardPanel />
      <MapWrapper />
    </Grid2>
  );
}
