import { GeoJsonLayer, HeatmapLayer, HexagonLayer, IconLayer } from "deck.gl";
import geoWorker from "../workers/geoWorker";
import { METHOD_NAMES } from "../workers/geoWorker/methods/methodUtils";
import { hexToDeckColor } from "./colorUtils";

export const LAYER_TYPE = {
  LINE_LAYER: "line-layer",
  POLYGON_LAYER: "polygon-layer",
  POINT_LAYER: "point-layer",
  HEX_LAYER: "hex-layer",
  ICON_LAYER: "icon-layer",
  HEATMAP_LAYER: "point-layer",
};

const LAYERS = {
  [LAYER_TYPE.POINT_LAYER]: GeoJsonLayer,
  [LAYER_TYPE.LINE_LAYER]: GeoJsonLayer,
  [LAYER_TYPE.POLYGON_LAYER]: GeoJsonLayer,
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

async function getLayerProps(layerItem) {
  const { type } = layerItem;
  const layerProps = await LAYER_PROPPER[type](layerItem);
  return layerProps;
}

async function getPointLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  layerProps["getFillColor"] = hexToDeckColor(layerItem.legend.color);
  layerProps["getLineColor"] = hexToDeckColor(layerItem.legend.strokeColor);
  layerProps["getRadius"] = 5;
  layerProps["pointRadiusUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["lineWidthUnits"] = "pixels";

  return layerProps;
}

async function getPolygonLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  layerProps["getFillColor"] = hexToDeckColor(layerItem.legend.color);
  layerProps["getLineColor"] = hexToDeckColor(layerItem.legend.strokeColor);
  layerProps["getLineWidth"] = layerItem.legend.strokeWidth;
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["stroked"] = true;
  layerProps["visible"] = true;
  return layerProps;
}

async function getLineLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  layerProps["getLineColor"] = hexToDeckColor(layerItem.legend.strokeColor);
  layerProps["lineWidthUnits"] = "pixels";
  layerProps["visible"] = true;
  layerProps["stroked"] = true;
  return layerProps;
}

async function getIconLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  return layerProps;
}

async function getHeatMapLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  return layerProps;
}

async function getHexLayerProps(layerItem) {
  const layerProps = {};
  layerProps["id"] = layerItem.name;
  layerProps["data"] = await geoWorker({
    name: METHOD_NAMES.GET_DATA,
    params: layerItem,
  });
  return layerProps;
}
