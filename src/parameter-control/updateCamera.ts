import { PerspectiveCamera, Vector3 } from "three";
import { applyVec3 } from "./helpers/applyVec3";
import { getRegisteredParameterControlCamera } from "./register";
import { CameraParams } from "./types";

export const setCameraParams = (params: CameraParams): void => {
  const camera = getRegisteredParameterControlCamera();
  if (!camera) {
    console.warn("setCameraParams: no parameter-control camera registered");
    return;
  }

  applyVec3(camera.position, params.position);

  if (params.rotation) {
    if (params.rotation.x !== undefined) camera.rotation.x = params.rotation.x;
    if (params.rotation.y !== undefined) camera.rotation.y = params.rotation.y;
    if (params.rotation.z !== undefined) camera.rotation.z = params.rotation.z;
  }

  if (params.lookAt) {
    const { x, y, z } = params.lookAt;
    camera.lookAt(new Vector3(x, y, z));
  }

  if (camera instanceof PerspectiveCamera) {
    let projectionChanged = false;
    if (params.fov !== undefined) {
      camera.fov = params.fov;
      projectionChanged = true;
    }
    if (params.near !== undefined) {
      camera.near = params.near;
      projectionChanged = true;
    }
    if (params.far !== undefined) {
      camera.far = params.far;
      projectionChanged = true;
    }
    if (projectionChanged) {
      camera.updateProjectionMatrix();
    }
  }
};
