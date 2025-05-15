import { VertexEffectProps } from "../../../vertexEffects.types";
import {
  IMAGE_TO_POINTS_ATTRIBUTES,
  IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
  IMAGE_TO_POINTS_UNIFORMS,
  IMAGE_TO_POINTS_VARYING_CONFIG,
} from "./imageToPoints.consts";
import { imageToPointsTransform } from "./imageToPointsTransform";

export const imageToPoints = (effectProps: VertexEffectProps) => {
  const { effectUniforms } = effectProps;
  const { transformation } = imageToPointsTransform(effectUniforms);
  return {
    requiredFunctions: IMAGE_TO_POINTS_REQUIRED_FUNCTIONS,
    uniformConfig: IMAGE_TO_POINTS_UNIFORMS,
    attributeConfig: IMAGE_TO_POINTS_ATTRIBUTES,
    transformation,
    varyingConfig: IMAGE_TO_POINTS_VARYING_CONFIG,
  };
};
