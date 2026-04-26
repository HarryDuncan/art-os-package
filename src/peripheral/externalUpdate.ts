import { Object3D } from "three";
import { buildMaterialMeshMap } from "./helpers/buildMaterialMeshMap";
import { getRegisteredScene } from "./onPeripheralTrigger";

export type ExternalUpdateSelector = {
  materialIds?: string[];
  meshIds?: string[];
};

export const externalUpdate = (
  selector: ExternalUpdateSelector,
  data: Record<string, unknown>,
) => {
  const scene = getRegisteredScene();
  if (!scene) {
    console.warn("externalUpdate: no scene context registered");
    return;
  }

  const meshSet = new Set<Object3D>();

  if (selector.materialIds?.length) {
    const materialMeshMap = buildMaterialMeshMap(scene);
    for (const materialId of selector.materialIds) {
      const found = materialMeshMap[materialId] ?? [];
      if (!found.length) {
        console.warn(
          `externalUpdate: no meshes found for materialId "${materialId}"`,
        );
      }
      for (const mesh of found) meshSet.add(mesh);
    }
  }

  if (selector.meshIds?.length) {
    for (const meshId of selector.meshIds) {
      const found = scene.getObjectByName(meshId);
      if (!found) {
        console.warn(`externalUpdate: no mesh found with name "${meshId}"`);
        continue;
      }
      meshSet.add(found);
    }
  }

  for (const mesh of meshSet) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uniforms = (mesh as any).material?.uniforms;
    if (!uniforms) continue;

    for (const [key, value] of Object.entries(data)) {
      if (!(key in uniforms)) {
        console.warn(
          `externalUpdate: uniform "${key}" not found on mesh "${mesh.name || mesh.uuid}"`,
        );
        continue;
      }
      uniforms[key].value = value;
    }
  }
};
