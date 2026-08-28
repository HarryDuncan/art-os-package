/**
 * Shared helper for partial Vector3 updates.
 * Rotation (Euler) uses the same x/y/z shape via applyPartial in mesh/camera setters.
 */
import { Vector3 } from "three";
import { Vec3Params } from "../types";

export const applyVec3 = (
  target: Vector3,
  params: Vec3Params | undefined,
): void => {
  if (!params) return;
  if (params.x !== undefined) target.x = params.x;
  if (params.y !== undefined) target.y = params.y;
  if (params.z !== undefined) target.z = params.z;
};
