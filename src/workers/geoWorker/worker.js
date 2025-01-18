import { expose } from "comlink";
import { METHOD_NAMES } from "./methods/methodUtils";
import { fetchData, getData } from "./methods";

const METHODS = {
  [METHOD_NAMES.FETCH_DATA]: fetchData,
  [METHOD_NAMES.GET_DATA]: getData,
};

const executeMethod = async (methodName, params) => {
  try {
    const method = METHODS[methodName];
    if (!method) throw new Error("Something went wrong");
    const result = await method(params);
    return result;
  } catch (error) {
    console.log(error);
  }
};

expose({ executeMethod });
