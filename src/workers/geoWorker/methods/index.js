import { parse } from "@loaders.gl/core";
import { LOADER_TYPE, loaders } from "./methodUtils";
import { v4 } from "uuid";
import { makePoint, makePolygon } from "../../../utils/geoFunc";
import { booleanIntersects, featureCollection } from "@turf/turf";
import { DRAW_MODES, featureHandler } from "../../../utils/drawingUtils";

let datasets = {};

export async function fetchData(params) {
  const { queue } = params;
  const resolve = await Promise.all(queue.map(({ url }) => fetch(url)));
  let volumes = {};
  let schema = {};
  for (let i = 0; i < queue.length; i++) {
    const { name, type, ...rest } = queue[i];
    const data = resolve[i];
    const loadedData = await loadData({ name, type, data, ...rest });
    volumes[name] = getDataVolume(loadedData, type);
    schema[name] = getDataSchema(loadedData, type);
  }

  return queue.map((d, i) => ({
    ...d,
    loaded: true,
    volume: volumes[d.name],
    schema: schema[d.name],
  }));
}

export function getData(params) {
  const { name } = params;
  if (datasets[name]) {
    return new Promise((resolve) => resolve(datasets[name].data));
  }
  throw Error("Data not loaded");
}

export async function getFilteredData(params) {
  const { source, isDrawing, feature } = params;
  if (!datasets[source]) throw Error("Invalid selection");
  if (isDrawing) throw Error("Please finish drawing");
  if (!feature) throw Error("Please draw point or spatial boundary");
  const filtered = applySpatialFilter(params);
  return new Promise((resolve) => resolve(filtered));
}

function setData(params) {
  const { name, data } = params;
  datasets[name] = {
    name,
    data,
  };
}

async function loadData(params) {
  const { type, data, name, filter } = params;
  const processedData = await parse(data, loaders[type]);
  const filteredData = filter
    ? applyPropertyFilter(processedData, { ...filter, fileType: type })
    : processedData;
  const dataWithIds = addIds(filteredData, type);
  setData({ name, data: dataWithIds });
  return dataWithIds;
}

function addIds(data, type) {
  if (type === LOADER_TYPE.GEOJSON) {
    return {
      ...data,
      features: data.features.map((d) => ({
        ...d,
        properties: {
          ...d.properties,
          id: v4(),
        },
      })),
    };
  }
  return data.data.map((d) => ({ ...d, id: v4() }));
}

function getDataVolume(data, type) {
  if (type === LOADER_TYPE.GEOJSON) {
    return data.features.length;
  }
  return data.length;
}

function getDataSchema(data, type) {
  if (type === LOADER_TYPE.GEOJSON) {
    return Object.keys(data.features[0].properties);
  }
  return Object.keys(data[0]);
}

function applyPropertyFilter(data, params) {
  const { fileType, type, value, column } = params;
  const filterFn = FILTER_FUNCTIONS[type](value, column);

  if (fileType === LOADER_TYPE.GEOJSON) {
    return {
      ...data,
      features: data.features.filter((d) => filterFn(d["properties"])),
    };
  }

  return data.filter((d) => filterFn(d));
}

function applySpatialFilter(params) {
  const { source, type, feature } = params;

  let overlay;

  if (feature.type === DRAW_MODES.POINT) {
    overlay = featureHandler[feature.type](feature.feature[0]);
  } else {
    overlay = featureHandler[feature.type]([feature.feature]);
  }

  let target = datasets[source].data;

  if (type !== LOADER_TYPE.GEOJSON) {
    target = featureCollection(
      target.map((d) => {
        if (d.lat && d.lng) {
          return makePoint([d.lng, d.lat], { ...d });
        }
      }),
    );
  }

  let _output = [];
  const features = target.features;
  for (let i = 0; i < features.length; i++) {
    const element = features[i];

    if (element && booleanIntersects(element, overlay)) {
      _output = [..._output, element];
    }
  }

  const count = _output.length;

  if (type === LOADER_TYPE.GEOJSON) {
    return {
      count,
      data: featureCollection(_output),
    };
  }

  const output = _output.map((d) => d.properties);
  return {
    count,
    data: output,
  };
}

export var FILTER_TYPES = {
  IN: "in",
};

export var FILTER_FUNCTIONS = {
  [FILTER_TYPES.IN]: filterIn,
};

function filterIn(value, column) {
  return (d) => d[column] === value;
}
