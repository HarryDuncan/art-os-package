import { Scene, Object3D } from "three";

export const buildMaterialMeshMap = (
  scene: Scene,
): Record<string, Object3D[]> => {
  const map: Record<string, Object3D[]> = {};
  scene.children.forEach((child) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialName = (child as any).material?.name as string | undefined;
    if (materialName) {
      if (!map[materialName]) {
        map[materialName] = [];
      }
      map[materialName].push(child);
    }
  });
  return map;
};
