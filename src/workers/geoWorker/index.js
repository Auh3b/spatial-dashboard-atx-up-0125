import { wrap } from "comlink";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  name: "geoWorker",
  type: "module",
});

const { executeMethod } = wrap(worker);

export default async function geoWorker({ name, params }) {
  const result = await executeMethod(name, params);
  return result;
}
