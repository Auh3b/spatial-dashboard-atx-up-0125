import { GeoJsonLayer } from "deck.gl";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store/appStore";
import useGeoWorker from "../hooks/useGeoWorker";
import { useEffect } from "react";
import { addLayer, removeLayer, setPopup } from "../../store/mapStore";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";

const id = "admin-3-layer";
const name = "Admin 3 Layer";
const colors = ["#1b9e77"];
const labels = ["Admin 3"];
const type = "category";

const datasetName = "admin_3";

export default function Admin3Layer() {
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
      getFillColor: [27, 158, 119, 100],
      getLineColor: [27, 158, 119],
      getLineWidth: 1,
      lineWidthUnits: "pixels",
      pickable: true,
      onClick: ({ x, y, coordinate, object }) => {
        const [longitude, latitude] = coordinate;
        dispatch(
          setPopup({
            x,
            y,
            show: true,
            longitude,
            p_code: object.properties["GUI_" + 3],
            level: 3,
            latitude,
            content:
              object.properties["NAME_1"] ||
              "If your seeing this, change the field value 😉",
          }),
        );
      },
    });
}
