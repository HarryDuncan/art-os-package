import { Asset } from "../../../types";
import { SceneConfig } from "../../../types/config.types";
import { DoubleSide, ShaderMaterial } from "three";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderConfig } from "./shader-formatting/formatBuiltShaderConfig";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { MATERIAL_TYPES } from "../../../consts/materials/materials.consts";

export const getBuiltShaderMaterials = (
  config: SceneConfig,
  assets: Asset[]
) => {
  const { sceneMaterialConfigs } = config;
  if (!sceneMaterialConfigs)
    return {
      attributeConfigs: [],
      builtShaders: [],
    };
  const builtShaderMaterials = sceneMaterialConfigs.flatMap(
    (materialConfig) => {
      if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
        const { builtShaderConfig } = materialConfig;
        if (!builtShaderConfig) return [];
        const shaderConfig = formatBuiltShaderConfig(builtShaderConfig);
        const { uniforms, vertexShader, fragmentShader } =
          buildShader(shaderConfig);

        const assetMapping =
          shaderConfig.uniformConfig?.customUniforms?.flatMap((uniform) =>
            uniform.isAssetMapped && uniform.assetMappingConfig
              ? { ...uniform.assetMappingConfig, uniformId: uniform.id }
              : []
          ) || [];

        const formattedUniforms = formatBuiltShaderUniforms(
          uniforms,
          assetMapping,
          assets
        );
        const blendingOptions = configureBlendingOptions(
          materialConfig.blendingConfig
        );

        const shaderMaterial = new ShaderMaterial({
          uniforms: formattedUniforms,
          vertexShader,
          fragmentShader,
          ...blendingOptions,
          side: DoubleSide,
        });
        shaderMaterial.name = materialConfig.id;

        return shaderMaterial;
      }
      return [];
    }
  );

  return { builtShaders: builtShaderMaterials };
};
