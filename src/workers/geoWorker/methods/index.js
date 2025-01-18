import { parse } from "@loaders.gl/core";
import { loaders } from "./methodUtils";

let datasets = {};

export async function fetchData(params) {
  const { queue } = params;
  const resolve = await Promise.all(queue.map(({ url }) => fetch(url)));
  for (let i = 0; i < queue.length; i++) {
    const { name, type } = queue[i];
    const data = resolve[i];
    loadData({ name, type, data });
  }

  return queue.map((d) => ({ ...d, loaded: true }));
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
  setData({ name, data: processedData });
}
