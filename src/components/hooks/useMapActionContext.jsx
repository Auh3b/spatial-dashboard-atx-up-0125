import useCompareEffect from "./useCompareEffect";
import { dequal } from "dequal";
import geoWorker from "../../workers/geoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredParams } from "../../store";
import { setFilteredData } from "../../store/mapStore";
import { setFeedback } from "../../store/appStore";

const name = METHOD_NAMES.GET_FILTERED_DATA;

export default function useMapActionContext() {
  const dispatch = useDispatch();
  const params = useSelector((state) => getFilteredParams(state));
  useCompareEffect(
    () => {
      geoWorker({ name, params })
        .then((e) => {
          if (!e) throw Error("Something went wrong");
          dispatch(setFilteredData(e));
        })
        .catch((e) => {});
    },
    [params],
    dequal,
  );

  return {
    layer: params.layer,
  };
}
