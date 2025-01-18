import { parse } from "@loaders.gl/core";
import { LOADER_TYPE, loaders } from "./methodUtils";
import { v4 } from "uuid";

let datasets = {};

export async function fetchData(params) {
  const { queue } = params;
  const resolve = await Promise.all(queue.map(({ url }) => fetch(url)));
  let volumes = {};
  let schema = {};
  for (let i = 0; i < queue.length; i++) {
    const { name, type } = queue[i];
    const data = resolve[i];
    const loadedData = await loadData({ name, type, data });
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

function setData(params) {
  const { name, data } = params;
  datasets[name] = {
    name,
    data,
  };
}

async function loadData(params) {
  const { type, data, name } = params;
  const processedData = await parse(data, loaders[type]);
  const dataWithIds = addIds(processedData, type);
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
