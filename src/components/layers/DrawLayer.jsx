import { PolygonLayer, ScatterplotLayer } from "deck.gl";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrawingProps,
  getIsDrawing,
  removePopup,
  setPopup,
} from "../../store/mapStore";

// class CustomDrawLayer extends CompositeLayer {
//   getPickingInfo({ info, sourceLayer }) {
//     // override info.object
//     return info;
//   }
//   renderLayers() {
//     const { data, dispatch, setPopup, removePopup, isDrawing } = this.props;
//     return [
//       new PolygonLayer({
//         id: "draw-layer-polygon",
//         data: [data.feature],
//         getPolygon: (d) => {
//           return d;
//         },
//         getFillColor: [252, 94, 3, 50],
//         getLineColor: [252, 94, 3],
//         getLineWidth: 1,
//         pickable: true,
//         lineWidthUnits: "pixels",
//         // onDrag: isDrawing
//         //   ? undefined
//         //   : () => {
//         //       dispatch(removePopup());
//         //     },
//         onClick: (e) => console.log(e),
//         onHover: (e) => console.log(e),
//         // onClick: isDrawing
//         //   ? undefined
//         //   : ({ x, y, coordinate, object }, e) => {
//         //       if (e.leftButton) dispatch(removePopup());
//         //       if (
//         //         e.rightButton ||
//         //         (e.leftButton && e.changedPointers[0].ctrlKey)
//         //       ) {
//         //         const [longitude, latitude] = coordinate;
//         //         dispatch(
//         //           setPopup({
//         //             feature: object,
//         //             type: "drawing",
//         //             content: `center ${longitude}, ${latitude}`,
//         //           }),
//         //         );
//         //       }
//         //     },
//         // updateTriggers: {
//         //   onClick: isDrawing,
//         //   onDrag: isDrawing,
//         // },
//       }),
//       new ScatterplotLayer({
//         id: "draw-layer-point",
//         data: data.feature,
//         getPosition: (d) => d,
//         getRadius: 5,
//         getFillColor: [252, 94, 3],
//         getLineColor: [255, 255, 255],
//         getLineWidth: 10,
//         pickable: true,
//         radiusUnits: "pixels",
//         lineWidthUnits: "pixels",
//         onClick: (e) => console.log(e),
//       }),
//     ];
//   }
// }

export default function DrawLayer() {
  const dispatch = useDispatch();
  const data = useSelector((state) => getDrawingProps(state));
  const isDrawing = useSelector((state) => getIsDrawing(state));
  if (data)
    return [
      new PolygonLayer({
        id: "draw-layer-polygon",
        data: [data.feature],
        getPolygon: (d) => {
          return d;
        },
        getFillColor: [252, 94, 3, 50],
        getLineColor: [252, 94, 3],
        getLineWidth: 1,
        pickable: true,
        lineWidthUnits: "pixels",
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
        id: "draw-layer-point",
        data: data.feature,
        getPosition: (d) => d,
        getRadius: 5,
        getFillColor: [252, 94, 3],
        getLineColor: [255, 255, 255],
        getLineWidth: 10,
        pickable: true,
        radiusUnits: "pixels",
        lineWidthUnits: "pixels",
        onClick: (e) => console.log(e),
      }),
    ];
  //   return new CustomDrawLayer({
  // data,
  //     dispatch,
  //     removePopup,
  //     isDrawing,
  //     setPopup,
  //   });
}
