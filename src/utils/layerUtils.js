import { polygon } from "@turf/turf";
import {
  HeatmapLayer,
  HexagonLayer,
  IconLayer,
  LineLayer,
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
  [LAYER_TYPE.LINE_LAYER]: LineLayer,
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

function getLayer(layerType, props) {
  const _layer = LAYERS[layerType];
  return new _layer(props);
}

export async function derivedLayers({ layerData = {} }) {
  try {
    let layers = [];
    for (let layerId in layerData) {
      if (isDerivedLayer(layerData[layerId])) continue;
      const layerItem = layerData[layerId];
      const layerProps = await getLayerProps(layerItem);
      const layer = getLayer(layerItem.type, layerProps);
      layers = [...layers, layer];
    }

    return layers;
  } catch (error) {
    console.log(error);
  }
}

function getPositionProp(layerItem) {
  if (layerItem.sourceType === "geojson" || layerItem.sourceType === "kml") {
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

async function getDataProp(layerItem) {
  const data = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem.source,
  });

  if (!["geojson", "kml"].includes(layerItem.sourceType)) return data;

  const output = data.features.reduce((acc, current) => {
    if (current.geometry.type.search(/^(Multi).*/gm) === -1)
      return [...acc, current];
    let output = [];

    for (let i = 0; i < current.geometry.coordinates.length; i++) {
      const coordinate = current.geometry.coordinates[i];
      const feature = polygon(coordinate, current.properties);
      output = [...output, feature];
    }
    return [...acc, ...output];
  }, []);
  return output;
}

async function getLayerProps(layerItem) {
  const { type } = layerItem;
  const layerProps = await LAYER_PROPPER[type](layerItem);
  return layerProps;
}

async function getPointLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color;
  layerProps["getLineColor"] = layerItem.legend.stroke;
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["getRadius"] = layerItem.legend.radius;
  layerProps["pointRadiusUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["visible"] = layerItem.legend.visible;

  return layerProps;
}

async function getPolygonLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPolygon"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color;
  layerProps["getLineColor"] = layerItem.legend.stroke;
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["visible"] = layerItem.legend.visible;
  return layerProps;
}

async function getLineLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["getLineColor"] = layerItem.legend.stroke;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["visible"] = layerItem.legend.visible;
  layerProps["stroked"] = true;
  return layerProps;
}

async function getIconLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["visible"] = layerItem.legend.visible;
  layerProps["getSize"] = layerItem.legend.size;
  layerProps["getColor"] = layerItem.legend.color;
  layerProps["getIcon"] = getAutoPackedIconAtlas(layerItem);
  return layerProps;
}

async function getHeatMapLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["visible"] = layerItem.legend.visible;
  layerProps["intensity"] = layerItem.legend.intensity;
  layerProps["threshold"] = layerItem.legend.threshold;
  layerProps["radiusPixels"] = layerItem.legend.radiusPixels;
  return layerProps;
}

async function getHexLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.deckId;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["radius"] = layerItem.legend.radius;
  layerProps["extruded"] = layerItem.legend.extruded;
  layerProps["elevationScale"] = layerItem.legend.elevationScale;
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
