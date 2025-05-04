import { UniformValueConfig } from "../../../../../../../../types/materials/shaders/buildShader.types";
import { ImageToPointsEffectProps } from "../../../../../../../../types/materials/shaders/vertexShader.types";
import {
  IMAGE_TO_POINTS_ATTRIBUTE_CONFIG,
  IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  IMAGE_TO_POINTS_UNIFORMS,
  IMAGE_TO_POINTS_VARYING_CONFIG,
} from "./imageToPoints.consts";
import { imageToPointsTransform } from "./imageToPointsTransform";

export const imageToPoints = (
  effectProps: Partial<ImageToPointsEffectProps>,
  effectUniforms: UniformValueConfig[]
) => {
  const { transformation } = imageToPointsTransform(effectUniforms);

  return {
    requiredFunctions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
    uniformConfig: IMAGE_TO_POINTS_UNIFORMS,
    attributeConfig: IMAGE_TO_POINTS_ATTRIBUTE_CONFIG,
    transformation,
    varyingConfig: IMAGE_TO_POINTS_VARYING_CONFIG,
  };
};
