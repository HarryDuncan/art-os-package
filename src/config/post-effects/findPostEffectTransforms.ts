import { SceneConfig } from "../config.types";
import { MaterialConfig } from "../material/types";
import { ParameterConfig } from "../material/shaders/schema";
import { SHADER_PROPERTY_TYPES } from "../material/shaders/schema/consts";

export interface PingPongRenderTargetConfig {
  materialId: string;
  parameter: ParameterConfig;
}

/**
 * Searches through the scene config to find materials with shader effect parameters
 * that are of type RENDER_TARGET and creates a pingpong render target config for each.
 */
export const findPostEffectTransforms = (
  config: SceneConfig
): PingPongRenderTargetConfig[] => {
  const pingpongRenderTargets: PingPongRenderTargetConfig[] = [];

  if (!config.sceneMaterialConfigs) {
    return pingpongRenderTargets;
  }

  config.sceneMaterialConfigs.forEach((materialConfig: MaterialConfig) => {
    if (!materialConfig.parameterConfigs) {
      return;
    }

    materialConfig?.parameterConfigs?.forEach(
      (parameterConfig: ParameterConfig) => {
        if (
          parameterConfig.parameterType === SHADER_PROPERTY_TYPES.UNIFORM &&
          parameterConfig.key === "uRenderTarget"
        ) {
          pingpongRenderTargets.push({
            materialId: materialConfig.guid,
            parameter: parameterConfig,
          });
        }
      }
    );
  });

  return pingpongRenderTargets.flatMap((target, index) => {
    return index === 0 ? target : [];
  });
};
