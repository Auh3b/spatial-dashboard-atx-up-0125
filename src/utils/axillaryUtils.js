import { createElement } from "react";
import ReactDOMServer from "react-dom/server";
export const getUniqueId = () => crypto.randomUUID().toString();

/**
 *
 * @param {string} value
 */
export function seperateCamelCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export function iconToDataUrl(IconComponent) {
  console.log(IconComponent);
  const el = createElement(IconComponent, { color: "primary" });
  let svgString = ReactDOMServer.renderToStaticMarkup(el);
  svgString = svgString.replace(
    "<svg",
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="inherit"`,
  );
  svgString = svgString.replace("<path", `<path fill="inherit"`); //
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}
