import { MeshTransformConfig } from "../../config.types";
import { ShaderAttributeConfig } from "../../material/shaders/build-shader/types";
import { MESH_TRANSFORM } from "../../../consts/mesh.consts";

export const formatMeshAttributes = (
  meshTransforms: MeshTransformConfig[],
  shaderAttributeConfigs: ShaderAttributeConfig[]
) => {
  const transformMaterialIds = meshTransforms.flatMap(
    ({ materialId }) => materialId ?? []
  );
  const addedTransforms = shaderAttributeConfigs.flatMap(
    ({ materialId, attributeConfigs }) => {
      if (!transformMaterialIds.includes(materialId)) {
        return {
          type: MESH_TRANSFORM.CUSTOM_ATTRIBUTES,
          transformedMeshIds: [],
          materialId,
          attributeConfig: attributeConfigs,
        };
      }
      return [];
    }
  );
  const formattedTransforms = meshTransforms.map((transform) => {
    if (transform.materialId) {
      const shaderAttributes = shaderAttributeConfigs.find(
        ({ materialId }) => materialId === transform.materialId
      );
      if (shaderAttributes) {
        const attributeConfig = [
          ...(transform.attributeConfig ?? []),
          ...shaderAttributes.attributeConfigs,
        ];
        return { ...transform, attributeConfig };
      }
      console.warn(`no shader attributes found for ${transform.materialId}`);
      return transform;
    }
    return transform;
  });

  return [...formattedTransforms, ...addedTransforms] as MeshTransformConfig[];
};
