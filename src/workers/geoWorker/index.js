import { wrap } from "comlink";

const worker = new Worker("workers/geoWorker/worker.js", {
  name: "geoWorker",
  type: "module",
});

const { executeWorker } = wrap(worker);

export default async function ({ name, params }) {
  const result = await executeWorker(name, params);

  return result;
}
