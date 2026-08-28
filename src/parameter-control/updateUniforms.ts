import { Object3D } from "three";
import { buildMaterialMeshMap } from "./helpers/buildMaterialMeshMap";
import { getRegisteredParameterControlScene } from "./register";
import { ParameterControlSelector } from "./types";

import { packageConsole } from "../utils/packageConsole";
export const setMaterialUniforms = (
  selector: ParameterControlSelector,
  data: Record<string, unknown>,
): void => {
  const scene = getRegisteredParameterControlScene();
  if (!scene) {
    packageConsole.warn("setMaterialUniforms: no parameter-control scene registered");
    return;
  }

  const meshSet = new Set<Object3D>();

  if (selector.materialIds?.length) {
    const materialMeshMap = buildMaterialMeshMap(scene);
    for (const materialId of selector.materialIds) {
      const found = materialMeshMap[materialId] ?? [];
      if (!found.length) {
        packageConsole.warn(
          `setMaterialUniforms: no meshes found for materialId "${materialId}"`,
        );
      }
      for (const mesh of found) meshSet.add(mesh);
    }
  }

  if (selector.meshIds?.length) {
    for (const meshId of selector.meshIds) {
      const found = scene.getObjectByName(meshId);
      if (!found) {
        packageConsole.warn(
          `setMaterialUniforms: no mesh found with name "${meshId}"`,
        );
        continue;
      }
      meshSet.add(found);
    }
  }

  for (const mesh of meshSet) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniforms = (mesh as any).material?.uniforms as
      | Record<string, { value: unknown }>
      | undefined;
    if (!uniforms) continue;

    for (const [key, value] of Object.entries(data)) {
      if (!(key in uniforms)) {
        packageConsole.warn(
          `setMaterialUniforms: uniform "${key}" not found on mesh "${mesh.name || mesh.uuid}"`,
        );
        continue;
      }
      uniforms[key].value = value;
    }
  }
};
