import { parse } from "@loaders.gl/core";
import { booleanIntersects, featureCollection } from "@turf/turf";
import { v4 } from "uuid";
import { DRAW_MODES, featureHandler } from "../../../utils/drawingUtils";
import { FILTER_FUNCTIONS } from "../../../utils/filterFuncs";
import { makePoint } from "../../../utils/geoFunc";
import { LOADER_TYPE, loaders } from "./methodUtils";

let datasets = {};

export async function setLocalData(params) {
  const { data, ...queue } = params;
  const output = processLocalLoad(queue, data);
  return output;
}

export async function fetchData(params) {
  const { queue } = params;
  const resolve = await Promise.all(queue.map(({ url }) => fetch(url)));
  let output = [];
  for (let i = 0; i < queue.length; i++) {
    const _output = await processLoad(queue[i], resolve[i]);
    output = [...output, _output];
  }

  return output;
}

function processLocalLoad(queue, data) {
  let output = { ...queue };
  const { name, type, ...rest } = queue;
  const loadedData = loadLocalData({ name, type, data, ...rest });
  output["volume"] = getDataVolume(loadedData, type);
  output["schema"] = getDataSchema(loadedData, type);
  output["loaded"] = true;
  output["type"] = type === LOADER_TYPE.KML ? LOADER_TYPE.GEOJSON : type;
  return output;
}

async function processLoad(queue, data) {
  let output = { ...queue };
  const { name, type, ...rest } = queue;
  const loadedData = await loadData({ name, type, data, ...rest });
  output["volume"] = getDataVolume(loadedData, type);
  output["schema"] = getDataSchema(loadedData, type);
  output["loaded"] = true;
  output["type"] = type === LOADER_TYPE.KML ? LOADER_TYPE.GEOJSON : type;
  return output;
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

function loadLocalData(params) {
  const { type, data, name, filter } = params;
  const processedData = data;
  const filteredData = filter
    ? applyPropertyFilter(processedData, { ...filter, fileType: type })
    : processedData;
  const dataWithIds = addIds(filteredData, type);
  setData({ name, data: dataWithIds });
  return dataWithIds;
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
  if (type === LOADER_TYPE.GEOJSON || type === LOADER_TYPE.KML) {
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
  if (type === LOADER_TYPE.JSON) return data.map((d) => ({ ...d, id: v4() }));
  return data.data.map((d) => ({ ...d, id: v4() }));
}

function getDataVolume(data, type) {
  if (type === LOADER_TYPE.GEOJSON || type === LOADER_TYPE.KML) {
    return data.features.length;
  }
  return data.length;
}

function getDataSchema(data, type) {
  if (type === LOADER_TYPE.GEOJSON || type === LOADER_TYPE.KML) {
    return Object.keys(data.features[0].properties);
  }
  return Object.keys(data[0]);
}

function applyPropertyFilter(data, params) {
  const { fileType, type, value, column } = params;
  const filterFn = FILTER_FUNCTIONS[type](value, column);

  if (fileType === LOADER_TYPE.GEOJSON || fileType === LOADER_TYPE.KML) {
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

  if (type !== LOADER_TYPE.GEOJSON || type === LOADER_TYPE.KML) {
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

  if (type === LOADER_TYPE.GEOJSON || type === LOADER_TYPE.KML) {
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
