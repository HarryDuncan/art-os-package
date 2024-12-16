import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import {
  ExplodeEffectProps,
  ExpandEffectProps,
  RotationEffectProps,
  TransitionEffectProps,
} from "../../../types";
import { VERTEX_EFFECTS } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { expand } from "../displacement/expand/expand";
import { explode } from "../displacement/explode/explode";
import { rotationEffect } from "../rotation/rotation";
import { DEFAULT_TRANSITION_EFFECT } from "./transitonEffect.consts";

export const transitionEffectTransform = (
  pointName: string,
  previousPointName: string,
  transitionEffectProps: TransitionEffectProps
) => {
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    vertexPointInstantiation,
  } = getEffectData(pointName, transitionEffectProps);
  const transformation = `vec3 ${pointName} = ${previousPointName}.xyz;
              ${vertexPointInstantiation ?? ""}
              float isTransition = 0.0;
              if(uIsTransition >= 1.0){
                  ${effectTransform}
                  isTransition = 1.0;
              }
              `;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
  };
};
const getEffectData = (
  pointName: string,
  transitionEffectProps: TransitionEffectProps
): VertexEffectData => {
  const { effectType, effectProps } = transitionEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRANSITION_EFFECT,
    ...effectProps,
  };
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE:
      return explode(
        pointName,
        formattedEffectProps as Partial<ExplodeEffectProps>
      );
    case VERTEX_EFFECTS.EXPAND:
      return expand(
        pointName,
        formattedEffectProps as Partial<ExpandEffectProps>
      );
    case VERTEX_EFFECTS.ROTATE:
      return rotationEffect(
        pointName,
        formattedEffectProps as Partial<RotationEffectProps>
      );
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
