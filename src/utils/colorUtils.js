import { color, interpolateTurbo, rgb, scaleLinear, scaleSequential } from "d3";

export function colorToDeckColor(colorCode) {
  const colorUnit = color(colorCode);
  const { r, g, b, a = 1 } = colorUnit.rgb();
  return [r, g, b, alphaRgbaToDeckColorAlpha(a)];
}

export function rgbaToDeckColor(rgbaColor) {
  const { r, g, b, a = 1 } = rgbaColor;
  return [r, g, b, alphaRgbaToDeckColorAlpha(a)];
}

export function getRandomColor() {
  const scale = scaleSequential(interpolateTurbo);
  const colorString = scale(Math.random());
  return colorToDeckColor(colorString);
}

export function stringToRgba(colorString) {
  return rgb(colorString);
}

export function deckColorToRgba(value) {
  const [r, g, b, a = 255] = value;
  return {
    r,
    g,
    b,
    a: deckColorAlphaToRgbaAlpha(a),
  };
}

function deckColorAlphaToRgbaAlpha(value) {
  const scale = scaleLinear().range([0, 1]).domain([0, 255]);
  return scale(value);
}

function alphaRgbaToDeckColorAlpha(value) {
  const scale = scaleLinear().range([0, 255]).domain([0, 1]);

  return scale(value);
}

export function deckColorToRgbaString(value) {
  const [r, g, b, a] = value;
  const colorunit = rgb(r, g, b, deckColorAlphaToRgbaAlpha(a));
  return colorunit.formatRgb();
}
