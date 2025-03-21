import { ShaderMaterial } from "three";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { configureShaders } from "./configureShaders";
import { MATERIAL_TYPES, SHADER_MATERIALS } from "../materials.consts";
export const getShaderMaterials = (config, assets) => {
    const { globalMaterialConfigs } = config;
    if (!globalMaterialConfigs)
        return [];
    return globalMaterialConfigs.flatMap((materialConfig) => {
        if (SHADER_MATERIALS.includes(materialConfig.materialType)) {
            const shaderMaterial = setUpShaderMaterial(materialConfig, assets);
            if (shaderMaterial) {
                shaderMaterial.name = materialConfig.id;
                return shaderMaterial;
            }
        }
        return [];
    });
};
const setUpShaderMaterial = (materialConfig, assets) => {
    const { shaderConfig, uniforms } = materialConfig.materialProps;
    const { vertexShader, fragmentShader, configuredUniforms } = configureShaders(shaderConfig, uniforms, assets);
    const blendingOptions = configureBlendingOptions(materialConfig.blendingConfig);
    switch (materialConfig.materialType) {
        case MATERIAL_TYPES.SHADER: {
            return new ShaderMaterial(Object.assign({ uniforms: configuredUniforms, vertexShader,
                fragmentShader }, blendingOptions));
        }
        default:
            return null;
    }
};
