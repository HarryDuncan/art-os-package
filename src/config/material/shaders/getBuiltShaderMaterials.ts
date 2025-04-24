import { Asset } from "../../../types";
import { SceneConfig } from "../../../types/config.types";
import { DoubleSide, ShaderMaterial } from "three";
import { buildShader } from "./build-shader/buildShader";
import { formatBuiltShaderConfig } from "./shader-formatting/formatBuiltShaderConfig";
import { formatBuiltShaderUniforms } from "./shader-formatting/formatBuiltShaderUniforms";
import { configureBlendingOptions } from "../blending-options/configureBlendingOptions";
import { getAttributeValuesFromAssets } from "../../mesh/attributes/getAttributeValuesFromAsset";
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
  const builtShadersAndAttributes = sceneMaterialConfigs.flatMap(
    (materialConfig) => {
      if (materialConfig.materialType === MATERIAL_TYPES.BUILT_SHADER) {
        const { builtShaderConfig } = materialConfig;
        if (!builtShaderConfig) return [];
        const shaderConfig = formatBuiltShaderConfig(builtShaderConfig);
        const { uniforms, vertexShader, fragmentShader, attributeConfigs } =
          buildShader(shaderConfig);
        const attributesFromAssets = getAttributeValuesFromAssets(
          attributeConfigs,
          assets
        );

        console.log(vertexShader);
        console.log(fragmentShader);
        // using both for backwards compatibility
        const assetMapping = [
          ...(builtShaderConfig.uniformConfig?.mappedAssets ?? []),
          ...(materialConfig.assetMapping ?? []),
        ];
        const formattedUniforms = formatBuiltShaderUniforms(
          uniforms,
          assetMapping,
          assets
        );
        const blendingOptions = configureBlendingOptions(
          materialConfig.blendingConfig
        );
        const shader = new ShaderMaterial({
          uniforms: formattedUniforms,
          vertexShader,
          fragmentShader,
          ...blendingOptions,
          side: DoubleSide,
        });
        shader.name = materialConfig.id;
        return { shader, attributeConfigs: attributesFromAssets };
      }
      return [];
    }
  );

  const builtShaders = builtShadersAndAttributes.map(({ shader }) => shader);
  const shaderAttributeConfigs = builtShadersAndAttributes.map(
    ({ shader, attributeConfigs }) => ({
      materialId: shader.name,
      attributeConfigs,
    })
  );
  return { attributeConfigs: shaderAttributeConfigs, builtShaders };
};
