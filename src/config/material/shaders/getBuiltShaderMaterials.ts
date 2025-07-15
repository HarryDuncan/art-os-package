import { Asset } from "../../../types";
import { SceneConfig } from "../../../types/config.types";
import { DoubleSide, ShaderMaterial } from "three";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { MATERIAL_TYPES } from "../../../consts/materials/materials.consts";
import { formatParametersAndEffects } from "./shader-formatting/setUpParameterMap";

export const getBuiltShaderMaterials = (
  config: SceneConfig,
  assets: Asset[]
) => {
  const { sceneMaterialConfigs } = config;
  if (!sceneMaterialConfigs)
    return {
      builtShaders: [],
    };
  const builtShaderMaterials = sceneMaterialConfigs.flatMap(
    (materialConfig) => {
      if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
        const { shaderEffectConfigs, effectFunctionConfigs, parameterConfigs } =
          materialConfig;
        if (!shaderEffectConfigs) return [];
        const { parameterMap, updatedEffectConfigs } =
          formatParametersAndEffects(
            parameterConfigs ?? [],
            shaderEffectConfigs
          );

        const { vertexShader, fragmentShader } = buildShader(
          updatedEffectConfigs,
          effectFunctionConfigs ?? [],
          parameterMap
        );

        const formattedUniforms = formatBuiltShaderUniforms(
          parameterMap,
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
        shaderMaterial.name = materialConfig.guid;

        return shaderMaterial;
      }
      return [];
    }
  );

  return { builtShaders: builtShaderMaterials };
};
