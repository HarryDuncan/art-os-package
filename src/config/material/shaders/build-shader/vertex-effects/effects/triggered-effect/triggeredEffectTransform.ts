import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { TRIGGERED_FRAGMENT_EFFECT } from "../../../fragment-effects/fragmentEffects.consts";
import {
  TriggeredEffectProps,
  ExplodeEffectProps,
  ExpandEffectProps,
  RotationEffectProps,
} from "../../../types";
import { VERTEX_EFFECTS } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { expand } from "../displacement/expand/expand";
import { explode } from "../displacement/explode/explode";
import { rotationEffect } from "../rotation/rotation";
import { DEFAULT_TRIGGERED_EFFECT } from "./triggeredEffect.consts";

export const triggeredEffectTransform = (
  pointName: string,
  previousPointName: string,
  triggeredEffectProps: TriggeredEffectProps
) => {
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    vertexPointInstantiation,
  } = getEffectData(pointName, triggeredEffectProps);
  const transformation = `vec3 ${pointName} = ${previousPointName}.xyz;
              ${vertexPointInstantiation ?? ""}
              float isTriggered = 0.0;
              if(uIsTriggered >= 1.0){
                  ${effectTransform}
                  isTriggered = 1.0;
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
  triggeredEffectProps: TriggeredEffectProps
): VertexEffectData => {
  const { effectType, effectProps } = triggeredEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRIGGERED_EFFECT,
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
    case TRIGGERED_FRAGMENT_EFFECT.EMPTY:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
