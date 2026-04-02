import { Object3D } from "three";

export const setUniforms = (
  meshTargets: Record<string, Object3D[]>,
  formattedOutputForMaterials: Record<string, string[]>,
  value: unknown,
) => {
  for (const [materialId, meshes] of Object.entries(meshTargets)) {
    const output = formattedOutputForMaterials[materialId];
    if (!output) continue;
    for (const mesh of meshes) {
      // TODO - add support for multiple uniforms
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uniform = (mesh as any).material?.uniforms?.[output[0]];
      if (uniform) {
        uniform.value = value;
      }
    }
  }
};
