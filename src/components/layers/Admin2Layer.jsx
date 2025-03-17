import { GeoJsonLayer } from "deck.gl";
import { useDispatch, useSelector } from "react-redux";
import { STATIC_LAYER_NAMES } from "../../data/layerConfig";
import { getIsDrawing, removePopup, setPopup } from "../../store/mapStore";
import { METHOD_NAMES } from "../../workers/geoWorker/methods/methodUtils";
import useGeoWorker from "../hooks/useGeoWorker";
import useLayerConfig from "../hooks/useLayerConfig";

const id = STATIC_LAYER_NAMES.ADMIN_2_LAYER;

export default function Admin2Layer() {
  const dispatch = useDispatch();
  const { layer } = useLayerConfig(id);
  const isDrawing = useSelector((state) => getIsDrawing(state));
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
                  feature,
                  p_code: object.properties["GUI_" + 2],
                  level: 2,
                  latitude,
                  content:
                    object.properties["NAME_1"] ||
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
