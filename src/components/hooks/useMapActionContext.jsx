import { dequal } from "dequal";
import { useDispatch, useSelector } from "react-redux";
import { resultsConfig, STATIC_LAYER_NAMES } from "../../data/layerConfig";
import { getFilteredParams } from "../../store";
import {
  addLayer,
  removeFilteredData,
  removeLayer,
  setFilteredData,
} from "../../store/mapStore";
import { getUniqueId } from "../../utils/axillaryUtils";
import geoWorker from "../../workers/geoWorker";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import useCompareEffect from "./useCompareEffect";

const name = METHOD_NAMES.GET_FILTERED_DATA;

export default function useMapActionContext() {
  const dispatch = useDispatch();
  const params = useSelector((state) => getFilteredParams(state));
  useCompareEffect(
    () => {
      if (params) {
        geoWorker({ name, params })
          .then((e) => {
            // console.log(e);
            if (!e) throw Error("Something went wrong");
            dispatch(setFilteredData(e));
            dispatch(
              addLayer({
                id: STATIC_LAYER_NAMES.OVERLAY_RESULTS_LAYER,
                value: {
                  ...params,
                  ...resultsConfig,
                  deckId: getUniqueId(),
                },
              }),
            );
          })
          .catch((e) => {
            // console.log(e);
          });
      }
      return () => {
        dispatch(removeLayer({ id: STATIC_LAYER_NAMES.OVERLAY_RESULTS_LAYER }));
        dispatch(removeFilteredData());
      };
    },
    [params],
    dequal,
  );
  // console.log(params);
}
