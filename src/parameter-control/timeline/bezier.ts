import { PositionConfig } from "../../types/position.types";

export const lerpScalar = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const cubicBezier3D = (
  p0: PositionConfig,
  p1: PositionConfig,
  p2: PositionConfig,
  p3: PositionConfig,
  t: number,
): { x: number; y: number; z: number } => {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x =
    uuu * (p0.x ?? 0) +
    3 * uu * t * (p1.x ?? 0) +
    3 * u * tt * (p2.x ?? 0) +
    ttt * (p3.x ?? 0);
  const y =
    uuu * (p0.y ?? 0) +
    3 * uu * t * (p1.y ?? 0) +
    3 * u * tt * (p2.y ?? 0) +
    ttt * (p3.y ?? 0);
  const z =
    uuu * (p0.z ?? 0) +
    3 * uu * t * (p1.z ?? 0) +
    3 * u * tt * (p2.z ?? 0) +
    ttt * (p3.z ?? 0);

  return { x, y, z };
};

export const sampleCubicBezier = (
  p0: PositionConfig,
  p1: PositionConfig,
  p2: PositionConfig,
  p3: PositionConfig,
  segments = 32,
): { x: number; y: number; z: number }[] => {
  const points: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i <= segments; i += 1) {
    points.push(cubicBezier3D(p0, p1, p2, p3, i / segments));
  }
  return points;
};
