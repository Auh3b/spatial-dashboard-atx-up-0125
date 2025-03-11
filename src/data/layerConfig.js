import { getRandomColor } from "../utils/colorUtils";
import { LAYER_TYPE } from "../utils/layerUtils";

export const ATTRIBUTES = {
  FILL_COLOR: "fill-color",
  STROKE: "stroke",
  RADIUS: "radius",
  COORDINATES: "coordnates",
  EXTRUDE_HEIGHT: "extrude-height",
  ICON: "icon",
  HEATMAP: "heat-map",
  HEX: "hex",
};

export const attributeConfig = {
  [LAYER_TYPE.POINT_LAYER]: [
    ATTRIBUTES.FILL_COLOR,
    ATTRIBUTES.STROKE,
    ATTRIBUTES.COORDINATES,
    ATTRIBUTES.RADIUS,
  ],
  [LAYER_TYPE.POLYGON_LAYER]: [
    ATTRIBUTES.FILL_COLOR,
    ATTRIBUTES.STROKE,
    ATTRIBUTES.COORDINATES,
  ],
  [LAYER_TYPE.LINE_LAYER]: [ATTRIBUTES.COORDINATES, ATTRIBUTES.STROKE],
  [LAYER_TYPE.HEATMAP_LAYER]: [ATTRIBUTES.COORDINATES, ATTRIBUTES.HEATMAP],
  [LAYER_TYPE.HEX_LAYER]: [ATTRIBUTES.COORDINATES, ATTRIBUTES.HEX],
  [LAYER_TYPE.ICON_LAYER]: [ATTRIBUTES.COORDINATES, ATTRIBUTES.HEX],
};

const initialLayerConfig = {
  [LAYER_TYPE.POINT_LAYER]: {
    visible: true,
    legend: {
      color: getRandomColor(),
      radius: 5,
      strokeWidth: 1,
      latitude: "lat",
      longitude: "lng",
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.POLYGON_LAYER]: {
    visible: true,
    legend: {
      color: getRandomColor(),
      strokeWidth: 1,
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.LINE_LAYER]: {
    visible: true,
    legend: {
      strokeWidth: 1,
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.ICON_LAYER]: {
    visible: true,
    legend: {
      latitude: "",
      longitude: "",
      color: getRandomColor(),
      icon: "",
    },
  },
  [LAYER_TYPE.HEX_LAYER]: {
    visible: true,
    legend: {
      latitude: "",
      longitude: "",
      extruded: true,
      radius: 100,
      elevationScale: 10,
    },
  },
  [LAYER_TYPE.HEATMAP_LAYER]: {
    visible: true,
    legend: {
      latitude: "",
      longitude: "",
      intensity: 1,
      threshold: 0.05,
      radiusPixels: 20,
    },
  },
};

const getConfig = (type) => initialLayerConfig[type];

export const getInitialLayerConfig = (source, type) => {
  const { name: id, type: sourceType } = source;
  const config = {
    id,
    name: id,
    source: id,
    sourceType,
    type,
    ...getConfig(type),
  };
  return config;
};
