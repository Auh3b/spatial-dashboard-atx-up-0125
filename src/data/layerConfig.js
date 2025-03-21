import { addLayer } from "../store/mapStore";
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
    dynamic: true,
    showInLegend: true,
    legend: {
      visible: true,
      color: getRandomColor(),
      radius: 5,
      strokeWidth: 1,
      latitude: "",
      longitude: "",
      stroke: getRandomColor(),
    },
  },
  [LAYER_TYPE.POLYGON_LAYER]: {
    dynamic: true,
    showInLegend: true,
    legend: {
      visible: true,
      color: getRandomColor(),
      strokeWidth: 1,
      stroke: getRandomColor(),
    },
  },
  [LAYER_TYPE.LINE_LAYER]: {
    dynamic: true,
    showInLegend: true,
    legend: {
      visible: true,
      strokeWidth: 1,
      stroke: getRandomColor(),
    },
  },
  [LAYER_TYPE.ICON_LAYER]: {
    dynamic: true,
    showInLegend: true,
    legend: {
      visible: true,
      latitude: "",
      size: "",
      longitude: "",
      color: getRandomColor(),
      iconPreset:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iaW5oZXJpdCIgY2xhc3M9Ik11aVN2Z0ljb24tcm9vdCBNdWlTdmdJY29uLWNvbG9yUHJpbWFyeSBNdWlTdmdJY29uLWZvbnRTaXplTWVkaXVtIGNzcy0xd3RwNm8wLU11aVN2Z0ljb24tcm9vdCIgZm9jdXNhYmxlPSJmYWxzZSIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZGF0YS10ZXN0aWQ9IkFjY2Vzc1RpbWVJY29uIj48cGF0aCBmaWxsPSJpbmhlcml0IiBkPSJNMTEuOTkgMkM2LjQ3IDIgMiA2LjQ4IDIgMTJzNC40NyAxMCA5Ljk5IDEwQzE3LjUyIDIyIDIyIDE3LjUyIDIyIDEyUzE3LjUyIDIgMTEuOTkgMk0xMiAyMGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDgiPjwvcGF0aD48cGF0aCBkPSJNMTIuNSA3SDExdjZsNS4yNSAzLjE1Ljc1LTEuMjMtNC41LTIuNjd6Ij48L3BhdGg+PC9zdmc+",
    },
  },
  [LAYER_TYPE.HEX_LAYER]: {
    dynamic: true,
    showInLegend: true,
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
    dynamic: true,
    showInLegend: true,
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
  const { name } = source;

  const deckId = `${type}-${id}-${source.name}`;

  const config = {
    id,
    deckId,
    name,
    source,
    type,
    ...getConfig(type),
  };
  return config;
};

export const STATIC_LAYER_NAMES = {
  ADMIN_0_LAYER: "admin-0-layer",
  ADMIN_1_LAYER: "admin-1-layer",
  ADMIN_2_LAYER: "admin-2-layer",
  DRAWING_LAYER: "drawing-layer",
  OVERLAY_RESULTS_LAYER: "overlay-results-layer",
};

export const admin0Config = {
  id: STATIC_LAYER_NAMES.ADMIN_0_LAYER,
  name: "Admin 0",
  type: LAYER_TYPE.POLYGON_LAYER,
  showInLegend: false,
  dynamic: false,
  legend: {
    visible: true,
    color: [231, 41, 138, 100],
    stroke: [231, 41, 138, 255],
    strokeWidth: 1,
  },
};

export const admin1Config = {
  id: STATIC_LAYER_NAMES.ADMIN_1_LAYER,
  name: "Admin 1",
  type: LAYER_TYPE.POLYGON_LAYER,
  showInLegend: false,
  dynamic: false,
  legend: {
    visible: true,
    color: [117, 112, 179, 100],
    stroke: [117, 112, 179, 255],
    strokeWidth: 1,
  },
};

export const admin2Config = {
  id: STATIC_LAYER_NAMES.ADMIN_2_LAYER,
  name: "Admin 2",
  type: LAYER_TYPE.POLYGON_LAYER,
  showInLegend: false,
  dynamic: false,
  legend: {
    visible: true,
    color: [217, 95, 2, 100],
    stroke: [217, 95, 2, 255],
    strokeWidth: 1,
  },
};

export const drawingConfig = {
  id: STATIC_LAYER_NAMES.DRAWING_LAYER,
  name: "Drawing Layer",
  type: LAYER_TYPE.POLYGON_LAYER,
  dynamic: false,
  system: true,
  showInLegend: false,
  legend: {
    visible: true,
    color: [252, 94, 3, 50],
    strokeWidth: 1,
    stroke: [252, 94, 3, 255],
  },
};
export const resultsConfig = {
  id: STATIC_LAYER_NAMES.OVERLAY_RESULTS_LAYER,
  name: "Results Layer",
  dynamic: false,
  system: true,
  showInLegend: false,
  // legend: {
  //   visible: true,
  //   color: [52, 110, 235, 100],
  //   stroke: [52, 110, 235, 255],
  // },
};

export const exploreLayers = [admin0Config, admin1Config, admin2Config];
export const drawingLayers = [drawingConfig];

export function setBatchLayers(layerConfigs, dispatch) {
  for (let i = 0; i < layerConfigs.length; i++) {
    const value = layerConfigs[i];
    const id = value.id;
    dispatch(
      addLayer({
        id,
        value,
      }),
    );
  }
}
