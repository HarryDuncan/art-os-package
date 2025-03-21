import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { VERTEX_EFFECTS } from "../../vertexEffects.consts";
import { expand } from "../displacement/expand/expand";
import { explode } from "../displacement/explode/explode";
import { rotationEffect } from "../rotation/rotation";
import { DEFAULT_TRANSITION_EFFECT } from "./transitonEffect.consts";
export const transitionEffectTransform = (pointName, previousPointName, transitionEffectProps) => {
    const { uniformConfig: effectUniforms, varyingConfig: effectVaryings, transformation: effectTransform, pointName: effectPointName, requiredFunctions: effectFunctions, attributeConfig: effectAttributes, vertexPointInstantiation, } = getEffectData(pointName, transitionEffectProps);
    const transformation = `vec3 ${pointName} = ${previousPointName}.xyz;
              ${vertexPointInstantiation !== null && vertexPointInstantiation !== void 0 ? vertexPointInstantiation : ""}
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
const getEffectData = (pointName, transitionEffectProps) => {
    const { effectType, effectProps } = transitionEffectProps;
    const formattedEffectProps = Object.assign(Object.assign({}, DEFAULT_TRANSITION_EFFECT), effectProps);
    switch (effectType) {
        case VERTEX_EFFECTS.EXPLODE:
            return explode(pointName, formattedEffectProps);
        case VERTEX_EFFECTS.EXPAND:
            return expand(pointName, formattedEffectProps);
        case VERTEX_EFFECTS.ROTATE:
            return rotationEffect(pointName, formattedEffectProps);
        default:
            return Object.assign(Object.assign({}, DEFAULT_VERTEX_EFFECT), { pointName });
    }
};
