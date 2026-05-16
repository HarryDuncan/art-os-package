import { Asset } from "../../../../assets/types";
import { SceneConfig } from "../../../config.types";
import { MATERIAL_TYPES } from "../../schema/consts";
import { ExternalSchema, MaterialConfig } from "../../types";
import { preformat } from "../preformat/preformat";
import { generateShaders } from "../generator/generateShaders";
import { configureRawWebglBlending } from "./configureRawWebglBlending";
import { formatRawWebglUniforms } from "./formatRawWebglUniforms";
import { injectRawWebglHeader } from "./injectRawWebglHeader";
import { RawWebglShaderMaterial } from "./types";

const DEBUG = false;

export const generateRawWebglShader = (
  materialConfig: MaterialConfig,
  schemas: ExternalSchema,
) => {
  const {
    shaderEffectConfigs,
    operatorConfigs,
    parameterConfigs,
    functionConfigs,
    animationLoopConfigs,
  } = materialConfig;

  const {
    parameterMap,
    operatorConfigs: formattedOperatorConfigs,
    structsConfigs,
    functionConfigs: preformattedFunctionConfigs,
  } = preformat(
    parameterConfigs ?? [],
    shaderEffectConfigs ?? [],
    operatorConfigs ?? [],
    functionConfigs ?? [],
    animationLoopConfigs ?? [],
    schemas,
  );

  const { vertexShader, fragmentShader } = generateShaders(
    formattedOperatorConfigs,
    preformattedFunctionConfigs,
    parameterMap,
    structsConfigs,
  );

  console.log("vertexShader", vertexShader);
  console.log("fragmentShader", fragmentShader);
  return {
    vertexShader: injectRawWebglHeader(vertexShader, "vertex"),
    fragmentShader: injectRawWebglHeader(fragmentShader, "fragment"),
    parameterMap,
  };
};

export const generateRawWebglShaderMaterials = (
  config: SceneConfig,
  assets: Asset[],
): { builtShaders: RawWebglShaderMaterial[] } => {
  const { sceneMaterialConfigs } = config;
  if (!sceneMaterialConfigs) return { builtShaders: [] };

  const builtShaders = sceneMaterialConfigs.flatMap((materialConfig) => {
    if (
      materialConfig.materialType !== MATERIAL_TYPES.BUILT_SHADER ||
      !materialConfig.schemas
    ) {
      return [];
    }

    const { vertexShader, fragmentShader, parameterMap } =
      generateRawWebglShader(materialConfig, materialConfig.schemas);

    if (DEBUG) {
      console.log("Raw WebGL Vertex Shader: ", vertexShader);
      console.log("Raw WebGL Fragment Shader: ", fragmentShader);
      console.log("Raw WebGL Parameter Map: ", parameterMap);
    }

    const { uniforms, textureBindings } = formatRawWebglUniforms(
      parameterMap,
      assets,
    );
    const blending = configureRawWebglBlending(materialConfig.blendingConfig);

    return [
      {
        guid: materialConfig.guid,
        vertexShader,
        fragmentShader,
        uniforms,
        textureBindings,
        blending,
      },
    ];
  });

  return { builtShaders };
};
