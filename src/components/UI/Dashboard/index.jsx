import { Grid2 } from "@mui/material";
import { dequal } from "dequal";
import { useDispatch } from "react-redux";
import { getInitialLayerConfig } from "../../../data/layerConfig";
import queue from "../../../data/queue";
import {
  setBatchData,
  setDataLoadingFeed,
  setFeedback,
} from "../../../store/appStore";
import { addLayer } from "../../../store/mapStore";
import { LAYER_TYPE } from "../../../utils/layerUtils";
import { METHOD_NAMES } from "../../../workers/geoWorker/methods/methodUtils";
import MapWrapper from "../../MapWrapper";
import useCompareEffect from "../../hooks/useCompareEffect";
import useGeoWorker from "../../hooks/useGeoWorker";
import MapActionContextUI from "../MapActionsUI";
import DashboardPanel from "./DashboardPanel";

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
        const id1 = crypto.randomUUID().toString();
        dispatch(
          addLayer({
            id: id1,
            value: getInitialLayerConfig(
              id1,
              data[0],
              LAYER_TYPE.POLYGON_LAYER,
            ),
          }),
        );
        const id2 = crypto.randomUUID().toString();
        dispatch(
          addLayer({
            id: id2,
            value: getInitialLayerConfig(id2, data[1], LAYER_TYPE.POINT_LAYER),
          }),
        );
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
