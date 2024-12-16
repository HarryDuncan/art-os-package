import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import { ImageVertexEffect, PointParent } from "../../../types";
import { IMAGE_VERTEX_EFFECT } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { imageToPoints } from "./sub-effects/image-to-points/imageToPoints";

export const imageVertexEffectTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageVertexEffect
) => {
  const { declareInTransform, effectType } = imageVertexEffectProps;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(previousPointName, effectType);

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
  ${declareInTransform ? vertexPointInstantiation : ""}
  ${effectTransform}

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
    vertexPointInstantiation,
  };
};

const getEffectData = (
  pointName: string,
  effectType: string
): VertexEffectData => {
  const formattedEffectProps = {
    pointParent: POINT_PARENTS.IMAGE_EFFECT as PointParent,
  };
  switch (effectType) {
    case IMAGE_VERTEX_EFFECT.IMAGE_TO_POINTS:
      return imageToPoints(pointName, formattedEffectProps);
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
