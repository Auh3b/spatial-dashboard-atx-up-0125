import { GeoJsonLayer } from "@deck.gl/layers";
import { useDispatch, useSelector } from "react-redux";
import { STATIC_LAYER_NAMES } from "../../data/layerConfig";
import { getIsDrawing, removePopup, setPopup } from "../../store/mapStore";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import useGeoWorker from "../hooks/useGeoWorker";
import useLayerConfig from "../hooks/useLayerConfig";

const id = STATIC_LAYER_NAMES.ADMIN_0_LAYER;

export default function CountriesLayer() {
  const dispatch = useDispatch();
  const isDrawing = useSelector((state) => getIsDrawing(state));
  const { layer } = useLayerConfig(id);
  const { data } = useGeoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layer || {},
  });

  if (data && layer)
    return new GeoJsonLayer({
      id,
      data,
      getFillColor: layer.legend.color,
      getLineColor: layer.legend.stroke,
      getLineWidth: layer.legend.strokeWidth,
      visible: layer.legend.visible,
      lineWidthUnits: "pixels",
      pickable: true,
      onDrag: isDrawing
        ? undefined
        : () => {
            dispatch(removePopup());
          },
      onClick: isDrawing
        ? undefined
        : ({ x, y, coordinate, object }, e) => {
            if (e.leftButton) dispatch(removePopup());
            if (
              e.rightButton ||
              (e.leftButton && e.changedPointers[0].ctrlKey)
            ) {
              const [longitude, latitude] = coordinate;
              dispatch(
                setPopup({
                  x,
                  y,
                  show: true,
                  longitude,
                  type: "explore",
                  feature: object,
                  p_code: object.properties["adm0_a3"],
                  level: 0,
                  next_level: 1,
                  latitude,
                  content:
                    object.properties["name"] ||
                    "If your seeing this, change the field value 😉",
                }),
              );
            }
          },
      updateTriggers: {
        visible: layer,
        getFillColor: layer,
        getLineColor: layer,
        getLineWidth: layer,
        onClick: isDrawing,
        onDrag: isDrawing,
      },
    });
}
