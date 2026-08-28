import { getRegisteredParameterControlScene } from "./register";
import { MeshTransformParams, Vec3Params } from "./types";

import { packageConsole } from "../utils/packageConsole";
const applyPartialXYZ = (
  target: { x: number; y: number; z: number },
  params: Vec3Params | undefined,
): void => {
  if (!params) return;
  if (params.x !== undefined) target.x = params.x;
  if (params.y !== undefined) target.y = params.y;
  if (params.z !== undefined) target.z = params.z;
};

export const setMeshTransform = (
  meshId: string,
  params: MeshTransformParams,
): void => {
  const scene = getRegisteredParameterControlScene();
  if (!scene) {
    packageConsole.warn("setMeshTransform: no parameter-control scene registered");
    return;
  }

  const mesh = scene.getObjectByName(meshId);
  if (!mesh) {
    packageConsole.warn(`setMeshTransform: no mesh found with name "${meshId}"`);
    return;
  }

  applyPartialXYZ(mesh.position, params.position);
  applyPartialXYZ(mesh.rotation, params.rotation);
  applyPartialXYZ(mesh.scale, params.scale);
};
