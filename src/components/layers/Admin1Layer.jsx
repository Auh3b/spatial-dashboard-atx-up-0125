import { GeoJsonLayer } from "deck.gl";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store/appStore";
import useGeoWorker from "../hooks/useGeoWorker";
import { useEffect } from "react";
import {
  addLayer,
  removeLayer,
  removePopup,
  setPopup,
} from "../../store/mapStore";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";

const id = "admin-1-layer";
const name = "Admin 1 Layer";
const colors = ["#7570b3"];
const labels = ["Admin 2"];
const type = "category";

const datasetName = "admin_1";

export default function Admin1Layer() {
  const dispatch = useDispatch();

  const dataSet = useSelector((state) => getData(state, datasetName)) || {};
  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: dataSet,
  });

  useEffect(() => {
    dispatch(
      addLayer({
        id,
        value: {
          id,
          name,
          source: datasetName,
          legend: {
            type,
            colors,
            labels,
          },
        },
      }),
    );

    return () => dispatch(removeLayer(id));
  }, []);

  if (data)
    return new GeoJsonLayer({
      id,
      data,
      getFillColor: [117, 112, 179, 100],
      getLineColor: [117, 112, 179],
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      onDrag: () => {
        dispatch(removePopup());
      },
      onClick: ({ x, y, coordinate, object }, e) => {
        if (e.leftButton) dispatch(removePopup());
        if (e.rightButton) {
          const [longitude, latitude] = coordinate;
          dispatch(
            setPopup({
              x,
              y,
              show: true,
              longitude,
              feature: object,
              p_code: object.properties["GID_" + 1],
              level: 1,
              next_level: 2,
              latitude,
              content:
                object.properties["NAME_1"] ||
                "If your seeing this, change the field value 😉",
            }),
          );
        }
      },
    });
}
