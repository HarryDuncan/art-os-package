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
  const { sceneMaterialConfigs, meshTransforms } = config;
  if (!sceneMaterialConfigs)
    return {
      builtShaders: [],
    };
  const builtShaderMaterials = sceneMaterialConfigs.flatMap(
    (materialConfig) => {
      if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
        const { shaderEffectConfigs } = materialConfig;
        if (!shaderEffectConfigs) return [];
        const shaderConfig = formatBuiltShaderConfig(
          shaderEffectConfigs,
          meshTransforms ?? []
        );

        const { vertexShader, fragmentShader } = buildShader(shaderConfig);

        const formattedUniforms = formatBuiltShaderUniforms(
          shaderConfig.uniformConfigs ?? [],
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
