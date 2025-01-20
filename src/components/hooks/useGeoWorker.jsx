import { useEffect, useState } from "react";
import geoWorker from "../../workers/geoWorker";
import { useDispatch } from "react-redux";
import { setFeedback } from "../../store/appStore";
import useCompareEffect from "./useCompareEffect";
import { dequal } from "dequal";

export default function useGeoWorker({ name, params }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useCompareEffect(
    () => {
      setIsLoading(true);
      geoWorker({ name, params })
        .then((result) => {
          setData(result);
        })
        .catch((e) => {
          dispatch(
            setFeedback({
              message: "Oops! Something went wrong",
              status: "warning",
            }),
          );
        })
        .finally(() => setIsLoading(false));

      return () => {
        setData(data);
        setIsLoading(false);
      };
    },
    [name, params],
    dequal,
  );

  return {
    isLoading,
    data,
  };
}
