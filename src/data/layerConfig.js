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
  [LAYER_TYPE.ICON_LAYER]: [
    ATTRIBUTES.COORDINATES,
    ATTRIBUTES.ICON,
    ATTRIBUTES.FILL_COLOR,
  ],
};

const initialLayerConfig = {
  [LAYER_TYPE.POINT_LAYER]: {
    legend: {
      visible: true,
      color: getRandomColor(),
      radius: 5,
      strokeWidth: 1,
      latitude: "",
      longitude: "",
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.POLYGON_LAYER]: {
    legend: {
      visible: true,
      color: getRandomColor(),
      strokeWidth: 1,
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.LINE_LAYER]: {
    legend: {
      visible: true,
      strokeWidth: 1,
      strokeColor: getRandomColor(),
    },
  },
  [LAYER_TYPE.ICON_LAYER]: {
    legend: {
      visible: true,
      latitude: "",
      size: "",
      iconAtlas: "",
      iconMapping: "",
      longitude: "",
      color: getRandomColor(),
      icon: "",
    },
  },
  [LAYER_TYPE.HEX_LAYER]: {
    legend: {
      visible: true,
      latitude: "",
      longitude: "",
      extruded: true,
      radius: 1000,
      elevationScale: 10,
    },
  },
  [LAYER_TYPE.HEATMAP_LAYER]: {
    legend: {
      visible: true,
      latitude: "",
      longitude: "",
      intensity: 1,
      threshold: 0.05,
      radiusPixels: 20,
    },
  },
};

export const allowedShapes = [
  {
    label: "Point",
    value: LAYER_TYPE.POINT_LAYER,
  },
  {
    label: "Line",
    value: LAYER_TYPE.LINE_LAYER,
  },
  {
    label: "Polygon",
    value: LAYER_TYPE.POLYGON_LAYER,
  },
  {
    label: "Icon",
    value: LAYER_TYPE.ICON_LAYER,
  },
  {
    label: "Heat Map",
    value: LAYER_TYPE.HEATMAP_LAYER,
  },
  {
    label: "Hex Map",
    value: LAYER_TYPE.HEX_LAYER,
  },
];

const getConfig = (type) => initialLayerConfig[type];

export const getInitialLayerConfig = (id, source, type) => {
  const { name, type: sourceType } = source;

  const deckId = `${type}-${id}-${source.name}`;

  const config = {
    id,
    deckId,
    name,
    source,
    sourceType,
    type,
    ...getConfig(type),
  };
  return config;
};
