import { Asset } from "../../../assets/types";
import { SceneConfig } from "../../config.types";
import { DoubleSide, ShaderMaterial } from "three";
import { formatBuiltShaderUniforms } from "./post-format/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { MATERIAL_TYPES } from "../schema/consts";
import { preformat } from "./preformat/preformat";
import { generateShaders } from "./generator/generateShaders";
import { ExternalSchema, MaterialConfig } from "../types";

export const generateShaderMaterials = (
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
        const { vertexShader, fragmentShader, parameterMap } = generateShader(
          materialConfig,
          materialConfig.schemas ?? {}
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

export const generateShader = (
  materialConfig: MaterialConfig,
  schemas: ExternalSchema
) => {
  const { shaderEffectConfigs, operatorConfigs, parameterConfigs } =
    materialConfig;

  const { parameterMap, vertexEffects, fragmentEffects, structsConfigs } =
    preformat(
      parameterConfigs ?? [],
      shaderEffectConfigs ?? [],
      operatorConfigs ?? [],
      schemas
    );

  console.log("parameterMap", parameterMap);
  console.log(vertexEffects);
  console.log(fragmentEffects);

  const { vertexShader, fragmentShader } = generateShaders(
    vertexEffects,
    fragmentEffects,
    parameterMap,
    structsConfigs
  );
  return { vertexShader, fragmentShader, parameterMap };
};
