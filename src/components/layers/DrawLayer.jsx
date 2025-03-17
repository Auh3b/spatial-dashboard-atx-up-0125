import { PolygonLayer, ScatterplotLayer } from "deck.gl";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATIC_LAYER_NAMES } from "../../data/layerConfig";
import {
  getDrawingProps,
  getIsDrawing,
  removePopup,
  setPopup,
} from "../../store/mapStore";
import { getLayerProps } from "../../utils/layerUtils";
import useLayerConfig from "../hooks/useLayerConfig";
const id = STATIC_LAYER_NAMES.DRAWING_LAYER;
const source = {
  type: "json",
};
export default function DrawLayer() {
  const dispatch = useDispatch();
  const data = useSelector((state) => getDrawingProps(state));
  const { layer } = useLayerConfig(id);
  const layerProps = useMemo(() => {
    if (!layer) return null;
    return getLayerProps({ ...layer, source });
  }, [layer]);
  const isDrawing = useSelector((state) => getIsDrawing(state));
  if (data && layerProps)
    return [
      new PolygonLayer({
        ...layerProps,
        id,
        data: [data.feature],
        getPolygon: (d) => {
          return d;
        },
        // getFillColor: [252, 94, 3, 50],
        // getLineColor: [252, 94, 3],
        // getLineWidth: 1,
        // lineWidthUnits: "pixels",
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
                    geometry: data.type,
                    show: true,
                    feature: object,
                    type: "drawing",
                    content: `center ${longitude}, ${latitude}`,
                  }),
                );
              }
            },
        updateTriggers: {
          onClick: isDrawing,
          onDrag: isDrawing,
        },
      }),
      new ScatterplotLayer({
        ...layerProps,
        id: "draw-layer-point",
        data: data.feature,
        getPosition: (d) => d,
        getRadius: 3,
        getFillColor: layerProps.getLineColor,
        // getLineColor: [255, 255, 255],

        radiusUnits: "pixels",
        lineWidthUnits: "pixels",
      }),
    ];
}
