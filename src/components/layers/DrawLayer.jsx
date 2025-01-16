import { CompositeLayer, PolygonLayer, ScatterplotLayer } from "deck.gl";
import { useSelector } from "react-redux";
import { getDrawingProps, getDrawMode } from "../../store/mapStore";

function makePolygon(value) {
  const [a, b] = value;
  return [a, [b[0], a[1]], b, [a[0], b[1]]];
}

class CustomDrawLayer extends CompositeLayer {
  renderLayers() {
    const data = makePolygon(this.props.data.feature);
    return [
      new ScatterplotLayer({
        id: "draw-layer-point",
        data: data,
        getPosition: (d) => d,
        getRadius: 10,
        getFillColor: [252, 94, 3],
        getLineColor: [0, 0, 0],
        getLineWidth: 1,
        radiusUnits: "pixels",
        lineWidthUnits: "pixels",
        pickable: true,
      }),
      new PolygonLayer({
        id: "draw-layer-polygon",
        data: [[data]],
        getPolygon: (d) => {
          return d;
        },
        getFillColor: [252, 94, 3, 50],
        getLineColor: [252, 94, 3],
        getLineWidth: 1,
        lineWidthUnits: "pixels",
      }),
    ];
  }
}

export default function DrawLayer() {
  const data = useSelector((state) => getDrawingProps(state));

  if (data)
    return new CustomDrawLayer({
      data,
    });
}
