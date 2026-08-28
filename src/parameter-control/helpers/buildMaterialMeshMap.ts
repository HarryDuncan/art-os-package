import { Material, Object3D, Scene } from "three";

const getMaterialName = (object: Object3D): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = (object as any).material as Material | Material[] | undefined;
  if (!material) return undefined;
  if (Array.isArray(material)) {
    return material[0]?.name || undefined;
  }
  return material.name || undefined;
};

/** Walks the full scene graph (unlike peripheral's top-level-only map). */
export const buildMaterialMeshMap = (
  scene: Scene,
): Record<string, Object3D[]> => {
  const map: Record<string, Object3D[]> = {};
  scene.traverse((child) => {
    const materialName = getMaterialName(child);
    if (!materialName) return;
    if (!map[materialName]) {
      map[materialName] = [];
    }
    map[materialName].push(child);
  });
  return map;
};
