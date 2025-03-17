import { dequal } from "dequal";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredParams } from "../../store";
import { removeFilteredData, setFilteredData } from "../../store/mapStore";
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
          })
          .catch((e) => {});
      }
      return () => {
        dispatch(removeFilteredData());
      };
    },
    [params],
    dequal,
  );
}
