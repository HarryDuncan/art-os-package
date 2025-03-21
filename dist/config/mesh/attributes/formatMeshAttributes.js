import { MESH_TRANSFORM } from "../mesh.consts";
export const formatMeshAttributes = (meshTransforms, shaderAttributeConfigs) => {
    const transformMaterialIds = meshTransforms.flatMap(({ materialId }) => materialId !== null && materialId !== void 0 ? materialId : []);
    const addedTransforms = shaderAttributeConfigs.flatMap(({ materialId, attributeConfigs }) => {
        if (!transformMaterialIds.includes(materialId)) {
            return {
                type: MESH_TRANSFORM.CUSTOM_ATTRIBUTES,
                transformedMeshIds: [],
                materialId,
                attributeConfig: attributeConfigs,
            };
        }
        return [];
    });
    const formattedTransforms = meshTransforms.map((transform) => {
        var _a;
        if (transform.materialId) {
            const shaderAttributes = shaderAttributeConfigs.find(({ materialId }) => materialId === transform.materialId);
            if (shaderAttributes) {
                const attributeConfig = [
                    ...((_a = transform.attributeConfig) !== null && _a !== void 0 ? _a : []),
                    ...shaderAttributes.attributeConfigs,
                ];
                return Object.assign(Object.assign({}, transform), { attributeConfig });
            }
            console.warn(`no shader attributes found for ${transform.materialId}`);
            return transform;
        }
        return transform;
    });
    return [...formattedTransforms, ...addedTransforms];
};
