import { RawShaderMaterial } from "three";
import { ExtendedMesh } from "../../../../config/mesh/mesh.types";

export const updateObjectUniformByKey = (
  mesh: ExtendedMesh,
  uniformKey: string,
  uniformValue: unknown,
  uniformArrayIndex?: number
) => {
  const material = mesh.material as RawShaderMaterial;
  if (material && material.uniforms && material.uniforms[uniformKey]) {
    if (uniformArrayIndex !== undefined) {
      material.uniforms[uniformKey].value[uniformArrayIndex] = uniformValue;
    } else {
      material.uniforms[uniformKey].value = uniformValue;
    }
  }
};
