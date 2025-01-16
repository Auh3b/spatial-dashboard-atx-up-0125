import { bboxPolygon, circle, distance, point, polygon } from "@turf/turf";

/**
 *
 * @param {Array<number>} value
 */
export function makePoint(value) {
  return point(value);
}

/**
 *
 * @param { Array<number> } start
 * @param { Array<number> } end
 */
export function getDistance(start, end) {
  const startPoint = makePoint(start);
  const endPoint = makePoint(end);
  return distance(startPoint, endPoint, { units: "meters" });
}

/**
 *
 * @param {Array} center
 * @param {number} radius
 */
export function makeCircle(center, radius) {
  const options = {
    units: "meters",
  };
  return circle(center, radius, options);
}

export function extractCoordinate(value) {
  if (value.type === "Feature") return value.geometry.coordinates;
  return value.features.map(({ geometry }) => geometry.coordinates);
}

/**
 *
 * @param {Array<number>} start
 * @param {Array<number>} end
 */
export function makeRectangle(start, end) {
  const bbox = [...start, ...end];
  const rect = bboxPolygon(bbox);
  return rect;
}

/**
 *
 * @param {Array<Array<Array<number>>>} coords
 */
export function makePolygon(coords) {
  return polygon(coords);
}
