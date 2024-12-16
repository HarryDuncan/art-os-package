import { vertexEffectToEffectData } from "../../../../helpers/vertexEffectToEffectData";
import { DistortionEffectProps } from "../../../../types";
import { DISTORTION_TYPES } from "../../../vertexEffects.consts";
import { flexyTwister } from "./flexy-twister/flexyTwister";
import { stretch } from "./stretch/stretch";
import { twistTransformation } from "./twist/twistTransformation";

export const distortionTransform = (
  pointName: string,
  previousPointName: string,
  distortEffectProps: DistortionEffectProps
) => {
  const {
    transformation,
    vertexPointInstantiation,
    uniformConfig,
    varyingConfig,
    requiredFunctions,
  } = getTransformation(pointName, previousPointName, distortEffectProps);
  return {
    transformation,
    vertexPointInstantiation,
    uniformConfig,
    requiredFunctions,
    varyingConfig,
  };
};

const getTransformation = (
  pointName: string,
  previousPointName: string,
  distortEffectProps: DistortionEffectProps
) => {
  const { distortionType, effectProps } = distortEffectProps;
  switch (distortionType) {
    case DISTORTION_TYPES.STRETCH:
      return vertexEffectToEffectData(
        stretch(pointName, previousPointName, effectProps)
      );
    case DISTORTION_TYPES.FLEXY_TWISTER:
      return vertexEffectToEffectData(
        flexyTwister(pointName, previousPointName, effectProps)
      );
    case DISTORTION_TYPES.TWIST:
    default: {
      const twistTransformationData = twistTransformation(
        pointName,
        previousPointName,
        effectProps
      );
      return vertexEffectToEffectData(twistTransformationData);
    }
  }
};
