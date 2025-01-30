import { Grid2 } from "@mui/material";
import DashboardPanel from "./DashboardPanel";
import MapWrapper from "../../MapWrapper";
import useGeoWorker from "../../hooks/useGeoWorker";
import { METHOD_NAMES } from "../../../workers/geoWorker/methods/methodUtils";
import useCompareEffect from "../../hooks/useCompareEffect";
import { dequal } from "dequal";
import { useDispatch } from "react-redux";
import {
  setBatchData,
  setDataLoadingFeed,
  setFeedback,
} from "../../../store/appStore";
import queue from "../../../data/queue";
import MapActionContextUI from "../MapActionsUI";

const name = METHOD_NAMES.FETCH_DATA;

export default function index() {
  const { isLoading, data } = useGeoWorker({ name, params: { queue } });
  const dispatch = useDispatch();
  useCompareEffect(
    () => {
      if (isLoading)
        dispatch(
          setDataLoadingFeed({ isLoading, message: "Loading initial data" }),
        );
      if (!isLoading && data) {
        dispatch(setBatchData(data));
        dispatch(setDataLoadingFeed({ isLoading, message: "" }));
        dispatch(
          setFeedback({ status: "success", message: "Initial data loaded" }),
        );
      }
    },
    [isLoading, data],
    dequal,
  );
  return (
    <Grid2 container sx={{ flexGrow: 1 }} wrap={"nowrap"}>
      <DashboardPanel />
      <Grid2 container direction={"column"} flexGrow={1} wrap="nowrap">
        <MapActionContextUI />
        <MapWrapper />
      </Grid2>
    </Grid2>
  );
}
