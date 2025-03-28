import { lineString, point, polygon } from "@turf/turf";
import {
  HeatmapLayer,
  HexagonLayer,
  IconLayer,
  PathLayer,
  PolygonLayer,
  ScatterplotLayer,
} from "deck.gl";
import geoWorker from "../workers/geoWorker";
import { METHOD_NAMES } from "../workers/geoWorker/methods/methodUtils";
import {} from "./colorUtils";

export const LAYER_TYPE = {
  LINE_LAYER: "line-layer",
  POLYGON_LAYER: "polygon-layer",
  POINT_LAYER: "point-layer",
  HEX_LAYER: "hex-layer",
  ICON_LAYER: "icon-layer",
  HEATMAP_LAYER: "heatmap-layer",
};

const LAYERS = {
  [LAYER_TYPE.POINT_LAYER]: ScatterplotLayer,
  [LAYER_TYPE.LINE_LAYER]: PathLayer,
  [LAYER_TYPE.POLYGON_LAYER]: PolygonLayer,
  [LAYER_TYPE.HEX_LAYER]: HexagonLayer,
  [LAYER_TYPE.HEATMAP_LAYER]: HeatmapLayer,
  [LAYER_TYPE.ICON_LAYER]: IconLayer,
};

const LAYER_PROPPER = {
  [LAYER_TYPE.POINT_LAYER]: getPointLayerProps,
  [LAYER_TYPE.LINE_LAYER]: getLineLayerProps,
  [LAYER_TYPE.POLYGON_LAYER]: getPolygonLayerProps,
  [LAYER_TYPE.HEX_LAYER]: getHexLayerProps,
  [LAYER_TYPE.HEATMAP_LAYER]: getHeatMapLayerProps,
  [LAYER_TYPE.ICON_LAYER]: getIconLayerProps,
};

export function getLayerClass(layerType, data, props) {
  const _layer = LAYERS[layerType];
  return new _layer({ ...props, data });
}

export async function derivedLayers({ layerData = {} }) {
  try {
    let layers = [];
    for (let layerId in layerData) {
      if (isDerivedLayer(layerData[layerId])) continue;
      const layerItem = layerData[layerId];
      const layerProps = getLayerProps(layerItem);
      const data = await getDataProp(layerItem);
      const layer = getLayerClass(layerItem.type, data, layerProps);
      layers = [...layers, layer];
    }

    return layers;
  } catch (error) {}
}

function getPositionProp(layerItem) {
  if (layerItem.source.type === "geojson" || layerItem.source.type === "kml") {
    return (feature) => feature.geometry.coordinates;
  }
  if (layerItem.legend.coordinate) {
    return (d) => d[layerItem.legend.coordinate];
  }
  if (layerItem.legend.latitude && layerItem.legend.longitude) {
    return (d) => [d[layerItem.legend.longitude], d[layerItem.legend.latitude]];
  }
  return null;
}

export async function getDataProp(layerItem) {
  const data = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });

  if (!["geojson", "kml"].includes(layerItem.source.type)) return data;

  const output = processGeojson(data, layerItem.type);
  return output;
}

function getGeometryGenerator(type) {
  if (type === LAYER_TYPE.POLYGON_LAYER) return polygon;
  if (type === LAYER_TYPE.LINE_LAYER) return lineString;
  return point;
}

export function processGeojson(value, type) {
  const geometryGenerator = getGeometryGenerator(type);
  return value.features.reduce((acc, current) => {
    if (current.geometry.type.search(/^(Multi).*/gm) === -1)
      return [...acc, current];
    let output = [];

    for (let i = 0; i < current.geometry.coordinates.length; i++) {
      const coordinate = current.geometry.coordinates[i];

      const feature = geometryGenerator(coordinate, current.properties);
      output = [...output, feature];
    }
    return [...acc, ...output];
  }, []);
}

export function getLayerProps(layerItem) {
  const { type } = layerItem;
  const layerProps = LAYER_PROPPER[type](layerItem);
  return layerProps;
}

function getPointLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color || [52, 100, 235, 100];
  layerProps["getLineColor"] = layerItem.legend.stroke || [52, 100, 235, 255];
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["getRadius"] = layerItem.legend.radius || 5;
  layerProps["radiusUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["visible"] = layerItem.legend.visible;

  return layerProps;
}

function getPolygonLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPolygon"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color || [52, 100, 235, 100];
  layerProps["getLineColor"] = layerItem.legend.stroke || [52, 100, 235, 255];
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth || 2;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["visible"] = layerItem.legend.visible;
  return layerProps;
}

function getLineLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPath"] = getPositionProp(layerItem);
  layerProps["getColor"] = layerItem.legend.stroke || [52, 100, 235, 255];
  layerProps["getWidth"] = layerItem.legend.strokeWidth || 1;
  layerProps["widthUnits"] = "pixels";
  layerProps["visible"] = layerItem.legend.visible;
  return layerProps;
}

function getIconLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["visible"] = layerItem.legend.visible;
  layerProps["getSize"] = layerItem.legend.size || 50;
  layerProps["getColor"] = layerItem.legend.color || [52, 100, 235, 100];
  layerProps["getIcon"] = getAutoPackedIconAtlas(layerItem);
  return layerProps;
}

function getHeatMapLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["visible"] = layerItem.legend.visible;
  layerProps["intensity"] = layerItem.legend.intensity;
  layerProps["threshold"] = layerItem.legend.threshold;
  layerProps["radiusPixels"] = layerItem.legend.radiusPixels;
  return layerProps;
}

function getHexLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["radius"] = layerItem.legend.radius || 500;
  layerProps["extruded"] = layerItem.legend.extruded || true;
  layerProps["elevationScale"] = layerItem.legend.elevationScale || 50;
  layerProps["visible"] = layerItem.legend.visible;
  return layerProps;
}

export function isDerivedLayer(layerConfig) {
  return !layerConfig.dynamic;
}

function getAutoPackedIconAtlas(layerItem) {
  return () => ({
    url: layerItem.legend.iconPreset,
    width: 64,
    height: 64,
    mask: true,
  });
}
