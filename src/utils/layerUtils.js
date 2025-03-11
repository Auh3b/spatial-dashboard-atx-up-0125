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
  console.log(layerItem);
  if (layerItem.sourceType === "geojson") {
    return (feature) => feature.geometry.coordinates;
  }
  if (layerItem.legend.coordinates) {
    return (d) => d[layerItem.legend.coordinates];
  }
  if (layerItem.legend.latitude && layerItem.legend.longitude) {
    return (d) => [d[layerItem.legend.longitude], d[layerItem.legend.latitude]];
  }
  return null;
}

async function getDataProp(layerItem) {
  const data = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  if (layerItem.sourceType === "geojson") {
    return data.features;
  }
  return data;
}

async function getLayerProps(layerItem) {
  const { type } = layerItem;
  const layerProps = await LAYER_PROPPER[type](layerItem);
  return layerProps;
}

async function getPointLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color;
  layerProps["getLineColor"] = layerItem.legend.strokeColor;
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["getRadius"] = layerItem.legend.radius;
  layerProps["pointRadiusUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["lineWidthUnits"] = "pixels";

  return layerProps;
}

async function getPolygonLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPolygon"] = getPositionProp(layerItem);
  layerProps["getFillColor"] = layerItem.legend.color;
  layerProps["getLineColor"] = layerItem.legend.strokeColor;
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["visible"] = true;
  return layerProps;
}

async function getLineLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["getLineColor"] = layerItem.legend.strokeColor;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["visible"] = true;
  layerProps["stroked"] = true;
  return layerProps;
}

async function getIconLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  return layerProps;
}

async function getHeatMapLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  return layerProps;
}

async function getHexLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await getDataProp(layerItem);
  layerProps["getPosition"] = getPositionProp(layerItem);
  layerProps["radius"] = layerItem.legend.radius;
  layerProps["extruded"] = layerItem.legend.extruded;
  layerProps["elevationScale"] = layerItem.legend.elevationScale;
  return layerProps;
}
