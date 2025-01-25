import {
  IMAGE_AS_MASK_ATTRIBUTES,
  IMAGE_AS_MASK_FUNCTIONS,
  IMAGE_AS_MASK_UNIFORMS,
  IMAGE_AS_MASK_VARYINGS,
} from "./imageAsMask.consts";
import { imageAsMaskTransform } from "./imageAsMaskTransform";

export const imageAsMask = (previousFragName: string, _effectProps = {}) => {
  const fragName = previousFragName;

  const { transform } = imageAsMaskTransform();

  const mergedUniformConfigs = IMAGE_AS_MASK_UNIFORMS;

  const mergedVaryings = IMAGE_AS_MASK_VARYINGS;
  const mergedAttributes = IMAGE_AS_MASK_ATTRIBUTES;
  const requiredFunctions = IMAGE_AS_MASK_FUNCTIONS;
  return {
    requiredFunctions,
    uniformConfig: mergedUniformConfigs,
    transformation: transform,
    varyingConfig: mergedVaryings,
    attributeConfig: mergedAttributes,
    fragName,
  };
};
