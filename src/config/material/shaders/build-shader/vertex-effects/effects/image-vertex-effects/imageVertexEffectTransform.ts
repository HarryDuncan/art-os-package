import {
  ImageSubEffectProps,
  ImageVertexEffect,
} from "../../../../../../../types/materials/shaders/vertexShader.types";
import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { IMAGE_VERTEX_EFFECT } from "../../../../../../../consts/materials/vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { imageAsMask } from "./sub-effects/image-as-mask/imageAsMask";
import { imageToPoints } from "./sub-effects/image-to-points/imageToPoints";

export const imageVertexEffectTransform = (
  imageVertexEffectProps: ImageVertexEffect
) => {
  const { effectType } = imageVertexEffectProps;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,

    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(effectType, imageVertexEffectProps);

  const transformation = `
 
  ${effectTransform}

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,

    effectFunctions,
    effectAttributes,
  };
};

const getEffectData = (
  effectType: string,
  effectProps: ImageSubEffectProps
): VertexEffectData => {
  switch (effectType) {
    case IMAGE_VERTEX_EFFECT.IMAGE_AS_MASK:
      return imageAsMask(effectProps);
    case IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS:
      return imageToPoints(effectProps);
    default:
      return { ...DEFAULT_VERTEX_EFFECT };
  }
};
